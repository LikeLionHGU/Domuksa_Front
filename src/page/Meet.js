import { useEffect, useState } from "react";

import axios from "axios";
import Left from "../component/LeftList";
import Right from "../component/RightList";
import Header from "../component/Header";
import DM from "../component/Dm.js";
import Deletemodal from "../component/Deletemodal.js";
import CreateModal from "../component/CreateRoom.js";
import LogoutModal from "../component/LogoutModal.js";

import style from "../CSS/Meet.module.css";

function Meet() {
  const [clickedAgendaId, setClickedAgendaId] = useState(null);

  const [roomId, setRoomId] = useState(null);
  const [RoomName, setRoomName] = useState(null);
  const [password, setPassword] = useState(null);
  const [Code, setCode] = useState(null);
  const [state, setState] = useState(null);
  const [token, setToken] = useState(null);

  //header state
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [picture, setPicture] = useState(null);

  const [isHost, setIshost] = useState(true);
  const [modalNew, setModalNew] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [Logoutmodal, setLogoutmodal] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const roomId = localStorage.getItem("roomId");

    if (roomId !== null) {
      axios
        .get(`${process.env.REACT_APP_HOST_URL}/room/${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCode(res.data.code);
          setState(res.data.state);
          setRoomId(res.data.roomId);
          setRoomName(res.data.roomName);

          if (res.data.role === "host") {
            setIshost(true);
          } else {
            setIshost(false);
          }
        })
        .catch((error) => {
          console.error("마이페이지 정보 가져오기 실패:", error);
        });
    }
    if (roomId === null) {
      setModalNew(true);
    }
  }, [roomId]);

  return (
    <div className={style.extradiv}>
      <div className={style.Maindiv}>
        <div className={style.Header}>
          <Header
            setName={setName}
            setEmail={setEmail}
            setPicture={setPicture}
            setLogoutmodal={setLogoutmodal}
            token={token}
            isHost={isHost}
            code={Code}
            state={state}
            roomId={roomId}
            name={name}
            email={email}
            picture={picture}
          />
        </div>
        <div className={style.Component}>
          <Left
            setRoomName={setRoomName}
            deleteModal={setDeleteModal}
            setClickedAgendaId={setClickedAgendaId}
            token={token}
            isHost={isHost}
            roomId={roomId}
            roomName={RoomName}
            clickedAgendaId={clickedAgendaId}
          />
          <Right
            RoomName={RoomName}
            token={token}
            isHost={isHost}
            roomId={roomId}
            clickedAgendaId={clickedAgendaId}
          />
        </div>
        <DM
          token={token}
          isHost={isHost}
          roomId={roomId} />
      </div>

      {modalNew && (
        <CreateModal
          setCode={setCode}
          setRoomId={setRoomId}
          setRoomName={setRoomName}
          setPassword={setPassword}
          setModalNew={setModalNew}
          token={token}
          RoomName={RoomName}
          password={password}
        />
      )}
      {deleteModal && (
        <Deletemodal
          setDeleteModal={setDeleteModal}
          token={token}
          roomId={roomId} />
      )}
      {Logoutmodal && (
        <LogoutModal
          setLogoutmodal={setLogoutmodal}
          setName={setName}
          setEmail={setEmail}
          setPicture={setPicture}
          token={token}
        />
      )}
    </div>
  );
}

export default Meet;
