// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //   apiKey: "AIzaSyBKRlIkclUnXRbBlOnvZ34jOe-D_ei2Td4",
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "image-upload-ce2d4.firebaseapp.com",
  projectId: "image-upload-ce2d4",
  storageBucket: "image-upload-ce2d4.appspot.com",
  messagingSenderId: "1023818339195",
  appId: "1:1023818339195:web:ad19d41ccc3729de6aa3de",
};

// Initialize Firebase

 const app = initializeApp(firebaseConfig);
 const storage = getStorage(app)

 export {app, storage};

