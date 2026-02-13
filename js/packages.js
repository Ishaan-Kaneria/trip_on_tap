import { tours, plans } from "./data.js";

export function loadPackages() {

  const planContainer = document.getElementById("planCards");
  const destinationSelect = document.getElementById("destination");
  const planSelect = document.getElementById("plan");
  const form = document.getElementById("bookingForm");
  const status = document.getElementById("status");

  if (!planContainer || !destinationSelect || !planSelect || !form) return;

  // Clear existing content (important if page reloads)
  planContainer.innerHTML = "";
  planSelect.innerHTML = `<option value="">Select Plan</option>`;
  destinationSelect.innerHTML = `<option value="">Select Destination</option>`;

  // Load Plans
  plans.forEach(plan => {
    planContainer.innerHTML += `
      <div class="card">
        <h3>${plan.type}</h3>
        <p>${plan.description}</p>
        <p class="price">${plan.multiplier}x Price</p>
      </div>
    `;

    planSelect.innerHTML += `
      <option value="${plan.multiplier}">
        ${plan.type}
      </option>
    `;
  });

  // Load Destinations
  tours.forEach(tour => {
    destinationSelect.innerHTML += `
      <option value="${tour.id}">
        ${tour.name}
      </option>
    `;
  });

  // If user clicked "Book Now" from Tour Details
  const savedDestination = localStorage.getItem("selectedDestination");

  if (savedDestination) {
    destinationSelect.value = savedDestination;

    document.querySelector(".form-container")?.scrollIntoView({
      behavior: "smooth"
    });

    localStorage.removeItem("selectedDestination");
  }

  // Form Submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const tourId = parseInt(destinationSelect.value);
    const multiplier = parseFloat(planSelect.value);

    if (!tourId || !multiplier) {
      status.innerHTML = "⚠ Please select destination and plan.";
      return;
    }

    const selectedTour = tours.find(t => t.id === tourId);
    const total = selectedTour.price * multiplier;

    status.innerHTML = `
      🎉 Booking Confirmed for <strong>${selectedTour.name}</strong>!
      <br>Total Price: <strong>$${total}</strong>
    `;
  });
}