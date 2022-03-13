import { useContext, useState } from "react";
import styles from "./Login.module.scss";
import close from "../../assets/close.svg";
import mail from "../../assets/mail.svg";
import password from "../../assets/password.svg";
import checkOn from "../../assets/checkOn.svg";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
//FIREBASE @imports
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

//TOASTIFY @imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Helper/Context";

export default function Login() {
  const navigate = useNavigate(); //to navigate b/w pages

  //form states
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const { user } = useContext(AuthContext);
  const [rememberUser, setRememberStatus] = useState(false);

  //handlers functions
  const handleEmailInput = (event) => setEmail(event.target.value);
  const handlePwdInput = (event) => setPwd(event.target.value);

  //register user func
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email !== "" && pwd !== "") {
      try {
        await signInWithEmailAndPassword(auth, email, pwd);
        if (rememberUser) {
          localStorage.setItem("user", user.uid);
        }
        navigate("/profile");
      } catch (err) {
        console.error(err.message);
        toast.error("User Invalid / Not Registered!", {
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
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.nav}>
          <img src={close} alt="close btn" onClick={() => navigate(-1)} />
        </div>
        <h1>Welcome</h1>
        <p>Fill in the credentials to login.</p>
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
            Password
            <div className={styles.input_cntr}>
              <img src={password} alt="icon" />
              <input
                type="password"
                value={pwd}
                onChange={handlePwdInput}
                placeholder="*  *  *  *  *  *  *  *"
                required
              />
            </div>
            <p className={styles.pwdRule}>Reset Password</p>
          </label>

          <div className={styles.login_policy}>
            {rememberUser ? (
              <img
                src={checkOn}
                alt="icon"
                onClick={() => setRememberStatus(false)}
              />
            ) : (
              <input type="checkbox" onClick={() => setRememberStatus(true)} />
            )}
            <span>Remember me next time.</span>
          </div>

          <button className={styles.submit_btn} type="submit">
            {" "}
            Login
          </button>
        </form>
      </div>
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
