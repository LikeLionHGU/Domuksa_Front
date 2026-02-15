import { useEffect, useState } from "react";
import axios from "axios";
import style from "../CSS/Vote_detail_modal.module.css";

function VoteDetail({ setDetail, DetailId, DetailName, Newvote }) {
    const token = localStorage.getItem("accessToken");

    const [options, setOptions] = useState([]);
    const [ChosenOption, setChosenOption] = useState(null);
    const [result, setResult] = useState(true);
    const [ResultOption,setResultOption]=useState(6);

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
    }, [Newvote])

    // useEffect(() => {
    //     const token = localStorage.getItem("accessToken");
    //     axios
    //         .get(`${process.env.REACT_APP_HOST_URL}/vote/${DetailId}/result`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })
    //         .then((res) => {
    //             console.log(res);
    //             if (res.status === 200 || res.status === 201) {
    //                 console.log(res.data);
    //                 setResultOption(res.data);
    //             }
    //         })
    //         .catch((error) => {
    //             console.error("마이페이지 정보 가져오기 실패:", error);
    //         });
    // }, [result])

    function handleOptionBlock(e) {
        
        setChosenOption(parseInt(e.target.id));
        console.log(e.target.id);
    }
    function SubmitChoise() {
        const token = localStorage.getItem("accessToken");
        axios
            .post(`${process.env.REACT_APP_HOST_URL}/vote/${DetailId}/voteSelect`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                voteOptionId: ChosenOption,
            })
            .then((res) => {
                console.log(res);
                if (res.status === 200 || res.status === 201) {
                    setResult(true);
                }
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }
    return (
        (result ?
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
                                <div id={option.voteOptionId} key={option.voteOptionId} className={ResultOption === option.voteOptionId ? style.ResultVote : style.Vote} onClick={(e) => handleOptionBlock(e)}>
                                    <div className={style.VoteText}>
                                        <h6>{option.content}</h6><h5>몇명투표했는지</h5>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            :
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
                                <div id={option.voteOptionId} key={option.voteOptionId} className={ChosenOption === option.voteOptionId ? style.ChosenVote : style.Vote} onClick={(e) => handleOptionBlock(e)}>
                                    <div className={style.VoteText}>
                                        <h6>{option.content}</h6>
                                    </div>
                                </div>
                            );
                        })}


                        <div className={style.Buttons}>
                            <button className={style.Cancel} onClick={() => setDetail(false)}>취소하기</button>
                            <button className={style.Create} style={ChosenOption === null ? { visibility: "hidden" } : {}} onClick={() => SubmitChoise()}>선택하기</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
export default VoteDetail;