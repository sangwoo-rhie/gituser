import React from "react";
import styled from "styled-components";
import { MdSearch } from "react-icons/md"; // 아이콘 컴포넌트
import { GithubContext } from "../context/context";

// Search bar 컴포넌트
const Search = () => {
  const [user, setUser] = React.useState("");
  // useContext 훅을 사용하여, GithubContext를 불러옴.
  // GithubContext에서 request 값만을 가져오기 위해 Destructure (구조분해할당) 함.
  const { requests, error, searchGitHubUser, isLoading } =
    React.useContext(GithubContext);
  // console.log("requests", requests);

  // 입력창 : get things from global context
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      searchGitHubUser(user); // 유저찾기
    }
  };
  return (
    <section className="section">
      <Wrapper className="section-center">
        {/* show 프로퍼티가 true인 경우에만 에러 반환 */}
        {error.show && (
          <ErrorWrapper>
            <p>{error.message}</p>
          </ErrorWrapper>
        )}
        {/* 입력 컴포넌트 */}
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <MdSearch />
            <input
              type="text"
              placeholder="GitHub 유저를 입력하세요."
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            {/* requests가 0보다 크고, 로딩이 없는 경우만 버튼을 표시한다. */}
            {requests > 0 && !isLoading && (
              <button type="submit">Search</button>
            )}
          </div>
        </form>
        {/* 얼마나 많은 방문이 있었는지 요청(Request) 수 조회 */}
        <h3>Requests : {requests} / 60</h3>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: grid;
  gap: 1rem 1.75rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr max-content;
    align-items: center;
    h3 {
      padding: 0 0.5rem;
    }
  }
  .form-control {
    background: var(--clr-white);
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    column-gap: 0.5rem;
    border-radius: 5px;
    padding: 0.5rem;
    input {
      border-color: transparent;
      outline-color: var(--clr-grey-10);
      letter-spacing: var(--spacing);
      color: var(--clr-grey-3);
      padding: 0.25rem 0.5rem;
    }
    input::placeholder {
      color: var(--clr-grey-3);
      text-transform: capitalize;
      letter-spacing: var(--spacing);
    }
    button {
      border-radius: 5px;
      border-color: transparent;
      padding: 0.25rem 0.5rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      background: var(--clr-primary-5);
      color: var(--clr-white);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-8);
        color: var(--clr-primary-1);
      }
    }

    svg {
      color: var(--clr-grey-5);
    }
    input,
    button,
    svg {
      font-size: 1.3rem;
    }
    @media (max-width: 800px) {
      button,
      input,
      svg {
        font-size: 0.85rem;
      }
    }
  }
  h3 {
    margin-bottom: 0;
    color: var(--clr-grey-5);
    font-weight: 400;
  }
`;

// 에러 Wrapper
const ErrorWrapper = styled.article`
  position: absolute;
  width: 90vw;
  top: 0;
  left: 0;
  transform: translateY(-100%);
  text-transform: capitalize;
  p {
    color: red;
    letter-spacing: var(--spacing);
  }
`;
export default Search;
