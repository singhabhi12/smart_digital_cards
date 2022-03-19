import Card from "../../Layouts/Layout";

import React from "react";
import styles from "./ReceiveCard.module.scss";

export default function ReceiveCard() {
  return (
    <Card>
      <div className={styles.container}>
        <h1>
          Receive your
          <br /> Business Card
        </h1>

        <div className={styles.tapDeviceIcon}>
          <span>Tap Device</span>
        </div>

        <p>
          Make sure to keep your device
          <br /> supports NFC or else use
          <a href="#">QR code</a>
        </p>
      </div>
    </Card>
  );
}
