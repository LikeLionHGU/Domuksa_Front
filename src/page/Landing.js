import GoogleLogin from "../component/loginPage";
import styles from "../CSS/Landing.module.css";
import logoImg from "../asset/icon-logo.png";
import landingBg from "../asset/background_line-landing.png";
import file from "../asset/Mainicon-color-file.png";
import comment from "../asset/Mainicon-color-comment.png";
import vote from "../asset/Mainicon-color-vote.png";
import ai from "../asset/Mainicon-color-Ai.png";
import people from "../asset/icon-people-blue.png";
import glass from "../asset/icon-glass.png";
import clock from "../asset/icon-clock.png";
import dm from "../asset/icon-dm-landing.png";

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
            <img className={styles.logoImg} src={logoImg} alt="이음 로고" />
            <div className={styles.dms}>두먹사</div>
            <div className={styles.emmm}>이음</div>
            <div className={styles.service}>서비스</div>
            <div className={styles.ask}>문의</div>
            <GoogleLogin />
          </div>

          <div className={styles.first}>
            <img className={styles.line} src={landingBg} alt="라인" />

            <img className={styles.people} src={people} alt="사람들" />
            <img className={styles.glass} src={glass} alt="돋보기" />
            <img className={styles.clock} src={clock} alt="시계" />
            <img className={styles.dm} src={dm} alt="디엠" />

            <div className={styles.icon}>
              <div className={styles.progress}>• 진행중</div>
              <img className={styles.file} src={file} alt="파일" />
              <img className={styles.comment} src={comment} alt="코멘트" />
              <img className={styles.vote} src={vote} alt="투표" />
              <img className={styles.ai} src={ai} alt="ai" />
              <div className={styles.complete}>• 완료</div>
            </div>

            <div className={styles.firstText}>
              <div className={styles.textEmmm}>이음</div>
              <div className={styles.text2}>
                침묵은 짧게, 아이디어는 깊게, 회의의 흐름을 잇다
              </div>
              <div className={styles.start}>
                시작하기
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
