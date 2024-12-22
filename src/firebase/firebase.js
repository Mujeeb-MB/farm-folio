// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcxdkt2PQimu4QQJF72u-Jvpw0naXwGtQ",
  authDomain: "farmfolio-d1c17.firebaseapp.com",
  projectId: "farmfolio-d1c17",
  storageBucket: "farmfolio-d1c17.firebasestorage.app",
  messagingSenderId: "141379324627",
  appId: "1:141379324627:web:728bbc871f1336001de226",
  measurementId: "G-BQ0GDKV4QP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
