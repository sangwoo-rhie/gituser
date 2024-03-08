import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

// Navbar 컴포넌트
const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
    useAuth0();
  // isAuthenticated 가 true인 경우 유저가 존재. user에는 유저 정보 담겨있음.
  const isUser = isAuthenticated && user;
  console.log("user", user);
  return (
    <Wrapper>
      {/* 유저가 존재할 경우, 이미지를 띄우고 이메일을 띄운다. */}
      {isUser && user.picture && <img src={user.picture} alt={user.email} />}
      {isUser && user.email && (
        <h4>
          Welcome, <strong>{user.email}</strong>
        </h4>
      )}
      {/* 유저가 존재할경우 : 존재하지 않을 경우 => 삼항연산자 */}
      {isUser ? (
        <button
          // 유저가 존재할 경우 (로그인중일 경우)로그아웃 버튼 띄움
          onClick={() => {
            logout({ returnTo: window.location.origin });
          }}
        >
          logout
        </button>
      ) : (
        // 유저가 존재하지 않을 경우 로그인 버튼 띄움
        <button onClick={loginWithRedirect}>login</button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`;

export default Navbar;
