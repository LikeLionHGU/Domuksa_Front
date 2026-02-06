
import style from "../CSS/Header.module.css"
import copy from "../asset/icon-copy.png";
import profileicon from "../asset/profile-test.png";
//사이트 메인 아이콘 + 구글 아이콘 + 방번호 + 완료/진행중 상태
function Header() {
  return (
    <div className={style.Maindiv}>

      <div className={style.Left}>
        <img/>
        <h3>Emmm</h3>
      </div>

      <div className={style.Right}>
        <div className={style.StateBox}><strong>•</strong>&nbsp;&nbsp;진행중</div>
        <div className={style.Number}>1234&nbsp;-&nbsp;5678&nbsp;-&nbsp;90  <img src={copy}/></div>
        <img src={profileicon}/>
      </div>
    </div>
  );
}

export default Header;


