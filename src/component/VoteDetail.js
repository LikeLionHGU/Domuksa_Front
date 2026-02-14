import { useEffect, useState } from "react";
import axios from "axios";
import style from "../CSS/Vote_detail_modal.module.css";

function VoteDetail({ setDetail, DetailId, DetailName }) {
    const token = localStorage.getItem("accessToken");

    const [options, setOptions] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        axios
            .get(`${process.env.REACT_APP_HOST_URL}/vote/${DetailId}/option`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res);
                if (res.status === 200 || res.status === 201) {
                    console.log(res.data.voteOptions);
                    setOptions(res.data.voteOptions);
                }
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }, [])
    return (
        <div className={style.NewVote}>
            <div className={style.Maintitle}>
                <h3>투표</h3>
                <h2 onClick={() => setDetail(false)}>+</h2>
            </div>
            <div className={style.Subdiv}>
                <div className={style.Subtitle}>
                    <h3>{DetailName}</h3>
                </div>

                <div className={style.Votelist}>

                    {options.map((option) => {
                        return (
                            <div id={option.voteOptionId} key={option.voteOptionId} className={style.Vote}>
                                <div className={style.VoteText}>
                                    <h8>{option.contents}</h8>
                                </div>
                            </div>
                        );
                    })}


                    <div className={style.Buttons}>
                        <button className={style.Cancel}>취소하기</button>
                        <button className={style.Create} style={{visibility:"hidden"}}>선택하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default VoteDetail;