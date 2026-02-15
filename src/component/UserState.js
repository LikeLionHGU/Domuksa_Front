//ai요약본,gpt/제미나이api불러오기

import style from "../CSS/UserState.module.css";

function UserState() {

    return (
        <div className={style.Userlist}>
            <div className={style.Host}>
                <h3>호스트</h3>
                <div className={style.user}>
                    <img />
                    <h2>호스트 학부생</h2>
                </div>
            </div>
            <div className={style.Participants}>
                <h3>참여자(0)</h3>
                <div className={style.user}>
                    <img />
                    <h2>참여자 학부생</h2>
                </div>
                <div className={style.user}>
                    <img />
                    <h2>참여자 학부생</h2>
                </div>
                <div className={style.user}>
                    <img />
                    <h2>참여자 학부생</h2>
                </div>
                <div className={style.user}>
                    <img />
                    <h2>참여자 학부생</h2>
                </div>
                <div className={style.user}>
                    <img />
                    <h2>참여자 학부생</h2>
                </div>
            </div>
        </div>
    );
}
export default UserState;
