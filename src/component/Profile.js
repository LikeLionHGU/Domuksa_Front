//홈페이지 프로필 사진 눌렀을 때 나오는 창

import styles from "../CSS/Profile.module.css";

import profileImg from "../asset/profile-test.png";
import deleteIcon from "../asset/icon-delete.png";
import logoutIcon from "../asset/icon-logout.png";
import { useEffect, useRef } from "react";

function Profile({ onChange }) {
  const popup = useRef();

  useEffect(() => {
    // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
    const clickOutside = (e) => {
      if (onChange && !popup.current.contains(e.target)) {
        onChange(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [onChange]);

  return (
    <div className={styles.extradiv}>
      <div className={styles.maindiv}>
        <div className={styles.profilePopup} ref={popup}>
          <img
            className={styles.deleteIcon}
            src={deleteIcon}
            onClick={() => onChange(false)}
          />
          <div className={styles.info}>
            <img className={styles.modalImg} src={profileImg} />
            <div className={styles.text}>
              <div className={styles.name}>대표 김진성</div>
              <div className={styles.email}>email@email.com</div>
            </div>
          </div>
          <div className={styles.logout}>
            <img className={styles.logoutIcon} src={logoutIcon} />
            로그아웃
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
