function parseVietnameseCurrency(value) {
  const numericValue = Number(String(value || "0").replace(/[^\d]/g, ""));
  return Number.isFinite(numericValue) ? numericValue : 0;
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("egaCart") || "[]");
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("egaCart", JSON.stringify(cart));
}

function updateCartBadge() {
  const badge = document.querySelector(".nav-link[aria-label='Giỏ hàng'] .badge") || document.querySelector(".badge.rounded-pill.bg-danger");
  if (!badge) return;

  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
  badge.textContent = totalItems;
  badge.style.display = totalItems > 0 ? "inline-flex" : "none";
}

function addProductToCart(product) {
  const cart = getCart();
  const productKey = `${product.title}-${product.img}`;
  const existingIndex = cart.findIndex((item) => `${item.title}-${item.img}` === productKey);
  const quantity = Number(product.quantity) || 1;

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      title: product.title,
      img: product.img,
      price: parseVietnameseCurrency(product.price),
      ogPrice: parseVietnameseCurrency(product.ogPrice),
      quantity,
      sale: product.sale || "",
    });
  }

  saveCart(cart);
  updateCartBadge();
  alert(`Đã thêm ${product.title} vào giỏ hàng.`);
}

function renderCard(img, title, price, ogPrice, sale, modalId) {
  const card = `<div class="card">
                    <img src="${img}" class="card-img-top">
                    <div class="action-bar">
                        <div class="button-container">
                            <button type="button" class="btn btn-light btn-custom" data-bs-toggle="modal" data-bs-target="#${modalId}">
                                <i class="fa fa-eye"></i> 
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title" data-bs-toggle="modal" data-bs-target="#${modalId}">${title}</h3>
                        <div class="ratings">
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                        </div>
                        <p class="sale-price">${price}</p>
                        <div class="discount">
                            <span class="original-price">${ogPrice}</span>
                            <span class="badge rounded-pill badge-warning">${sale}</span>
                        </div>
                    </div>
                </div>`;
  return card;
}

