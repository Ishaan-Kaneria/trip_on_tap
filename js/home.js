import { tours } from "./data.js";

export function loadHomeTours() {

  const container = document.getElementById("homeTourContainer");
  if (!container) return;

  // Show only first 3 tours on homepage
  const popularTours = tours.slice(0, 3);

  container.innerHTML = popularTours.map(tour => `
    <div class="card">
      <img src="${tour.image}" alt="${tour.name}">
      <h3>${tour.name}</h3>
      <p>${tour.description}</p>
      <p class="price">$${tour.price}</p>

      <button class="btn" data-id="${tour.id}">
        View Details
      </button>
    </div>
  `).join("");

  // Navigation to tour details
  container.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {
      localStorage.setItem("selectedTourId", btn.dataset.id);
      window.location.href = "./tourDetails.html";
    });
  });
}