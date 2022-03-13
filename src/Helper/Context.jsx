import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, [user]);

  //firebase helper methdods
  async function getUser() {
    try {
      await onAuthStateChanged(auth, (currentUser) => {
        console.log("loggedIn user:", currentUser);
        setUser(currentUser);
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  async function registerUser(username, email, pwd) {
    try {
      await createUserWithEmailAndPassword(auth, email, pwd);
      //Setting user's display name
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
       navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
