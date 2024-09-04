// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app); 
const googleProvider = new GoogleAuthProvider();
console.log('Storage info', storage)
export { app, auth, analytics, db, googleProvider, storage };