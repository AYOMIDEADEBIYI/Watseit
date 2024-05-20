// import { auth, app, database } from "./firebase";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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
export { auth, app, database };
