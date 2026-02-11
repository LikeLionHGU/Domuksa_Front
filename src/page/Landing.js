import GoogleLogin from "../component/loginPage";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  localStorage.removeItem("accessToken");
  localStorage.removeItem("memberId");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("roomId");

  function goHome() {
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
