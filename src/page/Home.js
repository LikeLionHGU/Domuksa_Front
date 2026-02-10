import { useEffect, useState } from "react";
import styles from "../CSS/Home.module.css";
import logoImg from "../asset/icon-logo.png";
import completeImg from "../asset/icon-complete.png";
import addImg from "../asset/icon-add_white.png";
import roomImg from "../asset/icon-meetingroom.png";
import roomHostImg from "../asset/icon-meetinghost.png";
import Profile from "../component/Profile";
import Joinpw from "../component/Joinpw";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();

  const [reset, setReset] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);
  const [pwOpen, setPwOpen] = useState(false);

  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [userId, setUserId] = useState("");

  const [rooms, setRooms] = useState([]);

  const [value, setValue] = useState("");
  const [code, setCode] = useState("");

  const testCode = "1234567890";

  function activeEnter(e) {
    if (e.key === "Enter") {
      setCode(value);
    }
  }

  function getRoomId(e) {
    localStorage.setItem("roomId", e.currentTarget.id);
    navigate("/meet");
  }

  function isRightPw() {
    if (testCode === code) {
      setPwOpen(true);
      setCode("");
    }
  }

  function isProfileOpen() {
    if (profileOpen === false) {
      setProfileOpen(true);
    } else if (profileOpen === true) {
      setProfileOpen(false);
    }
  }


  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setUserId(user.id);
    setName(user.name);
    setEmail(user.email);
    setPicture(user.profileUrl);

    if (!token || !user) {
      setReset(!reset);
      return;
    }

    axios
      .get(`${process.env.REACT_APP_HOST_URL}/user/me/running`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        userId: userId,
      })
      .then((res) => {
        setRooms(res.data);
      })
      .catch((error) => {
        console.error("마이페이지 정보 가져오기 실패:", error);
      });

    isRightPw();
  
  }, [code, reset]);

  if (!token) {
    navigate("/");
  }

  return (
    <div>
      <div className={styles.extradiv}>
        <div className={styles.Maindiv}>
          {pwOpen === true ? <Joinpw onChange={setPwOpen} code={code} /> : null}
          <div className={styles.header}>
            <img
              className={styles.logo}
              src={logoImg}
              onClick={(e) => navigate("/")}
            />

            <div></div>
            <div className={styles.profile}>
              <img
                className={styles.profileImg}
                src={picture}
                onClick={isProfileOpen}
              />
              {profileOpen === true ? (
                <Profile
                  onChange={setProfileOpen}
                  user={{ name: name, email: email, picture: picture }}
                />
              ) : null}
            </div>
          </div>

          <div className={styles.menu}>
            <div className={styles.new} onClick={(e) => navigate("/meet")}>
              <img className={styles.addBtn} src={addImg} />
            </div>

            <div className={styles.join}>
              회의 참여를 위해 코드를 입력해 주세요
              <input
                className={styles.code}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => activeEnter(e)}
              ></input>
            </div>
          </div>

          <div className={styles.process}>
            <div>진행중인 회의</div>
            <input placeholder="🔍︎ 검색"></input>
          </div>

          <div className={styles.rooms}>
            <div
              className={styles.archive}
              onClick={(e) => navigate("/archived")}
            >
              <img className={styles.completeImg} src={completeImg} />
              <div className={styles.complete}>완료됨</div>
            </div>
            {rooms.map((rooms) => (
              <div
                id={rooms.roomId}
                key={rooms.roomId}
                className={styles.room}
                onClick={(e) => getRoomId(e)}
              >
                {rooms.role === "host" ? (
                  <img className={styles.roomHostImg} src={roomHostImg} />
                ) : (
                  <img className={styles.roomImg} src={roomImg} />
                )}
                <div className={styles.roomName}>{rooms.roomName}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
