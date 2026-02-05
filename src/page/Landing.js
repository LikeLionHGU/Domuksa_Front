import { useEffect, useRef, useState } from "react";
import GoogleLogin from "../component/loginPage";
import axios from "axios";

function Landing() {
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

  return (
    <>
      <GoogleLogin />
    </>
  );
}

export default Landing;
