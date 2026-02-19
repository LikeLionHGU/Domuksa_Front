import styles from "../CSS/Archive.module.css";
import backIcon from "../asset/icon-backArrow.png";
import roomImg from "../asset/icon-meetingroom.png";
import roomHostImg from "../asset/icon-meetinghost.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Archived({ onChange, completeRoomList }) {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  function getRoomId(e) {
    localStorage.setItem("roomId", e.currentTarget.id);
    navigate("/meet");
  }

  return (
    <div>
      <div className={styles.extradiv}>
        <div className={styles.Maindiv}>
          <div className={styles.archiveHeader}>
            <img
              className={styles.backIcon}
              src={backIcon}
              alt="뒤로가기"
              onClick={(e) => onChange(false)}
            />
            <input
              placeholder="🔍︎ 검색"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            ></input>
          </div>

          <div className={styles.rooms}>
            {completeRoomList
              .filter((completeRoomList) => {
                if (searchTerm === "") {
                  return completeRoomList;
                } else if (
                  completeRoomList.roomName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return completeRoomList;
                }
              })
              .map((completeRoomList) => (
                <div
                  id={completeRoomList.roomId}
                  key={completeRoomList.roomId}
                  className={styles.room}
                  onClick={(e) => getRoomId(e)}
                >
                  {completeRoomList.role === "host" ? (
                    <img
                      className={styles.roomHostImg}
                      src={roomHostImg}
                      alt="호스트룸"
                    />
                  ) : (
                    <img
                      className={styles.roomImg}
                      src={roomImg}
                      alt="참여자룸"
                    />
                  )}
                  <div className={styles.roomName}>
                    {completeRoomList.roomName.length > 9
                      ? `${completeRoomList.roomName.slice(0, 9)}...`
                      : completeRoomList.roomName}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Archived;
