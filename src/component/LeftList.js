import { useEffect, useRef, useState } from "react";
import axios from "axios";
import style from "../CSS/Left.module.css";

import option from "../asset/icon-option.png";
import setting from "../asset/icon-setting.png";
import edit from "../asset/icon-edit.png";
import bin from "../asset/icon-trashbin.png";
import visible from "../asset/icon-visible.png";
import add from "../asset/icon-add.png";



//host는 소켓으로 생성된 요소들 다 서버로 전송 / 사용자는 그저 받기!
function LeftList() {


  const [ModalId, setModalId] = useState(null);
  const ModalRef = useRef(null);

  const [pre, setPre] = useState(null); //선택된 블럭이 어떤 블럭인지?
  const [idCounter, setIdCounter] = useState(0);
  const [agendas, setAgendas] = useState([]);
  const [Setting, setSetting] = useState(false);


  useEffect(() => {

    const token = localStorage.getItem("accessToken");

    const testNumber1 = 1;
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/room/${testNumber1}/agenda`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {

        console.error("마이페이지 정보 가져오기 실패:", error);
      });


    function HandClickoutsideofModal(e) {
      if (ModalRef.current && !ModalRef.current.contains(e.target)) {
        setModalId(null);
      }
    }
    document.addEventListener("mousedown", HandClickoutsideofModal);

    return () => {
      document.removeEventListener("mousedown", HandClickoutsideofModal);
    }
  }, [ModalId]);



  function addAgenda() {
    setAgendas(prev => [...prev, { id: idCounter, name: "안건이름", number: "투표수" }]);
    setIdCounter(prev => prev + 1);
  }

  function handleSetting() {
    if (Setting === true) {
      setSetting(false);
    } else {
      setSetting(true);
    }

  }

  function handleBlock(e) {

    console.log(e.currentTarget.id);
    if (pre === null) {
      //클릭한적 없을시!
      setPre(e.currentTarget.id)
      document.getElementById(e.currentTarget.id).className = style.ChosenBlock;
      return;
    }
    setPre(e.currentTarget.id)
    document.getElementById(pre).className = style.Block;//이전껀 어둡게
    document.getElementById(e.currentTarget.id).className = style.ChosenBlock; //클릭한거 색입히기
  }

  function handleVisible() {
    const pw = document.getElementById("password");
    if (pw.type === "password") {
      pw.type = "text";
      return;
    }
    pw.type = "password";

  }
  return (
    <div className={style.Maindiv}>
      <div className={style.Head}>
        <div className={style.Left}>
          02/04 두먹사 회의
        </div>
        <img alt="setting" src={setting} onClick={() => handleSetting()} />
      </div>

      <hr />

      {Setting ?
        <div className={style.Setting}>
          <div className={style.SettingDiv}>
            <h2 onClick={() => handleSetting()} >+</h2>
            <form>
              <label>회의 이름 변경
                <div className={style.Input}>
                  <input />
                </div>
              </label>

              <label>방 비밀번호 변경
                <div className={style.Input}>
                  <input id="password" type="password" />
                  <img alt="visible" src={visible} onClick={() => handleVisible()} />
                </div>
              </label>
              <div className={style.Tip}>
                비밀번호를 변경하신 후에는 함께 회의 중인<br />
                팀원들에게 새 비밀번호를 꼭 공유해 주세요!
              </div>
              <button>변경하기</button>
            </form>
          </div>
        </div>
        :
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
                <img alt="option" src={option}
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalId(agenda.id);
                  }} />
                {ModalId === agenda.id &&
                  <div className={style.Modal} ref={ModalRef}>
                    <div className={style.Options}>
                      <div className={style.Edit} >
                        <img alt="edit" src={edit} />
                        이름 변경
                      </div>
                      <div className={style.Dlt} >
                        <img alt="bin" src={bin} />
                        삭제
                      </div>
                    </div>
                  </div>}

              </div>))}

          </div>
          <div className={style.Add} onClick={() => addAgenda()}>
            <img alt="add" src={add} />&nbsp;안건을 추가해주세요
          </div>
        </div>
      }
      <hr />
    </div>
  );
}

export default LeftList;