function renderModal(img, title, price, ogPrice, sale, modalId) {
  const modal = `
  <div
      class="modal fade"
      id="${modalId}"
      tabindex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body d-flex gap-4">
            <!-- Product Image -->
            <img
              src="${img}"
              width="440px"
              height="300px"
              alt="Sofa"
            />

            <!-- Product Infomation -->
            <div class="flex-grow-1">
              <h4>${title}</h4>
              <p>
                <span class="price-now">${price}</span>
                <span class="price-old">${ogPrice}</span>
                <span class="discount-modal">${sale}</span>
              </p>

              <p><strong>Màu sắc:</strong></p>
              <div>
                <span
                  class="color-circle"
                  style="background-color: #d9bba9"
                ></span>
                <span
                  class="color-circle"
                  style="background-color: #c7d6db"
                ></span>
                <span
                  class="color-circle"
                  style="background-color: #efefef"
                ></span>
                <span
                  class="color-circle"
                  style="background-color: #ce5a5a"
                ></span>
                <span
                  class="color-circle"
                  style="background-color: #3a3a3a"
                ></span>
              </div>

              <hr />
              <p><strong>KHUYẾN MÃI - ƯU ĐÃI</strong></p>
              <ul>
                <li>Miễn phí Ship đơn từ 300.000₫</li>
                <li>Đổi trả 30 ngày nếu lỗi</li>
              </ul>

              <div class="mt-3 d-flex align-items-center gap-2">
                <input
                  type="number"
                  class="form-control"
                  style="width: 80px"
                  value="1"
                  min="1"
                  aria-label="Số lượng sản phẩm"
                />
                <button
                  class="btn btn-success add-to-cart-btn"
                  data-title="${title}"
                  data-img="${img}"
                  data-price="${price}"
                  data-og-price="${ogPrice}"
                  data-sale="${sale}"
                >
                  THÊM VÀO GIỎ
                </button>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  return modal;
}

function renderProducts(products) {
  const containerCard = document.querySelector(".product-card-group");
  let card = "";
  products.forEach((product) => {
    card += renderCard(
      product.img,
      product.title,
      product.price,
      product.ogPrice,
      product.sale,
      product.modalId
    );
  });
  containerCard.innerHTML = card;
}

function renderModals(products) {
  const containerModal = document.querySelector(".modal-group-container");
  let modal = "";
  products.forEach((product) => {
    modal += renderModal(
      product.img,
      product.title,
      product.price,
      product.ogPrice,
      product.sale,
      product.modalId
    );
  });
  containerModal.innerHTML = modal;
}

document.addEventListener("click", function (event) {
  const addButton = event.target.closest(".add-to-cart-btn");
  if (!addButton) return;

  const modal = addButton.closest(".modal");
  const quantityInput = modal ? modal.querySelector("input[type='number']") : null;
  const quantity = quantityInput ? Number(quantityInput.value) || 1 : 1;

  addProductToCart({
    title: addButton.dataset.title,
    img: addButton.dataset.img,
    price: addButton.dataset.price,
    ogPrice: addButton.dataset.ogPrice,
    sale: addButton.dataset.sale,
    quantity,
  });

  if (modal) {
    const modalInstance = bootstrap.Modal.getInstance(modal);
    if (modalInstance) {
      modalInstance.hide();
    }
  }
});

function filterProducts() {
  const selectedPrices = [];
  $(".price-filter input[type='checkbox']:checked").each(function () {
    selectedPrices.push(this.id);
  });

  const filteredProducts = [];
  for (let i = 0; i < DataProducts.length; i++) {
    const product = DataProducts[i];
    const price = parseInt(product.price.replace(/\D/g, ""));
    let match = false;

    if (selectedPrices.includes("price1") && price < 1000000) match = true;
    if (
      selectedPrices.includes("price2") &&
      price >= 1000000 &&
      price <= 2000000
    )
      match = true;
    if (
      selectedPrices.includes("price3") &&
      price > 2000000 &&
      price <= 3000000
    )
      match = true;
    if (
      selectedPrices.includes("price4") &&
      price > 3000000 &&
      price <= 5000000
    )
      match = true;
    if (
      selectedPrices.includes("price5") &&
      price > 5000000 &&
      price <= 7000000
    )
      match = true;
    if (
      selectedPrices.includes("price6") &&
      price > 7000000 &&
      price <= 10000000
    )
      match = true;
    if (selectedPrices.includes("price7") && price > 10000000) match = true;

    if (match || selectedPrices.length === 0) {
      filteredProducts.push(product);
    }
  }

  renderProducts(filteredProducts);
}

function sortProducts(products, sortOption) {
  for (let i = 0; i < products.length - 1; i++) {
    for (let j = i + 1; j < products.length; j++) {
      let swap = false;

      if (sortOption === "name-az" && products[i].title > products[j].title)
        swap = true;
      if (sortOption === "name-za" && products[i].title < products[j].title)
        swap = true;

      const priceI = parseInt(products[i].price.replace(/\D/g, ""));
      const priceJ = parseInt(products[j].price.replace(/\D/g, ""));
      if (sortOption === "price-asc" && priceI > priceJ) swap = true;
      if (sortOption === "price-desc" && priceI < priceJ) swap = true;

      if (swap) {
        const temp = products[i];
        products[i] = products[j];
        products[j] = temp;
      }
    }
  }

  return products;
}

function handleSortChange() {
  const sortOption = $("#sort").val();
  const selectedPrices = [];
  $(".price-filter input[type='checkbox']:checked").each(function () {
    selectedPrices.push(this.id);
  });

  let filteredProducts = [];
  for (let i = 0; i < DataProducts.length; i++) {
    const product = DataProducts[i];
    const price = parseInt(product.price.replace(/\D/g, ""));
    let match = false;

    if (selectedPrices.includes("price1") && price < 1000000) match = true;
    if (
      selectedPrices.includes("price2") &&
      price >= 1000000 &&
      price <= 2000000
    )
      match = true;
    if (
      selectedPrices.includes("price3") &&
      price > 2000000 &&
      price <= 3000000
    )
      match = true;
    if (
      selectedPrices.includes("price4") &&
      price > 3000000 &&
      price <= 5000000
    )
      match = true;
    if (
      selectedPrices.includes("price5") &&
      price > 5000000 &&
      price <= 7000000
    )
      match = true;
    if (
      selectedPrices.includes("price6") &&
      price > 7000000 &&
      price <= 10000000
    )
      match = true;
    if (selectedPrices.includes("price7") && price > 10000000) match = true;

    if (match || selectedPrices.length === 0) {
      filteredProducts.push(product);
    }
  }

  const sortedProducts = sortProducts(filteredProducts, sortOption);
  renderProducts(sortedProducts);
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartBadge();
  renderProducts(DataProducts);
  renderModals(DataProducts);

  const sortDropdown = document.querySelector("#sort");
  sortDropdown.addEventListener("change", handleSortChange);

  const checkboxes = document.querySelectorAll(
    ".price-filter input[type='checkbox']"
  );
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleSortChange);
  });
});

function toggleFilter() {
  const filterContainer = document.querySelector(".filter-detail-container");
  filterContainer.classList.toggle("active");
}
