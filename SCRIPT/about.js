const imageArray = [];
for (let i = 1; i <= 4; i++) {
    imageArray.push(`../IMAGE/about/p${i}.jpg`);
}

let currentImageIndex = 0;
let time;

function startAutoCycle() {
    clearTimeout(time);
    time = setInterval(function () {
        currentImageIndex = (currentImageIndex + 1) % imageArray.length;
        document.getElementById('image-display').src = imageArray[currentImageIndex];
    }, 2000);
}

function loadRandomImage() {
    currentImageIndex = Math.floor(Math.random() * imageArray.length);
    document.getElementById('image-display').src = imageArray[currentImageIndex];
    startAutoCycle();
}

function changeImage(room) {
    let imageUrl;

    if (room === 'p1') {
        imageUrl = '../IMAGE/about/p1.jpg';
    } else if (room === 'p2') {
        imageUrl = '../IMAGE/about/p2.jpg';
    } else if (room === 'p3') {
        imageUrl = '../IMAGE/about/p3.jpg';
    } else if (room === 'p4') {
        imageUrl = '../IMAGE/about/p4.jpg';
    }

    document.getElementById('image-display').src = imageUrl;
    clearTimeout(time);
}

window.onload = loadRandomImage;
