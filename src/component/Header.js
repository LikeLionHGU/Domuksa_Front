import { useEffect, useRef, useState } from "react";
import axios from "axios";

import style from "../CSS/Header.module.css"

import copy from "../asset/icon-copy.png";
import profileicon from "../asset/profile-test.png";
import logo from "../asset/icon-logo.png";
import out from "../asset/icon-out.png";


//사이트 메인 아이콘 + 구글 아이콘 + 방번호 + 완료/진행중 상태
function Header() {

  const [buttonWord, setButtonword] = useState("진행중");
  const [profileOpen, setProfileOpen] = useState(false);
  const ModalRef=useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const testNumber1 = 1;
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/room/${testNumber1}/${testNumber1}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {

        console.error("마이페이지 정보 가져오기 실패:", error);
      });

      function HandClickoutsideofModal(e){
        if(ModalRef.current&&!ModalRef.current.contains(e.target)){
          setProfileOpen(false);
        }
      }

      document.addEventListener("mousedown",HandClickoutsideofModal);

      return ()=> document.removeEventListener("mousedown",HandClickoutsideofModal);
  }, [ModalRef]);



  function handleButton() {
    if (buttonWord === "진행중") {
      setButtonword("완료");
      document.getElementById("state").className = style.StateFinish;
      return;
    }
    setButtonword("진행중");
    document.getElementById("state").className = style.StateIng;
  }

  function handleRoomNumber() {
    navigator.clipboard.writeText(document.getElementById("RoomNumber").innerText);
    alert("클립이 복사되었습니다!");
  }
  return (
    <div className={style.Maindiv}>

      <div className={style.Left}>
        <img src={logo} alt="logo"/>
      </div>

      <div className={style.Right}>
        <div id="state" className={style.StateIng} onClick={() => handleButton()}><strong>•</strong>&nbsp;{buttonWord}</div>
        <div id="RoomNumber" className={style.Number} onClick={() => handleRoomNumber()}>handong123<img alt="copy" src={copy} /></div>
        <img alt="profileicon" src={profileicon} onClick={() => setProfileOpen(true)} />

        {/*--> 모달 <--*/}
        {profileOpen ? <div className={style.ProfileModal} ref={ModalRef}>
          <div className={style.Maindiv}>
            <div className={style.Subdiv}>
              <img alt="googleicon"/>
              <div className={style.ModalInfo}>
                <div className={style.Name}>unknown 1234</div>
                <span>undo@handong.ac.kr</span>
              </div>
            </div>
            <h2 onClick={() => setProfileOpen(false)}>+</h2>
          </div>
          <button><img alt="out" src={out} />회의 나가기</button>
        </div> : <></>}

      </div>

    </div>
  );
}

export default Header;


