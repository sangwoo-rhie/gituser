import React from "react";
import styled from "styled-components";
import Card from "./Card";
import Followers from "./Followers";

// 유저 컴포넌트 (Card 와 Followers를 담는 그릇 컴포넌트)
const User = () => {
  return (
    <section className="section">
      <Wrapper className="section-center">
        <Card></Card>
        <Followers></Followers>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  padding-top: 2rem;
  display: grid;
  gap: 3rem 2rem;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  /* align-items: start; */
`;

export default User;
