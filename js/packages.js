import { tours, plans } from "./data.js";

export function loadPackages() {

  const planContainer = document.getElementById("planCards");
  const destinationSelect = document.getElementById("destination");
  const planSelect = document.getElementById("plan");
  const form = document.getElementById("bookingForm");
  const status = document.getElementById("status");

  if (!planContainer) return;

  plans.forEach(plan => {
    planContainer.innerHTML += `
      <div class="card">
        <h3>${plan.type}</h3>
        <p>${plan.description}</p>
        <p class="price">${plan.multiplier}x Price</p>
      </div>
    `;

    planSelect.innerHTML += `
      <option value="${plan.multiplier}">${plan.type}</option>
    `;
  });

  tours.forEach(tour => {
    destinationSelect.innerHTML += `
      <option value="${tour.price}">${tour.name}</option>
    `;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const basePrice = parseFloat(destinationSelect.value);
    const multiplier = parseFloat(planSelect.value);
    const total = basePrice * multiplier;

    status.innerHTML = `🎉 Booking Confirmed! Total Price: $${total}`;
  });
}