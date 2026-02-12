import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Left from "../component/LeftList";
import Right from "../component/RightList";
import Header from "../component/Header";
import style from "../CSS/Meet.module.css";

import DM from "../asset/icon-DM.png";
import send from "../asset/icon-send.png";
import emoji from "../asset/icon-emoji.png";
import visible from "../asset/icon-visible.png";
import tip from "../asset/icon-tip.png";
import tipRed from "../asset/icon-tip-red.png";
import CreateNewimg from "../asset/icon-createNew.png";
import Logo from "../asset/icon-logo.png";

function Meet() {
  const navigate = useNavigate();

  const [clickedAgendaId, setClickedAgendaId] = useState(null);
  
  const [roomId, setRoomId] = useState(null);
  const [RoomName, setRoomName] = useState(null);
  const [password, setPassword] = useState(null);
  const [Code, setCode] = useState(null);
  const [state, setState] = useState(null);

  const [isHost, setIshost] = useState(true);
  const [modalChat, setModalChat] = useState(false);
  const [modalNew, setModalNew] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const roomId = localStorage.getItem("roomId");

    if (roomId !== null) {

      axios
        .get(`${process.env.REACT_APP_HOST_URL}/room/${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setCode(res.data.code);
          setState(res.data.state);
          setRoomId(res.data.roomId);
          setRoomName(res.data.roomName);

          if (res.data.role === "host") {
            setIshost(true);
          } else {
            setIshost(false);
          }
        })
        .catch((error) => {
          console.error("마이페이지 정보 가져오기 실패:", error);
        });
    }
    if (roomId === null) {
      setModalNew(true);
    }

  }, [roomId]);

  function CreateRoom() {
    axios
      .post(`${process.env.REACT_APP_HOST_URL}/room/host`, {
        roomName: RoomName,
        password: password,
        role: "host",
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("roomId", res.data.roomId);
        setRoomId(res.data.roomId);
        setCode(res.data.code);
        if (res.status === 200) {
          setModalNew(false);
        }
      })
      .catch((error) => {
        console.error("마이페이지 정보 가져오기 실패:", error);
      });
  }

  function backtohome() {
    navigate("/home");
  }

  function handleVisible() {
    const pw = document.getElementById("password");
    if (pw.type === "password") {
      pw.type = "text";
      return;
    }
    pw.type = "password";

  }
  function deleteRoom() {
    const token = localStorage.getItem("accessToken");
    axios
      .delete(`${process.env.REACT_APP_HOST_URL}/room/${roomId}`, {
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
    navigate("/home");
  }


  return (
    isHost ?
      <>
        <div className={style.extradiv}>
          <div className={style.Maindiv}>
            <div className={style.Header}>
              <Header
                code={Code}
                state={state}
                roomId={roomId}
              />
            </div>
            <div className={style.Component}>
              <Left
                deleteModal={setDeleteModal}
                roomId={roomId}
                roomName={RoomName}
                clickedAgendaId={clickedAgendaId}
                setClickedAgendaId={setClickedAgendaId}
              />
              <Right
                roomId={roomId}
                clickedAgendaId={clickedAgendaId}
              />
            </div>
            <div className={style.DM} onClick={() => setModalChat(true)}>
              <div className={style.DMdiv}>
                <img alt="DM" src={DM} />
                {modalChat && <div className={style.ModalChat}>
                  <div className={style.Top}>
                    <h3>To.호스트</h3>
                    <p onClick={(e) => {
                      e.stopPropagation();
                      setModalChat(false);
                    }}>+</p>
                  </div>
                  <hr />
                  <div className={style.ChatList}>
                    <div className={style.TextBox}>
                      20:10
                      <div className={style.Text}>asdadasdsa</div>
                    </div>
                    <div className={style.TextBox}>
                      20:10
                      <div className={style.Text}>asdadasdsa</div>
                    </div>
                    <div className={style.TextBox}>
                      20:10
                      <div className={style.Text}>asdadasdsa</div>
                    </div>
                    <div className={style.TextBox}>
                      20:10
                      <div className={style.Text}>asdadasdsa</div>
                    </div>
                  </div>
                  <div className={style.Bottom}>
                    <div className={style.Buttons}>
                      <button>천천히해주세요...</button>
                      <button>5분만쉬어요</button>
                      <button>힘들어요</button>
                    </div>
                    <div className={style.Inputdiv}>
                      <img alt="emoji" className={style.Emoji} src={emoji} />
                      <input />
                      <img alt="send" className={style.Send} src={send} />
                    </div>
                  </div>
                </div>}
              </div>
            </div>
          </div>


          {modalNew && <div className={style.ModalNew}>
            <div className={style.Modal}>
              <div className={style.Left}>
                <img src={CreateNewimg} />
              </div>
              <div className={style.Right}>
                <h2 onClick={() => backtohome()}>+</h2>
                <div className={style.ModalDiv}>
                  <h1>환영합니다</h1>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    CreateRoom();
                  }}>
                    <label>회의 이름
                      <div className={style.Input}>
                        <input
                          id="name"
                          maxLength='12'
                          required
                          onChange={() => {
                            setRoomName(document.getElementById("name").value);
                          }}
                        />
                      </div>
                    </label>

                    <label>방 비밀번호
                      <div className={style.Input}>
                        <input
                          id="password"
                          type="password"
                          minLength='4'
                          maxLength='4'
                          required
                          onChange={() => {
                            setPassword(document.getElementById("password").value);
                          }}
                        />
                        <img alt="visible" src={visible} onClick={() => handleVisible()} />
                      </div>
                    </label>
                    <div className={style.Tip}>
                      <img src={tip} />
                      비밀번호를 변경하신 후에는 함께 회의 중인<br />
                      팀원들에게 새 비밀번호를 꼭 공유해 주세요!
                    </div>
                    <button>생성하기</button>
                  </form>
                </div>
              </div>
            </div>
          </div>}
          {deleteModal &&
            <div className={style.DeleteModal}>
              <div className={style.Modal}>
                <img src={Logo} />
                <h2>회의를 삭제하시겠습니까</h2>
                <div className={style.Tip}>
                  <img src={tipRed} />
                  삭제하기 버튼을 누르면 이 방의 모든 회의 기록과 <br />
                  데이터가 영구적으로 삭제되며 복구할 수 없습니다
                </div>
                <div className={style.Buttons}>
                  <button onClick={() => setDeleteModal(false)}>
                    더 머무르기
                  </button>
                  <button onClick={() => deleteRoom()} className={style.dltButton}>
                    삭제하기
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </>
      :
      <>
      </>
  );
}

export default Meet;
