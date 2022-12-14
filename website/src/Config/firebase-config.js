import { initializeApp } from "firebase/app";
import { getDatabase } from "@firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAFQ48nfVeVFQKLllz6fvct8rxqPqF-8Ek",
  authDomain: "nodetest-66e6e.firebaseapp.com",
  databaseURL:
    "https://nodetest-66e6e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nodetest-66e6e",
  storageBucket: "nodetest-66e6e.appspot.com",
  messagingSenderId: "459524848079",
  appId: "1:459524848079:web:61703aa0b8f560c1c0faba",
  measurementId: "G-LVE99ZH95V",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
