import React, { useContext } from "react";
import { AuthContext } from "../../Helper/Context";
import Card from "../../Layouts/Layout";
import styles from "./Write.module.scss";

export default function WriteNfcCard() {
  const { user } = useContext(AuthContext);

  const onWrite = async (message) => {
    console.log("mssg:", message);
    if ("NDEFReader" in window) {
      try {
        const ndef = new window.NDEFReader();
        // This line will avoid showing the native NFC UI reader
        await ndef.scan();
        await ndef.write({ records: [{ recordType: "url", data: message }] });
        alert(`Value Saved!`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Card>
      <div className={styles.container}>
        <h1>Save your profile on NFC Card.</h1>

        <div className={styles.uidInput}>
          <p>Your UID</p>
          <input type="text" value={user?.uid} disabled />
          <button
            onClick={() =>
              onWrite(`https://fir-9-be.web.app/profile/${user?.uid}`)
            }
          >
            Submit
          </button>
        </div>
      </div>
    </Card>
  );
}
