import { useEffect, useState } from "react";
import styles from "../CSS/Home.module.css";
import logoImg from "../asset/icon-logo.png";
import completeImg from "../asset/icon-complete.png";
import roomImg from "../asset/icon-meetingroom.png";
import Profile from "../component/Profile";
import Joinpw from "../component/Joinpw";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [pwOpen, setPwOpen] = useState(false);

  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [value, setValue] = useState("");
  const [code, setCode] = useState("");

  const testCode = "1234567890";

  const [room, setRoom] = useState([]);

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      setCode(value);
    }
  };

  function isRightPw() {
    if (testCode === code) {
      setPwOpen(true);
      setCode("");
    }
  }

  function isProfileOpen() {
    if (profileOpen == false) {
      setProfileOpen(true);
    } else if (profileOpen == true) {
      setProfileOpen(false);
    }
  }

  function goArchived() {
    navigate("/archived");
  }

  function goNew() {
    navigate("/meet");
  }

  function goLanding() {
    navigate("/");
  }

  useEffect(() => {
    isRightPw();
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return;
    }
    if (token) {
      const user = JSON.parse(localStorage.getItem("userInfo"));

      setName(user.name);
      setEmail(user.email);
      setPicture(user.profileUrl);
    }
  }, [code]);

  console.log(code);

  return (
    <div>
      <div className={styles.extradiv}>
        <div className={styles.Maindiv}>
          {pwOpen === true ? <Joinpw onChange={setPwOpen} code={code} /> : null}
          <div className={styles.header}>
            <img className={styles.logo} src={logoImg} onClick={goLanding} />

            <div></div>
            <div className={styles.profile}>
              <img
                className={styles.prifileImg}
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
            <div className={styles.new} onClick={goNew}>
              +
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
            <div className={styles.archive} onClick={goArchived}>
              <img className={styles.completeImg} src={completeImg} />
              <div className={styles.complete}>완료됨</div>
            </div>
            <div className={styles.room}>
              <img className={styles.roomImg} src={roomImg} />
              <div className={styles.roomName}>2025 두먹사 회의</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
