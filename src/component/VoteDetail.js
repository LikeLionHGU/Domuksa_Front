import { useEffect, useState } from "react";
import axios from "axios";
import style from "../CSS/Vote_detail_modal.module.css";

import winner from "../asset/icon-result.png";

function VoteDetail({ token, isHost, setDetail, DetailId, DetailName, Newvote }) {

    //욥션들
    const [options, setOptions] = useState([]);

    //선택한 욥션 아이디
    const [ChosenOption, setChosenOption] = useState(null);
    const [showBtn, setShowBtn] = useState(false);

    //결과
    const [result, setResult] = useState(false);
    //1등한 결과
    const [ResultOption, setResultOption] = useState([]);

    //제출한적있으면edit
    const [Edit, setEdit] = useState(false);
    const [Editting, setEditting] = useState(false);

    useEffect(() => {
        //투표 상태확인
        axios
            .get(`${process.env.REACT_APP_HOST_URL}/vote/${DetailId}/voteStatus`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    if (res.data.status !== "running") setResult(true);
                }
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });

        //투표 옵션가져오기 (나의 선택포함)
        axios
            .get(`${process.env.REACT_APP_HOST_URL}/vote/${DetailId}/option`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res);
                if (res.status === 200 || res.status === 201) {
                    setOptions(res.data.voteOptions);
                    if (res.data.voteSelection === null) {
                        setEdit(false);
                    } else {
                        setEdit(true);
                        setChosenOption(res.data.voteSelection.voteOptionId);
                    }
                }
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }, [Newvote, DetailId])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_HOST_URL}/vote/${DetailId}/result`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    console.log(res.data);
                    setResultOption(res.data);
                    console.log(ResultOption);
                }
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }, [result])

    function handleOptionBlock(id) {
        setChosenOption(parseInt(id));
        setShowBtn(true);
    }
    function SubmitChoise() {
        axios
            .post(`${process.env.REACT_APP_HOST_URL}/vote/${DetailId}/voteSelect`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                voteOptionId: ChosenOption,
            },)
            .then((res) => {
                console.log(res);
                if (res.status === 200 || res.status === 201) {
                    // setResult(true);
                    setEdit(true);
                    setShowBtn(false);
                }
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }
    function CancelChoise() {
        axios
            .delete(`${process.env.REACT_APP_HOST_URL}/vote/${DetailId}/voteSelect`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },)
            .then((res) => {
                console.log(res);
                if (res.status === 200 || res.status === 201) {
                    setDetail(false);
                }
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }
    function EditChoise() {
        axios
            .patch(`${process.env.REACT_APP_HOST_URL}/vote/${DetailId}/voteSelect`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                voteOptionId: ChosenOption,
            },)
            .then((res) => {
                console.log(res);
                if (res.status === 200 || res.status === 201) {
                    setEdit(true);
                    setShowBtn(false);
                }
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }
    function HandleEdit(){
        setEditting(true);
    }
    function ChangeVoteState() {
        axios
            .patch(`${process.env.REACT_APP_HOST_URL}/vote/${DetailId}/voteStatus`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                voteStatus: "comfirm",
            })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    setResult(true);
                    axios
                        .get(`${process.env.REACT_APP_HOST_URL}/vote/${DetailId}/result`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then((res) => {
                            if (res.status === 200 || res.status === 201) {
                                console.log(res.data);
                                setResultOption(res.data);
                                console.log(ResultOption);
                            }
                        })
                        .catch((error) => {
                            console.error("마이페이지 정보 가져오기 실패:", error);
                        });
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
                                <div id={option.voteOptionId} key={option.voteOptionId} className={ResultOption === option.voteOptionId ? style.ResultVote : style.Vote} onClick={(e) => handleOptionBlock(option.voteOptionId)}>
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
                                <div id={option.voteOptionId} key={option.voteOptionId} className={ChosenOption === option.voteOptionId ? style.ChosenVote : style.Vote} onClick={(e) => handleOptionBlock(option.voteOptionId)}>
                                    <div className={style.VoteText}>
                                        <h6>{option.content}</h6>
                                    </div>
                                </div>
                            );
                        })}


                        <div className={style.Buttons}>
                            <button className={style.Cancel} style={
                                showBtn === true
                                    ? {}
                                    : Edit === true
                                        ? {}
                                        : { visibility: "hidden" }
                            }>{Edit === true ? "취소하기" : "뒤로가기"}</button>

                            <button className={showBtn === true ? style.CreateEdit : style.BeforeEdit}
                                onClick={()=>
                                    showBtn === true?
                                        Edit === true? 
                                        EditChoise()
                                        :
                                        SubmitChoise()
                                         
                                    :HandleEdit()

                                }
                                >{Edit === true ? "수정하기" : "선택하기"}</button>
                            {Editting === true && isHost === true && Edit === true ? <button onClick={() => ChangeVoteState()} className={style.FinishVote}>확정하기</button> : <></>}
                        </div>
                    </div>
                </div>
            </div >
        )
    );
}
export default VoteDetail;