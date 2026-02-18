import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import style from "../CSS/Header.module.css"

import copy from "../asset/icon-copy.png";
import logo from "../asset/icon-logo.png";
import out from "../asset/icon-out.png";

//웹소켓+ stomp관련된 imports
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";




//사이트 메인 아이콘 + 구글 아이콘 + 방번호 + 완료/진행중 상태
function Header({
  setLogoutmodal, setEmail, setName, setPicture,
  token, isHost, code, state, roomId, name, email, picture
}) {

  //websocket
  const BackWebsocket = `${process.env.REACT_APP_HOST_URL}/ws`;

  const navigate = useNavigate();
  const [State, setState] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const ModalRef = useRef(null);

  const clientRef = useRef(null);


  useEffect(() => {
    if (state === "running") {
      setState("running");
    } else if (state === "completed") {
      setState("completed");
    }
  }, [state]);

  useEffect(() => {

    function HandClickoutsideofModal(e) {
      if (ModalRef.current && !ModalRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", HandClickoutsideofModal);

    return () => document.removeEventListener("mousedown", HandClickoutsideofModal);
  }, [ModalRef]);

  useEffect(() => {
    const user = localStorage.getItem("userInfo");

    if (!token && !user) {
      navigate("/home");
    }

    setName(JSON.parse(user).name);
    setEmail(JSON.parse(user).email);
    setPicture(JSON.parse(user).profileUrl);

  }, []);

  //웹소켓
  useEffect(() => {

    if (!token || !roomId) return;
    console.log(token);
    const client = new Client({
      webSocketFactory: () => new SockJS(BackWebsocket),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      //다시 연결시도 빈도수
      reconnectDelay: 5000,
      debug: (str) => {
        console.log("STOMP DEBUG:", str);
      }
    });

    //연결성공시
    client.onConnect = () => {
      console.log("연결성공");
      client.subscribe(`/topic/room/state/${roomId}`, (msg) => {
        console.log(msg.body);
        const data = JSON.parse(msg.body);
        console.log(data);
        if (data === complete) {
          setState("complete");
        }else{
          setState("running");
        }
      });
    }

    //연결시도
    client.activate();

    clientRef.current = client;

    client.onStompError = (res) => {
      console.log(res);
    }

    client.onWebSocketError = () => {
      console.log("실패");
    }
    client.onWebSocketClose = () => {
      console.log("연결 끝");
    }
    if (client.connected) {
      console.log("연결되어 있음");
    }

  }, [token, roomId])

  function handleButton() {
    if (State === "running") {
      axios
        .patch(`
          ${process.env.REACT_APP_HOST_URL}/room/${roomId}/state`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        .then((res) => {
          console.log(res);
          setState("completed");
        })
        .catch((error) => {
          console.error("마이페이지 정보 가져오기 실패:", error);
        });
      return;
    }


    axios
      .patch(`
          ${process.env.REACT_APP_HOST_URL}/room/${roomId}/state`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      .then((res) => {
        console.log(res);
        setState("running");
      })
      .catch((error) => {
        console.error("마이페이지 정보 가져오기 실패:", error);
      });
  }

  function handleRoomNumber() {
    navigator.clipboard.writeText(document.getElementById("RoomNumber").innerText);
    alert("클립이 복사되었습니다!");
  }

  function backtohome() {
    navigate("/home");
  }


  return (
    <div className={style.Maindiv}>

      <div className={style.Left}>
        <img src={logo} alt="logo" onClick={() => backtohome()} />
      </div>

      <div className={style.Right}>
        <div id="state" className={State === "running" ? style.StateIng : style.StateFinish} onClick={() => isHost && handleButton()}><strong>•</strong>&nbsp;{State === "running" ? "진행중" : "완료"}</div>
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
          </div>
          <button
            onClick={() => {
              setLogoutmodal(true);
              setProfileOpen(false);
            }}>
            <img alt="out"
              src={out}
            />Logout</button>
        </div> : <></>}
      </div>

    </div>
  );
}

export default Header;


