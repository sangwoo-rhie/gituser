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
  const [githubUser, setGithubUser] = useState(mockUser); // useState() 훅 사용, 아래 3개도 마찬가지. mockUser는 디폴트 값.
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  return (
    <GithubContext.Provider
      value={{ githubUser: githubUser, repos: repos, followers: followers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
