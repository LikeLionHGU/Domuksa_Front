import axios from "axios";

const sendAccessTokenToBackend = async (code) => {
  try {
    // ✅ 엔드포인트 고정: /user/google
    // ✅ 프론트 방식 유지: code를 그대로 백엔드로 보냄
    const response = await axios.post(
      `${process.env.REACT_APP_HOST_URL}/user/google`,
      { code }
    );

    console.log("Login successful with server response:", response.data);

    // ✅ 명세/백엔드 응답: accessToken
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      console.log("토큰 저장 완료!");
    }

    // ✅ 명세/백엔드 응답: user (id, name, email, profileUrl ...)
    if (response.data.userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      console.log("userInfo 저장 완료!");

      // 프론트 기존 로직 유지 위해 memberId도 같이 저장
      if (response.data.user.id !== undefined && response.data.user.id !== null) {
        localStorage.setItem("memberId", String(response.data.user.id));
        console.log("memberId 저장 완료!");
      }
    } else {
      console.warn("응답에 user가 없습니다:", response.data);
    }

    return response.data;
  } catch (error) {
    console.error(
      "Login failed with error:",
      error?.response?.data || error
    );
    throw error;
  }
};

export default sendAccessTokenToBackend;
