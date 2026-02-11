import { useEffect, useState } from "react";
import styles from "../CSS/Home.module.css";
import logoImg from "../asset/icon-logo.png";
import completeImg from "../asset/icon-complete.png";
import addImg from "../asset/icon-add_white.png";
import roomImg from "../asset/icon-meetingroom.png";
import roomHostImg from "../asset/icon-meetinghost.png";
import Profile from "../component/Profile";
import Progress from "../component/Progress";
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
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  const [value, setValue] = useState("");
  const [code, setCode] = useState("");

  function activeEnter(e) {
    if (e.key === "Enter") {
      setCode(value);
    }
  }

  function isRightPw() {
    if (code === rooms.code) {
      setPwOpen(true);
      setCode("");
    }

    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].code === code) {
        setPwOpen(true);
        setCode("");
      }
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
  }, [reset]);

  useEffect(() => {
    isRightPw();
  }, [code]);

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
          <Progress user={{ token: token, userId: userId }} roomList={rooms} />
          {/* {isArchiveOpen === false ? (
            
          ) : null} */}
        </div>
      </div>
    </div>
  );
}

export default Home;
