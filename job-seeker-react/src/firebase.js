import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Заміни значення нижче на ті, що видав тобі Firebase
const firebaseConfig = {
    apiKey:  "AIzaSyD7Iv-C4CD0lvEYdjF6V-wofNvlVur4-ys",
    authDomain: "job-search-app-93cb3.firebaseapp.com",
    projectId: "job-search-app-93cb3",
    storageBucket: "job-search-app-93cb3.firebasestorage.app",
    messagingSenderId: "489663089219",
    appId: "1:489663089219:web:a5eadff59713fb7ce962f6"
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);

// Експорт функцій для автентифікації та бази даних
export const auth = getAuth(app);
export const db = getFirestore(app);