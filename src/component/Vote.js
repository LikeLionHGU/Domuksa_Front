//투표 개수/투표 이름
import { useState } from "react";
import style from "../CSS/Vote.module.css";
import dlt from "../asset/icon-delete.png";
import addBtn from "../asset/icon-addBtn.png";
import option from "../asset/icon-option.png";

function Vote({ onChange }) {

    const  [idCounter,setIdCounter]=useState(0);
    const [votes, setVotes] = useState([]);

    function addVote() {
        setVotes(prev => [...prev, { id: idCounter, title: "안건이름", number: "투표수", voteStatus: "running" }]);
        setIdCounter(prev=>prev+1);
    }
    return (
        <div className={style.Maindiv}>
            <div className={style.Maintitle}>
                <h3>투표</h3>
                <img src={dlt} onClick={() => onChange("basic")}  />
            </div>

            <div className={style.Subdiv}>
                <div className={style.Subtitle}>
                    <h3>안건 1에 대한 투표</h3>
                    <img src={addBtn} onClick={()=>addVote()}/>
                </div>
                <div className={style.Votelist}>
                    {votes.map((vote) => (
                        <div className={style.Vote} key={vote.id} >
                            <div className={style.VoteText}>
                                <h3>{vote.title}</h3>
                                <span>{vote.number}</span>
                            </div>
                            <img src={option} />
                        </div>
                    ))}

                </div>
            </div>
        </div >
    );
}
export default Vote;
