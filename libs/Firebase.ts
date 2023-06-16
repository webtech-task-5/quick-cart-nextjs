// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage, getDownloadURL, ref, uploadBytes} from "firebase/storage";
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

const storage = getStorage(app);

export const uploadImage = (files: Blob | Uint8Array | ArrayBuffer) => {
  if (files) {
    const folderPath = `image/${Date.now()}`;
    const imageRef = ref(storage, folderPath);
    uploadBytes(imageRef, files).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        alert("click me : - " +url)
      });
    });
  } else return;
};
