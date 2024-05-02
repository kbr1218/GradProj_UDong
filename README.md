<div align="center">
    <img src="https://capsule-render.vercel.app/api?type=shark&color=FFD875&height=100&text=&animation=&fontColor=f5c054&fontSize=0" />
    <img src="https://capsule-render.vercel.app/api?type=transparent&color=f5c054&height=35&text=우리%20동거해요&animation=&fontColor=3C3C3C&fontSize=25" />
    <img src="https://capsule-render.vercel.app/api?type=transparent&color=9ac5ee&height=70&text=UDong&animation=&fontColor=fcd368&fontSize=70" />
</div>

## 🙋🏻‍♀️ 프로젝트 소개
룸메이트 간의 원활한 의사소통을 도와주고 **공동생활을 지원**하는 웹 애플리케이션

<br>

## 🎯 서비스 목표
동거 가구 구성원들 간에 발생하는 다양한 일상적인 과제들을 효율적으로 관리하고, 규칙과 루틴을 설정하여 사용자들에게 편리한 공동생활을 제공하고자 한다.

<br>

## 🚩 Logo
<div align="center">
  <img src="/img/logowTitle.png" width="350px" height="350px">
</div>

<br>

## 📝 주요 기능
1. **공동생활 규칙과 요일별 집안일 설정**
   * 구성원 간에 지켜야 할 공동생활 규칙 기록하기
   * 요일별 집안일 담당자를 정해 역할 분담하기
   <br>
2. **캘린더와 To-do 리스트**
   * 공유 캘린더로 룸메이트와 함께 To-do 관리하기
   <br>
3. **채팅**
   * 룸메이트와 1:1 채팅 주고받기
   * 일정과 관련된 메시지를 주고 받으면 To-do에 자동 추가
   <br>
4. **구성원 관리**
   * 룸메이트를 초대해 방 구성원 추가하기

<br>

## 🔎 기술 상세
1. **채팅 메시지 전송 및 수신**
   * STOMP를 사용, 사용자가 채팅을 입력하면 브로커에게 내용과 토픽 전송
     브로커는 해당 토픽을 구독하는 사용자에게 메시지를 전달. 즉 같은 방에 속한 사용자 간의 채팅 구현
   * 전송된 메시지는 실시간으로 서버에 저장
   <br>
2. **GPT 처리 요청**
   * 사용자의 메시지가 서버로 전송되면, 저장과 동시에 GPT API를 호출하여 일정/계획과 관련된 키워드가 있는지 확인
   * GPT는 현재 날짜를 기반으로 사용자가 메시지에서 언급한 날짜를 계산
   * 계산된 날짜와 키워드를 반환
   <br>
3. **클라이언트 응답 전송**
   * 클라이언트는 서버로부터 받은 응답을 바탕으로 사용자에게 To-do 추가 여부를 확인하기 위한 요청 전송

<br>

## 🛠 시스템 아키텍처
<div style="text-align: left;">
  <div style="margin: ; text-align: left;" "text-align: left;">
    <p><strong>FE: &nbsp;</strong>
      <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white">
      <img src="https://img.shields.io/badge/typescript-3178C6?style=flat&logo=typescript&logoColor=white">
      <img src="https://img.shields.io/badge/styled components-DB7093?style=flat&logo=styledcomponents&logoColor=white">
    </p>
    <p><strong>BE: &nbsp;</strong>
      <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat&logo=Spring Boot&logoColor=white">
      <img src="https://img.shields.io/badge/Spring-6DB33F?style=flat&logo=Spring&logoColor=white">
      <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=flat&logo=springsecurity&logoColor=white">
      <img src="https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white">
      <img src="https://img.shields.io/badge/openAI-412991?style=flat&logo=openai&logoColor=white">
    </p>
    <p><strong>etc: &nbsp;</strong>
      <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white">
      <img src="https://img.shields.io/badge/Google-4285F4?style=flat&logo=Google&logoColor=white">
      <img src="https://img.shields.io/badge/Github-181717?style=flat&logo=Github&logoColor=white">
      <img src="https://img.shields.io/badge/Github Actions-2088FF?style=flat&logo=githubactions&logoColor=white">
      <img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=flat&logo=amazonrds&logoColor=white">
      <img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=Docker&logoColor=white">
      <img src="https://img.shields.io/badge/Cloudtype-000000?style=flat&logo=Java&logoColor=white"> 
    </p>
  </div>
</div>

<br>

## 🖥 서비스 화면
- 구글 로그인 & 방 개설/참여
<div align="center">
    <img src="/img/0_로그인.png" width="200">
    <img src="/img/1_choice.png" width="200">
    <img src="/img/2_방이름.png" width="200">
    <img src="/img/13_초대받음.png" width="200">
</div>
<br><br>

- 홈 화면 (방 이름 변경, 공동생활규칙 추가/삭제, 집안일 추가/삭제)
<div align="center">
    <img src="/img/3_홈.png" width="200">
    <img src="/img/4_방이름변경.png" width="200">
    <img src="/img/5_규칙수정.png" width="200">
    <img src="/img/6_집안일수정.png" width="200">
</div>
<br><br>

- 공동 캘린더와 To-do 리스트 (To-do 추가/삭제) & 채팅 (채팅에서 To-do 추가)
<div align="center">
    <img src="/img/7_캘린더.png" width="200">
    <img src="/img/8_투두수정.png" width="200">
    <img src="/img/9_채팅.png" width="200">
    <img src="/img/10_채팅투두추가.png" width="200">
</div>
<br><br>

- 마이페이지 (사용자 초대, 로그아웃, 방 나가기)
<div align="center">
    <img src="/img/11_마이페이지.png" width="200">
    <img src="/img/12_사용자추가.png" width="200">
    <img src="/img/14_로그아웃.png" width="200">
    <img src="/img/15_방나가기.png" width="200">
</div>

<br><br>

### 📌 코드 추가/수정/삭제 Repository
- **FE:&nbsp;** [SMWU_front](https://github.com/SMWU19/SMWU_front.git)  
- **BE:&nbsp;** [SMWU_back](https://github.com/SMWU19/SMWU_back.git)
