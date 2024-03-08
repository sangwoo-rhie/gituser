import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

// 콘텍스트
const GithubContext = React.createContext();

// 2가지 컴포넌트에 접근(또는 생성) : Provider 컴포넌트, Consumer 컴포넌트

// 분리된 컴포넌트
const GithubProvider = ({ children }) => {
  // useState() 괄호에 들어있는 값들은 default value(초깃값)
  const [githubUser, setGithubUser] = useState(mockUser); // useState() 훅 사용, 아래 3개도 마찬가지. mockUser는 디폴트 값.
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  // Request Loading
  const [requests, setRequests] = useState(0); // 초깃값=0
  const [isLoading, setIsLoading] = useState(false); // 로딩은 디폴트값이 false임. 아무것도 아닌상태에서 로딩은 발생하지 않음

  // Error : 디폴트값 false
  const [error, setError] = useState({ show: false, message: "" });

  // 유저찾기
  const searchGitHubUser = async (user) => {
    // toggleError를 디폴트값으로 넣어줌(디폴트는 error가 false, 즉 에러가 없는 상태)
    toggleError();
    setIsLoading(true); // 1. 유저 찾기를 실행하면 디폴트값으로 로딩이 실행됨
    const response = await axios(`${rootUrl}/users/${user}`).catch((error) =>
      console.log("error", error)
    );
    if (response) {
      setGithubUser(response.data);
      // 구조분해할당
      const { login, followers_url } = response.data;

      // // repos
      // await axios(`${rootUrl}/users/${login}/repos?per_page=100`).then(
      //   (response) => setRepos(response.data)
      // );

      // // followers
      // await axios(`${followers_url}?per_page=100`).then((response) =>
      //   setFollowers(response.data)
      // );

      // 위 repos와 followers로 axios가 각각 나뉜 것을,
      // 아래처럼 allSettled로 하나로 묶을 수 있음
      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          console.log("results", results);
          const [repos, followers] = results;
          const status = "fulfilled";
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      // 토글 에러메시지 반환, 디폴트값 true로 변경
      toggleError(true, "The user you are searching is not exist.");
    }
    checkRequests();
    setIsLoading(false); // 2. request가 모두 완료되면 loading을 숨김
  };

  // check rate (방문 횟수)
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          // 토글 에러메시지 반환, 디폴트값 true로 변경
          toggleError(true, "Sorry, You have exceeded your hourly rate limit!");
        }
      })
      .catch((error) => console.log(error));
  };

  // 토글 에러
  function toggleError(show = false, message = "") {
    setError({ show, message });
  }

  // Error
  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser: githubUser,
        repos: repos,
        followers: followers,
        requests: requests,
        error: error,
        searchGitHubUser,
        isLoading: isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
