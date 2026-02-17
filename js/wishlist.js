// ===============================
// WISHLIST MODULE (GLOBAL)
// ===============================

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

/* -------------------------------
   UTILITIES
--------------------------------*/
function saveWishlist() {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateWishlistCount();
}

function updateWishlistCount() {
  const countEl = document.getElementById("wishlistCount");
  if (countEl) {
    countEl.textContent = `(${wishlist.length})`;
  }
}

/* -------------------------------
   TOGGLE WISHLIST (Cards)
--------------------------------*/
function toggleWishlist(id) {
  id = parseInt(id);

  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(item => item !== id);
  } else {
    wishlist.push(id);
  }

  saveWishlist();
}

/* -------------------------------
   INIT FOR DESTINATION CARDS
--------------------------------*/
function initWishlistButtons() {
  document.addEventListener("click", (e) => {

    // ❤️ Heart button
    if (e.target.classList.contains("wishlist")) {
      const id = e.target.dataset.id;
      toggleWishlist(id);
      e.target.classList.toggle("active");
    }
  });
}

/* -------------------------------
   RENDER WISHLIST PAGE
--------------------------------*/
function renderWishlistPage(tours) {
  const container = document.getElementById("wishlistContainer");
  if (!container) return;

  if (wishlist.length === 0) {
    container.innerHTML = `<p>❤️ Your wishlist is empty</p>`;
    return;
  }

  const savedTours = tours.filter(t => wishlist.includes(t.id));

  container.innerHTML = savedTours.map(tour => `
    <div class="card">
      <img src="${tour.image}" alt="${tour.name}">
      <h3>${tour.name}</h3>
      <p>${tour.description}</p>
      <p class="price">₹${tour.price}</p>

      <button class="btn remove-btn" data-id="${tour.id}">
        Remove
      </button>
    </div>
  `).join("");

  // Remove buttons
  container.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      toggleWishlist(btn.dataset.id);
      renderWishlistPage(tours);
    });
  });
}

/* -------------------------------
   INIT
--------------------------------*/
updateWishlistCount();
initWishlistButtons();

// Make available globally
window.renderWishlistPage = renderWishlistPage;