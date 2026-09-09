let timeLeft = 24 * 60 * 60;
function updateCountdown() {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  document.getElementById("countdown").textContent = `${String(hours).padStart(
    2,
    "0"
  )} : ${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(
    2,
    "0"
  )}`;
  if (timeLeft <= 0) {
    clearInterval(timer);
    document.getElementById("countdown").textContent = "Hết thời gian!";
  } else {
    timeLeft--;
  }
}
const timer = setInterval(updateCountdown, 1000);
function renderAllProducts() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  Object.values(products)
    .flat()
    .forEach((product) => addProductToList(product));
  document.getElementById("discountProducts").classList.remove("hidden");
}

DataProducts = [
  {
    img: "../IMAGE/sales/1.jpg",
    title: "Sofa băng phòng khách truyền thống QP115",
    price: "31.200.000₫",
    ogPrice: "62.400.000₫",
    sale: "-50%",
    modalId: "productModal-1",
  },
  {
    img: "../IMAGE/sales/2.jpg",
    title: "Sofa băng bọc vải phong cách Scandinavian",
    price: "33.750.000₫",
    ogPrice: "67.500.000₫",
    sale: "-50%",
    modalId: "productModal-2",
  },
  {
    img: "../IMAGE/sales/3.jpg",
    title: "Sofa băng bọc vải siêu rộng Lewis Extra QP243",
    price: "31.200.000₫",
    ogPrice: "62.400.000₫",
    sale: "-50%",
    modalId: "productModal-3",
  },
  {
    img: "../IMAGE/sales/4.jpg",
    title: "Sofa băng phòng khách truyền thống QP113",
    price: "31.200.000₫",
    ogPrice: "62.400.000₫",
    sale: "-50%",
    modalId: "productModal-4",
  },
  {
    img: "../IMAGE/sales/5.jpg",
    title: "Sofa băng bọc vải phong cách Mid-Century",
    price: "22.280.000₫",
    ogPrice: "44.560.000₫",
    sale: "-50%",
    modalId: "productModal-5",
  },
  {
    img: "../IMAGE/sales/6.jpg",
    title: "Sofa băng bọc vải Michael QP201",
    price: "12.400.000₫",
    ogPrice: "24.800.000₫",
    sale: "-50%",
    modalId: "productModal-6",
  },
  {
    img: "../IMAGE/sales/7.jpg",
    title: "Ghế sofa The Sky 222",
    price: "31.200.000₫",
    ogPrice: "62.400.000₫",
    sale: "-50%",
    modalId: "productModal-7",
  },
  {
    img: "../IMAGE/sales/8.jpg",
    title: "Bộ sofa da 3 băng góc phải QP220",
    price: "14.250.000₫",
    ogPrice: "28.500.000₫",
    sale: "-50%",
    modalId: "productModal-8",
  },
  {
    img: "../IMAGE/sales/9.jpg",
    title: "Bộ sofa da 2 băng góc phải",
    price: "24.100.000₫",
    ogPrice: "48.200.000₫",
    sale: "-50%",
    modalId: "productModal-9",
  },
  {
    img: "../IMAGE/sales/10.jpg",
    title: "Ghế sofa cao cấp Shade",
    price: "21.000.000₫",
    ogPrice: "42.000.000₫",
    sale: "-50%",
    modalId: "productModal-10",
  },
  {
    img: "../IMAGE/sales/11.jpg",
    title: "Ghế đơn sofa gỗ tràm tự nhiên Kolding 701",
    price: "1.395.000₫",
    ogPrice: "2.790.000₫",
    sale: "-50%",
    modalId: "productModal-11",
  },
  {
    img: "../IMAGE/sales/12.jpg",
    title: "Ghế đơn sofa gỗ cao su tự nhiên FYN 601",
    price: "1.145.000₫",
    ogPrice: "2.290.000₫",
    sale: "-50%",
    modalId: "productModal-12",
  },
];

