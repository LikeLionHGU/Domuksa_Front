import { useEffect, useRef, useState } from "react";

import style from "../CSS/Right.module.css";

import File from "../component/File";
import Comment from "../component/Comment";
import Vote from "../component/Vote";
import AI from "../component/AiSummary";

function RightList() {

  const [mode, setMode] = useState("basic");

  const Mode={
    basic:<>
        <div className={style.Maindiv}>
          <div className={style.Subdiv}>
            <div className={style.Block} onClick={()=>setMode("File")}>
              <img />
              <h3>파일</h3>
            </div>
            <div className={style.Block} onClick={()=>setMode("Comment")}>
              <img />
              <h3>코멘트</h3>
            </div>
            <div className={style.Block} onClick={()=>setMode("Vote")}>
              <img />
              <h3>투표</h3>
            </div>
          </div>
          <div className={style.Subdiv}>
            <div className={style.BigBlock} onClick={()=>setMode("AI")}>
              <img />
              <h3>AI 요약</h3>
            </div>
          </div>
        </div>
      </>,
    File:<File/>,
    Comment:<Comment/>,
    Vote:<Vote/>,
    AI:<AI/>
  };
  return Mode[mode];
}

export default RightList;
