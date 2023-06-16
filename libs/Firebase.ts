// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCQIy6g2ppZYqugVFmeWU7v4VXjwton3gI",
    authDomain: "shikaricv.firebaseapp.com",
    projectId: "shikaricv",
    storageBucket: "shikaricv.appspot.com",
    messagingSenderId: "496227029743",
    appId: "1:496227029743:web:4817b74067c1dc7925c11a",
    measurementId: "G-XD6TKMNQD5"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);