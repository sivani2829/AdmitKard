// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import firebase from "firebase/app";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAvorROx1pgxy4OTp0YVHeQZsStLzmhRXE",
//   authDomain: "otp-verification-e4cc7.firebaseapp.com",
//   projectId: "otp-verification-e4cc7",
//   storageBucket: "otp-verification-e4cc7.appspot.com",
//   messagingSenderId: "571155012350",
//   appId: "1:571155012350:web:f5993e8ad5d5b8680d23af",
// };

// // Initialize Firebase
// // initializeApp();
// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvorROx1pgxy4OTp0YVHeQZsStLzmhRXE",
  authDomain: "otp-verification-e4cc7.firebaseapp.com",
  projectId: "otp-verification-e4cc7",
  storageBucket: "otp-verification-e4cc7.appspot.com",
  messagingSenderId: "571155012350",
  appId: "1:571155012350:web:f5993e8ad5d5b8680d23af",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the auth instance
export const auth = getAuth(app);

// initializeApp(firebaseConfig);

// export default firebase;
