// main.js

import { tours } from "./data.js";
import { renderTours, renderTourDetails } from "./ui.js";
import { saveToStorage, getFromStorage } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {

    const tourContainer = document.getElementById("tourContainer");
    const detailContainer = document.getElementById("tourDetail");

    /* =========================
       1️⃣ Render Tours (Homepage / Destinations)
    ========================== */

    if (tourContainer) {
        renderTours(tours, tourContainer);
    }

    /* =========================
       2️⃣ Search Feature
    ========================== */

    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const filtered = tours.filter(tour =>
                tour.destination
                    .toLowerCase()
                    .includes(searchInput.value.toLowerCase())
            );

            renderTours(filtered, tourContainer);
        });
    }

    /* =========================
       3️⃣ Sort by Price
    ========================== */

    const sortSelect = document.getElementById("sortPrice");

    if (sortSelect) {
        sortSelect.addEventListener("change", () => {
            const sorted = [...tours].sort((a, b) => a.price - b.price);
            renderTours(sorted, tourContainer);
        });
    }

    /* =========================
       4️⃣ Event Delegation (View + Wishlist)
    ========================== */

    document.addEventListener("click", (e) => {

        // View Details
        if (e.target.classList.contains("view-btn")) {
            const id = e.target.closest(".card").dataset.id;
            localStorage.setItem("selectedTour", id);
            window.location.href = "details.html";
        }

        // Wishlist Toggle
        if (e.target.classList.contains("wishlist-btn")) {
            const id = e.target.closest(".card").dataset.id;

            let wishlist = getFromStorage("wishlist");

            if (wishlist.includes(id)) {
                wishlist = wishlist.filter(item => item !== id);
            } else {
                wishlist.push(id);
            }

            saveToStorage("wishlist", wishlist);
            alert("Wishlist Updated ❤️");
        }

    });

    /* =========================
       5️⃣ Load Tour Details Page
    ========================== */

    if (detailContainer) {
        const selectedId = localStorage.getItem("selectedTour");

        const selectedTour = tours.find(tour =>
            tour.id == selectedId
        );

        if (selectedTour) {
            renderTourDetails(selectedTour, detailContainer);
        }
    }

    /* =========================
       6️⃣ Booking Form Validation
    ========================== */

    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const date = document.getElementById("travelDate").value;
            const travelers = document.getElementById("travelers").value;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || !email || !date || !travelers) {
                alert("All fields are required.");
                return;
            }

            if (!emailRegex.test(email)) {
                alert("Invalid email format.");
                return;
            }

            const selectedDate = new Date(date);
            const today = new Date();

            if (selectedDate <= today) {
                alert("Travel date must be in the future.");
                return;
            }

            // Save booking
            let bookings = getFromStorage("bookings");

            bookings.push({
                name,
                email,
                date,
                travelers
            });

            saveToStorage("bookings", bookings);

            alert("Booking Successful!");
            bookingForm.reset();
        });
    }

    /* =========================
       7️⃣ Subtle Creepy Click Effect
    ========================== */

    const overlay = document.getElementById("creepy-overlay");
    const sound = document.getElementById("creepy-sound");

    document.addEventListener("click", (e) => {

        if (e.target.tagName === "BUTTON" || e.target.classList.contains("btn")) {

            if (!overlay || !sound) return;

            overlay.style.opacity = "1";
            sound.currentTime = 0;
            sound.play();

            setTimeout(() => {
                overlay.style.opacity = "0";
            }, 500);
        }

    });

});