import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import auth from "./auth.js";

function myBars() {
  let bars = document.querySelector("#bar");
  let nav = document.querySelector(".navigation");
  if (bars) {
    bars.onclick = function () {
      if (nav.style.right == "0%") {
        nav.style.right = "-50%";
        bars.src = "/img/menu.png";
      } else {
        nav.style.right = "0%";
        bars.src = "/img/x.png";
      }
      nav.classList.toggle("new");
    };
  }
}
myBars();

const locationBtn = document.querySelector("#location-button");
const trashLocation = document.querySelector(".trash-location");
const locationContainer = document.querySelector(".location-container");
const successCallBack = async (position) => {
  const { latitude, longitude } = position.coords;
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=816db2cbe8344f42800fedc5f3074e88`
  );
  const userLocation = await response.json();
  locationBtn.disabled = false;
  locationBtn.textContent = "";
  locationBtn.style.display = "none";
  locationContainer.style.display = "block";
  trashLocation.innerHTML = userLocation.results[0].formatted;
  //   setUserData(userLocation.results[0]);
};

const failureCallBack = (error) => {
  console.log("Error ===>", error);
};

locationBtn.addEventListener("click", (e) => {
  e.preventDefault();
  locationBtn.disabled = true;
  locationBtn.textContent = "Locating...";
  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(
      successCallBack,
      failureCallBack
    );
  }
});

const greetingContainer = document.querySelector(".greeting-container");
const greeting = document.querySelector(".greeting");
const checkAuthState = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      greetingContainer.style.display = "flex";
      greeting.innerHTML = `Welcome ${
        user.displayName ?? storedUser.displayName
      }!`;
      return;
    } else {
      if (greetingContainer) {
        greetingContainer.style.display = "none";
      }
      window.location.href = "signin.html";
    }
  });
};
checkAuthState();
