import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// 에러 페이지.
const Error = () => {
  return (
    // Wrapper 컴포넌트 사용
    <Wrapper>
      <div>
        <h1>404</h1>
        <h3>Sorry, the page you tried cannot be found.</h3>
        {/* btn(버튼) 클릭시 "/"path, 즉 랜딩페이지로 이동 */}
        <Link to="/" className="btn">
          back home
        </Link>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--clr-primary-10);
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    color: var(--clr-grey-3);
    margin-bottom: 1.5rem;
  }
`;
export default Error;
