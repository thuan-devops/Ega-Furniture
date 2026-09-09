const tinTucData = [
  {
    link: "../HTML/bai-viet/bi-quyet-chon-ghe-ngoi-ban-an-dep-ben-khong-loi-thoi.html",
    img: "../IMAGE/goc-cam-hung/chon-ghe-ngoi-ban-an-dep-00.jpg",
    alt: "chon-ghe-ngoi-ban-an-dep-00",
    title: "Bí quyết chọn ghế ngồi bàn ăn đẹp, bền, không lỗi thời",
    desc: "Bàn ăn là trái tim của ngôi nhà, nơi sum họp gia đình sau một ngày dài, nơi chia sẻ...",
  },
  {
    link: "../HTML/bai-viet/xu-huong-bep-hien-dai-ngoai-tien-nghi-thi-con-gi-nua.html",
    img: "../IMAGE/goc-cam-hung/xu-huong-bep-hien-dai-00.jpg",
    alt: "xu-huong-bep-hien-dai",
    title: "Xu hướng bếp hiện đại: Ngoài tiện nghi thì còn gì nữa?",
    desc: "Phòng bếp hiện đại không chỉ là nơi nấu nướng mà còn là không gian sinh hoạt...",
  },
  {
    link: "../HTML/bai-viet/3-tac-pham-cho-khong-gian-trien-lam-tai-gia-tu-wendelbo.html",
    img: "../IMAGE/goc-cam-hung/3-tac-pham-Wendelbo-00.jpg",
    alt: "3-tac-pham-Wendelbo-00",
    title: "3 Tác phẩm cho không gian triển lãm tại gia từ Wendelbo",
    desc: "Nội thất Wendelbo nổi bật với thiết kế tối giản nhưng đầy nghệ thuật...",
  },
  {
    link: "../HTML/bai-viet/101-thiet-bi-nha-bep-thong-minh-dang-mua-nhat-hien-nay.html",
    img: "../IMAGE/goc-cam-hung/thiet-bi-nha-bep-thong-minh-00.jpg",
    alt: "thiet-bi-nha-bep-thong-minh",
    title: "Thiết bị nhà bếp thông minh đáng mua nhất hiện nay",
    desc: "Tối ưu hoá trải nghiệm nấu nướng với những thiết bị nhà bếp công nghệ mới...",
  },
  {
    link: "../HTML/bai-viet/5-sai-lam-trang-tri-noi-that-khien-nha-ban-mat-diem-ngay.html",
    img: "../IMAGE/goc-cam-hung/5-sai-lam-trang-tri-noi-that-00.jpg",
    alt: "5-sai-lam-trang-tri-noi-that-00",
    title: "5 sai lầm trang trí nội thất khiến nhà bạn mất điểm ngay",
    desc: "Việc trang trí nội thất đóng vai trò then chốt trong việc tạo nên một không gian...",
  },
  {
    link: "../HTML/bai-viet/thiet-ke-khong-gian-song-nho-gon-cung-red5studio.html",
    img: "../IMAGE/goc-cam-hung/khong-gian-song-Red5Studio-00.jpg",
    alt: "khong-gian-song-Red5Studio-00",
    title: "Thiết kế không gian sống nhỏ gọn cùng Red5Studio",
    desc: "Nhà thiết kế Lại Chính Trực, đồng sáng lập Red5Studio, chia sẻ về một vài...",
  },
  {
    link: "../HTML/bai-viet/tu-xi-ga-la-gi-chon-tu-bao-quan-xi-ga-cho-nguoi-moi.html",
    img: "../IMAGE/goc-cam-hung/tui-xi-ga-00.jpg",
    alt: "tui-xi-ga-00",
    title: "Tủ Xì Gà là gì? Cách chọn tủ bảo quản Xì Gà cho người mới",
    desc: "Thưởng thức xì gà đã vượt xa khỏi phạm vi một sở thích đơn thuần, trở thành một...",
  },
  {
    link: "../HTML/bai-viet/thiet-ke-van-phong-mo-khong-the-thieu-phu-kien-nay.html",
    img: "../IMAGE/goc-cam-hung/thiet-ke-van-phong-mo-phong-00.jpg",
    alt: "thiet-ke-van-phong-mo-phong-00",
    title: "Thiết kế văn phòng mở không thể thiếu phụ kiện này",
    desc: "Thiết kế văn phòng mở đang ngày càng trở nên phổ biến nhờ khả năng thúc đẩy...",
  },
];


