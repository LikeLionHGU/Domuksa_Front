import { useEffect, useState } from "react";
import styles from "../CSS/Progress.module.css";
import completeImg from "../asset/icon-complete.png";
import roomImg from "../asset/icon-meetingroom.png";
import roomHostImg from "../asset/icon-meetinghost.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Progress({ user, roomList }) {
  const navigate = useNavigate();

  // 나중에 검색창 만들때 써야됨
  //   function activeEnter(e) {
  //     if (e.key === "Enter") {
  //       setCode(value);
  //     }
  //   }

  function getRoomId(e) {
    localStorage.setItem("roomId", e.currentTarget.id);
    navigate("/meet");
  }

  return (
    <div>
      <div className={styles.process}>
        <div>진행중인 회의</div>
        <input placeholder="🔍︎ 검색"></input>
      </div>

      <div className={styles.rooms}>
        <div className={styles.archive} onClick={(e) => navigate("/archived")}>
          <img className={styles.completeImg} src={completeImg} />
          <div className={styles.complete}>완료됨</div>
        </div>
        {roomList.map((roomList) => (
          <div
            id={roomList.roomId}
            key={roomList.roomId}
            className={styles.room}
            onClick={(e) => getRoomId(e)}
          >
            {roomList.role === "host" ? (
              <img className={styles.roomHostImg} src={roomHostImg} />
            ) : (
              <img className={styles.roomImg} src={roomImg} />
            )}
            <div className={styles.roomName}>{roomList.roomName}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Progress;
