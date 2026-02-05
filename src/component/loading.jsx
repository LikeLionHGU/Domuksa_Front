import React, { useEffect } from "react";
import sendAccessTokenToBackend from "../../apis/sendAccessTokenToBackend";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parsedQuery = new URLSearchParams(window.location.search);
        const code = parsedQuery.get("code");

        console.log("Authorization code:", code);

        if (!code) {
          console.error("Authorization code가 URL에 없습니다.");
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
          navigate("/");
          return;
        }

        await sendAccessTokenToBackend(code);

        // 성공 시 테스트 페이지로 이동 (기존 흐름 유지)
        navigate("/home");
      } catch (error) {
        console.error("로그인 과정에서 에러가 발생했습니다.", error);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        navigate("/");
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      <LoginLoading>로그인 중입니다...</LoginLoading>
    </div>
  );
};

export default Loading;

const LoginLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin-top: 100px;
`;
