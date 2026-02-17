import { tours, plans } from "./data.js";

/*
====================================
 PACKAGES MODULE – WEEK 3 COMPLETE
====================================
 Features:
 - Plan cards (Solo / Family / Luxury)
 - Plan ↔ Select synchronization
 - Auto travelers based on plan
 - Destination auto-selected via localStorage
 - Booking validation
 - Booking saved in localStorage
*/

export function loadPackages() {
  const planContainer = document.getElementById("planCards");
  const destinationSelect = document.getElementById("destination");
  const planSelect = document.getElementById("plan");
  const travelersInput = document.getElementById("travelers");
  const form = document.getElementById("bookingForm");
  const status = document.getElementById("status");

  if (!form) return;

  /* ===============================
     STATE
  =============================== */
  let selectedPlan = null;
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  /* ===============================
     LOAD PLAN CARDS
  =============================== */
  planContainer.innerHTML = plans.map(plan => `
    <div class="card plan-card" data-type="${plan.type}">
      <h3>${plan.type}</h3>
      <p>${plan.description}</p>
      <p class="price">${plan.travelers} Travelers</p>
    </div>
  `).join("");

  /* ===============================
     LOAD PLAN SELECT
  =============================== */
  planSelect.innerHTML = `
    <option value="">Select Plan</option>
    ${plans.map(plan => `
      <option value="${plan.type}">
        ${plan.type}
      </option>
    `).join("")}
  `;

  /* ===============================
     LOAD DESTINATIONS
  =============================== */
  destinationSelect.innerHTML = `
    <option value="">Select Destination</option>
    ${tours.map(tour => `
      <option value="${tour.id}">
        ${tour.name}
      </option>
    `).join("")}
  `;

  /* ===============================
     AUTO-SELECT DESTINATION
     (from Tour Details page)
  =============================== */
  const savedDestinationId = localStorage.getItem("selectedTourId");
  if (savedDestinationId) {
    destinationSelect.value = savedDestinationId;
    localStorage.removeItem("selectedTourId");
  }

  /* ===============================
     PLAN CARD → FORM SYNC
  =============================== */
  document.querySelectorAll(".plan-card").forEach(card => {
    card.addEventListener("click", () => {
      activatePlan(card.dataset.type);
    });
  });

  /* ===============================
     PLAN SELECT → CARD + TRAVELERS
  =============================== */
  planSelect.addEventListener("change", () => {
    if (!planSelect.value) {
      resetPlan();
      return;
    }
    activatePlan(planSelect.value);
  });

  /* ===============================
     ACTIVATE PLAN (SINGLE SOURCE)
  =============================== */
  function activatePlan(planType) {
    selectedPlan = plans.find(p => p.type === planType);

    // UI sync
    planSelect.value = selectedPlan.type;
    travelersInput.value = selectedPlan.travelers;
    travelersInput.readOnly = true;

    // Card highlight
    document.querySelectorAll(".plan-card").forEach(card => {
      card.classList.toggle(
        "active",
        card.dataset.type === planType
      );
    });
  }

  function resetPlan() {
    selectedPlan = null;
    travelersInput.value = "";
    travelersInput.readOnly = false;

    document.querySelectorAll(".plan-card")
      .forEach(c => c.classList.remove("active"));
  }

  /* ===============================
     FORM SUBMIT
  =============================== */
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value.trim();
    const date = document.getElementById("travelDate").value;
    const tourId = parseInt(destinationSelect.value);

    /* ===============================
       VALIDATION
    =============================== */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !age || !email || !date || !tourId || !selectedPlan) {
      status.textContent = "⚠ Please fill all fields and select a plan.";
      return;
    }

    if (!emailRegex.test(email)) {
      status.textContent = "⚠ Invalid email format.";
      return;
    }

    const travelDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (travelDate <= today) {
      status.textContent = "⚠ Travel date must be in the future.";
      return;
    }

    /* ===============================
       PRICE CALCULATION
    =============================== */
    const tour = tours.find(t => t.id === tourId);
    const totalPrice =
      tour.price *
      selectedPlan.multiplier *
      selectedPlan.travelers;

    /* ===============================
       SAVE TO LOCALSTORAGE
    =============================== */
    const booking = {
      id: Date.now(),
      name,
      age,
      email,
      date,
      destination: tour.name,
      plan: selectedPlan.type,
      travelers: selectedPlan.travelers,
      totalPrice
    };

    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    /* ===============================
       SUCCESS MESSAGE
    =============================== */
    status.innerHTML = `
      🎉 <strong>Booking Confirmed!</strong><br>
      Destination: ${tour.name}<br>
      Plan: ${selectedPlan.type}<br>
      Travelers: ${selectedPlan.travelers}<br>
      Total Price: ₹${totalPrice}
    `;

    form.reset();
    resetPlan();
  });
}