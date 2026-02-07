const carousel = document.getElementById('dishCarousel');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// How much to scroll (usually the width of one card + gap)
const scrollAmount = 350; 

nextBtn.addEventListener('click', () => {
    carousel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
});

prevBtn.addEventListener('click', () => {
    carousel.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const dishCards = document.querySelectorAll('.menu-grid .dish-card');

    // Function to filter dishes
    const filterMenu = (target) => {
        dishCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (target === 'all' || category === target) {
                card.style.display = 'flex'; // Show matching
            } else {
                card.style.display = 'none'; // Hide others
            }
        });
    };

    // Initialize with 'special' as default
    filterMenu('special');

    // Click Event Listener
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button styling
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Run the filter
            const target = button.getAttribute('data-target');
            filterMenu(target);
        });
    });
});

const reviewCarousel = document.getElementById('reviewCarousel');
const reviewNext = document.getElementById('reviewNext');
const reviewPrev = document.getElementById('reviewPrev');

// Scroll by the width of one card + the gap
const reviewScrollAmount = 380; 

reviewNext.addEventListener('click', () => {
    reviewCarousel.scrollBy({
        left: reviewScrollAmount,
        behavior: 'smooth'
    });
});

reviewPrev.addEventListener('click', () => {
    reviewCarousel.scrollBy({
        left: -reviewScrollAmount,
        behavior: 'smooth'
    });
});

const chefCarousel = document.getElementById('chefCarousel');
const chefNext = document.getElementById('chefNext');
const chefPrev = document.getElementById('chefPrev');

const chefScrollAmount = 280; // Card width (250) + gap (30)

chefNext.addEventListener('click', () => {
    chefCarousel.scrollBy({
        left: chefScrollAmount,
        behavior: 'smooth'
    });
});

chefPrev.addEventListener('click', () => {
    chefCarousel.scrollBy({
        left: -chefScrollAmount,
        behavior: 'smooth'
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("reservationModal");
    const openBtns = document.querySelectorAll(".reserve-btn, .make-reservation-btn");
    const closeBtn = document.querySelector(".close-btn");

    openBtns.forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // Freeze background
        };
    });

    closeBtn.onclick = () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };

    const reservationForm = document.getElementById("popupReservationForm");

    if (reservationForm) {
        reservationForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevents the page from reloading

            // 1. Show a loading state on the button
            const submitBtn = reservationForm.querySelector(".reserve-btn-main");
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Processing...";
            submitBtn.disabled = true;

            // 2. Simulate a backend delay (e.g., sending to a database)
            setTimeout(() => {
                // 3. Replace the form with a Success Message
                const modalContent = document.querySelector(".modal-content");
                modalContent.innerHTML = `
                    <span class="close-btn">&times;</span>
                    <div class="success-message" style="text-align: center; padding: 40px 0;">
                        <i class="fas fa-check-circle" style="font-size: 50px; color: #f9b233; margin-bottom: 20px;"></i>
                        <h2>Reservation Confirmed!</h2>
                        <p>Thank you for choosing Bites. We've sent a confirmation to your phone.</p>
                        <button onclick="location.reload()" class="reserve-btn-main" style="margin-top: 20px;">Done</button>
                    </div>
                `;
                
                // Re-link the new close button
                const newCloseBtn = modalContent.querySelector(".close-btn");
                newCloseBtn.onclick = () => {
                    document.getElementById("reservationModal").style.display = "none";
                    document.body.style.overflow = "auto";
                };
            }, 2000); // 1.5 second delay for realism
        })
    }

    // Keep this line (Line 157 in your image)
    let cart = JSON.parse(localStorage.getItem('bitesCart')) || [];

    // Remove the "if" and "var" lines. Start the click listener here:
    document.addEventListener("click", function(e) {
        if (e.target && e.target.classList.contains('add-to-cart')) {
            e.preventDefault();
            
            const btn = e.target;
            const name = btn.getAttribute("data-name");
            const price = btn.getAttribute("data-price");

            console.log("Button Clicked:", name, price);

            // Add the item to your existing cart array
            cart.push({ name: name, price: price, quantity: 1 });
            
            // Save to LocalStorage
            localStorage.setItem('bitesCart', JSON.stringify(cart));

            alert(name + " added to cart!");
        }
    });

    function updateCartUI() {
        // This is where we will update the number on your navbar cart icon
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        const cartBadge = document.querySelector(".cart-count-badge"); // Add this class to your navbar icon span
        if (cartBadge) cartBadge.innerText = cartCount;
    }

    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", function() {
            console.log("Add to cart clicked for:", this.getAttribute("data-name"));

            // 1. Add the success class
            this.classList.add("success");
            const originalText = this.innerText;
            this.innerText = "Added! ✓";

            // 2. Remove it after 1 second
            setTimeout(() => {
                this.classList.remove("success");
                this.innerText = originalText;
            }, 1000);
            
            // ... (Keep your existing localStorage logic here)
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search-bar input"); // Ensure your input is inside a class 'search-bar'
    const dishCards = document.querySelectorAll(".dish-card");

    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();

        dishCards.forEach(card => {
            const dishName = card.querySelector("h3").innerText.toLowerCase();
            const dishCategory = card.getAttribute("data-category").toLowerCase();
            const dishDescription = card.querySelector("p").innerText.toLowerCase();

            // Check if the query matches the name, category, or description
            if (dishName.includes(query) || dishCategory.includes(query) || dishDescription.includes(query)) {
                card.style.display = "block";
                card.style.animation = "fadeIn 0.4s ease"; // High-end feel
            } else {
                card.style.display = "none";
            }
        });
        
        // Optional: Hide empty section headers if no dishes match
        toggleEmptySections();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Select your specific ID from the new design
    const searchInput = document.getElementById("searchInput");
    const dishCards = document.querySelectorAll(".dish-card");
    const noResults = document.getElementById("no-results");

    // This handles the real-time filtering as you type
    searchInput.addEventListener("input", function() {
        const query = this.value.toLowerCase().trim();
        let hasMatches = false;

        dishCards.forEach(card => {
            const name = card.querySelector("h3").innerText.toLowerCase();
            const category = card.getAttribute("data-category") ? card.getAttribute("data-category").toLowerCase() : "";

            if (name.includes(query) || category.includes(query)) {
                card.style.display = "block";
                card.style.opacity = "1";
                hasMatches = true;
            } else {
                card.style.display = "none";
                card.style.opacity = "0";
            }
        });

        // Toggle the 'No Results' message we added earlier
        if (noResults) {
            noResults.style.display = (!hasMatches && query !== "") ? "block" : "none";
        }
    });

    // Handle the "Enter" key to jump to the menu section
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            document.getElementById("menu").scrollIntoView({ behavior: 'smooth' });
        }
    });
});

