import { tours } from "./data.js";

export function loadDestinations() {

  const container = document.getElementById("tourContainer");
  if (!container) return;

  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortPrice");

  let filteredTours = [...tours];

function renderTours(data) {
  container.innerHTML = "";

  data.forEach(tour => {
    container.innerHTML += `
      <div class="card">
        <img src="${tour.image}" alt="${tour.name}">
        <h3>${tour.name}</h3>
        <p>${tour.description}</p>
        <p class="price">$${tour.price}</p>
        <p>🌍 ${tour.country}</p>
        <p>⭐ ${tour.rating}</p>
        <button class="btn explore-btn" data-name="${tour.name}">
          Explore
        </button>
      </div>
    `;
  });

  addExploreListeners(); // VERY IMPORTANT
}

  renderTours(filteredTours);

  searchInput.addEventListener("input", () => {
    filteredTours = tours.filter(t =>
      t.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    renderTours(filteredTours);
  });

  sortSelect.addEventListener("change", () => {
    if (sortSelect.value === "low") {
      filteredTours.sort((a, b) => a.price - b.price);
    }
    renderTours(filteredTours);
  });

  function addExploreListeners() {
  document.querySelectorAll(".explore-btn").forEach(button => {
    button.addEventListener("click", () => {
      const destinationName = button.dataset.name;

      // Store selected destination
      localStorage.setItem("selectedDestination", destinationName);

      // Redirect
      window.location.href = "packages.html";
    });
  });
}
}