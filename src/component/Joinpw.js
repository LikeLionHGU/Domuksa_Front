//홈페이지 프로필 사진 눌렀을 때 나오는 창
import { useRef, useState } from "react";

import styles from "../CSS/Joinpw.module.css";

import deleteIcon from "../asset/icon-delete.png";

function Joinpw({ onChange }) {
  const testPw = "1234";

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);

  const [inputNum, setInputNum] = useState([]);
  const [password, setPassword] = useState("");

  function onDelete(e) {
    switch (e.target.name) {
      case "pw1":
        if (e.keyCode == 8 || e.keyCode == 46) {
          e.preventDefault();
          if (e.target.value) e.target.value = "";
        }
        break;
      case "pw2":
        if (e.keyCode == 8) {
          e.preventDefault();
          if (e.target.value) e.target.value = "";
          inputRef1.current.focus();
        }
        break;
      case "pw3":
        if (e.keyCode == 8 || e.keyCode == 46) {
          e.preventDefault();
          if (e.target.value) e.target.value = "";
          inputRef2.current.focus();
        }
        break;
      case "pw4":
        if (e.keyCode == 8 || e.keyCode == 46) {
          e.preventDefault();
          if (e.target.value) e.target.value = "";
          inputRef3.current.focus();
        }
        break;
      default:
        break;
    }
  }

  function onInput(e) {
    if (e.target.value.length === 1) {
      const value = e.target.value;
      const cleanedNumber = value.replace(/\D/g, "");
      switch (e.target.name) {
        case "pw1":
          if (cleanedNumber.length === 0) {
            e.target.value = "";
            return;
          }
          inputNum[0] = e.target.value;
          inputRef2.current.focus();
          break;
        case "pw2":
          if (cleanedNumber.length === 0) {
            e.target.value = "";
            return;
          }
          inputNum[1] = e.target.value;
          inputRef3.current.focus();
          break;
        case "pw3":
          if (cleanedNumber.length === 0) {
            e.target.value = "";
            return;
          }
          inputNum[2] = e.target.value;
          inputRef4.current.focus();
          break;
        case "pw4":
          if (cleanedNumber.length === 0) {
            e.target.value = "";
            return;
          }
          inputNum[3] = e.target.value;
          break;
        default:
          break;
      }
    }

    console.log(inputNum);

    setPassword(inputNum.join(""));

    // if(password !== testPw){
    //   inputRef1.current.focus();
    //   setInputNum("");
    // }
  }

  console.log(password);

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
                onChange={onInput}
                onKeyDown={onDelete}
              ></input>
              <input
                className={styles.pw}
                name="pw2"
                type="password"
                maxLength="1"
                ref={inputRef2}
                onChange={onInput}
                onKeyDown={onDelete}
              ></input>
              <input
                className={styles.pw}
                name="pw3"
                type="password"
                maxLength="1"
                ref={inputRef3}
                onChange={onInput}
                onKeyDown={onDelete}
              ></input>
              <input
                className={styles.pw}
                name="pw4"
                type="password"
                maxLength="1"
                ref={inputRef4}
                onChange={onInput}
                onKeyDown={onDelete}
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
