import GoogleLogin from "../component/loginPage";
import styles from "../CSS/Landing.module.css";
import logoImg from "../asset/icon-logo.png"

function Landing() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("memberId");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("roomId");

  return (
    <>
      <div className={styles.extradiv}>
        <div className={styles.Maindiv}>
          <div className={styles.menu}>
            <img className={styles.logoImg} src={logoImg} />
            <div className={styles.dms}>두먹사</div>
            <div className={styles.emmm}>이음</div>
            <div className={styles.service}>서비스</div>
            <div className={styles.ask}>문의</div>
            <GoogleLogin />
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
