// import { auth, app, database } from "./firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAEtesMZYlM0WhqqtofYnFq_2-MEGP7ooM",
  authDomain: "wasteit-6578f.firebaseapp.com",
  projectId: "wasteit-6578f",
  storageBucket: "wasteit-6578f.appspot.com",
  messagingSenderId: "1008527950460",
  appId: "1:1008527950460:web:7f5ed0ef3d5d3781ba3ff9",
  databaseURL: "https://wasteit-6578f-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
export default auth;

const signupForm = document.getElementById("signup-form");
const submitButton = document.getElementById("signup-submit");
const idContainer = document.querySelector(".idnumber-container");
const idNumber = document.querySelector(".idnumber");

//signup handler
signupForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  //   get user info, destructure the value and reassign it.
  const { value: name } = signupForm["name"];
  const { value: email } = signupForm["email"];
  const { value: password } = signupForm["password"];
  //   const { value: location } = signupForm["location"];
  const { value: phoneNumber } = signupForm["phone-number"];

  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(auth.currentUser, {
      displayName: name,
      //   photoURL: "",
    })
      .then(() => {
        return;
      })
      .catch((error) => {
        return;
      });

    // Add user to database.
    set(ref(database, "users/" + cred.user.uid), {
      name,
      email,
      phoneNumber,
    });
    localStorage.setItem("token", cred.user.accessToken);
    initToast("Sign up successful", "success");

    submitButton.disabled = false;
    submitButton.textContent = "Submit";
    setTimeout(() => {
      window.location.href = "request-service.html";
    }, 2000);
    // signupForm.style.display = "none";
    // idContainer.style.display = "block";
    // idNumber.innerHTML = cred.user.uid;

    signupForm.reset();
    signupForm.querySelector(".error").innerHTML = "";
  } catch (error) {
    initToast(error.message, "error");
    submitButton.disabled = false;
    submitButton.textContent = "Submit";
  }
});

// logout handler;
const logout = document.querySelector(".logout-btn");

logout?.addEventListener("click", async (e) => {
  e.preventDefault();
  await signOut(auth);
  localStorage.clear();
});

// login handler.
const login = document.querySelector("#login-form");
const loginButton = document.getElementById("login-submit");

login?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const { value: email } = login["login-email"];
  const { value: password } = login["login-password"];

  loginButton.disabled = true;
  loginButton.textContent = "Submitting...";
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("token", cred.user.accessToken);
    initToast("Sign in successful", "success");

    loginButton.disabled = false;
    loginButton.textContent = "Submit";
    setTimeout(() => {
      window.location.href = "request-service.html";
    }, 2000);
    login.reset();
  } catch (error) {
    initToast(error.message, "error");
    loginButton.disabled = false;
    loginButton.textContent = "Submit";
  }
});

const initToast = (text, theme) => {
  return Toastify({
    text: text,
    duration: 4000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: theme === "success" ? "#00ca00" : "red",
    },
  }).showToast();
};
