import { tours } from "./data.js";

export function loadTourDetails() {

  const container = document.getElementById("tourDetails");
  if (!container) return;

  const tourId = parseInt(localStorage.getItem("selectedTourId"));

  if (!tourId) {
    container.innerHTML = "<p>No tour selected.</p>";
    return;
  }

  const tour = tours.find(t => t.id === tourId);

  if (!tour) {
    container.innerHTML = "<p>Tour not found.</p>";
    return;
  }

  container.innerHTML = `
    <div class="card">
      <img src="${tour.image}" alt="${tour.name}">
      <h2>${tour.name}</h2>
      <p>${tour.description}</p>
      <p><strong>Country:</strong> ${tour.country}</p>
      <p><strong>Rating:</strong> ⭐ ${tour.rating}</p>
      <p class="price">$${tour.price}</p>

      <button class="btn" id="bookNowBtn">
        Book This Tour
      </button>
    </div>
  `;

  // Redirect to Packages page with selected tour ID
  document.getElementById("bookNowBtn").addEventListener("click", () => {
    localStorage.setItem("selectedDestination", tour.id);
    window.location.href = "packages.html";
  });
}