import { useState } from "react";
import style from "../CSS/Left.module.css";
import option from "../asset/icon-option.png";
import setting from "../asset/icon-setting.png";

import add from "../asset/icon-add.png";


//host는 소켓으로 생성된 요소들 다 서버로 전송 / 사용자는 그저 받기!
function LeftList() {
  const [pre, setPre] = useState(""); //선택된 블럭이 어떤 블럭인지?

  const [idCounter, setIdCounter] = useState(0);
  const [agendas, setAgendas] = useState([]);

  function addAgenda() {
    setAgendas(prev => [...prev, { id: idCounter, name: "안건이름", number: "투표수" }]);
    setIdCounter(prev => prev + 1);
  }

  function handleBlock(e) {

    console.log(e.currentTarget.id);
    if (pre == "") {
      //클릭한적 없을시!
      setPre(e.currentTarget.id)
      document.getElementById(e.currentTarget.id).className = style.ChosenBlock;
      return;
    }
    setPre(e.currentTarget.id)
    document.getElementById(pre).className = style.Block;//이전껀 어둡게
    document.getElementById(e.currentTarget.id).className = style.ChosenBlock; //클릭한거 색입히기
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
          {agendas.map((agenda) => (
            <div
              key={agenda.id}
              id={agenda.id}
              className={style.Block}
              onClick={(event) => handleBlock(event)}
            >
              <div className={style.Text}>
                <span>•</span> {agenda.name}
              </div>
              <img src={option}
                onClick={(e) => {
                  e.stopPropagation();
                }} />
            </div>
          ))}
        </div>
        <div className={style.Add} onClick={() => addAgenda()}>
          <img src={add} />&nbsp;안건을 추가해주세요
        </div>
      </div>

      <hr />

    </div>
  );
}

export default LeftList;
