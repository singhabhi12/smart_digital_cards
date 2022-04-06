import { useContext, useState } from "react";
import styles from "./ResetPwd.module.scss";
import { useNavigate } from "react-router-dom";

//TOASTIFY @imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Helper/Context";
import Loader from "../../Components/Loader/Loader";
import { close, mail } from "../../assets/getAssests";

export default function ResetPwd() {
  const navigate = useNavigate(); //to navigate b/w pages

  //form states
  const [email, setEmail] = useState("");
  const { loading, setLoading, resetPassword } = useContext(AuthContext);

  //handlers functions
  const handleEmailInput = (event) => setEmail(event.target.value);

  //register user func
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email !== "") {
      try {
        setLoading(true);
        await resetPassword(email);
        navigate("/login");
        toast.info("Check your inbox for reset password link!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
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
      setLoading(false);
    }
  };
  return (
    <div className={styles.reset_pwd_page}>
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.nav}>
            <img src={close} alt="close btn" onClick={() => navigate(-1)} />
          </div>
          <h1>Reset Password ?</h1>
          <p>Fill in the credentials to reset your password.</p>
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

            <button className={styles.submit_btn} type="submit">
              {" "}
              Submit
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
      {loading && <Loader />}
    </div>
  );
}
