# Hyunflix

Personal Media Center (accessable for only authorized person)

### [Frontend](https://github.com/Noverish/Hyunflix-react)
- React, TypeScript 사용
- Redux와 Redux-saga를 이용한 side-effect 관리
- CSS pre-processor: SCSS 사용
- Github Actions와 Docker를 이용하여 자동 빌드 및 배포

### [Auth Server](https://github.com/Noverish/Hyunflix-AuthServer)
- Node, TypeScript 사용
- RS256기반의 JWT을 이용하여 인증 서버에서 Token에 Private key로 서명을 하고 API Server, File Server에서 Public Key로 검증
- Access Token과 Refresh Token을 이용
- eslint를 사용하여 코드 스타일 관리
- TypeORM을 사용하여 DB Schema Manage & Access
- Github Actions와 Docker를 이용하여 자동 빌드 및 배포

### [API Server](https://github.com/Noverish/Hyunflix-APIServer)
- Node, TypeScript 사용
- eslint를 사용하여 코드 스타일 관리
- TypeORM을 사용하여 DB Schema Manage & Access
- HTTP, Server-Sent Event, WebSocket등 다양한 채널을 이용하여 Frontend와 통신
- Chai와 Sinon을 이용하여 Unit Test
- Github Actions와 Docker를 이용하여 자동 빌드 및 배포
