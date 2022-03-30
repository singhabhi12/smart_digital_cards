import Card from "../../Layouts/Layout";

import React, { useContext, useEffect, useState } from "react";
import styles from "./ScanCard.module.scss";
import { useNavigate } from "react-router-dom";

export default function ScanCard() {
  const [message, setMessage] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const navigate = useNavigate();

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
          console.log("NDEF message read.");
          onReading(event);
        };
      } catch (error) {
        console.log(`Error! Scan failed to start: ${error}.`);
      }
    }
  };

  const onReading = ({ message, serialNumber }) => {
    setSerialNumber(serialNumber);
    for (const record of message.records) {
      switch (record.recordType) {
        case "text":
          //incase of txt mssg
          break;
        case "url":
          const textDecoder = new TextDecoder(record.encoding);
          setMessage(textDecoder.decode(record.data));
          navigate(message);
          break;
        default:
        // TODO: Handle other records with record data.
      }
    }
  };

  useEffect(() => {
    console.log({ message, serialNumber });
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

        <p>
          Make sure to keep your device
          <br /> supports NFC or else use
          <a href="#">QR code</a>
        </p>
      </div>
    </Card>
  );
}
