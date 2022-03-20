import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  query,
  getDocs,
  collection,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import { createContext, useCallback, useEffect, useState } from "react";
import { auth, db, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";

//TOASTIFY @imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext({});
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [card, setCard] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  async function registerUser(username, email, pwd, profilePic) {
    setLoading(true);
    try {
      //upload img to firestorage logic
      const imageRef = ref(storage, `images/${profilePic.name}`);
      const snapshot = await uploadBytes(imageRef, profilePic);
      const downloadUrl = await getDownloadURL(imageRef);
      console.log("File uploaded> Snapshot:", snapshot);

      await createUserWithEmailAndPassword(auth, email, pwd);
      //Setting user's display name
      await updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: downloadUrl,
      });
      setLoading(false);
      navigate("/login");
    } catch (err) {
      console.error(err.message);
      toast.error("User Invalid / Already Registered!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    }
  }

  const fetchCard = useCallback(async (uid) => {
    try {
      const q = await query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      await querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log("Card fetched 🔥 =>", doc.data());
        setCard(doc.data());
      });
    } catch (error) {
      console.log("Card fetch miss>", error.message);
    }
  }, []);

  //resource: https://firebase.google.com/docs/firestore/manage-data/add-data#set_a_document
  const Create_or_Update_Card = async (user, data) => {
    try {
      //upload img to firestorage logic
      const imageRef = ref(storage, `images/${data.file.name}`);
      const snapshot = await uploadBytes(imageRef, data.file);
      const downloadUrl = await getDownloadURL(imageRef);
      console.log("File uploaded> Snapshot:", snapshot);

      //add info to db logic
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullname: data.fullName,
        profession: data.profession,
        email: data.email,
        contact: data.contact,
        location: data.location,
        socials: { whatsapp: data.whatsapp, fb: data.fb, web: data.web },
        profilePic: downloadUrl,
      });

      console.log("Card Created 🔥");
      navigate(`/card/${user.uid}`);
    } catch (err) {
      console.error(err);
      toast.error("Invalid Response!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    getUser();
    fetchCard(user?.uid);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        registerUser,
        Create_or_Update_Card,
        fetchCard,
        card,
        setCard,
        navigate,
        loading,
        setLoading,
      }}
    >
      {children}
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
