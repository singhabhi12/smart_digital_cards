import Card from "../../Layouts/Layout";

import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./ScanCard.module.scss";
import { AuthContext } from "../../Helper/Context";
import { scannerGif } from "../../assets/getAssests";

export default function ScanCard() {
  const [message, setMessage] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const { actions, setActions } = useContext(AuthContext);

  const scan = useCallback(async () => {
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
          setActions({
            scan: "scanned",
            write: null,
          });
        };
      } catch (error) {
        console.log(`Error! Scan failed to start: ${error}.`);
      }
    }
  }, [setActions]);

  const onReading = ({ message, serialNumber }) => {
    setSerialNumber(serialNumber);
    for (const record of message.records) {
      switch (record.recordType) {
        case "text":
          const textDecoder = new TextDecoder(record.encoding);
          setMessage(textDecoder.decode(record.data));
          break;
        case "url":
          // TODO: Read URL record with record data.
          break;
        default:
        // TODO: Handle other records with record data.
      }
    }
  };

  useEffect(() => {
    setActions({ scan: null, write: null });
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

        <div
          className={styles.tapDeviceIcon}
          onClick={() =>
            actions.scan === "scanning"
              ? setActions({ scan: null, write: null })
              : setActions({ write: null, scan: "scanning" })
          }
        >
          {actions.scan === "scanning" ? (
            <img
              src={scannerGif}
              alt="scan logo"
              className={styles.scanner_image}
            />
          ) : (
            <span>Tap Device</span>
          )}
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
