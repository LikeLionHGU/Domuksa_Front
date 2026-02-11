import { useState } from "react";

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

function RightList() {
  const [mode, setMode] = useState("basic");
  const [FileState, setFileState] = useState(false);
  const [ChatState, setChatState] = useState(false);
  const [VoteState, setVoteState] = useState(false);
  const [AIState, setAIState] = useState(false);

  const Mode = {
    basic: <>
      <div className={style.Maindiv}>
        <div className={style.Subdiv}>
          <div
            className={style.Block}
            onClick={() => setMode("File")}
            onMouseEnter={() => setFileState(true)}
            onMouseLeave={() => setFileState(false)}
          >
            <img alt="Mainicon-file" className={style.imgFile} src={FileState ? iconFileColor : iconFile} />
            <h3>파일</h3>
          </div>
          <div
            className={style.Block}
            onClick={() => setMode("Comment")}
            onMouseEnter={() => setChatState(true)}
            onMouseLeave={() => setChatState(false)}>
            <img alt="Mainicon-comment" className={style.imgComment} src={ChatState ? iconChatColor : iconChat} />
            <h3>코멘트</h3>
          </div>
          <div
            className={style.Block}
            onClick={() => setMode("Vote")}
            onMouseEnter={() => setVoteState(true)}
            onMouseLeave={() => setVoteState(false)}>
            <img alt="Mainicon-vote" className={style.imgVote} src={VoteState ? iconVoteColor : iconVote} />
            <h3>투표</h3>
          </div>
        </div>
        <div 
        className={style.Subdiv}>
          <div
            className={style.BigBlock}
            onClick={() => setMode("AI")}
            onMouseEnter={() => setAIState(true)}
            onMouseLeave={() => setAIState(false)}>
            <img alt="Mainicon-ai" className={style.imgAI} src={AIState ? iconAIColor : iconAI} />
            <h3>AI 요약</h3>
          </div>
        </div>
      </div>
    </>,
    File: <File onChange={setMode} />,
    Comment: <Comment onChange={setMode} />,
    Vote: <Vote onChange={setMode} />,
    AI: <AI onChange={setMode} />
  };
  return Mode[mode];
}

export default RightList;
