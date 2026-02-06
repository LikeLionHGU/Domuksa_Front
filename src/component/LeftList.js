import { useState } from "react";
import style from "../CSS/Left.module.css";
import option from "../asset/icon-option.png";
import setting from "../asset/icon-setting.png";

import add from "../asset/icon-add.png";
//방이름 
//더블 클릭 하면 이름 수정 할수있게 (input/p)전환
//현재 방장이 진행중인값을 저장 그리고 css수정
function LeftList() {
  const [pre, setPre] = useState("1"); //선택된 블럭이 어떤 블럭인지?

  function handleBlock(e) {
    const now = e.currentTarget;
    if (now.id == pre) {
      return;
    }
    document.getElementById(pre).className = style.Block;
    setPre(now.id);
    document.getElementById(now.id).className  = style.ChosenBlock;
  }
  return (
    <div className={style.Maindiv}>
      <div className={style.Head}>
        <div className={style.Left}>
          02/04 두먹사 회의
        </div>
        <img src={setting} />
      </div>
      <hr />
      <div className={style.Agenda}>
        <div className={style.List}>
          <div
            id="1"
            className={style.ChosenBlock}
            onClick={(event) => handleBlock(event)}
          >
            <div className={style.Left}>
              • 안건 1
            </div>
            <img src={option}
              onClick={(e) => {
                e.stopPropagation();
              }} />
          </div>
          <div
            id="2"
            className={style.Block}
            onClick={(e) => handleBlock(e)}
          >
            <div className={style.Left}>
              • 안건 1
            </div>
            <img src={option}
              onClick={(e) => {
                e.stopPropagation();
              }} />
          </div>
        </div>
        <div className={style.Add}>
          <img src={add} />&nbsp;안건을 추가해주세요
        </div>
      </div>
      <div className={style.End}>
        <hr />
      </div>

    </div>
  );
}

export default LeftList;
