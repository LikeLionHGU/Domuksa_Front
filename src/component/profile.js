//홈페이지 프로필 사진 눌렀을 때 나오는 창

import styles from "../CSS/Profile.module.css";
import img from "../asset/testimg.png";

function Profile() {
  return (
    <div className={styles.extradiv}>
      <div className={styles.main}>
        <div className={styles.info}>
          <img className={styles.modalImg} src={img} />
          <div className={styles.text}>
            <div className={styles.name}>대표 김진성</div>
            <div className={styles.email}>email@email.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
