import React from "react";
import { GithubContext } from "../context/context";
import styled from "styled-components";
import { MdBusiness, MdLocationOn, MdLink } from "react-icons/md"; // 비즈니스 아이콘들

// 카드 컴포넌트 (유저의 정보 중 아래 avatar_url, html_url,... 등등이 적혀있는 카드 컴포넌트)
const Card = () => {
  // useContext 훅을 사용하여, GithubContext를 불러옴.
  // GithubContext에서 githubUser값만을 가져오기 위해 Destructure (구조분해할당) 함.
  const { githubUser } = React.useContext(GithubContext);
  // githubUser는 mockUser.js에서 가져온 데이터이므로, 거기서 필요한 데이터들만 가져옴
  const {
    avatar_url,
    html_url,
    name,
    company,
    blog,
    bio,
    location,
    twitter_username,
  } = githubUser;

  return (
    <Wrapper>
      <header>
        {/* src: 이미지 소스, alt: 이미지가 없을경우 대체 이미지or텍스트 */}
        <img src={avatar_url} alt={name} />
        <div>
          <h4>{name}</h4>
          {/* 만약 twitter_username이 null값이 경우 대체 텍스트 */}
          <p>@{twitter_username || "john doe"}</p>
        </div>
        <a href={html_url}>follow</a> {/* 클릭시 해당 url로 넘어감 */}
      </header>
      <p className="bio">{bio}</p>
      <div className="links">
        <p>
          <MdBusiness /> {company} {/* 비즈니스 아이콘 컴포넌트들 */}
        </p>
        <p>
          <MdLocationOn /> {location}
        </p>
        {/* 클릭시 해당 url로 넘어감 */}
        <a href={`https://${blog}`}>
          <MdLink></MdLink> {blog}
        </a>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.article`
  background: var(--clr-white);
  padding: 1.5rem 2rem;
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;
  &::before {
    content: "user";
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    background: var(--clr-white);
    color: var(--clr-grey-5);
    border-top-right-radius: var(--radius);
    border-top-left-radius: var(--radius);
    text-transform: capitalize;
    padding: 0.5rem 1rem 0 1rem;
    letter-spacing: var(--spacing);
    font-size: 1rem;
  }
  header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    column-gap: 1rem;
    margin-bottom: 1rem;
    img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
    }
    h4 {
      margin-bottom: 0.25rem;
    }
    p {
      margin-bottom: 0;
    }
    a {
      color: var(--clr-primary-5);
      border: 1px solid var(--clr-primary-5);
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-5);
        color: var(--clr-white);
      }
    }
  }
  .bio {
    color: var(--clr-grey-3);
  }
  .links {
    p,
    a {
      margin-bottom: 0.25rem;
      display: flex;
      align-items: center;
      svg {
        margin-right: 0.5rem;
        font-size: 1.3rem;
      }
    }
    a {
      color: var(--clr-primary-5);
      transition: var(--transition);
      svg {
        color: var(--clr-grey-5);
      }
      &:hover {
        color: var(--clr-primary-3);
      }
    }
  }
`;
export default Card;
