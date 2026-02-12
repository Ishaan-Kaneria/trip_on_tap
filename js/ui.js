// ui.js

import { saveToStorage, getFromStorage } from "./storage.js";

export function renderTours(tours, container) {
    container.innerHTML = tours.map(tour => `
        <div class="card" data-id="${tour.id}">
            <img src="${tour.image}" alt="${tour.destination}">
            <h3>${tour.destination}</h3>
            <p>${tour.description}</p>
            <p class="price">₹${tour.price}</p>

            <button class="view-btn">View Details</button>
            <button class="wishlist-btn">❤️</button>
        </div>
    `).join("");
}

export function setupWishlist(container) {
    container.addEventListener("click", function(e) {

        if (e.target.classList.contains("wishlist-btn")) {
            const card = e.target.closest(".card");
            const id = card.dataset.id;

            let wishlist = getFromStorage("wishlist");

            if (wishlist.includes(id)) {
                wishlist = wishlist.filter(item => item !== id);
            } else {
                wishlist.push(id);
            }

            saveToStorage("wishlist", wishlist);
            alert("Wishlist updated");
        }
    });
}