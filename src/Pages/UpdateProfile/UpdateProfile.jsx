import { useContext, useState, useEffect } from "react";
import styles from "./UpdateProfile.module.scss";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../Helper/Context";
import {
  imgIcon,
  mail,
  userIcon,
  close,
} from "../../assets/getAssests";

//TOASTIFY @imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader/Loader";

export default function Update() {
  const navigate = useNavigate(); //to navigate b/w pages

  //form states
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);


  //handlers functions
  const handleEmailInput = (event) => setEmail(event.target.value);
  const handleUsernameInput = (event) => setUsername(event.target.value);

  const { user, updateUserProfile, loading } = useContext(AuthContext);

  //register user func
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email !== "" && username !== "") {
      await updateUserProfile(username, profilePic, email);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      user?.displayName && setUsername(user?.displayName);
      user?.email && setEmail(user?.email);
    } else {
      console.log("no card fetched!");
    }
    if (profilePic !== null) {
      toast.success(`${profilePic.name} is selected as profile pic!`, {
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
  }, [user, profilePic]);

  return (
    <div className={styles.update_profile_page}>
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.nav}>
            <img src={close} alt="close btn" onClick={() => navigate(-1)} />
          </div>
          <h1>Update Profile</h1>
          <p>Fill the form to update profile crendential.</p>
        </div>

        <div className={styles.form_container}>
          <form onSubmit={handleSubmit}>
            <label>
              Email
              <div className={styles.input_cntr}>
                <img src={mail} alt="icon" />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailInput}
                  placeholder="richardhendricks@pp.com"
                  required
                />
              </div>
            </label>
            <label>
              Name
              <div className={styles.input_cntr}>
                <img src={userIcon} alt="icon" />
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameInput}
                  placeholder="Richard Hendricks"
                  required
                />
              </div>
            </label>

            <label>
              <div className={styles.file_input}>
                <span>Update your profile picture</span>
                <input
                  type="file"
                  className={styles.file}
                  name="avatar"
                  accept="image/png, image/jpeg"
                  onChange={(event) => setProfilePic(event.target.files[0])}
                />
                <span className={styles.uploadBtnText}>
                  {" "}
                  <img src={imgIcon} alt="image_icon" /> Upload
                </span>
              </div>
            </label>
            <button className={styles.reset_pwd_btn}>
              <Link style={{ color: "black" }} to="/reset-pwd">
                Reset Password?
              </Link>
            </button>

            <button className={styles.submit_btn} type="submit">
              {" "}
              Update
            </button>
          </form>
        </div>
      </div>
      {loading && <Loader />}
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
    </div>
  );
}
