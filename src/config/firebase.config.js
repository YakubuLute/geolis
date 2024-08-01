// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDljcWPzuX7pspX-tD5Q0DjTFtfjCngC5w",
  authDomain: "geolis-f2c67.firebaseapp.com",
  projectId: "geolis-f2c67",
  storageBucket: "geolis-f2c67.appspot.com",
  messagingSenderId: "271043240720",
  appId: "1:271043240720:web:9a46e48be9e5660688fb95",
  measurementId: "G-ZCM4ZXSLK2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);