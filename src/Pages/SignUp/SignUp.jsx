import { useContext, useState} from "react";
import styles from "./SignUp.module.scss";
import close from "../../assets/close.svg";
import mail from "../../assets/mail.svg";
import password from "../../assets/password.svg";
import user from "../../assets/user2.svg";
import checkOn from "../../assets/checkOn.svg";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../Helper/Context";

export default function SignUp() {
  const navigate = useNavigate(); //to navigate b/w pages

  //form states
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  //handlers functions
  const handleEmailInput = (event) => setEmail(event.target.value);
  const handleUsernameInput = (event) => setUsername(event.target.value);
  const handlePwdInput = (event) => setPwd(event.target.value);

  const { registerUser } = useContext(AuthContext);

  //register user func
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email !== "" && pwd !== "") {
      await registerUser(username, email, pwd);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.nav}>
          <img src={close} alt="close btn" onClick={() => navigate(-1)} />
        </div>
        <h1>Let’s Get Started!</h1>
        <p>Fill the form to signup.</p>
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
              <img src={user} alt="icon" />
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
            <p className={styles.pwdRule}>
              At least 8 characters, 1 uppercase letter, 1 number & 1 symbol
            </p>
          </label>

          <div className={styles.signup_policy}>
            <img src={checkOn} alt="icon" />
            <span>
              By Signing up, you agree to the Terms of Service and Privacy
              Policy .
            </span>
          </div>

          <button className={styles.submit_btn} type="submit">
            {" "}
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
