import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
const firebaseConfig = {
  apiKey: "AIzaSyAyFXx2GfvBZZdh58eOWxE6AzNjOGPuHn4",
  authDomain: "test-53482.firebaseapp.com",
  projectId: "test-53482",
  storageBucket: "test-53482.appspot.com",
  messagingSenderId: "522250982464",
  appId: "1:522250982464:web:a501abc7a87bae8c9fbba5",
  measurementId: "G-PMBZ146LZ4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getUsers(db) {
 const usersCol = collection(db, 'users');
 const userSnapshot = await getDocs(usersCol);
 const userList = userSnapshot.docs.map(doc => doc.data());
 console.log(userList)
}