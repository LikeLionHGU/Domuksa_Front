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
            <div>
              2026 두먹사 회의
              <br />
              참여자 확인을 위한 4자리 숫자를 입력해 주세요
            </div>
            <div className={styles.pwInput}>
              <input></input>
              <input></input>
              <input></input>
              <input></input>
            </div>
            <div className={styles.joinBtn}>입장하기</div>
            <div>기분 좋은 회의의 시작, 두먹사가 함께합니다</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Joinpw;
