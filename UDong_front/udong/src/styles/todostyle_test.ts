// todostyle_test.ts
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const StyledCalendarWrapper = styled.div`
    width: 100%;
    /* height: 80px; */
    display: flex;
    justify-content: center;
    position: relative;
    .react-calendar {
        width: 100%;
        border: none;
        border-radius: 0.5rem;
        box-shadow: 4px 5px 10px 0px rgba(0, 0, 0, 0.13);
        padding: 30px 12px 0px 12px;
        background-color: white;
    }

    /* 전체 폰트 컬러 */
    .react-calendar__month-view {
        abbr {
            color: black;
        }
    }

    /* 네비게이션 가운데 정렬 */
    .react-calendar__navigation {
        justify-content: center;
    }

    /* 네비게이션 폰트 설정 */
    .react-calendar__navigation button {
        font-weight: 800;
        font-size: 1rem;
        color: black;
    }

    /* 네비게이션 버튼 컬러 */
    .react-calendar__navigation button:focus {
        background-color: white;
    }

    /* 네비게이션 비활성화 됐을때 스타일 */
    .react-calendar__navigation button:disabled {
        background-color: white;
        color: white;
    }

    /* 년/월 상단 네비게이션 칸 크기 줄이기 */
    .react-calendar__navigation__label {
        /* flex-grow: 0 !important; */
    }

    /* 요일 밑줄 제거 */
    .react-calendar__month-view__weekdays abbr {
        text-decoration: none;
        font-size: 12px;
        color: black;
    }

    /* 일요일 폰트 */
    .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
        color: gray;
    }
    .react-calendar__month-view__weekdays__weekday--weekend abbr[title="토요일"] {
        color: gray;
    }

    /* 오늘 날짜 폰트 컬러 */
    .react-calendar__tile--now {
        background: #f6f6f6;
        border-radius: 50px;
        abbr {
            color: black;
        }
    }

    /* 네비게이션 월 스타일 적용 */
    .react-calendar__year-view__months__month {
        border-radius: 0.8rem;
        /* background-color: ${props => props.theme.gray_5}; */
        padding: 0;
    }

    /* 네비게이션 현재 월 스타일 적용 */
    .react-calendar__tile--hasActive {
        /* background-color: ${props => props.theme.primary_2}; */
        abbr {
            color: burlywood;
        }
    }

    /* 일 날짜 간격 */
    .react-calendar__tile {
        padding: 5px 0px 25px 0;
        position: relative;
    }

    /* 네비게이션 월 스타일 적용 */
    .react-calendar__year-view__months__month {
        /* flex: 0 0 calc(33.3333% - 10px) !important;
        margin-inline-start: 5px !important;
        margin-inline-end: 5px !important;
        margin-block-end: 10px;
        padding: 20px 6.6667px;
        font-size: 0.9rem;
        font-weight: 600;
        color: ${props => props.theme.gray_1}; */
    }

    /* 선택한 날짜 스타일 적용 */
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus,
    .react-calendar__tile--active {
        background-color: #ffeac5;
        border-radius: 0.3rem;
    }
`;

export const StyledCalendar = styled(Calendar)`
    .react-calendar__tile--active {
        /* background-color: black; // 오늘 선택 시 배경색을 주황색으로 변경 */
        border-radius: 0.3rem;
    }
`;

/* 오늘 버튼 스타일 */
export const StyledDate = styled.div`
    position: absolute;
    right: 7%;
    top: 6%;
    background-color: #df7f3a;
    color: white;
    width: 18%;
    min-width: fit-content;
    height: 1.5rem;
    text-align: center;
    margin: 0 auto;
    line-height: 1.6rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 800;
`;

/* 오늘 날짜에 텍스트 삽입 스타일 */
export const StyledToday = styled.div`
    width: 100%;
    /* height: 10px; */
    /* border: 1px solid red; */
    /* background-color: gray; */

    /* font-size: x-small;
    color: #df7f3a;
    font-weight: 600;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%); */
`;

/* 날짜에 점 표시 스타일 */
export const StyledDot = styled.div`
    background-color: #df7f3a;
    border-radius: 50%;
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translateX(-50%);
`;

/* 추가 버튼 스타일 */
export const StyledAddButton = styled.button`
    /* position: absolute; */
    /* top: 48%; */
    /* right: 20%; // 부모 요소의 가운데로 이동 */
    /* bottom: 200px; // 아래쪽으로 25px 이동 */
    width: 25px; // 너비 설정
    height: 25px; // 높이 설정
    border-radius: 50px; // 동그랗게 만들기
    /* background-color: none; // 배경색 설정 */
    /* color: white; // 텍스트 색상 설정 */
    font-size: 3rem; // 폰트 크기 설정
    font-weight: bold; // 폰트 굵기 설정
    border: none; // 테두리 없음
    cursor: pointer; // 커서 설정
    display: flex; // 내부 요소를 가로로 정렬하기 위해 필요
    justify-content: center; // 가로 중앙 정렬
    align-items: center; // 세로 중앙 정렬
    /* padding-top: 5px; */
`;
