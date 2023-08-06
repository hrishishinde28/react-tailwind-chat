// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD59QN16QZSVpfaNQ-12K-iVoy-v1BNkhg",
  authDomain: "chat-50a86.firebaseapp.com",
  projectId: "chat-50a86",
  storageBucket: "chat-50a86.appspot.com",
  messagingSenderId: "298163640112",
  appId: "1:298163640112:web:e34c643d5af14f89d61af5",
  measurementId: "G-117N53Z0Q6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();