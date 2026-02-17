import { tours } from './data.js';

export function loadDestinations() {
    const container = document.getElementById("tourContainer");
    const searchInput = document.getElementById("searchInput");
    const sortPrice = document.getElementById("sortPrice");
    
    if (!container) return;

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    function render(list) {
        if (list.length === 0) {
            container.innerHTML = `<div class="no-results">Sorry, no destinations match your search.</div>`;
            return;
        }

        container.innerHTML = list.map(tour => `
            <div class="card">
                <span class="heart ${wishlist.includes(tour.id) ? 'active' : ''}" data-id="${tour.id}">❤️</span>
                <img src="${tour.image}" alt="${tour.name}">
                <div class="card-body">
                    <h3>${tour.name}</h3>
                    <p class="price">$${tour.price}</p>
                    <button class="btn detail-btn" data-id="${tour.id}">View Details</button>
                </div>
            </div>
        `).join('');

        attachEvents();
    }

    function attachEvents() {
        document.querySelectorAll(".detail-btn").forEach(b => {
            b.onclick = () => {
                localStorage.setItem("selectedTourId", b.dataset.id);
                window.location.href = "tourDetails.html";
            };
        });

        document.querySelectorAll(".heart").forEach(h => {
            h.onclick = () => {
                const id = parseInt(h.dataset.id);
                if (wishlist.includes(id)) {
                    wishlist = wishlist.filter(i => i !== id);
                } else {
                    wishlist.push(id);
                }
                localStorage.setItem("wishlist", JSON.stringify(wishlist));
                h.classList.toggle('active');
                window.updateWishlistCount();
            };
        });
    }

    searchInput.oninput = () => {
        const filtered = tours.filter(t => t.name.toLowerCase().includes(searchInput.value.toLowerCase()));
        render(filtered);
    };

    sortPrice.onchange = () => {
        const sorted = [...tours].sort((a,b) => sortPrice.value === 'low' ? a.price - b.price : b.price - a.price);
        render(sorted);
    };

    render(tours);
}