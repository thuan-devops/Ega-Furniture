function renderHeader() {
  const renderHeader = document.querySelector("header");
  const navBar = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="../../HTML/home.html">
                EGA FURNITURE
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    
                    <li class="nav-item dropdown dropdown-hover">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Nội thất theo phòng</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../../HTML/living-room.html">Phòng khách</a></li>
                            <li><a class="dropdown-item" href="../../HTML/kitchen.html">Phòng bếp</a></li>
                            <li><a class="dropdown-item" href="../../HTML/bedroom.html">Phòng ngủ</a></li>
                            <li><a class="dropdown-item" href="../../HTML/office.html">Phòng làm việc</a></li>
                            <li><a class="dropdown-item" href="../../HTML/decorations.html">Đồ trang trí</a></li>
                        </ul>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="../../HTML/khuyenmai.html">Khuyến mãi</a></li>
                    <li class="nav-item"><a class="nav-link" href="../../HTML/goc-cam-hung.html">Góc cảm hứng</a></li>
                    <li class="nav-item"><a class="nav-link" href="../../HTML/about.html">Về chúng tôi</a></li>
                </ul>

                <div class="d-flex">
                    <a href="#" class="nav-link me-3" aria-label="Tìm kiếm">
                        <i class="bi bi-search"></i>
                    </a>
                    <a href="../../HTML/dangnhap.html" class="nav-link me-3" aria-label="Tài khoản">
                        <i class="bi bi-person"></i>
                    </a>
                    <a href="../../HTML/cart.html" class="nav-link position-relative" aria-label="Giỏ hàng">
                        <i class="bi bi-cart"></i>
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">0</span>
                    </a>
                </div>
            </div>
        </div>
    </nav>
  `;

  renderHeader.innerHTML = navBar;
}

function renderFooter() {
  const renderFooter = document.querySelector("footer");
  const footer = `
    <div class="footer">
        <div class="footer-container">
            <div class="footer-section footer-about">
                <div class="footer-logo">
                    <h2>Siêu thị nội thất EGA</h2>
                    <p>Thương hiệu nội thất uy tín và chất lượng, cam kết mang đến những trải nghiệm mua sắm tiện lợi, hiện đại và phong phú</p>
                </div>
                <div class="footer-contact">
                    <p>Mã số thuế: 12345678999</p>
                    <p><i class="bi bi-geo-alt-fill"></i>  Địa chỉ:  TP.HCM</p>
                    <p><i class="bi bi-phone"></i> Số điện thoại: 19006750</p>
                    <p><i class="bi bi-envelope"></i> Email: support@ega.vn</p>
                </div>
            </div>
            
            <div class="footer-section">
                <h3>HỖ TRỢ KHÁCH HÀNG</h3>
                <ul class="footer-links">
                    <li><a href="#">Giới thiệu</a></li>
                    <li><a href="#">Thông tin liên hệ</a></li>
                    <li><a href="#">Tìm cửa hàng</a></li>
                    <li><a href="#">Tư vấn nội thất theo phong thủy</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>CHÍNH SÁCH</h3>
                <ul class="footer-links">
                    <li><a href="#">Điều khoản dịch vụ</a></li>
                    <li><a href="#">Chính sách bảo mật</a></li>
                    <li><a href="#">Chính sách đối tác</a></li>
                    <li><a href="#">Chính sách giao hàng</a></li>
                    <li><a href="#">Chương trình cộng tác viên</a></li>
                </ul>
            </div>
            
            <div class="footer-section newsletter">
                <h3>ĐĂNG KÝ NHẬN TIN</h3>
                <p>Bạn muốn nhận khuyến mãi đặc biệt? Đăng ký ngay.</p>
                <div class="email-subscription">
                    <form class="subscription-form">
                      <div class="input-group">
                        <input 
                          type="email" 
                          class="form-input" 
                          placeholder="Nhập địa chỉ email"
                          required
                        >
                        <button type="submit" class="submit-btn">
                          Đăng ký
                        </button>
                      </div>
                    </form>
                  </div>                          
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>Bản quyền thuộc về EGA | Cung cấp bởi ESHOP</p>
        </div>
    </div>
  `;

  renderFooter.innerHTML = footer;
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
});
