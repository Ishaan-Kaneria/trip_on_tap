import { tours, plans } from "./data.js";

export function loadPackages() {

  const planContainer = document.getElementById("planCards");
  const destinationSelect = document.getElementById("destination");
  const planSelect = document.getElementById("plan");
  const form = document.getElementById("bookingForm");
  const status = document.getElementById("status");

  if (!form) return;

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  // Load Plans
  planContainer.innerHTML = plans.map(plan => `
    <div class="card">
      <h3>${plan.type}</h3>
      <p>${plan.description}</p>
      <p class="price">${plan.multiplier}x Price</p>
    </div>
  `).join("");

  planSelect.innerHTML = `
    <option value="">Select Plan</option>
    ${plans.map(p => `
      <option value="${p.multiplier}">
        ${p.type}
      </option>
    `).join("")}
  `;

  destinationSelect.innerHTML = `
    <option value="">Select Destination</option>
    ${tours.map(t => `
      <option value="${t.id}">
        ${t.name}
      </option>
    `).join("")}
  `;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const date = document.getElementById("travelDate").value;
    const travelers = parseInt(document.getElementById("travelers").value);
    const tourId = parseInt(destinationSelect.value);
    const multiplier = parseFloat(planSelect.value);

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !date || !travelers || !tourId || !multiplier) {
      status.innerHTML = "⚠ All fields are required.";
      return;
    }

    if (!emailRegex.test(email)) {
      status.innerHTML = "⚠ Invalid email format.";
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();

    if (selectedDate <= today) {
      status.innerHTML = "⚠ Travel date must be in the future.";
      return;
    }

    const selectedTour = tours.find(t => t.id === tourId);
    const totalPrice = selectedTour.price * multiplier * travelers;

    const newBooking = {
      id: Date.now(),
      name,
      email,
      date,
      travelers,
      tour: selectedTour.name,
      totalPrice
    };

    bookings.push(newBooking);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    status.innerHTML = `
      🎉 Booking Confirmed! <br>
      Destination: ${selectedTour.name} <br>
      Total: $${totalPrice}
    `;

    form.reset();
  });
}