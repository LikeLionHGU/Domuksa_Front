import { useState } from "react";
import Left from "../component/LeftList";
import Right from "../component/RightList";
import Header from "../component/Header";
import style from "../CSS/Meet.module.css";

import DM from "../asset/icon-DM.png";
import send from "../asset/icon-send.png";
import emoji from "../asset/icon-emoji.png";
import visible from "../asset/icon-visible.png";

function Meet() {

  const [isHost, setIshost] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalNew, setModalNew] = useState(false);

  function handleModal() {
    if (modal === false) {
      setModal(true);
      return;
    }
    setModal(false);
  }
  return (
    isHost ?
      <>
        <div className={style.extradiv}>
          <div className={style.Maindiv}>
            <div className={style.Header}>
              <Header />
            </div>
            <div className={style.Component}>
              <Left />
              <Right />
            </div>
            <div className={style.DM} onClick={() => handleModal()}>
              <div className={style.DMdiv}>
                <img alt="DM" src={DM} />
                {modal && <div className={style.ModalChat}>
                  <div className={style.Top}>
                    <h3>To.호스트</h3>
                    <p onClick={() => handleModal()}>+</p>

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
                  <form>
                    <label>회의 이름 변경
                      <div className={style.Input}>
                        <input />
                      </div>
                    </label>

                    <label>방 비밀번호 변경
                      <div className={style.Input}>
                        <input id="password" type="password" />
                        <img alt="visible" src={visible} />
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
