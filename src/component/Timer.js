import { useRef, useState } from "react";
import style from "../CSS/Timer.module.css";
import TimerWord from "../asset/icon-timer.png";
import TimerPlay from "../asset/icon-timer-play.png";
import TimerReset from "../asset/icon-timer-reset.png";
import TimerUpdown from "../asset/icon-timer-updown.png";
import TimerStop from "../asset/icon-timer-stop.png";

function Timer() {
    const [total, setTotal] = useState(60);
    const hour = Math.floor(total / 3600);
    const min = Math.floor((total % 3600) / 60);
    const sec = total % 60;

    const Time = useRef(null);

    const [Stateimg, setStateimg] = useState(true);

    function Play() {
        if (Stateimg === true) {
            setStateimg(false);
            Time.current = setInterval(() => {
                setTotal(pre => {
                    if (pre === 1||pre===0) {
                        setStateimg(true);
                        clearInterval(Time.current);
                        return 0;
                    }
                    return pre - 1
                });
            }, 1000);
        } else {
            setStateimg(true);
            clearInterval(Time.current);
        }
    }

    return (
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
    );
}
export default Timer;  