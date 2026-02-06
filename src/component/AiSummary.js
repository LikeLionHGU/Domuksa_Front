//ai요약본,gpt/제미나이api불러오기

import style from "../CSS/AI.module.css";
import dlt from "../asset/icon-delete.png";

function AI({onChange}) {

    return (
        <div className={style.Maindiv}>
            <div className={style.Maintitle}>
                <h3>AI 요약</h3>
                <img src={dlt} onClick={() => onChange("basic")} />
            </div>
        </div >
    );
}
export default AI;
