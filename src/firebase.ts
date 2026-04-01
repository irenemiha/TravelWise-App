// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrMJABN0LxyVwh_tk6htFkprvid_4uQOE",
  authDomain: "travelwise-1cca6.firebaseapp.com",
  projectId: "travelwise-1cca6",
  storageBucket: "travelwise-1cca6.firebasestorage.app",
  messagingSenderId: "365838389942",
  appId: "1:365838389942:web:d80b33bb84ea0d72044c17",
  measurementId: "G-9JFS7S074T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});
const analytics = getAnalytics(app);