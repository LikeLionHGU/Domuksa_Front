import { useRef, useState, useEffect } from "react";
import axios from "axios";

import style from "../CSS/Timer.module.css";
import TimerWord from "../asset/icon-timer.png";
import TimerPlay from "../asset/icon-timer-play.png";
import TimerReset from "../asset/icon-timer-reset.png";
import TimerUpdown from "../asset/icon-timer-updown.png";
import TimerStop from "../asset/icon-timer-stop.png";

function Timer({ isHost, socketTimer, roomId, token }) {


    const [State, setState] = useState("STOP");
    const [total, setTotal] = useState(60);
    const hour = Math.floor(total / 3600);
    const min = Math.floor((total % 3600) / 60);
    const sec = total % 60;
    const Time = useRef(null);

    useEffect(() => {
        if (token === null || roomId === null || isHost === null) return;
        axios
            .get(
                `${process.env.REACT_APP_HOST_URL}/timer/${roomId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res);
                setTotal(res.data.time); //시간 받고
                setState(res.data.state); //상태값 받기

                if (res.data.state !== "stop") {
                    Time.current = setInterval(() => { //1초식 줄어들기
                        setTotal(pre => {
                            if (pre === 1 || pre === 0) { //0초되면 멈추기
                                setState("stop");
                                clearInterval(Time.current);
                                return 0;
                            }
                            return pre - 1
                        });
                    }, 1000);
                }
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });

    }, [socketTimer, roomId, token])

    //불러와서 작동하기

    function ChangeState() {
        axios
            .patch(
                `${process.env.REACT_APP_HOST_URL}/timer/${roomId}/status`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }

    function addThreemin(e) {
        const time =parseInt(e.currentTarget.id)*60;
        axios
            .patch(
                `${process.env.REACT_APP_HOST_URL}/timer/${roomId}/time`,
                {
                    time: time,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }

    function Reset() {
        axios
            .patch(
                `${process.env.REACT_APP_HOST_URL}/timer/${roomId}/time`,
                {
                    time: 0,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }


    return (
        (isHost ?
            <div className={style.Maindiv}>
                <img className={style.TimerWord} alt="TimerWord" src={TimerWord} />
                <div className={style.margin}>
                    <div className={style.TImerBody}>
                        <h1>{hour.toString().padStart(2, "0")}:{min.toString().padStart(2, "0")}:{sec.toString().padStart(2, "0")}</h1>
                        <div className={style.UPandDOWN}>
                            <img alt="keyup" onClick={() => setTotal(pre => pre + 60)} src={TimerUpdown} />
                            <img alt="keydown" onClick={() => setTotal(pre => {
                                if (pre <= 59) {
                                    return 0;
                                }
                                return pre - 60;
                            })} src={TimerUpdown} className={style.imgDown} />
                        </div>
                    </div>
                    <div className={style.Buttons}>
                        <button className={style.Play} onClick={() => ChangeState()}><img alt="stateBtn" id="stateBtn" src={State === "stop" ? TimerPlay : TimerStop} /></button>
                        <button className={style.Reset} onClick={() => Reset()}><img alt="reset" src={TimerReset} /></button>
                    </div>
                    <div className={style.ExtraButtons}>
                        <button id="3" onClick={(e) => addThreemin(e)}>+ 3m</button>
                        <button id="5" onClick={(e) => addThreemin(e)}>+ 5m</button>
                        <button id="10" onClick={(e) => addThreemin(e)}>+ 10m</button>
                    </div>
                </div>
            </div>
            :
            <div className={style.Userdiv}>
                <img className={style.TimerWord} alt="TimerWord" src={TimerWord} />
                <div className={style.margin}>
                    <div className={style.TImerBody}>
                        <h1>{hour.toString().padStart(2, "0")}:{min.toString().padStart(2, "0")}:{sec.toString().padStart(2, "0")}</h1>
                    </div>
                </div>
            </div>
        )
    );
}
export default Timer;  