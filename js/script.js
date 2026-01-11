// Introduction to JavaScript
console.log("Trip On Tap JavaScript Loaded");

// Variables & Data Types
let userName;
let age;
let destination;
const minimumAge = 18;

// DOM Selection
const form = document.getElementById("bookingForm");
const statusText = document.getElementById("status");

// Event Handling
form.addEventListener("submit", function (event) {
    event.preventDefault();
    validateBooking();
});

// Function Declaration
function validateBooking() {

    userName = document.getElementById("name").value;
    age = document.getElementById("age").value;
    destination = document.getElementById("destination").value;

    // Conditional Statements
    if (userName === "" || age === "" || destination === "") {
        statusText.style.color = "red";
        statusText.innerText = "All fields are required.";
    }
    else if (age < minimumAge) {
        statusText.style.color = "red";
        statusText.innerText = "You must be at least 18 years old.";
    }
    else {
        statusText.style.color = "green";
        statusText.innerText =
            "Booking confirmed for " + userName + " to " + destination + "!";
    }
}
