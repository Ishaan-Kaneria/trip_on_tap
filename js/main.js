import { loadDestinations } from "./destinations.js";
import { loadPackages } from "./packages.js";
import { loadTourDetails } from "./tourDetails.js";

document.addEventListener("DOMContentLoaded", () => {

  loadDestinations();
  loadPackages();
  loadTourDetails();

  // Halloween Fusion Effect
  const overlay = document.getElementById("creepy-overlay");
  const sound = document.getElementById("creepy-sound");

  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {

      if (overlay) overlay.style.opacity = "1";
      if (sound) {
        sound.currentTime = 0;
        sound.play();
      }

      setTimeout(() => {
        if (overlay) overlay.style.opacity = "0";
      }, 400);
    });
  });

});