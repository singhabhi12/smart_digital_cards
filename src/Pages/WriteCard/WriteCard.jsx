import Card from "../../Layouts/Layout";

import React, { useContext } from "react";
import styles from "./WriteCard.module.scss";
import { AuthContext } from "../../Helper/Context";
import WriteNfcCard from "../../Components/Write/Write";

export default function WriteCard() {
  const { actions, setActions } = useContext(AuthContext);

  const scan = () => {
    //for now lets just keep outside the scope!
    setActions({
      scan: "scanned",
      write: "writing",
    });
    if ("NDEFReader" in window) {
      //to check for nfc reader support
      //if yes -> allow write
    }
  };

  return !actions.write ? (
    <Card>
      <div className={styles.container}>
        <h1>
          Tap your Card on
          <br />
          back of your device to write.
        </h1>

        <div className={styles.tapDeviceIcon} onClick={scan}>
          <span>Tap Device</span>
        </div>

        <p>
          Make sure to keep your device
          <br /> supports NFC or else use
          <a href="#">QR code</a>
        </p>
      </div>
    </Card>
  ) : (
    <WriteNfcCard />
  );
}
