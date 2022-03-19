import styles from "./MainProfile.module.scss";
import user_icon from "../../assets/user.svg";
import edit_icon from "../../assets/edit.svg";
import savecard_icon from "../../assets/savecard_icon.svg";
import send_icon from "../../assets/send.svg";
import barcode_icon from "../../assets/scan-barcode.svg";
import ducky from "../../assets/ducky.jpeg";
import { useNavigate } from "react-router-dom";
//FIREBASE @imports
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";

//TOASTIFY @imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Helper/Context";
import { useContext, useEffect } from "react";

const UtilityCard = ({ data }) => {
  const navigate = useNavigate(null);
  return (
    <div className={styles.utility} onClick={() => navigate(data.redirect)}>
      <img src={data.icon} alt="icon" className={styles.utility_icon} />
      <p className={styles.utility_info}>{data.info}</p>
    </div>
  );
};

export default function MainProfile() {
  const { user, setUser, card, setCard, navigate } = useContext(AuthContext);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);
  const utilities = [
    {
      icon: user_icon,
      info: "Your Business Card",
      redirect: `/card/${user?.uid}`,
    },
    {
      icon: savecard_icon,
      info: "Saved Business Card",
      redirect: "",
    },
    {
      icon: edit_icon,
      info: "Update NFC Card",
      redirect: "",
    },
  ];

  const logout = async () => {
    await signOut(auth);
    setUser({});
    setCard({});
    window.localStorage.clear();
    navigate("/");
  };
  return (
    <div className={styles.profile_page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <nav>
            <h3>My Profile</h3>
            <button onClick={() => logout()}>Sign out</button>
          </nav>
        </div>
        <div className={styles.body}>
          <div className={styles.profile}>
            <img
              src={user?.photoURL ? user?.photoURL : ducky}
              alt="profile_image"
              className={styles.profile_img}
            />
            <div className={styles.profile_info}>
              <h4 className={styles.username}>{user?.displayName}</h4>
              <p className={styles.useremail}>{user?.email}</p>
              <a href="#" className={styles.edit_profile}>
                Edit Profile
              </a>
            </div>
          </div>

          <div className={styles.profile_utilities}>
            <div
              className={styles.utility}
              onClick={() => navigate("/create-card")}
            >
              <img src={edit_icon} alt="icon" className={styles.utility_icon} />
              <p className={styles.utility_info}>
                {card?.uid ? "Update Card" : "Create Card"}
              </p>
            </div>

            {utilities.map((util, idx) => {
              return <UtilityCard data={util} key={idx} />;
            })}
          </div>

          <div className={styles.profile_share}>
            <div className={styles.pofile_btns}>
              <button
                className={styles.send_profile}
                onClick={() => navigate("/send-card")}
              >
                <img src={send_icon} alt="send_icon" />
                {/* <span>Send Card</span> */}
              </button>
              <button
                className={styles.receive_profile}
                onClick={() => navigate("/receive-card")}
              >
                <img src={barcode_icon} alt="barcode_icon" />
                {/* <span>Receive Card</span> */}
              </button>
            </div>
          </div>
        </div>

        <ToastContainer
          position="top-center"
          autoClose={12}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}
