import { GithubOutlined } from '@ant-design/icons';
import React from 'react';

const HomePage: React.FunctionComponent = () => (
  <article>
    <h1>Hyunflix</h1>
    <p>Personal Media Center (accessable for only authorized person)</p>
    <h3><GithubOutlined /> <a href="https://github.com/Noverish/Hyunflix-react">Frontend</a></h3>
    <ul>
      <li>React, TypeScript 사용</li>
      <li>Redux와 Redux-saga를 이용한 side-effect 관리</li>
      <li>CSS pre-processor: SCSS 사용</li>
      <li>Github Actions와 Docker를 이용하여 자동 빌드 및 배포</li>
    </ul>
    <h3><GithubOutlined /> <a href="https://github.com/Noverish/Hyunflix-AuthServer">Auth Server</a></h3>
    <ul>
      <li>Node, TypeScript 사용</li>
      <li>RS256기반의 JWT을 이용하여 인증 서버에서 Token에 Private key로 서명을 하고 API Server, File Server에서 Public Key로 검증</li>
      <li>Access Token과 Refresh Token을 이용</li>
      <li>eslint를 사용하여 코드 스타일 관리</li>
      <li>TypeORM을 사용하여 DB Schema Manage &amp; Access</li>
      <li>Github Actions와 Docker를 이용하여 자동 빌드 및 배포</li>
    </ul>
    <h3><GithubOutlined /> <a href="https://github.com/Noverish/Hyunflix-APIServer">API Server</a></h3>
    <ul>
      <li>Node, TypeScript 사용</li>
      <li>eslint를 사용하여 코드 스타일 관리</li>
      <li>TypeORM을 사용하여 DB Schema Manage &amp; Access</li>
      <li>HTTP, Server-Sent Event, WebSocket등 다양한 채널을 이용하여 Frontend와 통신</li>
      <li>Chai와 Sinon을 이용하여 Unit Test</li>
      <li>Github Actions와 Docker를 이용하여 자동 빌드 및 배포</li>
    </ul>
  </article>
);

export default HomePage;
