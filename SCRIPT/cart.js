DataProducts = [
  {
    img: "../IMAGE/cart/1.jpg",
    title: "Sofa băng phòng khách truyền thống QP115",
    price: "31.200.000₫",
    ogPrice: "62.400.000₫",
    sale: "-50%",
    modalId: "productModal-1",
  },
  {
    img: "../IMAGE/cart/2.jpg",
    title: "Đèn tường Teve",
    price: "5.800.000₫",
    ogPrice: "8.900.000₫",
    sale: "-35%",
    modalId: "productModal-2",
  },
  {
    img: "../IMAGE/cart/3.jpg",
    title: "Đèn tường studio",
    price: "5.800.000₫",
    ogPrice: "8.900.000₫",
    sale: "-35%",
    modalId: "productModal-3",
  },
  //   {
  //     img: "../IMAGE/cart/4.jpg",
  //     title: "Đèn tường Wally",
  //     price: "5.500.000₫",
  //     ogPrice: "8.900.000₫",
  //     sale: "-39%",
  //     modalId: "productModal-4",
  //   },
  //   {
  //     img: "../IMAGE/cart/5.jpg",
  //     title: "Mochi Pouffe / Nhiều màu",
  //     price: "7.290.000₫",
  //     ogPrice: "8.300.000₫",
  //     sale: "-13%",
  //     modalId: "productModal-5",
  //   },
];

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

  function savePurchaseHistory(cart, total, customer, paymentMethod, cashReceived, changeAmount) {
     const history = JSON.parse(localStorage.getItem("egaPurchaseHistory") || "[]");
     history.unshift({
       id: `EGA-${Date.now()}`,
       customer: customer.hoTen || "Khách hàng",
       email: customer.email || "",
       paymentMethod,
      cashReceived: cashReceived || null,
      changeAmount: changeAmount || 0,
       items: cart,
       total,
       createdAt: new Date().toISOString(),
     });
     localStorage.setItem("egaPurchaseHistory", JSON.stringify(history));
   }

   function formatCurrency(amount) {
     return new Intl.NumberFormat("vi-VN", {
       style: "currency",
       currency: "VND",
       maximumFractionDigits: 0,
     }).format(amount);
   }

   function updateCartBadge() {
     const badge = document.querySelector(".nav-link[aria-label='Giỏ hàng'] .badge") || document.querySelector(".badge.rounded-pill.bg-danger");
     if (!badge) return;

     const cart = getCart();
     const totalItems = cart.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
     badge.textContent = totalItems;
     badge.style.display = totalItems > 0 ? "inline-flex" : "none";
   }

   function renderCartPage() {
     const cart = getCart();
     const cartContainer = document.querySelector(".cart-item-container");

     if (!cartContainer) return;

     if (!cart.length) {
       cartContainer.innerHTML = `
         <img src="../IMAGE/cart/cart_empty_background.png" alt="" />
         <div class="cart-empty-text">Giỏ hàng của bạn đang trống</div>
         <a href="../HTML/home.html" class="btn btn-primary mt-3">Tiếp tục mua sắm</a>
       `;
       return;
     }

     const total = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0);

     cartContainer.innerHTML = `
       <div class="cart-table w-100">
         <div class="cart-header d-none d-md-flex">
           <span class="col-product">Sản phẩm</span>
           <span class="col-price">Đơn giá</span>
           <span class="col-quantity">Số lượng</span>
           <span class="col-total">Thành tiền</span>
         </div>
         ${cart
           .map(
             (item, index) => `
               <div class="cart-row">
                 <div class="cart-product">
                   <img src="${item.img}" alt="${item.title}" />
                   <div>
                     <div class="cart-item-name">${item.title}</div>
                     <button class="btn-remove-item" data-index="${index}">Xóa</button>
                   </div>
                 </div>
                 <div class="cart-price">${formatCurrency(Number(item.price || 0))}</div>
                 <div class="cart-quantity">
                   <button class="qty-btn" data-action="decrease" data-index="${index}">-</button>
                   <span>${item.quantity || 1}</span>
                   <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
                 </div>
                 <div class="cart-line-total">${formatCurrency((Number(item.price || 0) * Number(item.quantity || 1)))}</div>
               </div>
             `
           )
           .join("")}
       </div>

       <div class="checkout-box">
         <div class="checkout-summary">
           <div class="summary-row">
             <span>Tạm tính</span>
             <strong>${formatCurrency(total)}</strong>
           </div>
           <div class="summary-row">
             <span>Phí vận chuyển</span>
             <strong>Miễn phí</strong>
           </div>
           <div class="summary-row total-row">
             <span>Tổng cộng</span>
             <strong>${formatCurrency(total)}</strong>
           </div>
         </div>
         <button class="btn btn-checkout" id="checkoutBtn">Thanh toán</button>
         <button class="btn btn-outline-secondary mt-2 w-100" id="continueShoppingBtn">Tiếp tục mua sắm</button>
       </div>

       <div class="modal fade" id="paymentModal" tabindex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered">
           <div class="modal-content payment-modal-content">
             <div class="modal-header">
               <h5 class="modal-title" id="paymentModalLabel">Xác nhận thanh toán</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
             </div>
             <form id="paymentForm">
               <div class="modal-body">
                 <div class="payment-total">Tổng tiền: <strong>${formatCurrency(total)}</strong></div>
                 <label class="payment-option">
                   <input type="radio" name="paymentMethod" value="cash" checked />
                   <span><strong>Tiền mặt khi nhận hàng</strong><small>Nhập số tiền khách đưa để tính tiền thối.</small></span>
                 </label>
                 <label class="payment-option">
                   <input type="radio" name="paymentMethod" value="transfer" />
                   <span><strong>Chuyển khoản ngân hàng</strong><small>Thanh toán đúng số tiền đơn hàng.</small></span>
                 </label>
                 <div id="cashPaymentFields" class="cash-payment-fields">
                   <label for="cashReceived" class="form-label">Tiền khách đưa</label>
                   <input id="cashReceived" class="form-control" type="number" min="${total}" step="1000" placeholder="Nhập số tiền khách đưa" />
                   <div id="paymentError" class="payment-error" role="alert"></div>
                   <div id="changeAmount" class="change-amount"></div>
                 </div>
               </div>
               <div class="modal-footer">
                 <button type="button" class="btn btn-light" data-bs-dismiss="modal">Hủy</button>
                 <button type="submit" class="btn btn-checkout">Xác nhận đặt hàng</button>
               </div>
             </form>
           </div>
         </div>
       </div>
     `;

     document.getElementById("checkoutBtn")?.addEventListener("click", function () {
       const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
       if (!loggedInUser) {
         alert("Bạn cần đăng nhập trước khi thanh toán.");
         window.location.href = "../HTML/dangnhap.html";
         return;
       }

       bootstrap.Modal.getOrCreateInstance(document.getElementById("paymentModal")).show();
     });

     const paymentForm = document.getElementById("paymentForm");
     const cashFields = document.getElementById("cashPaymentFields");
     const cashInput = document.getElementById("cashReceived");
     const paymentError = document.getElementById("paymentError");
     const changeAmount = document.getElementById("changeAmount");

     document.querySelectorAll("input[name='paymentMethod']").forEach((input) => {
       input.addEventListener("change", function () {
         const isCash = this.value === "cash";
         cashFields.style.display = isCash ? "block" : "none";
         paymentError.textContent = "";
         changeAmount.textContent = "";
       });
     });

     cashInput?.addEventListener("input", function () {
       const cashReceived = Number(this.value);
       paymentError.textContent = "";
       changeAmount.textContent = "";
       if (!cashReceived) return;
       if (cashReceived < total) {
         paymentError.textContent = `Khách đưa thiếu ${formatCurrency(total - cashReceived)}.`;
         return;
       }
       changeAmount.textContent = `Tiền thối lại: ${formatCurrency(cashReceived - total)}`;
     });

     paymentForm?.addEventListener("submit", function (event) {
       event.preventDefault();
       const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
       if (!loggedInUser) {
         alert("Bạn cần đăng nhập trước khi đặt hàng.");
         window.location.href = "../HTML/dangnhap.html";
         return;
       }

       const method = document.querySelector("input[name='paymentMethod']:checked").value;
       const isCash = method === "cash";
       const cashReceived = isCash ? Number(cashInput.value) : total;

       if (isCash && !cashInput.value) {
         paymentError.textContent = "Vui lòng nhập số tiền khách đưa.";
         cashInput.focus();
         return;
       }

       if (isCash && cashReceived < total) {
         paymentError.textContent = `Khách đưa thiếu ${formatCurrency(total - cashReceived)}.`;
         cashInput.focus();
         return;
       }

       const paymentMethod = isCash ? "Tiền mặt khi nhận hàng" : "Chuyển khoản ngân hàng";
       const changeAmountValue = isCash ? cashReceived - total : 0;
       savePurchaseHistory(cart, total, loggedInUser, paymentMethod, cashReceived, changeAmountValue);
       bootstrap.Modal.getInstance(document.getElementById("paymentModal")).hide();
       alert(isCash && changeAmountValue > 0
         ? `Đặt hàng thành công! Thối lại ${formatCurrency(changeAmountValue)}.`
         : "Đặt hàng thành công! Cảm ơn bạn đã mua hàng.");
       localStorage.removeItem("egaCart");
       renderCartPage();
       updateCartBadge();
     });

     document.getElementById("continueShoppingBtn")?.addEventListener("click", function () {
       window.location.href = "../HTML/home.html";
     });

     document.querySelectorAll(".btn-remove-item").forEach((button) => {
       button.addEventListener("click", function () {
         const index = Number(this.dataset.index);
         const updatedCart = getCart();
         updatedCart.splice(index, 1);
         saveCart(updatedCart);
         renderCartPage();
         updateCartBadge();
       });
     });

     document.querySelectorAll(".qty-btn").forEach((button) => {
       button.addEventListener("click", function () {
         const index = Number(this.dataset.index);
         const action = this.dataset.action;
         const updatedCart = getCart();

         if (action === "increase") {
           updatedCart[index].quantity = (Number(updatedCart[index].quantity) || 1) + 1;
         } else if (action === "decrease") {
           updatedCart[index].quantity = Math.max(1, (Number(updatedCart[index].quantity) || 1) - 1);
         }

         saveCart(updatedCart);
         renderCartPage();
         updateCartBadge();
       });
     });
   }

   document.addEventListener("DOMContentLoaded", function () {
     updateCartBadge();
     renderCartPage();
   });
