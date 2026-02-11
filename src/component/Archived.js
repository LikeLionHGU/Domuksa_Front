import { useEffect, useState } from "react";
import styles from "../CSS/Progress.module.css";
import completeImg from "../asset/icon-complete.png";
import roomImg from "../asset/icon-meetingroom.png";
import roomHostImg from "../asset/icon-meetinghost.png";
import { useNavigate } from "react-router-dom";

function Archived({ progressRoomList }) {
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

  console.log("a", progressRoomList);

  return (
    <div>
      <div className={styles.process}>
        <div></div>
        <input placeholder="🔍︎ 검색"></input>
      </div>

      <div className={styles.rooms}>
        {progressRoomList.map((progressRoomList) => (
          <div
            id={progressRoomList.roomId}
            key={progressRoomList.roomId}
            className={styles.room}
            onClick={(e) => getRoomId(e)}
          >
            {progressRoomList.role === "host" ? (
              <img className={styles.roomHostImg} src={roomHostImg} />
            ) : (
              <img className={styles.roomImg} src={roomImg} />
            )}
            <div className={styles.roomName}>{progressRoomList.roomName}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Archived;
