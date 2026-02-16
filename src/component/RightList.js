import { useEffect, useState } from "react";
import axios from "axios";

import style from "../CSS/Right.module.css";

import File from "../component/File";
import Comment from "../component/Comment";
import Vote from "../component/Vote";
import AI from "../component/AiSummary";
import Users from "../component/UserState";

import iconFile from "../asset/Mainicon-file.png";
import iconChat from "../asset/Mainicon-comment.png";
import iconVote from "../asset/Mainicon-vote.png";
import iconAI from "../asset/Mainicon-AI.png";
import iconFileColor from "../asset/Mainicon-color-file.png";
import iconChatColor from "../asset/Mainicon-color-comment.png";
import iconVoteColor from "../asset/Mainicon-color-vote.png";
import iconAIColor from "../asset/Mainicon-color-Ai.png";

function RightList({ token, isHost, roomId, clickedAgendaId }) {
  const [mode, setMode] = useState("basic");
  const [hover, setHover] = useState("");
  const [FileState, setFileState] = useState(false);
  const [ChatState, setChatState] = useState(false);
  const [VoteState, setVoteState] = useState(false);
  const [AIState, setAIState] = useState(false);

  useEffect(() => {

    if (clickedAgendaId === null) {
      return;
    }
    axios
      .get(
        `${process.env.REACT_APP_HOST_URL}/agenda/${clickedAgendaId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      .then((res) => {
        if (res.data.config.voteEnabled) setVoteState(true);
        if (res.data.config.commentEnabled) setChatState(true);
        if (res.data.config.fileEnabled) setFileState(true);
        if (res.data.config.aiSummaryEnabled) setAIState(true);
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
            onClick={() => {
              if (clickedAgendaId === null) {
                alert("안건을 선택해주세요!");
                return;
              }
              setMode("File");
            }}
            onMouseEnter={() => setHover("File")}
            onMouseLeave={() => setHover("")}
          >
            <img alt="Mainicon-file" className={style.imgFile} src={FileState || hover === "File" ? iconFileColor : iconFile} />
            <h3>파일</h3>
          </div>
          <div
            className={style.Block}
            id="comment"
            onClick={() => {
              if (clickedAgendaId === null) {
                alert("안건을 선택해주세요!");
                return;
              }
              setMode("Comment");
            }}
            onMouseEnter={() => setHover("Comment")}
            onMouseLeave={() => setHover("")}>
            <img alt="Mainicon-comment" className={style.imgComment} src={ChatState || hover === "Comment" ? iconChatColor : iconChat} />
            <h3>코멘트</h3>
          </div>
          <div
            className={style.Block}
            id="vote"
            onClick={() => {
              if (clickedAgendaId === null) {
                alert("안건을 선택해주세요!");
                return;
              }
              setMode("Vote");
            }}
            onMouseEnter={() => setHover("Vote")}
            onMouseLeave={() => setHover("")}>
            <img alt="Mainicon-vote" className={style.imgVote} src={VoteState || hover === "Vote" ? iconVoteColor : iconVote} />
            <h3>투표</h3>
          </div>
        </div>
        <div
          className={style.Subdiv}>
          <div
            className={style.BigBlock}
            id="ai"
            onClick={() => {
              if (clickedAgendaId === null) {
                alert("안건을 선택해주세요!");
                return;
              }
              setMode("AI");
            }}
            onMouseEnter={() => setHover("AI")}
            onMouseLeave={() => setHover("")}>
            <img alt="Mainicon-ai" className={style.imgAI} src={AIState || hover === "AI" ? iconAIColor : iconAI} />
            <h3>AI 요약</h3>
          </div>
          <div
            className={style.SmallBlock}
            id="users"
          >
            <Users />
          </div>
        </div>
      </div>
    </>,
    File: <File
      isHost={isHost}
      clickedAgendaId={clickedAgendaId}
      token={token}
      onChange={setMode}
    />,
    Comment: <Comment
      token={token}
      onChange={setMode}
    />,
    Vote: <Vote
      token={token}
      isHost={isHost}
      clickedAgendaId={clickedAgendaId}
      roomId={roomId}
      onChange={setMode}
    />,
    AI: <AI
      token={token}
      onChange={setMode}
    />
  };
  return Mode[mode];
}

export default RightList;
