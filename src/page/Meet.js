import { useEffect, useState } from "react";
import axios from "axios";
import Left from "../component/LeftList";
import Right from "../component/RightList";
import Header from "../component/Header";
import style from "../CSS/Meet.module.css";

import DM from "../asset/icon-DM.png";
import send from "../asset/icon-send.png";
import emoji from "../asset/icon-emoji.png";
import visible from "../asset/icon-visible.png";

function Meet() {

  const [roomId, setRoomId] = useState(null);
  const [isHost, setIshost] = useState(true);
  const [modalChat, setModalChat] = useState(false);
  const [modalNew, setModalNew] = useState(false);

  const [MeetName, setMeetName] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {

    setRoomId(localStorage.getItem("roomId"));
    // const user = localStorage.getItem("userInfo");

    if (roomId) {
      setRoomId(roomId);

      axios
        .get(`${process.env.REACT_APP_HOST_URL}/room/${roomId}`, {
        })
        .then((res) => {
          console.log(res);
          if (res.data.role === "host") {
            setIshost(true);
          } else {
            setIshost(false);
          }
        })
        .catch((error) => {
          console.error("마이페이지 정보 가져오기 실패:", error);
        });
    } else {
      setModalNew(true);
    }
  }, []);

  //   {
  // ”roomName”: “두먹사 회의방”
  // ”password”:”domuksa”
  // ”role”: “host”
  // }

  function CreateRoom() {
    axios
      .post(`${process.env.REACT_APP_HOST_URL}/room/host`, {
        params: {
          roomName: { MeetName },
          password: { password },
          role: "host",
        }
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("roomId", res.data.roomId);
        setRoomId(res.data.roomId);
      })
      .catch((error) => {
        console.error("마이페이지 정보 가져오기 실패:", error);
      });
  }



  return (
    isHost ?
      <>
        <div className={style.extradiv}>
          <div className={style.Maindiv}>
            <div className={style.Header}>
              <Header
                roomId
              />
            </div>
            <div className={style.Component}>
              <Left
                roomId
              />
              <Right
                roomId
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

              </div>
              <div className={style.Right}>
                <div className={style.ModalDiv}>
                  <h2>+</h2>
                  <h1>환영합니다</h1>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    CreateRoom();
                  }}>
                    <label>회의 이름
                      <div className={style.Input}>
                        <input id="name" onChange={() => {
                          setMeetName(document.getElementById("name").value);
                          console.log(MeetName);
                        }} />
                      </div>
                    </label>

                    <label>방 비밀번호
                      <div className={style.Input}>
                        <input id="password" type="password" onChange={() => {
                          setPassword(document.getElementById("password").value);
                          console.log(password);
                        }}
                        />
                        <img alt="visible" src={visible} />
                      </div>
                    </label>
                    <div className={style.Tip}>
                      비밀번호를 변경하신 후에는 함께 회의 중인<br />
                      팀원들에게 새 비밀번호를 꼭 공유해 주세요!
                    </div>
                    <button>생성하기</button>
                  </form>
                </div>
              </div>
            </div>
          </div>}
        </div>
      </>
      :
      <>
      </>
  );
}

export default Meet;
