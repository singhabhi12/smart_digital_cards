import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { query, getDocs, collection, where, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import { createContext, useEffect, useState } from "react";
import { auth, db, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";

//TOASTIFY @imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    }
  }
  const createCard = async (user, data) => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        //upload img to firestorage logic
        const imageRef = ref(storage, `images/${data.file.name}`);
        const snapshot = await uploadBytes(imageRef, data.file);
        const downloadUrl = await getDownloadURL(imageRef);
        console.log("File uploaded> Snapshot:", snapshot);

        //add info to db logic
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          fullname: data.fullName,
          proffession: data.profession,
          email: data.email,
          contact: data.contact,
          location: data.location,
          socials: { whatsapp: data.whatsapp, fb: data.fb, web: data.web },
          profilePic: downloadUrl,
        });

        toast.success("Card successfully created!", {
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

  // const uploadImage2Firebase = async (file) => {
  //   try {
  //     // Create a reference to our file
  //     const imageRef = ref(storage, `images/${file.name}`);
  //     const snapshot = await uploadBytes(imageRef, file);
  //     const downloadUrl = await getDownloadURL(imageRef);
  //     console.log("File uploaded> Snapshot:", snapshot);
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("File Upload failed!", {
  //       position: "top-center",
  //       autoClose: 1500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        user,
        registerUser,
        createCard,
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
