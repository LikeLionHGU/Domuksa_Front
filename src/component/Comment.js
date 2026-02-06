//채팅방  룸+채팅방

//룸에 있는 안건에 있는 파일 불러오기+ 확대

import style from "../CSS/Comment.module.css";
import { useEffect, useRef, useState } from "react";
import { PDFViewer } from '@embedpdf/react-pdf-viewer';

function Comment() {

    return (
        <div className={style.Maindiv}>
            <div className={style.Maintitle}>
                <h3>코멘트</h3>
            </div>
            <div className={style.Subdiv}>

                <div className={style.Subtitle}>
                    <h3>코멘트</h3>
                    <div className={style.number}>13</div>
                </div>

                <form>
                    <label>
                        <textarea placeholder="여기에 의견 남겨주세요" />
                        <button>보내기</button>
                    </label>
                </form>
                <div>
                    <hr/>
                    <p>
                        <span>5초전</span><br />
                        발표 대본 초안을 읽어봤는데, 전반적으로 설명이 매우 친절하고 상세해서 전공자가 아닌 사람이 들어도 충분히 이해할 수 있을 만큼 훌륭합니다. 그런데 실제 발표 시간이 10분으로 제한되어 있다는 점을 고려하면, 현재 대본 분량은 조금 과한 것 같아 핵심 위주로 덜어내는 작업이 반드시 필요해 보여요. 특히 서론의 배경 설명 부분을 1분 내외로 축약하고, 우리가 직접 분석한 본문 데이터에 시간을 조금 더 할애하는 방향으로 수정하는 것이 점수 따기에 유리할 것 같습니다.
                    </p>
                    <hr/>
                </div>

            </div>
        </div >
    );
}
export default Comment;
