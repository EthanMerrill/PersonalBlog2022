// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmMESGx7yA5iNPkf-BdefeECU3OGLG5W0",
  authDomain: "portfolio-71e69.firebaseapp.com",
  projectId: "portfolio-71e69",
  storageBucket: "portfolio-71e69.appspot.com",
  messagingSenderId: "300875366651",
  appId: "1:300875366651:web:0662ab4ed27a55929a705e",
  measurementId: "G-ZHF7NCN4YW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;