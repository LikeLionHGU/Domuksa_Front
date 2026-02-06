
import style from "../CSS/Left.module.css";
import option from "../asset/icon-option.png";
import setting from "../asset/icon-setting.png";
//방이름 
//더블 클릭 하면 이름 수정 할수있게 (input/p)전환
//현재 방장이 진행중인값을 저장 그리고 css수정
function LeftList() {
  return (
    <div className={style.Maindiv}>
      <div className={style.RoomName}>
          <div className={style.Left}>
            02/04 두먹사 회의
          </div>
          <img src={setting}/>
        </div>
      <hr />
      <div className={style.List}>
        <div className={style.ChosenBlock}>
          <div className={style.Left}>
            • 안건 1
          </div>
          <img src={option} />
        </div>
        <div className={style.Block}>
          <div className={style.Left}>
            • 안건 1
          </div>
          <img src={option} />
        </div>
        <div className={style.Block}>
          <div className={style.Left}>
            • 안건 1
          </div>
          <img />
        </div>
        <div className={style.Block}>
          <div className={style.Left}>
            • 안건 1
          </div>
          <img />
        </div>
        <div className={style.Block}>
          <div className={style.Left}>
            • 안건 1
          </div>
          <img />
        </div>
        <div className={style.Block}>
          <div className={style.Left}>
            • 안건 1
          </div>
          <img />
        </div>
      </div>
      <hr />
    </div>
  );
}

export default LeftList;
