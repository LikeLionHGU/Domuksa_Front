//ai요약본,gpt/제미나이api불러오기

import { useEffect, useState } from "react";
import axios from 'axios';
import style from "../CSS/UserState.module.css";

function UserState({ roomId, token,socketUser,socketVoteId}) {

    const [User, setUsers] = useState([]);

    useEffect(() => {
        if (!token || !roomId) return;
        axios
            .get(`${process.env.REACT_APP_HOST_URL}/room/${roomId}/online`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then((res) => {
                setUsers(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [roomId, token,socketUser])
    function haneldeState() {
        console.log(socketVoteId);
    }
    return (
        <div className={style.Userlist}>
            <div className={style.Host}>
                <h3>호스트</h3>
                {User.filter((item)=>item.online===true).map((player) => {
                    if (player.role === "host") {
                        return (
                            <div id={player.userId} key={player.userId} className={style.user}>
                                <img src={player.profileUrl} />
                                <h2>{player.name}</h2>
                            </div>
                        )
                    }
                })}
            </div>
            <div className={style.Participants}>
                <h3 onClick={() => haneldeState()}>참여자({User.filter((item)=>item.role!=="host").length})</h3>
                {User.filter((item)=>item.online===true).map((player) => {
                    if (player.role !== "host") {
                        return (
                            <div id={player.userId} key={player.userId} className={style.user}>
                                <img src={player.profileUrl} />
                                <h2>{player.name}</h2>
                            </div>
                        )
                    }
                })}

            </div>
        </div>
    );
}
export default UserState;
