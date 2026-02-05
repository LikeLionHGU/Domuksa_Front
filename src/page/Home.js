import { useState } from "react";
import styles from "../CSS/Home.module.css";
import img from "../asset/testimg.png";
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

  console.log(open);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img className={styles.logoImg} src={img} />
          <p>Emmm</p>
        </div>
        <div className={styles.profile} onClick={isOpen}>
          <img className={styles.homeImg} src={img} />
          {open === true ? <Profile /> : null}
        </div>
      </div>

      <div className={styles.menu}>
        <div className={styles.left} onClick={goNew}>+</div>
        <div className={styles.right}>
          <div className={styles.join}>
            Enter Code to Join Meeting
            <input></input>
          </div>
          <div className={styles.archive} onClick={goArchived}>
            archived
          </div>
        </div>
      </div>
      <div>
        In Process
        <input></input>
      </div>
    </div>
  );
}

export default Home;
