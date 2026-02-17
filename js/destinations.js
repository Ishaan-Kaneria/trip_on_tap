import { tours } from "./data.js";

export function loadDestinations() {

  const container = document.getElementById("tourContainer");
  const searchInput = document.getElementById("searchInput");
  const sortPrice = document.getElementById("sortPrice");

  if (!container) return;

  let filteredTours = [...tours];
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  function renderTours(list) {

    if (list.length === 0) {
      container.innerHTML = `
        <p style="color:#ffa500; font-size:18px;">
          😈 No destinations found...
        </p>`;
      return;
    }

    container.innerHTML = list.map(tour => `
      <div class="card">
        <img src="${tour.image}" alt="${tour.name}">
        <h3>${tour.name}</h3>
        <p>${tour.description}</p>
        <p class="price">$${tour.price}</p>

        <button class="btn explore-btn" data-id="${tour.id}">
          Explore
        </button>

        <span class="heart ${wishlist.includes(tour.id) ? 'active' : ''}"
              data-id="${tour.id}">❤️</span>
      </div>
    `).join("");

    attachEvents();
  }

  function attachEvents() {

    // Explore
    document.querySelectorAll(".explore-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        localStorage.setItem("selectedTourId", btn.dataset.id);
        window.location.href = "./tourDetails.html";
      });
    });

    // ❤️ Wishlist (Event Delegation style)
    document.querySelectorAll(".heart").forEach(heart => {
      heart.addEventListener("click", () => {
        const id = Number(heart.dataset.id);

        if (wishlist.includes(id)) {
          wishlist = wishlist.filter(t => t !== id);
        } else {
          wishlist.push(id);
        }

        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        renderTours(filteredTours);
      });
    });
  }

  renderTours(filteredTours);

  // Search
  searchInput?.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    filteredTours = tours.filter(t =>
      t.name.toLowerCase().includes(value)
    );
    renderTours(filteredTours);
  });

  // Sort
  sortPrice?.addEventListener("change", () => {
    if (sortPrice.value === "low") {
      filteredTours.sort((a, b) => a.price - b.price);
    }
    renderTours(filteredTours);
  });
}