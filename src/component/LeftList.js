import { useEffect, useRef, useState } from "react";
import axios from "axios";
import style from "../CSS/Left.module.css";

import Timer from "./Timer";

import tip from "../asset/icon-tip-red.png";
import setting from "../asset/icon-setting.png";
import edit from "../asset/icon-edit.png";
import bin from "../asset/icon-trashbin.png";
import visible from "../asset/icon-visible.png";
import add from "../asset/icon-add.png";

function LeftList({ roomId, roomName, deleteModal, setClickedAgendaId, clickedAgendaId }) {

  const token = localStorage.getItem("accessToken");

  //[안건]
  const [blockNumber, setBlockNumber] = useState(null);
  const [agendas, setAgendas] = useState([]);

  //[현재 안건]

  //[안건이름변경]
  const [Changed, setChanged] = useState(null);

  //[방설정]
  const [Setting, setSetting] = useState(false);

  //[모달]
  const [ModalId, setModalId] = useState(null);

  const ModalRef = useRef(null);
  const inputRef = useRef(null);


  useEffect(() => {
    function HandClickoutsideofModal(e) {
      if (ModalRef.current && !ModalRef.current.contains(e.target)) {
        setModalId(null);
      }
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setChanged(null);
      }
    }
    document.addEventListener("mousedown", HandClickoutsideofModal);

    return () => {
      document.removeEventListener("mousedown", HandClickoutsideofModal);
    }
  }, [ModalId, inputRef]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_HOST_URL}/room/${roomId}/agenda`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      .then((res) => {
        const format = res.data.map(item => ({
          id: item.agenda.agendaId,
          name: item.agenda.name,
        }));
        setAgendas(format);
        format.length > 0 && setClickedAgendaId(format[0].id);
      })
      .catch((error) => {
        console.error("마이페이지 정보 가져오기 실패:", error);
      });

  }, [roomId]);

  useEffect(() => {
    if (clickedAgendaId !== null) { //아직 첫 안건 번호가 없다면, 실행하지 않는다, 첫안건 번호 세팅후 실행
      setBlockNumber(clickedAgendaId)
      document.getElementById(clickedAgendaId).className = style.ChosenBlock; //첫 안건 자동 선택
    }
  }, [clickedAgendaId]);

  function handleSetting() {
    if (Setting === true) {
      setSetting(false);
    } else {
      setSetting(true);
    }
  }
  function handleBlock(e) {
    if (blockNumber === null) {
      //클릭한적 없을시!
      setBlockNumber(e.currentTarget.id);
      setClickedAgendaId(e.currentTarget.id);
      document.getElementById(e.currentTarget.id).className = style.ChosenBlock;
    } else {
      setBlockNumber(e.currentTarget.id);
      document.getElementById(blockNumber).className = style.Block;//이전껀 어둡게
    }
    setClickedAgendaId(e.currentTarget.id);
    document.getElementById(e.currentTarget.id).className = style.ChosenBlock; //클릭한거 색입히기
  }

  function handleOption(e, id) {
    setModalId(id);
    e.stopPropagation();
  }
  function handleVisible() {
    const pw = document.getElementById("password");
    if (pw.type === "password") {
      pw.type = "text";
      return;
    }
    pw.type = "password";
  }

  //방 functions
  function handleEditRoom(e) {
    const newRoomName = e.target.querySelector("#newRoomName").value;
    const newPassword = e.target.querySelector("#newPassword").value;
    axios
      .patch(`${process.env.REACT_APP_HOST_URL}/room/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        name: newRoomName,
        password: newPassword,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setSetting(false);
        }
      })
      .catch((error) => {
        console.error("마이페이지 정보 가져오기 실패:", error);
      });
  }

  //안건 functions
  function addAgenda() {
    const roomId = localStorage.getItem("roomId");

    axios
      .post(`${process.env.REACT_APP_HOST_URL}/agenda/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        name: "안건 제목",
        sequence: 1
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          axios
            .get(
              `${process.env.REACT_APP_HOST_URL}/room/${roomId}/agenda`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
            .then((res) => {
              console.log(res);
              const format = res.data.map(item => ({
                id: item.agenda.agendaId,
                name: item.agenda.name,
              }));

              setAgendas(format);
            })
            .catch((error) => {
              console.error("마이페이지 정보 가져오기 실패:", error);
            });

        }
      })
      .catch((error) => {
        console.error("마이페이지 정보 가져오기 실패:", error);
      });

  }
  function deleteAgenda(id) {

    axios
      .delete(
        `${process.env.REACT_APP_HOST_URL}/agenda/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          axios
            .get(
              `${process.env.REACT_APP_HOST_URL}/room/${roomId}/agenda`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
            .then((res) => {
              console.log(res);
              const format = res.data.map(item => ({
                id: item.agenda.agendaId,
                name: item.agenda.name,
              }));
              setAgendas(format);
            })
            .catch((error) => {
              console.error("마이페이지 정보 가져오기 실패:", error);
            });
        }
      })
      .catch((error) => {
        console.error("실패:", error);
      });
  }
  function EditAgenda(e, id) {
    console.log(e);
    if (e.key === "Enter") {
      axios
        .patch(`${process.env.REACT_APP_HOST_URL}/agenda/${id}`, {
          name: e.target.value,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            // setAgendas(prev => prev.map(agenda => agenda.id === id ? { ...agenda, name: e.target.value } : agenda));
            axios
              .get(
                `${process.env.REACT_APP_HOST_URL}/room/${roomId}/agenda`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
              .then((res) => {
                console.log(res);
                const format = res.data.map(item => ({
                  id: item.agenda.agendaId,
                  name: item.agenda.name,
                }));

                setAgendas(format);
              })
              .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
              });

          }
        })
        .catch((error) => {
          console.error("실패:", error);
        });
      setChanged(null);
    }

  }



  return (
    <div className={style.Maindiv}>
      <div className={style.Head}>
        <div className={style.Left}>
          {roomName}
        </div>
        <img alt="setting" src={setting} onClick={() => handleSetting()} />
      </div>

      <hr />

      {Setting ?
        <div className={style.Setting}>
          <div className={style.SettingDiv}>
            <h2 onClick={() => handleSetting()} >+</h2>
            <form onSubmit={(e) => {
              handleEditRoom(e);
              e.preventDefault();
            }}>
              <label>회의 이름 변경
                <div className={style.Input}>
                  <input
                    placeholder={roomName}
                    id="newRoomName"
                    maxLength='12'
                  />
                </div>
              </label>

              <label>방 비밀번호 변경
                <div className={style.Input}>
                  <input
                    id="newPassword"
                    type="password"
                    minLength='4'
                    maxLength='4'
                  />
                  <img alt="visible" src={visible} onClick={() => handleVisible()} />
                </div>
              </label>

              <button
                type="submit"


              >변경하기</button>
              <div className={style.Tip}>
                <img src={tip} />
                삭제하기 버튼을 누르면 이 방의 모든 회의 기록과 <br />
                데이터가 영구적으로 삭제되며 복구할 수 없습니다
              </div>

              <button
                className={style.cancel}
                onClick={(e) => {
                  e.preventDefault();
                  deleteModal(true);
                }}

              >방 삭제하기</button>
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
                <div className={style.Text} onDoubleClick={() => setChanged(agenda.id)}>
                  <span>•</span> {Changed === agenda.id ? <input id="newAgendaName" ref={inputRef} onKeyDown={(e) => EditAgenda(e, agenda.id)} placeholder={agenda.name} /> : <h1>{agenda.name}</h1>}
                </div>
                <h3 alt="option"
                  onClick={(e) => {
                    handleOption(e, agenda.id);
                  }} >⋮</h3>
                {ModalId === agenda.id &&
                  <div className={style.Modal} ref={ModalRef}>
                    <div className={style.Options}>
                      <div className={style.Edit} onClick={(e) => {

                        setChanged(agenda.id);
                        setModalId(null);
                        e.stopPropagation();
                      }}>
                        <img alt="edit" src={edit} />
                        이름 변경
                      </div>
                      <div className={style.Dlt} id={agenda.id} onClick={(e) => {

                        deleteAgenda(agenda.id);
                        setModalId(null);
                        e.stopPropagation();
                      }}>
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

      <Timer />
    </div >
  );
}

export default LeftList;
