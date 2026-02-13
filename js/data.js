export const tours = [
  {
    id: 1,
    name: "Paris",
    price: 1200,
    image: "images/paris.jpg",
    description: "City of love and lights.",
    country: "France",
    rating: 4.8
  },
  {
    id: 2,
    name: "Tokyo",
    price: 1500,
    image: "images/tokyo.jpg",
    description: "Tradition meets technology.",
    country: "Japan",
    rating: 4.7
  },
  {
    id: 3,
    name: "Dubai",
    price: 1800,
    image: "images/dubai.jpg",
    description: "Luxury in the desert.",
    country: "UAE",
    rating: 4.6
  },
  {
    id: 4,
    name: "New York",
    price: 1400,
    image: "images/newyork.jpg",
    description: "The city that never sleeps.",
    country: "USA",
    rating: 4.5
  },
  {
    id: 5,
    name: "Bali Escape",
    country: "Indonesia",
    price: 800,
    image: "images/bali.jpg",
    description: "Experience tropical paradise with beaches and temples.",
    rating: 4.7
  },
  {
    id: 6,
    name: "Swiss Alps Adventure",
    country: "Switzerland",
    price: 1500,
    image: "images/swiss.jpg",
    description: "Snow peaks, scenic trains, and mountain magic.",
    rating: 4.9
  },
];

export const plans = [
  {
    type: "Solo Plan",
    multiplier: 1,
    description: "Perfect for solo travelers."
  },
  {
    type: "Family Plan",
    multiplier: 1.3,
    description: "Ideal for families."
  },
  {
    type: "Peak Season Plan",
    multiplier: 1.6,
    description: "Travel during peak season."
  },
  {
    type: "Standard",
    description: "Hotel + Breakfast",
    multiplier: 1
  },
  {
    type: "Premium",
    description: "Hotel + Breakfast + Tours",
    multiplier: 1.5
  },
  {
    type: "Luxury",
    description: "All Inclusive + VIP Services",
    multiplier: 2
  }
];