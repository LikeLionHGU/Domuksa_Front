import { useEffect, useRef, useState } from "react";
import style from "../CSS/Header.module.css"
import copy from "../asset/icon-copy.png";
import profileicon from "../asset/profile-test.png";
import logo from "../asset/icon-logo.png";

//사이트 메인 아이콘 + 구글 아이콘 + 방번호 + 완료/진행중 상태
function Header() {

  const [buttonWord,setButtonword]=useState("진행중");

  function handleButton(){
    if(buttonWord=="진행중"){
      setButtonword("완료");
      document.getElementById("state").className=style.StateFinish;
      return;
    }
    setButtonword("진행중");
    document.getElementById("state").className=style.StateIng;
  }

  function handleRoomNumber(){
    navigator.clipboard.writeText(document.getElementById("RoomNumber").innerText);
    alert("클립이 복사되었습니다!");
  }
  return (
    <div className={style.Maindiv}>

      <div className={style.Left}>
        <img src={logo}/>
      </div>

      <div className={style.Right}>
        <div id="state" className={style.StateIng} onClick={()=>handleButton()}><strong>•</strong>&nbsp;{buttonWord}</div>
        <div id="RoomNumber" className={style.Number} onClick={()=>handleRoomNumber()}>handong123<img src={copy}/></div>
        <img src={profileicon}/>
      </div>
    </div>
  );
}

export default Header;


