import React, { useContext, useEffect } from "react";
import styles from "./YourCard.module.scss";
import { AuthContext } from "../../Helper/Context";
import Card from "../../Layouts/Layout";

import { sendIcon, saveCardIcon, editIcon } from "../../assets/getAssests";
import { useNavigate, useParams } from "react-router-dom";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";

export default function YourCard() {
  const { card, fetchCard, navigate } = useContext(AuthContext);
  const { id } = useParams();
  useEffect(() => {
    fetchCard(id);
  }, []);

  return (
    <Card>
      <div className={styles.container}>
        <ProfileCard card={card} />

        <button className={styles.editCardBtn} onClick={() => navigate('/create-card')}>
          <img src={editIcon} alt="savecard_icon" />
          <span>Edit Card</span>
        </button>
      </div>
    </Card>
  );
}
