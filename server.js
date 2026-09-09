const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'ega-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }
  })
);

const FRONTEND_DIR = path.join(__dirname, 'EGa_Furniture-main');
app.use(express.static(FRONTEND_DIR));

function renderLoginPage(req, res) {
  res.sendFile(path.join(FRONTEND_DIR, 'HTML', 'dangnhap.html'));
}

app.get('/', (req, res) => {
  res.redirect('/HTML/home.html');
});

app.get('/login', (req, res) => {
  renderLoginPage(req, res);
});

app.get('/auth/google', (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  const scope = 'openid email profile';

  if (!clientId || !redirectUri) {
    return res.status(500).send('Google OAuth chưa được cấu hình. Vui lòng thêm Client ID và Redirect URI trong .env');
  }

  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', scope);
  url.searchParams.set('access_type', 'offline');
  url.searchParams.set('prompt', 'consent');
  url.searchParams.set('state', 'google');

  res.redirect(url.toString());
});

app.get('/auth/facebook', (req, res) => {
  const appId = process.env.FACEBOOK_APP_ID;
  const redirectUri = process.env.FACEBOOK_REDIRECT_URI;

  if (!appId || !redirectUri) {
    return res.status(500).send('Facebook OAuth chưa được cấu hình. Vui lòng thêm App ID và Redirect URI trong .env');
  }

  const url = new URL('https://www.facebook.com/v18.0/dialog/oauth');
  url.searchParams.set('client_id', appId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', 'email,public_profile');
  url.searchParams.set('state', 'facebook');

  res.redirect(url.toString());
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Không nhận được mã Google');
  }

  const tokenUrl = 'https://oauth2.googleapis.com/token';
  const payload = new URLSearchParams({
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    grant_type: 'authorization_code'
  });

  try {
    const tokenResp = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload.toString()
    });

    const tokenData = await tokenResp.json();
    if (!tokenResp.ok) {
      return res.status(400).json({ error: 'Google token exchange failed', details: tokenData });
    }

    const userResp = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });
    const userData = await userResp.json();

    req.session.user = {
      name: userData.name,
      email: userData.email,
      provider: 'Google'
    };

    res.redirect('/HTML/home.html');
  } catch (err) {
    console.error('Google callback error:', err);
    res.status(500).send('Lỗi xử lý đăng nhập Google');
  }
});

app.get('/auth/facebook/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Không nhận được mã Facebook');
  }

  const tokenUrl = 'https://graph.facebook.com/v18.0/oauth/access_token';
  const params = new URLSearchParams({
    client_id: process.env.FACEBOOK_APP_ID,
    client_secret: process.env.FACEBOOK_APP_SECRET,
    redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
    code
  });

  try {
    const tokenResp = await fetch(`${tokenUrl}?${params.toString()}`);
    const tokenData = await tokenResp.json();

    if (!tokenResp.ok || tokenData.error) {
      return res.status(400).json({ error: 'Facebook token exchange failed', details: tokenData });
    }

    const userResp = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${tokenData.access_token}`);
    const userData = await userResp.json();

    req.session.user = {
      name: userData.name,
      email: userData.email,
      provider: 'Facebook'
    };

    res.redirect('/HTML/home.html');
  } catch (err) {
    console.error('Facebook callback error:', err);
    res.status(500).send('Lỗi xử lý đăng nhập Facebook');
  }
});

app.get('/api/session', (req, res) => {
  res.json({ user: req.session.user || null });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

app.get('/auth/status', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

app.get('*', (req, res) => {
  const safePath = req.path.replace(/^\/+/, '');
  const filePath = path.join(FRONTEND_DIR, safePath || 'HTML/home.html');

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.sendFile(filePath);
    return;
  }

  res.sendFile(path.join(FRONTEND_DIR, 'HTML', 'home.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Add your OAuth credentials in .env before using Google/Facebook login');
});
