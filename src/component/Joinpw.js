//홈페이지 프로필 사진 눌렀을 때 나오는 창
import { useRef, useState } from "react";

import styles from "../CSS/Joinpw.module.css";

import deleteIcon from "../asset/icon-delete.png";
import logoutIcon from "../asset/icon-logout.png";

function Joinpw({ onChange }) {
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);

  function changeInput(e) {
    if (e.target.value.length === 1) {
      switch (e.target.name) {
        case "pw1":
          inputRef2.current.focus();
          break;
        case "pw2":
          inputRef3.current.focus();
          break;
        case "pw3":
          inputRef4.current.focus();
          break;
        default:
          break;
      }
    }
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
                name="pw1"
                type="password"
                maxLength="1"
                ref={inputRef1}
                onChange={changeInput}
              ></input>
              <input
                className={styles.pw}
                name="pw2"
                type="password"
                maxLength="1"
                ref={inputRef2}
                onChange={changeInput}
              ></input>
              <input
                className={styles.pw}
                name="pw3"
                type="password"
                maxLength="1"
                ref={inputRef3}
                onChange={changeInput}
              ></input>
              <input
                className={styles.pw}
                name="pw4"
                type="password"
                maxLength="1"
                ref={inputRef4}
                onChange={changeInput}
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
