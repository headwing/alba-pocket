

![image](https://user-images.githubusercontent.com/117805482/217720232-1199e879-590e-44ce-8074-f77ba68addf0.png)


## 🌱 프로젝트 소개

### 나만의 알바 일지와 알바생 커뮤니티 **Alba-Pocket**
📌 근무 일정을 간편하게 관리할 수 있고 급여 계산을 손쉽게 할 수 있는 서비스<br/>
📌 일하면서 생긴 궁금증을 공유 및 해결할 수 있는 웹 커뮤니티 서비스<br/>

### 개발 기간  
📌 2022년 12월 30일 ~ 2023년 02월 10일

<a href="https://www.albapocket.com/"> 🔗알바포켓 서비스 바로가기🔗</a><br/>
<a href="https://youtu.be/vMSlWEJ8IMU"> 🔗알바포켓 서비스 소개 영상 보기🔗</a>

-------------
  
## 🌱 서비스 배경

- 알바생 중 26.9%는 한번에 2개 이상의 알바를 병행한다.
- 알바생 10명 중 3명 정도는 아르바이트하면서 부당대우를 당했던 경험이 있는 것으로
  나타났으며, 부당대우로는 임금체불이 가장 많았다.

------------
  
## 🌱 목적 및 기대효과

- 자신의 근무 일정을 쉽고 간편하게 관리할 수 있다.
- 월 또는 일 단위로 자신이 받을 금액을 미리 계산하고 확인할 수 있다.
- 알하면서 생긴 궁금증을 커뮤니티를 통해 해결할 수 있다.
- 급하게 알바를 못 하게 되었거나 대타가 필요할 때 대신 알바 해줄 사람을 찾을 수 있다.

----------
  
## 🌱 주요 기능

📌 소셜로그인을 통한 간편한 회원가입<br/>
📌 캘린더로 알바 일정 관리<br/>
📌 월급날 D-day<br/>
📌 커뮤니티<br/>
📌 1:1 채팅<br/>
📌 실시간 알림<br/>
📌 지난 근무를 분석할 수 있는 통계 탭<br/>
📌 마이페이지<br/>

-------

## 💻 기술정보
### Front-End
<p>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=black">
  <img src="https://img.shields.io/badge/Create React App-09D3AC?style=for-the-badge&logo=Create React App&logoColor=black">
  <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white">
  <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
  <img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white">
</p>


### Back-end
<p>
</p>

----------

## 🌱 서비스 아키텍쳐
![Untitled](https://user-images.githubusercontent.com/109337855/218501119-54a9cd29-db0e-4f13-bec0-7daa68f0c034.png)

---------

## 🌱 기술적 의사결정
| 기술 | 사용 이유 |
| ----- | ----- |
| Typescript | 코드를 작성하는 중에 에러를 발견할 수 있고 에러에 대한 대응을 빠르게 해주어 개발자의 실수를 줄여줄 수 있다는 점에 도입하기로 결정 |
| react-query | 게시물이나 근무 일정을 수정이나 삭제할 때, Redux-Thunk에 비해 state관리의 부담이 감소하여 고려하게 됨. 화면 전환할 때마다 서버데이터를 가져오기 때문에 useEffect와 useState의 사용을 줄일 수 있고 실시간 반영이 가능해서 선택하게 됨. 무한스크롤 구현이 서비스 특성상 필요한데, 이를 통해 구현이 가능해서 사용하기로 결정함 |
| stomp, sockjs | 작성 예정 |
| moment | 작성 예정 |
| styled-components | 컴포넌트 재사용에 용이하고, props를 통해 컴포넌트에 원하는 스타일 속성을 간단하게 부여하여 커스텀할 수 있기 때문에 도입함. |
| axios(instance) | API를 연동하기 위해서 자동으로 JSON 데이터 형식으로 변환이 가능하고 data가 object 형식이 포함된다는 점에서 axios를 선택함. axios 사용을 할 때마다 URL과 token을 중복사용하게 되어 인스턴스화 시켜서 사용. |
| date-fns | 다른 달력 라이브러리로는 필요한 기능들을 커스텀하는데 어려움이 있어 달력 기능을 직접 구현하고 근무 일정 관련 로직을 구현하기 위해 날짜 라이브러리가 필요하여 선택함. |
| apexcharts | 통계 분석 페이지 구현에서 다른 통계 라이브러리에 비해 커스텀이 손쉽고 직관적인 디자인이 프로젝트와 어울린다고 생각하여 선택함. |
| vercel | 모든 설정을 수동으로 할 필요 없이 사용하고 싶은 소스를 정하고 Deploy만 하면 나머지 빌드 과정이나 운영(스케일링 등)을 버셀이 모두 처리하므로 가장 배포 시 편리하다고 생각하여 선택. 또한 연결된 깃허브 레파지토리가 수정되면 자동 배포가 되는 편리함이 있어 선택함. |
| react-datepicker | 캘린더나 통계에서 input태그를 통해 월을 선택하도록 했을 때, 오른쪽 아이콘 커스텀이 어렵고 브라우저마다 모양이 달라져 아이콘 커스텀이 용이한 react-datepicker를 선택. 또한 input태그에 비해 웹에서 년과 월을 선택하는 부분이 보다 편리하여 선택 |
| recoil | react-query를 통해 상태관리의 부담이 덜어진 상태에서 모달창 관리나 페이지 이동 시에도 저장해야하는 데이터의 경우에 필요한 상태관리에 적합하다고 생각하여 선택 |
| react-hook-form | 회원가입 및 로그인 시 발생하는 onChange와 useState의 잦은 사용이 비효율적이어서 선택. 또한 비밀번호 일치 여부와 중복 체크의 경우 보다 편리하게 기능 구현이 가능하여 선택 |

## 🌱 기능
<a href="https://github.com/team3-realproject/frontend/wiki/%EC%9B%94%EA%B8%89%EB%82%A0-Dday">📌 월급날 D-day<br/>
<a href="https://github.com/team3-realproject/frontend/wiki/%EC%BA%98%EB%A6%B0%EB%8D%94">📌 캘린더<a/><br/>
<a href="https://github.com/team3-realproject/frontend/wiki/%EA%B2%8C%EC%8B%9C%EB%AC%BC-%EA%B2%80%EC%83%89">📌 게시물 검색<a/><br/>
<a href="https://github.com/team3-realproject/frontend/wiki/%EB%AC%B4%ED%95%9C%EC%8A%A4%ED%81%AC%EB%A1%A4">📌 무한 스크롤<br/>
<a href="https://github.com/team3-realproject/frontend/wiki/1:1-%EC%B1%84%ED%8C%85">📌 1:1 채팅<br/>
<a href="https://github.com/team3-realproject/frontend/wiki/%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%95%8C%EB%A6%BC">📌 실시간 알림<a/><br/>

## 🌱 트러블 슈팅
- 패키지 충돌 문제
- Stomp 버전 문제
- 게시물 사진 수정

## 🌱 페이지별 기능 구현
| 페이지 | 기능 |
| ----- | ----- |
| 로그인 및 회원가입 | - 카카오 로그인 <br/> - 회원가입 시 이메일 인증 |
| 메인페이지 | - 근무지 CRUD <br/> - 근무 일정 등록 - 월급날 D-day <br/> - 안 읽은 알림 및 안 읽은 채팅 메세지 개수 확인 |
| 캘린더 | - 근무 일정 CRUD <br/> - 일급, 월급(세전 및 세후) 확인 <br/> - 매주 일요일에 발생한 주휴 수당 확인 <br/> - 모달창을 통해 일별 근무 내역 상세 조회 |
| 커뮤니티 | - 게시물 CRUD <br/> - 자유, 알바고민, 대타구해요 게시판 선택 가능 <br/> - 댓글 및 좋아요 <br/> - 1:1 채팅 <br/> - 실시간 알림 <br/> - 게시물 검색 <br/> - 게시물 무한 스크롤 |
| 1:1 채팅 | - 확인 여부에 따라 안 읽은 메세지의 개수 표시 |
| 통계 | - 이번 달 일한 시간&근무지별 일한 시간 <br/> - 최근 5개월 간 근무지별 급여 그래프 |
| 마이페이지 | - 내활동을 통해 내가 쓴 글, 좋아요 누른 글, 작성 댓글 확인 <br/> - 작성 댓글 선택 및 페이지 전체 삭제 <br/> - 프로필 수정 <br/> - 로그아웃 |

----------
  ## 👨‍👦‍👦 맴버소개
| Position | Name | Blog | MBTI |
| ----- | ----- | ----- | ----- |
| 🔰 FE·ReactJS | 최유정 | 🔗 [GitHub::headwing](https://github.com/headwing) | ISTJ |
| FE·ReactJS | 오수민 | 🔗 [GitHub::soomin-world](https://github.com/soomin-world) | ENTP |
| 🔰 BE·Spring | 최진우 | 🔗 [GitHub::woooo96](https://github.com/woooo96) | ISFJ |
| BE·Spring | 최재하 | 🔗 [GitHub::wogk9854](https://github.com/wogk9854) | ISFP |
| BE·Spring | 권성현 | 🔗 [GitHub::kwon-sunghyun](https://github.com/kwon-sunghyun) | ENFJ |
| UX/UI | 남다정 |  | ENFP |
