import Card from "../../Layouts/Layout";

import React, { useEffect, useState } from "react";
import styles from "./ScanCard.module.scss";

export default function ScanCard() {
  const [url, setUrl] = useState("");
  const [serialNumber, setSerialNumber] = useState("");

  const scan = async () => {
    if ("NDEFReader" in window) {
      try {
        const ndef = new window.NDEFReader();
        await ndef.scan();

        console.log("Scan started successfully.");
        ndef.onreadingerror = () => {
          console.log("Cannot read data from the NFC tag. Try another one?");
        };

        ndef.onreading = (event) => {
          console.log("NDEF url read.");
          onReading(event);
        };
      } catch (error) {
        console.log(`Error! Scan failed to start: ${error}.`);
      }
    }
  };

  const onReading = ({ url, serialNumber }) => {
    setSerialNumber(serialNumber);
    for (const record of url.records) {
      switch (record.recordType) {
        case "text":
          //incase of txt mssg
          break;
        case "url":
          const textDecoder = new TextDecoder(record.encoding);
          setUrl(textDecoder.decode(record.data));
          window.open(`${textDecoder.decode(record.data)}`, "_blank");
          break;
        default:
        // TODO: Handle other records with record data.
      }
    }
  };

  useEffect(() => {
    console.log({ url, serialNumber });
    scan();
  }, [scan]);

  return (
    <Card>
      <div className={styles.container}>
        <h1>
          Scan for
          <br /> Business Card
        </h1>

        <div className={styles.tapDeviceIcon}>
          <span>Tap Device</span>
        </div>
        {url && (
          <a className={styles.card_link} href={url} target="_blank">
            Card Found! : {url}
          </a>
        )}
        <p>
          Make sure to keep your device
          <br /> supports NFC or else use
          <a href="#">QR code</a>
        </p>
      </div>
    </Card>
  );
}
