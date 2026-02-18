
//채팅방  룸+채팅방

//룸에 있는 안건에 있는 파일 불러오기+ 확대
import axios from "axios";
import { useEffect, useState } from "react";
import style from "../CSS/Comment.module.css";

function Comment({ token, clickedAgendaId, onChange }) {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_HOST_URL}/comment/${clickedAgendaId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    console.log(res);
                    setComments(res.data.reverse());
                }
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }, [])

    function commentWrite() {
        const Input = document.getElementById("input").value;

        axios
            .post(`${process.env.REACT_APP_HOST_URL}/comment/${clickedAgendaId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                content: Input,
            })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    setComments(prev => [res.data, ...prev]);
                }
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }
    return (
        <div className={style.Maindiv}>
            <div className={style.Maintitle}>
                <h3>코멘트</h3>
                <h2 onClick={() => onChange("basic")} >+</h2>
            </div>
            <div className={style.Subdiv}>

                <div className={style.Subtitle}>
                    {/* <h3>코멘트</h3>
                    <div className={style.number}>13</div> */}
                </div>

                <form>
                    <label>
                        <textarea placeholder="여기에 의견 남겨주세요" id="input" />
                        <button onClick={(e) => {
                            e.preventDefault();
                            commentWrite();
                        }}>보내기</button>
                    </label>
                </form>

                <div className={style.Chat}>
                    {comments.map((comment) => (
                        <div key={comment.commentId} id={comment.commentId} className={style.Chatbox}>
                            <hr />
                            <p>
                                <span>{comment.title}</span><br />
                                {comment.content}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div >
    );
}
export default Comment;
