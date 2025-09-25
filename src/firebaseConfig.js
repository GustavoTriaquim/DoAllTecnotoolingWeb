import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgqiUF3u5GFz49uqxm3iak_JzzQ5TEN0s",
  authDomain: "crm-doall.firebaseapp.com",
  projectId: "crm-doall",
  storageBucket: "crm-doall.firebasestorage.app",
  messagingSenderId: "463852008625",
  appId: "1:463852008625:web:386f15fc660ff887319e90",
  measurementId: "G-T64VM051CD"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
