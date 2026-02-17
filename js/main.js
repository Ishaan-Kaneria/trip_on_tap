import { tours, planTypes } from './data.js';
import { loadDestinations } from './destinations.js';

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    window.updateWishlistCount();

    if (path.includes("index.html") || path === "/" || path.endsWith("/")) {
        renderHomeTours();
    } else if (path.includes("destinations.html")) {
        loadDestinations();
    } else if (path.includes("packages.html")) {
        initBookingForm();
    } else if (path.includes("wishlist.html")) {
        renderWishlistPage();
    } else if (path.includes("tourDetails.html")) {
        renderDetailsPage();
    }
});

// Updates the (0) in nav bar instantly
window.updateWishlistCount = function() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const countEl = document.getElementById("wishlistCount");
    if (countEl) countEl.innerText = `(${wishlist.length})`;
}

function renderHomeTours() {
    const container = document.getElementById("homeTourContainer");
    if (!container) return;
    container.innerHTML = tours.slice(0, 3).map(tour => `
        <div class="card">
            <img src="${tour.image}" alt="${tour.name}">
            <div class="card-body">
                <h3>${tour.name}</h3>
                <p class="price">$${tour.price}</p>
                <a href="destinations.html" class="btn">Explore More</a>
            </div>
        </div>
    `).join('');
}

function initBookingForm() {
    const form = document.getElementById("bookingForm");
    const destSelect = document.getElementById("destinationSelect");
    const planSelect = document.getElementById("planSelect");
    const totalDisplay = document.getElementById("totalPriceDisplay");
    if (!form) return;

    // Populate Menus
    destSelect.innerHTML += tours.map(t => `<option value="${t.id}">${t.name} ($${t.price})</option>`).join('');
    planSelect.innerHTML += planTypes.map(p => `<option value="${p.multiplier}">${p.name} (x${p.multiplier})</option>`).join('');

    // AUTO-SELECT LOGIC: If redirected from Details page
    const autoId = localStorage.getItem("selectedTourId");
    if (autoId) {
        destSelect.value = autoId;
    }

    // Live Price Calculation Logic
    const calculateTotal = () => {
        const selectedTour = tours.find(t => t.id == destSelect.value);
        const multiplier = parseFloat(planSelect.value);
        if (selectedTour && multiplier) {
            const total = selectedTour.price * multiplier;
            totalDisplay.innerText = `Total Price: $${total.toFixed(2)}`;
        } else {
            totalDisplay.innerText = "";
        }
    };

    destSelect.onchange = calculateTotal;
    planSelect.onchange = calculateTotal;
    if(autoId) calculateTotal(); // Run once if auto-selected

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const status = document.getElementById("status");
        const date = new Date(document.getElementById("travelDate").value);

        if (date <= new Date()) {
            status.innerText = "❌ Choose a future date!";
            status.style.color = "red";
            return;
        }

        status.innerText = "✅ Booking Confirmed!";
        status.style.color = "#ff7b00";
        form.reset();
        totalDisplay.innerText = "";
    });
}

function renderDetailsPage() {
    const container = document.getElementById("tourDetails");
    const id = localStorage.getItem("selectedTourId");
    const tour = tours.find(t => t.id == id);
    if (!tour) return;

    container.innerHTML = `
        <div class="details-wrapper">
            <img src="${tour.image}" alt="${tour.name}">
            <div class="details-info">
                <h1>${tour.name}</h1>
                <p>${tour.description}</p>
                <h2 class="price">Base Price: $${tour.price}</h2>
                <a href="packages.html" class="btn">Book This Trip</a>
            </div>
        </div>
    `;
}

function renderWishlistPage() {
    const container = document.getElementById("wishlistContainer");
    const wishlistIds = JSON.parse(localStorage.getItem("wishlist")) || [];
    const favs = tours.filter(t => wishlistIds.includes(t.id));

    if (favs.length === 0) {
        container.innerHTML = "<p style='text-align:center; grid-column:1/-1;'>Your wishlist is empty.</p>";
        return;
    }

    container.innerHTML = favs.map(tour => `
        <div class="card">
            <img src="${tour.image}" alt="${tour.name}">
            <div class="card-body">
                <h3>${tour.name}</h3>
                <button class="btn" onclick="removeItem(${tour.id})">Remove</button>
            </div>
        </div>
    `).join('');
}

window.removeItem = (id) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter(item => item !== id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    location.reload();
};