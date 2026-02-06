import { useState } from "react";
import styles from "../CSS/Home.module.css";
import logoImg from "../asset/icon-logo.png";
import profileImg from "../asset/profile-test.png";
import completeImg from "../asset/icon-complete.png";
import Profile from "../component/Profile";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  function isOpen() {
    if (open == true) {
      setOpen(false);
    } else {
      setOpen(true);
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

  console.log(open);

  return (
    <div>
      <div className={styles.extradiv}>
        <div className={styles.Maindiv}>
          <div className={styles.header}>
            <img className={styles.logo} src={logoImg} onClick={goLanding} />

            <div></div>
            <div className={styles.profile} onClick={isOpen}>
              <img className={styles.prifileImg} src={profileImg} />
              {open === true ? <Profile /> : null}
            </div>
          </div>

          <div className={styles.menu}>
            <div className={styles.new} onClick={goNew}>
              +
            </div>

            <div className={styles.join}>
              회의 참여를 위해 코드를 입력해 주세요
              <input></input>
            </div>
          </div>

          <div className={styles.process}>
            <div>진행중인 회의</div>
            <input placeholder="검색"></input>
          </div>

          <div className={styles.rooms}>
            <div className={styles.archive} onClick={goArchived}>
              <img className={styles.completeImg} src={completeImg} />
              <div className={styles.complete}>완료됨</div>
            </div>
            <div className={styles.room}></div>
            <div className={styles.room}></div>
            <div className={styles.room}></div>
            <div className={styles.room}></div>
            <div className={styles.room}></div>
            <div className={styles.room}></div>
            <div className={styles.room}></div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
