import { useEffect, useState } from "react";
import axios from "axios";

import style from "../CSS/Right.module.css";

import File from "../component/File";
import Comment from "../component/Comment";
import Vote from "../component/Vote";
import AI from "../component/AiSummary";

import iconFile from "../asset/Mainicon-file.png";
import iconChat from "../asset/Mainicon-comment.png";
import iconVote from "../asset/Mainicon-vote.png";
import iconAI from "../asset/Mainicon-AI.png";
import iconFileColor from "../asset/Mainicon-color-file.png";
import iconChatColor from "../asset/Mainicon-color-comment.png";
import iconVoteColor from "../asset/Mainicon-color-vote.png";
import iconAIColor from "../asset/Mainicon-color-Ai.png";

function RightList({ roomId, clickedAgendaId }) {
  const [mode, setMode] = useState("basic");
  const [hover, setHover] = useState("");
  const [FileState, setFileState] = useState(false);
  const [ChatState, setChatState] = useState(false);
  const [VoteState, setVoteState] = useState(false);
  const [AIState, setAIState] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(
        `${process.env.REACT_APP_HOST_URL}/room/${roomId}/agenda`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      .then((res) => {
        if (clickedAgendaId === null) {
          if (res.data[0].config === null) {
            return;
          }
          if (res.data[0].config.voteEnabled) setVoteState(true);
          if (res.data[0].config.commentEnabled) setChatState(true);
          if (res.data[0].config.fileEnabled) setFileState(true);
          if (res.data[0].config.aiSummaryEnabled) setAIState(true);
        } else {
          if (res.data.find(item => item.agenda.agendaId === parseInt(clickedAgendaId)).config.voteEnabled) setVoteState(true);
          if (res.data.find(item => item.agenda.agendaId === parseInt(clickedAgendaId)).config.commentEnabled) setChatState(true);
          if (res.data.find(item => item.agenda.agendaId === parseInt(clickedAgendaId)).config.fileEnabled) setFileState(true);
          if (res.data.find(item => item.agenda.agendaId === parseInt(clickedAgendaId)).config.aiSummaryEnabled) setAIState(true);
        }
        console.log(res.data[0].config);
      })
      .catch((error) => {
        console.error("마이페이지 정보 가져오기 실패:", error);
      });
  }, [clickedAgendaId]);

  const Mode = {
    basic: <>
      <div className={style.Maindiv}>
        <div className={style.Subdiv}>
          <div
            className={style.Block}
            id="file"
            onClick={() => setMode("File")}
            onMouseEnter={() => setHover("File")}
            onMouseLeave={() => setHover("")}
          >
            <img alt="Mainicon-file" className={style.imgFile} src={FileState || hover ==="File"? iconFileColor : iconFile} />
            <h3>파일</h3>
          </div>
          <div
            className={style.Block}
            id="comment"
            onClick={() => setMode("Comment")}
            onMouseEnter={() => setHover("Comment")}
            onMouseLeave={() => setHover("")}>
            <img alt="Mainicon-comment" className={style.imgComment} src={ChatState || hover==="Comment" ? iconChatColor : iconChat} />
            <h3>코멘트</h3>
          </div>
          <div
            className={style.Block}
            id="vote"
            onClick={() => setMode("Vote")}
            onMouseEnter={() => setHover("Vote")}
            onMouseLeave={() => setHover("")}>
            <img alt="Mainicon-vote" className={style.imgVote} src={VoteState || hover==="Vote" ? iconVoteColor : iconVote} />
            <h3>투표</h3>
          </div>
        </div>
        <div
          className={style.Subdiv}>
          <div
            className={style.BigBlock}
            id="ai"
            onClick={() => setMode("AI")}
            onMouseEnter={() => setHover("AI")}
            onMouseLeave={() => setHover("")}>
            <img alt="Mainicon-ai" className={style.imgAI} src={AIState || hover ==="AI"? iconAIColor : iconAI} />
            <h3>AI 요약</h3>
          </div>
        </div>
      </div>
    </>,
    File: <File
      onChange={setMode}
    />,
    Comment: <Comment
      onChange={setMode}
    />,
    Vote: <Vote
      clickedAgendaId={clickedAgendaId}
      roomId={roomId}
      onChange={setMode}
    />,
    AI: <AI
      onChange={setMode}
    />
  };
  return Mode[mode];
}

export default RightList;
