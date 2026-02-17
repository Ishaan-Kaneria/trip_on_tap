import { tours, planTypes } from './data.js';
import { loadDestinations } from './destinations.js';

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    
    // Always update counter on every page load
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

// Updates the navigation counter instantly
window.updateWishlistCount = function() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const countEl = document.getElementById("wishlistCount");
    if (countEl) countEl.innerText = `(${wishlist.length})`;
}

// 🏠 Index Page: Render Featured 3
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

// 📋 Packages Page: Form Logic & Multiplier
function initBookingForm() {
    const form = document.getElementById("bookingForm");
    const destSelect = document.getElementById("destinationSelect");
    const planSelect = document.getElementById("planSelect");
    const totalDisplay = document.getElementById("totalPriceDisplay");
    
    if (!form) return;

    // Populate selects
    destSelect.innerHTML += tours.map(t => `<option value="${t.id}">${t.name} ($${t.price})</option>`).join('');
    planSelect.innerHTML += planTypes.map(p => `<option value="${p.multiplier}">${p.name}</option>`).join('');

    // Auto-select if coming from "Details"
    const autoId = localStorage.getItem("selectedTourId");
    if (autoId) destSelect.value = autoId;

    const calculateTotal = () => {
        const tour = tours.find(t => t.id == destSelect.value);
        const mult = parseFloat(planSelect.value);
        if (tour && mult) {
            totalDisplay.innerHTML = `Estimated Total: $${(tour.price * mult).toLocaleString()}`;
        } else {
            totalDisplay.innerHTML = "";
        }
    };

    destSelect.addEventListener("change", calculateTotal);
    planSelect.addEventListener("change", calculateTotal);
    if(autoId) calculateTotal();

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        document.getElementById("status").innerHTML = "✅ Booking Confirmed! We will email you shortly.";
        form.reset();
        totalDisplay.innerHTML = "";
    });
}

// 🔍 Details Page: Dynamic Injection
function renderDetailsPage() {
    const container = document.getElementById("tourDetails");
    const id = localStorage.getItem("selectedTourId");
    const tour = tours.find(t => t.id == id);
    if (!tour || !container) return;

    container.innerHTML = `
        <div class="details-wrapper">
            <img src="${tour.image}" alt="${tour.name}">
            <div class="details-info">
                <h1>${tour.name}</h1>
                <p>${tour.description}</p>
                <h2 class="price">Base Price: $${tour.price}</h2>
                <a href="packages.html" class="btn">Proceed to Booking</a>
            </div>
        </div>
    `;
}

// ❤️ Wishlist Page: Rendering & Removal
function renderWishlistPage() {
    const container = document.getElementById("wishlistContainer");
    const wishlistIds = JSON.parse(localStorage.getItem("wishlist")) || [];
    const favorites = tours.filter(t => wishlistIds.includes(t.id));

    if (!container) return;
    if (favorites.length === 0) {
        container.innerHTML = `<p class="no-results">Your wishlist is currently empty.</p>`;
        return;
    }

    container.innerHTML = favorites.map(tour => `
        <div class="card">
            <img src="${tour.image}" alt="${tour.name}">
            <div class="card-body">
                <h3>${tour.name}</h3>
                <button class="btn" onclick="removeFromWishlist(${tour.id})">Remove</button>
            </div>
        </div>
    `).join('');
}

window.removeFromWishlist = (id) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter(item => item !== id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    location.reload();
};