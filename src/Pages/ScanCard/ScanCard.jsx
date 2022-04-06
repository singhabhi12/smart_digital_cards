import Card from "../../Layouts/Layout";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./ScanCard.module.scss";

export default function ScanCard() {
  const [serialNumber, setSerialNumber] = useState("");
  const [message, setMessage] = useState("");

  const scan = useCallback(async () => {
    console.log("hi");
    if ("NDEFReader" in window) {
      try {
        const ndef = new window.NDEFReader();
        await ndef.scan();

        console.log("Scan started successfully.");
        ndef.onreadingerror = () => {
          console.log("Cannot read data from the NFC tag. Try another one?");
        };

        ndef.onreading = (event) => {
          console.log("NDEF message read.");
          onReading(event);
        };
      } catch (error) {
        console.log(`Error! Scan failed to start: ${error}.`);
      }
    }
  }, []);

  const onReading = ({ message, serialNumber }) => {
    setSerialNumber(serialNumber);
    for (const record of message.records) {
      switch (record.recordType) {
        case "text":
          const textDecoder = new TextDecoder(record.encoding);
          setMessage(textDecoder.decode(record.data));
          break;
        case "url":
          const urlDecoder = new TextDecoder();
          setMessage(urlDecoder.decode(record.data));
          break;
        default:
        // TODO: Handle other records with record data.
      }
    }
  };

  useEffect(() => {
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
        {message && (
          <a className={styles.card_link} href={message} target="_blank">
            Card Found
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
