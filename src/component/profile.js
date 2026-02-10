//홈페이지 프로필 사진 눌렀을 때 나오는 창

import styles from "../CSS/Profile.module.css";

import profileImg from "../asset/profile-test.png";
import deleteIcon from "../asset/icon-delete.png";
import logoutIcon from "../asset/icon-logout.png";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Profile({ onChange, user }) {
  const navigate = useNavigate();
  const popup = useRef();

  function onLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("memberId");
    localStorage.removeItem("userInfo");
    navigator('/');
  }

  useEffect(() => {
    const clickOutside = (e) => {
      if (onChange && !popup.current.contains(e.target)) {
        onChange(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);

    return () => {
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
            <img className={styles.modalImg} src={user.picture} />
            <div className={styles.text}>
              <div className={styles.name}>{user.name}</div>
              <div className={styles.email}>{user.email}</div>
            </div>
          </div>
          <div className={styles.logout} onClick={onLogout}>
            <img className={styles.logoutIcon} src={logoutIcon} />
            로그아웃
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
