import { useRef, useEffect, useState } from "react";

import axios from "axios";
import Left from "../component/LeftList";
import Right from "../component/RightList";
import Header from "../component/Header";
import DM from "../component/Dm.js";
import Deletemodal from "../component/Deletemodal.js";
import CreateModal from "../component/CreateRoom.js";
import LogoutModal from "../component/LogoutModal.js";

import style from "../CSS/Meet.module.css";

//웹소켓+ stomp관련된 imports
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

function Meet() {
  //시간 현재!
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const Now = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(Now);
  }, []);

  const [clickedAgendaId, setClickedAgendaId] = useState(null);

  const [roomId, setRoomId] = useState(null);
  const [RoomName, setRoomName] = useState(null);
  const [password, setPassword] = useState(null);
  const [Code, setCode] = useState(null);
  const [state, setState] = useState(null);
  const [token, setToken] = useState(null);


  //header state
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [picture, setPicture] = useState(null);

  const [isHost, setIshost] = useState(true);
  const [modalNew, setModalNew] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [Logoutmodal, setLogoutmodal] = useState(false);

  //websocket
  const BackWebsocket = `${process.env.REACT_APP_HOST_URL}/ws`;

  //안건 선언한거 저장
  const clientRef = useRef(null);


  //웹소켓의 상태 동작값

  const [socketAgendas, setSocketAgendas] = useState([]); //안건
  const [socketcurrentAgendas, setSocketcurrentAgendas] = useState([]); //안건
  const [socketFile, setSocketFile] = useState(); //파일
  const [socketComment, setSocketComment] = useState(); //코멘트
  const [socketAI, setSocket] = useState(); //AI
  const [socketDm, setSocketDm] = useState(); //Dm
  const [socketUser, setSocketUser] = useState(); //User
  const [socketVote, setSocketVote] = useState(); //투표
  const [socketVoteOption, setSocketVoteOption] = useState(); //투표
  const [socketVoteResult, setSocketVoteResult] = useState(); //투표
  const [socketVoteId, setSocketVoteId] = useState(null);

  //웹소켓
  useEffect(() => {

    if (!token || !roomId) return;
    const client = new Client({
      webSocketFactory: () => new SockJS(BackWebsocket),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      // debug: (str) => {
      //   console.log("STOMP DEBUG:", str);
      // },
      reconnectDelay: 5000, //연결 안될시, 다시 연결하는 딜레이
    });
    //연결성공시
    client.onConnect = () => {
      console.log("연결성공");
      //방상태 변경
      client.subscribe(`/topic/room/state/${roomId}`, (msg) => {
        console.log("방 상태 변동");
        setState(msg.body);
      });

      //=================[구독 리스트]=================//
      //안건 구독
      client.subscribe(`/topic/agenda/list/${roomId}`, (msg) => {
        console.log("안건 변동");
        setSocketAgendas(msg.body);
      });

      //현재안건 구독
      client.subscribe(`/topic/agenda/current/${roomId}`, (msg) => {
        console.log("선택된 변동");
        setSocketcurrentAgendas(msg.body);
      });

      //파일 구독
      client.subscribe(`/topic/file/list/${clickedAgendaId}`, (msg) => {
        console.log("파일 변동");
        setSocketFile(msg.body);
      });

      //코멘트 구독
      client.subscribe(`/topic/comment/list/${clickedAgendaId}`, (msg) => {
        console.log("코멘트 변동");
        setSocketComment(msg.body);
      });

      //투표 구독
      client.subscribe(`/topic/vote/${clickedAgendaId}`, (msg) => {
        console.log("투표 변동");
        setSocketVote(msg.body);
      });

      // //투표 결과 구독
      // client.subscribe(`/topic/vote/${socketVoteId}`, (msg) => {
      //   console.log("투표결과 변동");
      //   setSocketVoteResult(msg.body);
      // });

      //DM 구독
      client.subscribe(`/topic/dm/${roomId}`, (msg) => {
        console.log("Dm 변동");
        setSocketDm(msg.body);
      });

      //StateUsers 구독
      client.subscribe(`/topic/room/online/${roomId}`, (msg) => {
        console.log("사용자 변동");
        setSocketUser(msg.body);
      });
    }

    //연결시도
    client.activate();

    clientRef.current = client;

    client.onStompError = (res) => {
      client.deactivate();
      console.log(res);
    }

    client.onWebSocketError = () => {
      client.deactivate();
      console.log("실패");
    }
    client.onWebSocketClose = () => {
      client.deactivate();
      console.log("연결 끝");
    }

    //페이지 꺼지면 소켓 연결 끝
    window.addEventListener('beforeunload', () => client.deactivate());

  }, [token, roomId])

  //투표 결과 구독은 따로,
  useEffect(() => {
    if (!clientRef.current || !socketVoteId) return;

    const sub = clientRef.current.subscribe(
      `/topic/vote/${socketVoteId}`,
      (msg) => {
        setSocketVoteResult(JSON.parse(msg.body));
      }
    );

    return () => {
      sub.unsubscribe();
    };

  }, [socketVoteId]);

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const roomId = localStorage.getItem("roomId");

    if (roomId !== null) {
      axios
        .get(`${process.env.REACT_APP_HOST_URL}/room/${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCode(res.data.code);
          setState(res.data.state);
          setRoomId(res.data.roomId);
          setRoomName(res.data.roomName);
          setClickedAgendaId(res.data.currentAgendaId);

          if (res.data.role === "host") {
            setIshost(true);
          } else {
            setIshost(false);
          }
        })
        .catch((error) => {
          console.error("마이페이지 정보 가져오기 실패:", error);
        });
    }
    if (roomId === null) {
      setModalNew(true);
    }
  }, [roomId, socketcurrentAgendas]);

  return (
    <div className={style.extradiv}>
      <div className={style.Maindiv}>
        <div className={style.Header}>
          <Header
            setName={setName}
            setEmail={setEmail}
            setPicture={setPicture}
            setState={setState}
            setLogoutmodal={setLogoutmodal}
            token={token}
            isHost={isHost}
            code={Code}
            state={state}
            roomId={roomId}
            name={name}
            email={email}
            picture={picture}
          />
        </div>
        <div className={style.Component}>
          <Left
            setRoomName={setRoomName}
            deleteModal={setDeleteModal}
            setClickedAgendaId={setClickedAgendaId}
            socketAgendas={socketAgendas}
            token={token}
            isHost={isHost}
            roomId={roomId}
            roomName={RoomName}
            clickedAgendaId={clickedAgendaId}
          />
          <Right
            socketVoteId={socketVoteId}
            setSocketVoteId={setSocketVoteId}
            //웹소켓 반응 state 들
            socketFile={socketFile} //파일
            socketComment={socketComment} //코멘트
            socketVote={socketVote} //투표
            socketVoteOption={socketVoteOption} //투표욥션
            socketVoteResult={socketVoteResult} //투표결과
            socketAI={socketAI} //AI
            socketUser={socketUser} //Users

            //
            now={now}
            RoomName={RoomName}
            token={token}
            isHost={isHost}
            roomId={roomId}
            clickedAgendaId={clickedAgendaId}
          />
        </div>
        <DM
          socketDm={socketDm}
          now={now}
          token={token}
          isHost={isHost}
          roomId={roomId} />
      </div>

      {modalNew && (
        <CreateModal
          setCode={setCode}
          setRoomId={setRoomId}
          setRoomName={setRoomName}
          setPassword={setPassword}
          setModalNew={setModalNew}
          token={token}
          RoomName={RoomName}
          password={password}
        />
      )}
      {deleteModal && (
        <Deletemodal
          setDeleteModal={setDeleteModal}
          token={token}
          roomId={roomId} />
      )}
      {Logoutmodal && (
        <LogoutModal
          setLogoutmodal={setLogoutmodal}
          setName={setName}
          setEmail={setEmail}
          setPicture={setPicture}
          token={token}
        />
      )}
    </div>
  );
}

export default Meet;
