//투표 개수/투표 이름

import { useRef, useEffect, useState } from "react";
import axios from "axios";
import style from "../CSS/Vote.module.css";

import VoteNew from "./VoteNew";
import VoteDetail from "./VoteDetail";

import edit from "../asset/icon-edit.png";
import bin from "../asset/icon-trashbin.png";
import addBtn from "../asset/icon-addBtn.png";

function Vote({ token, isHost, onChange, clickedAgendaId }) {

    //[투표리스트]
    const [votes, setVotes] = useState([]);

    //[투표이름변경]
    const [Changed, setChanged] = useState(null);

    //새로운 투표 (객체)
    const [Voteobj, setVoteobj] = useState([]);

    //[모달]
    const [ModalId, setModalId] = useState(null);
    const ModalRef = useRef(null);
    const inputRef = useRef(null);

    //새로만들기 모달
    const [Newvote, setNewvote] = useState(false);
    //투표 상세페이지
    const [Detail, setDetail] = useState(false);
    const [DetailId, setDetailId] = useState(null);
    const [DetailName, setDetailName] = useState(null);

    //새로운 투표

    //모달 외부 클릭시 닫히게 만드는 
    useEffect(() => {
        function HandClickoutsideofModal(e) {
            if (ModalRef.current && !ModalRef.current.contains(e.target)) {
                setModalId(null);
            }
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setChanged(null);
            }
        }
        document.addEventListener("mousedown", HandClickoutsideofModal);

        return () => {
            document.removeEventListener("mousedown", HandClickoutsideofModal);
        }
    }, [ModalId, inputRef]);

    //투표list 불러오기
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_HOST_URL}/vote/${clickedAgendaId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    setVotes(res.data);
                }
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }, [Newvote]);
    function addVote() {
        axios
            .post(`${process.env.REACT_APP_HOST_URL}/vote/${clickedAgendaId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                title: "찬반투표",
            })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {

                    setVoteobj(res.data);

                    axios
                        .get(`${process.env.REACT_APP_HOST_URL}/vote/${clickedAgendaId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then((res) => {
                            if (res.status === 200 || res.status === 201) {
                                setVotes(res.data);
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

    function handleOption(e, id) {
        setModalId(id);
        e.stopPropagation();
    }
    function deleteVote(voteId) {
        axios
            .delete(
                `${process.env.REACT_APP_HOST_URL}/vote/${voteId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then((res) => {
                console.log(res);
                if (res.status === 200 || res.status === 201) {
                    axios
                        .get(`${process.env.REACT_APP_HOST_URL}/vote/${clickedAgendaId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then((res) => {
                            console.log(res);
                            if (res.status === 200 || res.status === 201) {
                                setVotes(res.data);
                            }
                        })
                        .catch((error) => {
                            console.error("마이페이지 정보 가져오기 실패:", error);
                        });
                }
            })
            .catch((error) => {
                console.error("실패:", error);
            });
    }

    function EditVote(e, id) {
        if (e.key === "Enter") {
            console.log(e.target.value);
            axios
                .patch(`${process.env.REACT_APP_HOST_URL}/vote/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    title: e.target.value,
                })
                .then((res) => {
                    console.log(res);
                    if (res.status === 200 || res.status === 201) {
                        axios
                            .get(`${process.env.REACT_APP_HOST_URL}/vote/${clickedAgendaId}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            })
                            .then((res) => {
                                console.log(res);
                                if (res.status === 200 || res.status === 201) {
                                    setVotes(res.data);
                                }
                            })
                            .catch((error) => {
                                console.error("마이페이지 정보 가져오기 실패:", error);
                            });
                    }
                })
                .catch((error) => {
                    console.error("실패:", error);
                });
            setChanged(null);
        }

    }

    function openDetail(id) {
        setDetailId(id);
        setDetail(true);
    }
    return (
        <div className={style.Maindiv}>
            <div className={style.Maintitle}>
                <h3>투표</h3>
                <h2 onClick={() => onChange("basic")} >+</h2>
            </div>

            <div className={style.Subdiv}>
                <div className={style.Subtitle}>
                    <h3>안건 1에 대한 투표</h3>
                    {isHost && <img
                        src={addBtn}
                        onClick={() => {
                            setNewvote(true);
                            addVote();
                        }} />}
                </div>
                <div className={style.Votelist}>
                    {votes.map((vote) => (
                        <div className={style.Vote} id={vote.voteId} key={vote.voteId} onClick={(e) => { setDetailName(vote.title); openDetail(vote.voteId); }}>
                            <div className={style.VoteText} onDoubleClick={() => setChanged(vote.voteId)}>
                                {Changed === vote.voteId ? <input id="newVoteName" ref={inputRef} onKeyDown={(e) => EditVote(e, vote.voteId)} placeholder={vote.title} /> : <h1>{vote.title}</h1>}
                                <span>{vote.number}</span>
                            </div>
                            {isHost && <h3
                                className={style.option}
                                alt="option"
                                onClick={(e) => handleOption(e, vote.voteId)}>⋮</h3>}
                            {ModalId === vote.voteId &&
                                <div key={vote.voteId} className={style.Modal} ref={ModalRef}>
                                    <div className={style.Options}>
                                        <div className={style.Edit} onClick={(e) => {

                                            setChanged(vote.voteId);
                                            setModalId(null);
                                            e.stopPropagation();
                                        }}>
                                            <img alt="edit" src={edit} />
                                            이름 변경
                                        </div>
                                        <div className={style.Dlt} id={vote.voteId} onClick={(e) => {

                                            deleteVote(vote.voteId);
                                            setModalId(null);
                                            e.stopPropagation();
                                        }}>
                                            <img alt="bin" src={bin} />
                                            삭제
                                        </div>
                                    </div>
                                </div>}
                        </div>
                    ))}

                </div>
            </div>
            {
                Newvote === true && isHost &&
                <VoteNew
                token={token}
                    setNewvote={setNewvote}
                    Voteobj={Voteobj}
                />
            }
            {
                Detail === true &&
                <VoteDetail
                    token={token}
                    isHost={isHost}
                    Newvote={Newvote}
                    DetailName={DetailName}
                    DetailId={DetailId}
                    setDetail={setDetail}
                />
            }
        </div >
    );
}
export default Vote;
