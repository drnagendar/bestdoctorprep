// app/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxgA7JjAQCrfuHePqq6N8gY2tyYrG8s5E",
  authDomain: "bestdoctorprep.firebaseapp.com",
  projectId: "bestdoctorprep",
  storageBucket: "bestdoctorprep.appspot.com",
  messagingSenderId: "555391499721",
  appId: "1:555391499721:web:bc3177c82df4fe7d47c18"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);