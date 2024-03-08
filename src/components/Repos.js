import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
import Doughnut2d from "./Charts/Doughnut2d";

// 레포 컴포넌트
const Repos = () => {
  // useContext 훅을 사용하여, GithubContext를 불러옴.
  // GithubContext에서 repo 값만을 가져오기 위해 Destructure (구조분해할당) 함.
  const { repos } = React.useContext(GithubContext);

  //array.reduce(callback[, initialValue])
  // total : 누적값, item : 현재 요소 => 배열의 각 요소를 반복하면서 누적된 값을 계산
  const languages = repos.reduce((total, item) => {
    // repos는 context.js에 위치해있으며, 거기서 mockRepos의 인자값중 필요한것을 구조분해할당해서 가져옴
    // language값이 null또는 undefined일 경우 total반환,
    // language가 null이 아니지만 total이 객체가 아닐경우 아래 값 반환
    const { language, stargazers_count } = item;
    if (!language) return total;
    if (!total[language]) {
      total[language] = {
        label: language,
        value: 1,
        stars: stargazers_count, // 별점
      };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
      };
    }
    return total;
  }, {});

  // ★ Pie3D 데이터 사용
  // 위에서 value를 선정하는 로직에 따른, value의 크기에 따른 내림차순
  // slice를 사용해 상위 5개 언어만 선택
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  // ★ Doughnut2D 데이터 사용
  // 별점 (stars: stargazers_count)의 크기 따른 내림차순,  most stars per language
  // map함수를 사용해 ...오퍼레이터로 나머지인자들(label, stars)먼저 배열하고, value를 마지막에 배열
  // slice를 사용해 상위 5개 언어만 선택
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((item) => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);
  // console.log(mostPopular);

  // ★ Column3D, Doughnut2D 데이터 사용
  // Repos에 얼마나 많은 stars, forks가 있는지
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );
  // 별점(stars)가 내림차순으로 배열되므로, 끝에서부터 5개가 가장 큼.
  // 그걸 거꾸로 배열해서 오름차순으로 만듦, 별점이 가장 큰 5개 순서대로 나열
  // forks도 마찬가지
  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  // 더미데이터
  const chartData = [
    {
      label: "HTML",
      value: "30",
    },
    {
      label: "CSS",
      value: "160",
    },
    {
      label: "JavaScript",
      value: "80",
    },
  ];

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
