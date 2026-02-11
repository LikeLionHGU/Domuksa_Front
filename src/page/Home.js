import { useEffect, useState } from "react";
import styles from "../CSS/Home.module.css";
import logoImg from "../asset/icon-logo.png";
import addImg from "../asset/icon-add_white.png";
import Profile from "../component/Profile";
import Progress from "../component/Progress";
import Archived from "../component/Archived";
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

  const [progressRooms, setProgressRooms] = useState([]);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isEnter, setIsEnter] = useState(false);

  const [value, setValue] = useState("");
  const [code, setCode] = useState("");

  const [roomId, setRoomId] = useState("");
  const [isPassword, setIsPassword] = useState(false);

  function activeEnter(e) {
    if (e.key === "Enter") {
      setCode(value);
      setIsEnter(!isEnter);
    }
  }

  function joinRoom() {

  }

  function isProfileOpen() {
    if (profileOpen === false) {
      setProfileOpen(true);
    } else if (profileOpen === true) {
      setProfileOpen(false);
    }
  }

  useEffect(() => {
    localStorage.removeItem("roomId");
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
        setProgressRooms(res.data);
      })
      .catch((error) => {
        console.error("진행중인 룸 정보 가져오기 실패:", error);
      });
  }, [reset]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/room/code?code=${code}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        code: code,
      })
      .then((res) => {
        setRoomId(res.data.roomId);
        setIsPassword(res.data.password);
      })
      .catch((error) => {
        console.error("룸 입장 코드 가져오기 실패:", error);
      });
  }, [isEnter]);

  return (
    <div>
      <div className={styles.extradiv}>
        <div className={styles.Maindiv}>
          {pwOpen === true ? <Joinpw onChange={setPwOpen} code={code} /> : null}
          <Joinpw onChange={setPwOpen} code={code} />
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

          {isArchiveOpen === true ? (
            <Archived
              onChange={setIsArchiveOpen}
              progressRoomList={progressRooms}
            />
          ) : null}

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

          {isArchiveOpen === false ? (
            <Progress
              onChange={setIsArchiveOpen}
              progressRoomList={progressRooms}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Home;
