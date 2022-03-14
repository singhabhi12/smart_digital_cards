import React, { useContext, useEffect } from "react";
import styles from "./YourCard.module.scss";
import { AuthContext } from "../../Helper/Context";
import Card from "../../Layouts/Layout";

import { sendIcon, saveCardIcon } from "../../assets/getAssests";
import { useParams } from "react-router-dom";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";

export default function YourCard() {
  const { card, fetchCard } = useContext(AuthContext);
  const { id } = useParams();
  useEffect(() => {
    fetchCard(id);
  }, []);

  return (
    <Card>
      <div className={styles.container}>
        <ProfileCard card={card} />
        <div className={styles.profile_share}>
          <div className={styles.pofile_btns}>
            <button className={styles.send_profile}>
              <img src={sendIcon} alt="send_icon" />
              {/* <span>Send Card</span> */}
            </button>
            <button className={styles.receive_profile}>
              <img src={saveCardIcon} alt="savecard_icon" />
              {/* <span>Receive Card</span> */}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
