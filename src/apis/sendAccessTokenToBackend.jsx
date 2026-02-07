import axios from "axios";

const sendAccessTokenToBackend = async (code) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST_URL}/user/google`,
      { code },
    );

    console.log("Login successful with server response:", response.data);

    // ✅ accessToken 처리
    if (response.data.accessToken) {
      const accessToken = response.data.accessToken;

      // 1️⃣ localStorage 저장
      localStorage.setItem("accessToken", accessToken);
      console.log("accessToken 저장 완료!");

      // 2️⃣ axios 기본 Authorization 헤더에 Bearer 설정 (⭐ 핵심)
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } else {
      console.warn("응답에 accessToken이 없습니다:", response.data);
    }

    // ✅ user 정보 처리
    if (response.data.user) {
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      console.log("userInfo 저장 완료!");

      if (
        response.data.user.id !== undefined &&
        response.data.user.id !== null
      ) {
        localStorage.setItem("memberId", String(response.data.user.id));
        console.log("memberId 저장 완료!");
      }
    } else {
      console.warn("응답에 user가 없습니다:", response.data);
    }

    return response.data;
  } catch (error) {
    console.error("Login failed with error:", error?.response?.data || error);
    throw error;
  }
};

export default sendAccessTokenToBackend;
