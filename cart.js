document.addEventListener("DOMContentLoaded", () => {
    const cartItemsList = document.getElementById("cartItemsList");
    const subtotalEl = document.getElementById("subtotalPrice");
    const totalEl = document.getElementById("totalPrice");
    
    let cart = JSON.parse(localStorage.getItem('bitesCart')) || [];

    if (cart.length === 0) {
        cartItemsList.innerHTML = "<p>Your cart is empty. Go get some food!</p>";
    } else {
        renderCart();
    }

    function renderCart() {
    cartItemsList.innerHTML = "";
    let subtotal = 0;

    if (cart.length === 0) {
        cartItemsList.innerHTML = "<p class='empty-msg'>Your cart is empty. Go get some food!</p>";
        subtotalEl.innerText = "$0.00";
        totalEl.innerText = "$0.00";
        return;
    }

    cart.forEach((item, index) => {
        const itemPrice = parseFloat(item.price) || 0;
        const itemQty = parseInt(item.quantity) || 1;
        subtotal += itemPrice * itemQty;

        cartItemsList.innerHTML += `
            <div class="cart-item">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="price-display">$${itemPrice.toFixed(2)} x ${itemQty}</p>
                </div>
                
                <div class="qty-controls">
                    <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                    <span class="qty-num">${itemQty}</span>
                    <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                </div>

                <button class="remove-btn" onclick="removeItem(${index})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
    });

    const deliveryFee = 5.00;
    subtotalEl.innerText = `$${subtotal.toFixed(2)}`;
    totalEl.innerText = `$${(subtotal + deliveryFee).toFixed(2)}`;
}

// Function to handle quantity changes
window.changeQty = (index, delta) => {
    cart[index].quantity = Math.max(1, cart[index].quantity + delta);
    localStorage.setItem('bitesCart', JSON.stringify(cart));
    renderCart(); // Re-render instead of reload for a smoother feel
};

// Function to remove items
window.removeItem = (index) => {
    cart.splice(index, 1);
    localStorage.setItem('bitesCart', JSON.stringify(cart));
    renderCart();
};
});

// Get modal elements
const checkoutModal = document.getElementById("checkoutModal");
const checkoutBtn = document.querySelector(".checkout-btn");
const closeCheckout = document.getElementById("closeCheckout");
const deliveryForm = document.getElementById("deliveryForm");

// Open Modal when "Proceed to Checkout" is clicked
checkoutBtn.addEventListener("click", () => {
    const finalTotal = document.getElementById("totalPrice").innerText;
    document.getElementById("modalTotal").innerText = finalTotal;
    
    checkoutModal.style.display = "block";
    document.body.style.overflow = "hidden"; // Freeze background
});

// Close Modal logic
closeCheckout.onclick = () => {
    checkoutModal.style.display = "none";
    document.body.style.overflow = "auto";
};

// Handle Delivery Form Submission
deliveryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Address saved! Redirecting to payment gateway...");
    // Here you would normally redirect to Stripe or PayPal
});

const paymentModal = document.getElementById("paymentModal");
const closePayment = document.getElementById("closePayment");

// When the Delivery Form is submitted
deliveryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Hide delivery modal
    checkoutModal.style.display = "none";
    
    // Show payment modal
    paymentModal.style.display = "block";
});

// Close payment modal
closePayment.onclick = () => {
    paymentModal.style.display = "none";
    document.body.style.overflow = "auto";
};

// Integration Logic (Placeholders)
function payWithRemita() {
    alert("Connecting to Remita Gateway...");
    // You would normally call the Remita JS SDK here
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. Render the actual PayPal button into that empty div
    if (window.paypal) {
        paypal.Buttons({
            createOrder: (data, actions) => {
                const total = document.getElementById("totalPrice").innerText.replace('$', '');
                return actions.order.create({
                    purchase_units: [{ amount: { value: total } }]
                });
            },
            onApprove: (data, actions) => {
                return actions.order.capture().then(details => {
                    alert('Transaction completed by ' + details.payer.name.given_name);
                });
            }
        }).render('#paypal-button-container'); 
    }

    // 2. Make the other divs act like buttons
    const remitaDiv = document.querySelector(".payment-card:nth-child(2)");
    const bankDiv = document.querySelector(".payment-card:nth-child(3)");
    const otherDiv = document.getElementById("openOtherPayments");

    if (remitaDiv) remitaDiv.onclick = () => alert("Connecting to Remita...");
    if (bankDiv) bankDiv.onclick = () => alert("Bank: Bites Bank \nAcc: 1234567890");
    
    // Linking the "Other Methods" to the second popup
    if (otherDiv) {
        otherDiv.onclick = () => {
            document.getElementById("otherPaymentsModal").style.display = "block";
        };
    }
});

const otherModal = document.getElementById("otherPaymentsModal");
const openOtherBtn = document.getElementById("openOtherPayments");
const closeOther = document.getElementById("closeOther");

// Open the "Other Payments" popup
openOtherBtn.onclick = () => {
    otherModal.style.display = "block";
    // We keep paymentModal open in the background for a "layered" look
};

// Close the "Other Payments" popup
closeOther.onclick = () => {
    otherModal.style.display = "none";
};

// Handle clicks outside the modal
window.onclick = (event) => {
    if (event.target == otherModal) {
        otherModal.style.display = "none";
    } else if (event.target == paymentModal) {
        paymentModal.style.display = "none";
        document.body.style.overflow = "auto";
    }
};

function showBankDetails() {
    alert("Bank: Bites Bank\nAccount: 1234567890\nName: Bites Restaurant Ltd.");
}

