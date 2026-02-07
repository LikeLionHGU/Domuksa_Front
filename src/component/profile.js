//홈페이지 프로필 사진 눌렀을 때 나오는 창

import styles from "../CSS/Profile.module.css";
import profileImg from "../asset/profile-test.png";
import deleteIcon from "../asset/icon-delete.png";

function Profile({ onChange }) {
  return (
    <div className={styles.extradiv}>
      <div className={styles.maindiv}>
        <div className={styles.body}>
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
          <div className={styles.logout}></div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
