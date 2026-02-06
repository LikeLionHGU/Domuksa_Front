//투표 개수/투표 이름

import style from "../CSS/Vote.module.css";
import dlt from "../asset/icon-delete.png";

function Vote({onChange}) {

    return (
        <div className={style.Maindiv}>
            <div className={style.Maintitle}>
                <h3>투표</h3>
                <img src={dlt} onClick={() => onChange("basic")} />
            </div>
        </div >
    );
}
export default Vote;
