import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyFXx2GfvBZZdh58eOWxE6AzNjOGPuHn4",
  authDomain: "test-53482.firebaseapp.com",
  databaseURL: "https://test-53482-default-rtdb.firebaseio.com",
  projectId: "test-53482",
  storageBucket: "test-53482.appspot.com",
  messagingSenderId: "522250982464",
  appId: "1:522250982464:web:a11413419803dc2a9fbba5",
  measurementId: "G-Z2DV3VCE86",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
