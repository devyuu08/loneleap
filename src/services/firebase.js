// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKSqK6hO3XdUJctNdQJuMvNTdMYczHeBc",
  authDomain: "loneleap-client.firebaseapp.com",
  projectId: "loneleap-client",
  storageBucket: "loneleap-client.firebasestorage.app",
  messagingSenderId: "1006151406157",
  appId: "1:1006151406157:web:dc544a773260134f458204",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // 인증 객체
