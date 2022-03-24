import React, { useContext, useEffect } from "react";
import styles from "./CardProfile.module.scss";
import { AuthContext } from "../../Helper/Context";
import Card from "../../Layouts/Layout";

import { sendIcon, saveCardIcon, editIcon } from "../../assets/getAssests";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import { useParams } from "react-router-dom";

export default function CardProfile() {
  const { card, fetchCard, navigate } = useContext(AuthContext);
  const { id } = useParams();
  useEffect(() => {
    fetchCard(id);
  }, []);

  return (
    <Card>
      <div className={styles.container}>
        <ProfileCard card={card} />

        <button
          className={styles.editCardBtn}
          onClick={() => alert("card deleted!")}
        >
          <img src={editIcon} alt="savecard_icon" />
          <span>Delete Card</span>
        </button>
      </div>
    </Card>
  );
}
