# react-nodebird
> Zerocho님의 트위터 클론 강좌를 보고 제작했습니다.<br>

Next.js
- Next.js 프레임워크 디렉토리 구조에 대한 이해
- next-redux-wrapper를 사용해 서버사이드 렌더링 구현
- useRouter를 사용해 다이나믹 라우팅 구현

Axios
- 프론트 서버에서 백엔드 서버로 비동기 요청(get, post, delete, patch)

Redux
- 각 컴포넌트에 사용되는 state 관리를 한 곳에서 관리
- 컴포넌트에서 Redux 에 저장된 state 를 사용하기위해 useSelector 사용
- Redux에 저장된 state를 변경하기 위해 useDispatch 사용
- combineReducers를 통해 redux state 분리

Redux-Saga
- Redux-Saga를 통해 REQUEST에 의한 SUCCESS, FAILURE 구현
- effects 함수 사용 all, call, fork, put, takeLatest

Ant Design
- 컴포넌트 디자인에 사용

ESLint
- 코드의 일관성을 위해 .eslintrc.js 에 각종 규칙을 적용하여 사용

styled-components
- 컴포넌트에 css style을 입히기 위해 사용
- 인라인 style 사용시 리렌더링 이슈가 있어 이를 방지하기 위해 사용

ExpressJs
- 프론트 서버 요청(Axios, form data)에 대한 응답 처리
- express.router를 이용한 공통 url 분리
- passport.js를 이용한 로그인 로직 처리
- bcrypt를 이용한 비밀번호 암호화
- express-session을 이용한 session 관리
- cookie-parser를 이용한 cookie 관리
- morgan을 이용해 요청에 대한 콘솔 로깅
- 이미지 업로드를 위해 multer 사용
- nodemon을 이용한 자동 서버 재시작 이용

Sequelize.js
- 서비스에 사용되는 DB를 Javascript 로 핸들링 하기 위해 사용
- config.js를 통해 DB 접속 정보를 입력
- models 폴더를 통해 생성할 테이블과 테이블간 관계 설정
- npx sequelize db:create를 통해 schema 생성
- models 폴더 index.js를 통해 실제 테이블 생성
