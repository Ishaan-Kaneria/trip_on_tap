const tours = [
    {
        id: 1,
        destination: "Paris",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        description: "Romantic city with festive autumn vibes.",
        plans: [
            { type: "Solo", price: 80000 },
            { type: "Family", price: 150000 },
            { type: "Peak Season", price: 120000 }
        ]
    },
    {
        id: 2,
        destination: "New York",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401",
        description: "Halloween parade and city lights.",
        plans: [
            { type: "Solo", price: 95000 },
            { type: "Family", price: 180000 },
            { type: "Peak Season", price: 140000 }
        ]
    },
    {
        id: 3,
        destination: "London",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
        description: "Misty streets and royal autumn nights.",
        plans: [
            { type: "Solo", price: 75000 },
            { type: "Family", price: 130000 },
            { type: "Peak Season", price: 110000 }
        ]
    }
];

function createCard(tour) {
  return `
    <div class="card">
        <img src="${tour.image}" alt="${tour.name}">
        <h3>${tour.name}</h3>
        <p>${tour.description}</p>
        <p class="price">$${tour.price}</p>
        <p>🌍 ${tour.country}</p>
        <p>⭐ ${tour.rating}</p>
        <button class="btn book-btn" data-name="${tour.name}">
            View Plans
        </button>
    </div>
  `;
}

function bookTour(city) {
    alert(`🎃 You selected ${city}! Happy Halloween Travel!`);
}

renderTours(tours);