// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { initializeAuth } from 'firebase/auth';
import {getFirestore} from "firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqViQC20uuHkmfMbZaCZSobbqUY9If6yQ",
  authDomain: "fooddelivery-46d6a.firebaseapp.com",
  projectId: "fooddelivery-46d6a",
  storageBucket: "fooddelivery-46d6a.appspot.com",
  messagingSenderId: "102301778288",
  appId: "1:102301778288:web:08ec2eaa123b192fed4fb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app)
const db = getFirestore(app)
export {auth , db}
// token