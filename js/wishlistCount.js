const countSpan = document.getElementById("wishlistCount");

function updateWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (countSpan) {
    countSpan.textContent = `(${wishlist.length})`;
  }
}

updateWishlistCount();

// Update count when wishlist changes in another page
window.addEventListener("storage", updateWishlistCount);