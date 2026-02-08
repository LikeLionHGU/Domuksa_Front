//홈페이지 프로필 사진 눌렀을 때 나오는 창

import styles from "../CSS/Joinpw.module.css";

import deleteIcon from "../asset/icon-delete.png";
import logoutIcon from "../asset/icon-logout.png";

function Joinpw({ onChange }) {

  return (
    <div>
      <div className={styles.extradiv}>
        <div className={styles.maindiv}>
          <div className={styles.modal}>
            <img
              className={styles.deleteIcon}
              src={deleteIcon}
              onClick={() => onChange(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Joinpw;
