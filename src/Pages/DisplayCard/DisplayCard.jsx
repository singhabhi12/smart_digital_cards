import React, { useContext, useEffect } from "react";
import styles from "./DisplayCard.module.scss";
import { AuthContext } from "../../Helper/Context";
import Card from "../../Layouts/Layout";
import {
  locIcon,
  mail2Icon,
  phoneIcon,
  webIcon,
  whatsAppIcon,
  fbIcon,
  sendIcon,
  saveCardIcon,
} from "../../assets/getAssests";
import { useParams } from "react-router-dom";

export default function DisplayCard() {
  const { user, card, fetchCard } = useContext(AuthContext);
  const { id } = useParams();
  useEffect(() => {
    fetchCard(id);
  }, [user, fetchCard]);

  return (
    <Card>
      <div className={styles.container}>
        <div className={styles.profile}>
          <div className={styles.profile_intro}>
            <img
              src={card?.profilePic}
              alt="profile_image"
              className={styles.profile_img}
            />
            <div className={styles.profile_initials}>
              <h4>{card?.fullname}</h4>
              <p>{card?.proffession}</p>
            </div>
          </div>
          <div className={styles.profile_details}>
            <div className={styles.detail}>
              <span>Email</span>
              <div className={styles.content}>
                <img src={mail2Icon} alt="email_icon" />
                <span>{card?.email}</span>
              </div>
            </div>
            <div className={styles.detail}>
              <span>Phone Number</span>
              <div className={styles.content}>
                <img src={phoneIcon} alt="phone_icon" />
                <span>{card?.contact}</span>
              </div>
            </div>
            <div className={styles.detail}>
              <span>Address</span>
              <div className={styles.content}>
                <img src={locIcon} alt="loc_icon" />
                <span>{card?.location}</span>
              </div>
            </div>
            <div className={styles.detail}>
              <span>Website</span>
              <div className={styles.content}>
                <img src={webIcon} alt="web_icon" />
                <span>{card?.socials?.web}</span>
              </div>
            </div>
            <div className={styles.socials}>
              <span>Social</span>
              <div>
                <img
                  src={whatsAppIcon}
                  alt="whatsapp_icon"
                  className={styles.social}
                />
                <a
                  href={`${card?.socials?.fb}`}
                  target="_blank"
                  className={styles.social}
                >
                  <img src={fbIcon} alt="fb_icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
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
