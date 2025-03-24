// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS3Y49XvGTyIHTCiC_ru69VnFhiqMCPuQ",
  authDomain: "react-todo-app-5f37b.firebaseapp.com",
  projectId: "react-todo-app-5f37b",
  storageBucket: "react-todo-app-5f37b.appspot.com",
  messagingSenderId: "901010635656",
  appId: "1:901010635656:web:90de35a93fcfeeffa8583d",
  measurementId: "G-TTTWQC20FQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
