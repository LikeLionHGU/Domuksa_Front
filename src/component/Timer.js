import { useRef, useState, useEffect } from "react";
import axios from "axios";

import style from "../CSS/Timer.module.css";
import TimerWord from "../asset/icon-timer.png";
import TimerPlay from "../asset/icon-timer-play.png";
import TimerReset from "../asset/icon-timer-reset.png";
import TimerUpdown from "../asset/icon-timer-updown.png";
import TimerStop from "../asset/icon-timer-stop.png";

function Timer({ isHost, roomId, token }) {
    const [total, setTotal] = useState(0);
    const hour = Math.floor(total / 3600);
    const min = Math.floor((total % 3600) / 60);
    const sec = total % 60;

    const Time = useRef(null);

    const [Stateimg, setStateimg] = useState(null);

    useEffect(() => {
        if (token === null || roomId === null) return;
        axios
            .get(`${process.env.REACT_APP_HOST_URL}/timer/${roomId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    console.log(res);
                    setTotal(res.data.time);
                    setStateimg(res.data.status);

                }
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }, [token, roomId])

    useEffect(() => {
        if (Stateimg !== "RUNNING") return;

        Time.current = setInterval(() => {
            setTotal(prev => {
                if (prev <= 1) {
                    clearInterval(Time.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(Time.current);
    }, [Stateimg]);

    function Play() {
        const newState = Stateimg === "RUNNING" ? "STOPPED" : "RUNNING";

        axios
            .patch(`${process.env.REACT_APP_HOST_URL}/timer/${roomId}/status`,
                { status: newState },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(res => {
                setStateimg(res.data.status);
                setTotal(res.data.time);
            });
    }

    function EditTime() {
        axios
            .patch(`${process.env.REACT_APP_HOST_URL}/timer/${roomId}/status`,
                {
                    time: { total }
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    console.log(res);
                    setTotal(res.data.time);
                    if (res.data.state === "STOPPED") {
                        setStateimg(true);
                    } else {
                        setStateimg(false);
                    }
                }
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }
    function Reset() {
        axios
            .patch(`${process.env.REACT_APP_HOST_URL}/timer/${roomId}/time`,
                {
                    time: null,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    console.log(res);
                    setTotal(res.data.time);
                    if (res.data.state === "STOPPED") {
                        setStateimg(true);
                    } else {
                        setStateimg(false);
                    }
                }
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
                        <button className={style.Play} onClick={() => Play()}><img alt="stateBtn" id="stateBtn" src={Stateimg === true ? TimerPlay : TimerStop} /></button>
                        <button className={style.Reset} onClick={() => setTotal(0)}><img alt="reset" src={TimerReset} /></button>
                    </div>
                    <div className={style.ExtraButtons}>
                        <button onClick={() => setTotal(pre => pre + (3 * 60))}>+ 3m</button>
                        <button onClick={() => setTotal(pre => pre + (5 * 60))}>+ 5m</button>
                        <button onClick={() => setTotal(pre => pre + (10 * 60))}>+ 10m</button>
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