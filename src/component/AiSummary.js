//ai요약본,gpt/제미나이api불러오기

import { useEffect, useState } from "react";
import axios from "axios";
import style from "../CSS/AI.module.css";

function AI({ token, onChange,clickedAgendaId }) {
    const [summary,setSummary]=useState();
    useEffect(() => {
        axios
            .post(`${process.env.REACT_APP_HOST_URL}/ai/${clickedAgendaId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    console.log(res);
                    setSummary(res.data.summaryText);
                }
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }, [])
    return (
        <div className={style.Maindiv}>
            <div className={style.Maintitle}>
                <h3>AI 요약</h3>
                <h2 onClick={() => onChange("basic")} >+</h2>
            </div>

            <p>{summary}</p>
        </div >
    );
}
export default AI;
