import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCvUHp3WVqdsefNq_wOiIWCWvXh9oepzNs",
    authDomain: "stack-overflow-e5306.firebaseapp.com",
    projectId: "stack-overflow-e5306",
    storageBucket: "stack-overflow-e5306.appspot.com",
    messagingSenderId: "776501816130",
    appId: "1:776501816130:web:3dbd888a7c53c53b6db6db",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
