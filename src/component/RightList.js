import { useState } from "react";

import style from "../CSS/Right.module.css";

import File from "../component/File";
import Comment from "../component/Comment";
import Vote from "../component/Vote";
import AI from "../component/AiSummary";

import iconFile from "../asset/Mainicon-file.png";
import iconChat from "../asset/Mainicon-comment.png";

function RightList() {

  const [mode, setMode] = useState("basic");

  const Mode = {
    basic: <>
      <div className={style.Maindiv}>
        <div className={style.Subdiv}>
          <div className={style.Block} onClick={() => setMode("File")}>
            <img alt="Mainicon-file" className={style.imgFile} src={iconFile}/>
            <h3>파일</h3>
          </div>
          <div className={style.Block} onClick={() => setMode("Comment")}>
            <img alt="Mainicon-comment" className={style.imgComment} src={iconChat}/>
            <h3>코멘트</h3>
          </div>
          <div className={style.Block} onClick={() => setMode("Vote")}>
            <img alt="Mainicon-vote"/>
            <h3>투표</h3>
          </div>
        </div>
        <div className={style.Subdiv}>
          <div className={style.BigBlock} onClick={() => setMode("AI")}>
            <img alt="Mainicon-ai"/>
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
