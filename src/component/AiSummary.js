//ai요약본,gpt/제미나이api불러오기
import ReactMarkdown from 'react-markdown'

import { useEffect, useState } from "react";
import axios from "axios";
import style from "../CSS/AI.module.css";

function AI({ isHost, token, onChange, clickedAgendaId, AIState }) {
    const [summary, setSummary] = useState();
    const [title, setTitle] = useState();
    useEffect(() => {
        if (token === null || clickedAgendaId === null || isHost === null) return;
        if (isHost === true) {

            if (AIState === false) {
                axios
                    .post(`${process.env.REACT_APP_HOST_URL}/ai/${clickedAgendaId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((res) => {
                        if (res.status === 200 || res.status === 201) {
                            console.log(res);
                            setTitle(res.data.title);
                            setSummary(res.data.summaryText);
                        }
                    })
                    .catch((error) => {
                        console.error("마이페이지 정보 가져오기 실패:", error);
                    });
            } else {
                axios
                    .patch(`${process.env.REACT_APP_HOST_URL}/ai/${clickedAgendaId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((res) => {
                        if (res.status === 200 || res.status === 201) {
                            console.log(res);
                            setTitle(res.data.title);
                            setSummary(res.data.summaryText);
                        }
                    })
                    .catch((error) => {
                        console.error("마이페이지 정보 가져오기 실패:", error);
                    });
            }
        } else {
            axios
                .get(`${process.env.REACT_APP_HOST_URL}/ai/${clickedAgendaId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        console.log(res);
                        setTitle(res.data.title);
                        setSummary(res.data.summaryText);
                    }
                })
                .catch((error) => {
                    console.error("마이페이지 정보 가져오기 실패:", error);
                });
        }
    }, [token, clickedAgendaId, isHost])

    return (
        <div className={style.Maindiv}>
            <div className={style.Maintitle}>
                <h3>AI 요약</h3>
                <h2 onClick={() => onChange("basic")} >+</h2>
            </div>
            <div className={style.MarkdownBody}>
                <h5>{title}</h5>
                <ReactMarkdown>
                    {summary}
                </ReactMarkdown>
            </div>

        </div >
    );
}
export default AI;


