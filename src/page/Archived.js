import { useEffect, useRef, useState } from "react";
import img from "../asset/icon-logo.png";
import styles from "../CSS/Archive.module.css";

function Archived() {
  const [isHost, setIshost] = useState(false);

  return isHost ? (
    <div>{/* 왼쪽 요소+ 오른쪽 요소 */}</div>
  ) : (
    <div>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={img} />
          <p>Emmm</p>
        </div>
        <div className={styles.profile}>
          <img src={img} />
        </div>
      </div>
    </div>
  );
}

export default Archived;
