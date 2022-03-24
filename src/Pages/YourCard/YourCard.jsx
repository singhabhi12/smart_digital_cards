import React, { useContext, useEffect } from "react";
import styles from "./YourCard.module.scss";
import { AuthContext } from "../../Helper/Context";
import Card from "../../Layouts/Layout";

import { sendIcon, saveCardIcon, editIcon } from "../../assets/getAssests";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import { useNavigate } from "react-router-dom";

export default function YourCard() {
  const navigate = useNavigate();
  const { card, fetchCard } = useContext(AuthContext);
  useEffect(() => {
    if (!card?.uid) {
      alert("create card first!");
      navigate("/profile");
    }
    fetchCard();
  }, []);

  return (
    <Card>
      <div className={styles.container}>
        <ProfileCard card={card} />

        <button
          className={styles.editCardBtn}
          onClick={() => navigate("/create-card")}
        >
          <img src={editIcon} alt="savecard_icon" />
          <span>Edit Card</span>
        </button>
      </div>
    </Card>
  );
}
