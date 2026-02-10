import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import style from "../CSS/Header.module.css"

import copy from "../asset/icon-copy.png";
import logo from "../asset/icon-logo.png";
import out from "../asset/icon-out.png";

//사이트 메인 아이콘 + 구글 아이콘 + 방번호 + 완료/진행중 상태
function Header({code}) {

  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [picture, setPicture] = useState(null);

  const [buttonWord, setButtonword] = useState("진행중");
  const [profileOpen, setProfileOpen] = useState(false);
  const ModalRef = useRef(null);


  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("userInfo");

    if (token === null && user === null) {
      navigate("/home");
    }

    setName(JSON.parse(user).name);
    setEmail(JSON.parse(user).email);
    setPicture(JSON.parse(user).profileUrl);

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

    function HandClickoutsideofModal(e) {
      if (ModalRef.current && !ModalRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", HandClickoutsideofModal);

    return () => document.removeEventListener("mousedown", HandClickoutsideofModal);
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

  function Logout() {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("roomId");
  }

  function backtohome() {
    navigate("/home");
  }

  return (
    <div className={style.Maindiv}>

      <div className={style.Left}>
        <img src={logo} alt="logo" onClick={()=>backtohome()}/>
      </div>

      <div className={style.Right}>
        <div id="state" className={style.StateIng} onClick={() => handleButton()}><strong>•</strong>&nbsp;{buttonWord}</div>
        <div id="RoomNumber" className={style.Number} onClick={() => handleRoomNumber()}>{code}<img alt="copy" src={copy} /></div>
        <img alt="profileicon" src={picture} onClick={() => setProfileOpen(true)} />

        {/*--> 모달 <--*/}
        {profileOpen ? <div className={style.ProfileModal} ref={ModalRef}>
          <div className={style.Maindiv}>
            <div className={style.Subdiv}>
              <img src={picture} alt="googleicon" />
              <div className={style.ModalInfo}>
                <div className={style.Name}>{name}</div>
                <span>{email}</span>
              </div>
            </div>
            <h2 onClick={() => setProfileOpen(false)}>+</h2>
          </div>
          <button onClick={() => Logout()}><img alt="out" src={out} />Logout</button>
        </div> : <></>}
      </div>

    </div>
  );
}

export default Header;


