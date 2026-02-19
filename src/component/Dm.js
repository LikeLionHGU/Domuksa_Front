
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import EmojiPicker from 'emoji-picker-react';

import style from "../CSS/DM.module.css";

import send from "../asset/icon-send.png";
import emoji from "../asset/icon-emoji.png";
import DM from "../asset/icon-DM.png";

function Dm({ socketDm,now, token, roomId, isHost }) {

    const [EmojiModal, setEmojiModal] = useState(false);

    const [modalChat, setModalChat] = useState(false);
    const [Notice, setNotice] = useState(true);
    const [message, setMessage] = useState([]);
    const ModalRef = useRef(null);

    const [date, setDate] = useState(null);
    //외부클릭시 닫히게 지정해주기Ref!!
    // useEffect(() => {

    //     function HandClickoutsideofModal(e) {
    //         if (ModalRef.current && !ModalRef.current.contains(e.target)) {
    //             setEmojiModal(false);
    //         }
    //     }

    //     document.addEventListener("mousedown", HandClickoutsideofModal);

    //     return () => document.removeEventListener("mousedown", HandClickoutsideofModal);
    // }, [ModalRef]);

    // useEffect(() => {

    //     if (isHost) {
    //         axios
    //             .get(`${process.env.REACT_APP_HOST_URL}/room/${roomId}/dm`, {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //                 },
    //             })
    //             .then((res) => {
    //                 if (res.status === 200 || res.status === 201) {
    //                     setMessage(res.data);
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.error("마이페이지 정보 가져오기 실패:", error);
    //             });
    //     }

    // }, []);


    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_HOST_URL}/dm/${roomId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    const format = res.data.messages.map(item => ({
                        time: item.createdAt,
                        content: item.content,
                    }));
                    setMessage(format);
                }
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }, [token, roomId,socketDm])

    function sendMessage() {

        const Newmessage = document.getElementById("newMessage").value;

        console.log(Newmessage);
        axios
            .post(`${process.env.REACT_APP_HOST_URL}/dm/${roomId}`,
                {
                    content: Newmessage,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    // setMessage(prev => [...prev, res.data]);
                    Newmessage.value = null;
                }
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }
    function buttonSendMessage(e) {
        const Newmessage = e.target.value;
        axios
            .post(`${process.env.REACT_APP_HOST_URL}/dm/${roomId}`,
                {
                    content: Newmessage,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    setMessage(prev => [...prev, res.data])
                }
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }
    function handleEmoji(emoji) {
        const messageInput = document.getElementById("newMessage");
        messageInput.value = messageInput.value + emoji.emoji;
    }

    function handleFormat(amount) {
        if (amount < 60) return `${amount}초`;
        if (amount < 3600) return `${amount / 60}분`;
        if (amount < 86400) return `${Math.floor(amount / 3600)}시간 전`;
        return `${Math.floor(amount / 86400)}일 전`;
    }
    return (
        <div className={style.DM} onClick={() => setModalChat(true)}>
            {EmojiModal &&
                <div ref={ModalRef} className={style.EmojiModal}>
                    <EmojiPicker onEmojiClick={(emojiObject) => handleEmoji(emojiObject)} />
                </div>
            }
            <div className={style.DMdiv}>
                <img alt="DM" src={DM} />
                {modalChat && <div className={style.ModalChat}>
                    <div className={style.Top}>
                        <h3>{isHost ? "받은 메세지" : "To.호스트"}</h3>
                        <p onClick={(e) => {
                            e.stopPropagation();
                            setModalChat(false);
                        }}>+</p>
                    </div>
                    <hr />
                    <div className={style.ChatList}>
                        {message.map((message) => {
                            //1000ms=1s 초단위
                            const diff = Math.floor((now - new Date(message.time).getTime()) / 1000);
                            return (
                                (isHost ?
                                    <div id={message.dmId} key={message.dmId} className={style.HostTextBox}>
                                        <div className={style.Text}>{message.content}</div>
                                        {handleFormat(diff)}
                                    </div>
                                    :
                                    <div id={message.dmId} key={message.dmId} className={style.TextBox}>
                                        {handleFormat(diff)}
                                        <div className={style.Text}>{message.content}</div>
                                    </div>
                                )
                            );
                        })}

                    </div>
                    {!isHost && <div className={style.Bottom}>
                        <div className={style.Buttons}>
                            <button onClick={(e) => buttonSendMessage(e)}>천천히해주세요...</button>
                            <button onClick={(e) => buttonSendMessage(e)}>5분만쉬어요</button>
                            <button onClick={(e) => buttonSendMessage(e)}>힘들어요</button>
                        </div>
                        <div className={style.Inputdiv}>
                            <img alt="emoji" className={style.Emoji} src={emoji} onClick={() => setEmojiModal(true)} />
                            <input id="newMessage" />
                            <img alt="send" className={style.Send} src={send} onClick={() => sendMessage()} />
                        </div>
                    </div>}
                </div>}
            </div>
        </div>
    );
}
export default Dm;
