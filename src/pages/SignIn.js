import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import loginImg from "../images/login-img.svg";

// 로그인
const SignIn = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Wrapper>
      <div className="container">
        {/* src = 이미지소스, alt = 얼터너티브 텍스트(이미지 없을 때) */}
        <img src={loginImg} alt="github user" />
        <h1>GitHub User</h1>
        <button className="btn" onClick={loginWithRedirect}>
          Login / Sign-up
        </button>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;
export default SignIn;
