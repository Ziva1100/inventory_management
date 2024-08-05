// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCV0UsjKfo5lB2jzbP0YCeldlEaPcf3Ijg",
  authDomain: "inventory-management-daa4b.firebaseapp.com",
  projectId: "inventory-management-daa4b",
  storageBucket: "inventory-management-daa4b.appspot.com",
  messagingSenderId: "774014009913",
  appId: "1:774014009913:web:115a602eee059634fc43e8",
  measurementId: "G-M9CJ9H7YRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore}