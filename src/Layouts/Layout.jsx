import styles from "./Layout.module.scss";
import back_nav from "../assets/back_icon.svg";
import { useNavigate } from "react-router-dom";
export default function Layout({ showBackNavIcon = false, children }) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
          {showBackNavIcon ? <header>
              <nav>
                  <img
                      src={back_nav}
                      alt="back nav icon"
                      onClick={() => navigate(-1)}
                  />
              </nav>
          </header> : ''}
      <main>{children}</main>
    </div>
  );
}
