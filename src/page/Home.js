import { useEffect, useState } from "react";
import styles from "../CSS/Home.module.css";
import logoImg from "../asset/icon-logo.png";
import addImg from "../asset/icon-add_white.png";
import Profile from "../component/Profile";
import Progress from "../component/Progress";
import Archived from "../component/Archived";
import Joinpw from "../component/Joinpw";
import LogoutModal from "../component/LogoutModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();

  const [reset, setReset] = useState(false);

  const [Logoutmodal, setLogoutmodal] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);
  const [pwOpen, setPwOpen] = useState(false);

  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [userId, setUserId] = useState("");

  const [progressRooms, setProgressRooms] = useState([]);
  const [completeRooms, setCompleteRooms] = useState([]);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isEnter, setIsEnter] = useState(false);

  const [value, setValue] = useState("");
  const [code, setCode] = useState("");

  const [roomId, setRoomId] = useState("");
  const [isPassword, setIsPassword] = useState(false);

  function activeEnter(e) {
    if (e.key === "Enter") {
      setCode(value);
      console.log(code);
      setIsEnter(!isEnter);
    }
  }

  function joinRoom() {
    if (isPassword === true) {
      setPwOpen(true);
      setIsPassword(!isPassword);
    } else if (isPassword === false) {
      if (roomId) localStorage.setItem("roomId", roomId);
      const check = localStorage.getItem("roomId");
      if (check) navigate("/meet");
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
        console.error("진행중인 룸 상태 정보 가져오기 실패:", error);
      });

    axios
      .get(`${process.env.REACT_APP_HOST_URL}/user/me/complete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        userId: userId,
      })
      .then((res) => {
        setCompleteRooms(res.data);
      })
      .catch((error) => {
        console.error("완료된 룸 상태 정보 가져오기 실패:", error);
      });
  }, [reset]);

  useEffect(() => {
    if (code) {
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
    }

    joinRoom();
  }, [isEnter]);

  return (
    <div>
      <div className={styles.extradiv}>
        <div className={styles.Maindiv}>
          {pwOpen === true ? (
            <Joinpw
              onChange={setPwOpen}
              code={code}
              token={token}
              roomId={roomId}
            />
          ) : null}

          {Logoutmodal === true ? (
            <LogoutModal
              setLogoutmodal={setLogoutmodal}
              setName={setName}
              setEmail={setEmail}
              setPicture={setPicture}
            />
          ) : null}
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
                  Logoutmodal={setLogoutmodal}
                  user={{ name: name, email: email, picture: picture }}
                />
              ) : null}
            </div>
          </div>

          {isArchiveOpen === true ? (
            <Archived
              onChange={setIsArchiveOpen}
              completeRoomList={completeRooms}
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
