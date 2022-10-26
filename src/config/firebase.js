import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY, //"AIzaSyCYc2RAyVtuzpS49Y45kSk_djkN9l_DzPQ",
  authDomain: "dtsreact.firebaseapp.com",
  projectId: "dtsreact",
  storageBucket: "dtsreact.appspot.com",
  messagingSenderId: "468027459342",
  appId: "1:468027459342:web:bf25ffeafb0b157400f95f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { auth };
