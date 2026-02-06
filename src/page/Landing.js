import { useEffect, useRef, useState } from "react";
import GoogleLogin from "../component/loginPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const [logined, setLogined] = useState(false);
  const [name, setName] = useState(null);
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLogined(false);
      return;
    }
    setLogined(true);
    if (token) {
      const User = JSON.parse(localStorage.getItem("userInfo"));
      setName(User.name);
      setPicture(User.picture);
    }

    axios
      .get(`${process.env.REACT_APP_HOST_URL}/mypage`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.error("마이페이지 정보 가져오기 실패:", error);
      });
  }, []);

  function goHome (){
    navigate("/home");
  }

  return (
    <>
    <div onClick={goHome}>홈으로 가기 임시 버튼</div>
      <GoogleLogin />
    </>
  );
}

export default Landing;
