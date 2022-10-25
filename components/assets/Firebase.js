// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaXYIeW6wvPnxn60IzxpvvuVs-T-xMQN0",
  authDomain: "vnagency-527f9.firebaseapp.com",
  projectId: "vnagency-527f9",
  storageBucket: "vnagency-527f9.appspot.com",
  messagingSenderId: "417116985952",
  appId: "1:417116985952:web:37a9d9b9a85b815b4ec105",
  measurementId: "G-XY5KXXBWWM"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();

export { auth };