const perPage = 4;
let currentPage = 1;
let currentData = tinTucData;

const tags = ["bếp", "nội thất", "thiết kế", "xì gà", "ghế", "triển lãm"];

function renderTinTuc(page) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const slicedData = currentData.slice(start, end);

  const container = document.getElementById("tinTucList");
  container.innerHTML = "";

  slicedData.forEach((item) => {
    const html = `
      <div class="col-12 ms-3">
        <div class="d-flex" style="width: 100%;">
          <img src="${item.img}" alt="${item.alt}" 
               style="width: 250px; height: 150px; aspect-ratio: 16/9; margin-left:16px; object-fit: cover;">
          <div class="ms-3" style="max-width: 600px;">
            <a href="${item.link}" class="text-decoration-none text-dark">
              <h5 class="pt-1 fw-bold">${item.title}</h5>
            </a>
            <small class="d-block mb-2">${item.desc}</small>
            <a href="${item.link}" class="text-primary mt-2 d-inline-block"><u>Đọc tiếp</u></a>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += html;
  });
}

function renderPagination() {
  const pageCount = Math.ceil(currentData.length / perPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  pagination.innerHTML += `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <button class="page-link" onclick="changePage(1)">«</button>
    </li>
  `;

  pagination.innerHTML += `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <button class="page-link" onclick="changePage(${currentPage - 1})">‹</button>
    </li>
  `;

  const pageCountLimited = Math.ceil(currentData.length / perPage);
  for (let i = 1; i <= pageCountLimited; i++) {
    const active = i === currentPage ? "active" : "";
    pagination.innerHTML += `
      <li class="page-item ${active}">
        <button class="page-link" onclick="changePage(${i})">${i}</button>
      </li>
    `;
  }

  pagination.innerHTML += `
    <li class="page-item ${currentPage === pageCountLimited ? "disabled" : ""}">
      <button class="page-link" onclick="changePage(${currentPage + 1})">›</button>
    </li>
  `;

  pagination.innerHTML += `
    <li class="page-item ${currentPage === pageCountLimited ? "disabled" : ""}">
      <button class="page-link" onclick="changePage(${pageCountLimited})">»</button>
    </li>
  `;
}

function changePage(page) {
  currentPage = page;
  renderTinTuc(currentPage);
  renderPagination();
}

function renderTags() {
  const tagContainer = document.getElementById("tag-container");
  tagContainer.innerHTML = "";

  tags.forEach((tag) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-secondary btn-sm me-2 mb-2";
    btn.textContent = tag;
    btn.onclick = () => {
      filterByTag(tag);
      highlightActiveTag(tag);
    };
    tagContainer.appendChild(btn);
  });

  const resetBtn = document.createElement("button");
  resetBtn.className = "btn btn-outline-danger btn-sm mb-2";
  resetBtn.textContent = "Tất cả";
  resetBtn.onclick = () => {
    currentData = tinTucData;
    currentPage = 1;
    renderTinTuc(currentPage);
    renderPagination();
    highlightActiveTag(null);
  };
  tagContainer.appendChild(resetBtn);
}

function filterByTag(tag) {
  const keyword = tag.toLowerCase();
  currentData = tinTucData.filter(item =>
    item.title.toLowerCase().includes(keyword) ||
    item.desc.toLowerCase().includes(keyword)
  );
  currentPage = 1;
  renderTinTuc(currentPage);
  renderPagination();
}

function highlightActiveTag(selectedTag) {
  const buttons = document.querySelectorAll("#tag-container button");
  buttons.forEach(btn => {
    if (btn.textContent === selectedTag) {
      btn.classList.remove("btn-outline-secondary");
      btn.classList.add("btn-primary");
    } else if (btn.textContent === "Tất cả" && !selectedTag) {
      btn.classList.remove("btn-outline-danger");
      btn.classList.add("btn-danger");
    } else {
      btn.classList.remove("btn-primary", "btn-danger");
      if (btn.textContent === "Tất cả") {
        btn.classList.add("btn-outline-danger");
      } else {
        btn.classList.add("btn-outline-secondary");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTags();
  renderTinTuc(currentPage);
  renderPagination();
});
