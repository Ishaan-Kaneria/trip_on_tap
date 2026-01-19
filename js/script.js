console.log("Trip On Tap JavaScript Loaded");

const minimumAge = 18;
const form = document.getElementById("bookingForm");
const statusText = document.getElementById("status");

form.addEventListener("submit", function (event)
{
    event.preventDefault();
    validateBooking();
});

function validateBooking()
{
    const userName = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const destination = document.getElementById("destination").value;

    if (userName == "" || age == "" || destination == "")
    {
        statusText.style.color = "red";
        statusText.innerText = "All fields are required.";
    }
    else if (age < minimumAge)
    {
        statusText.style.color = "red";
        statusText.innerText = "You must be at least 18 years old.";
    }
    else
    {
        statusText.style.color = "green";
        statusText.innerText =
            `Booking confirmed for ${userName} to ${destination}!`;
    }
}
