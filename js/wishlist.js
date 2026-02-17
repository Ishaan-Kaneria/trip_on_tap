import { tours } from './js/data.js';

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("wishlistContainer");
    const wishlistIds = JSON.parse(localStorage.getItem("wishlist")) || [];

    const favoriteTours = tours.filter(t => wishlistIds.includes(t.id));

    if (favoriteTours.length === 0) {
        container.innerHTML = "<p>Your wishlist is empty. Go add some adventures!</p>";
        return;
    }

    container.innerHTML = favoriteTours.map(tour => `
        <div class="card">
            <img src="${tour.image}" alt="${tour.name}">
            <h3>${tour.name}</h3>
            <button class="btn" onclick="removeFromWishlist(${tour.id})">Remove</button>
        </div>
    `).join('');
});

// Global function for removal
window.removeFromWishlist = (id) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter(item => item !== id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    location.reload();
};