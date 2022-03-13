// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2Ri-EfQC2NqZiPJ5_-wXUIvk5uGVaykQ",
  authDomain: "fir-9-be.firebaseapp.com",
  projectId: "fir-9-be",
  storageBucket: "fir-9-be.appspot.com",
  messagingSenderId: "140390399208",
  appId: "1:140390399208:web:51f0c3090df854aad4dd5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth
}