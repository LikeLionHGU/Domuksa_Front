//홈페이지 프로필 사진 눌렀을 때 나오는 창

import styles from "../CSS/Joinpw.module.css";

import deleteIcon from "../asset/icon-delete.png";
import logoutIcon from "../asset/icon-logout.png";

function Joinpw({ onChange }) {
  function goto_next(current_field, next_field) {
    if (current_field.value.length >= 1) next_field.focus();
  }
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
            <div className={styles.title}>
              2026 두먹사 회의
              <br />
              <span>참여자 확인을 위한 4자리 숫자를 입력해 주세요</span>
            </div>
            <div className={styles.pwInput}>
              <input
                className={styles.pw}
                name={pw1}
                type="password"
                maxLength="1"
                onkeyup={goto_next(this, pw2)}
              ></input>
              <input
                className={styles.pw}
                name={pw2}
                type="password"
                maxLength="1"
                onkeyup={goto_next(this, pw3)}
              ></input>
              <input
                className={styles.pw}
                name="pw3"
                type="password"
                maxLength="1"
              ></input>
              <input
                className={styles.pw}
                type="password"
                name="pw4"
                maxLength="1"
              ></input>
            </div>
            <div className={styles.joinBtn}>입장하기</div>
            <div className={styles.lowText}>
              기분 좋은 회의의 시작, 두먹사가 함께합니다
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Joinpw;
