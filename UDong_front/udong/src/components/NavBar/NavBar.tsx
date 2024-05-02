import { useNavigate, useLocation } from "react-router-dom";
import { Block } from "../../styles/ui";
import React, { useState, useEffect } from "react";
import { IUserInfo } from "../../interfaces/user";

type NavBarProps = {
    user?: IUserInfo;
    userInfo?: IUserInfo;
};

export function NavBar({ user, userInfo }: NavBarProps) {
    const userRoomId = user?.roomId;
    const navigate = useNavigate();
    const location = useLocation();

    // 각 아이콘의 상태를 저장할 상태 변수 설정
    const [homeIcon, setHomeIcon] = useState("empty_home.png");
    const [todoIcon, setTodoIcon] = useState("todo_icon.png");
    const [chatIcon, setChatIcon] = useState("chat.png");
    const [myPageIcon, setMyPageIcon] = useState("empty_user.png");

    // 페이지 URL 변경에 따라 아이콘 변경
    useEffect(() => {
        const path = location.pathname;
        if (path === "/home") {
            setHomeIcon("home.png");
            setTodoIcon("todo_icon.png");
            setChatIcon("chat.png");
            setMyPageIcon("empty_user.png");
        } else if (path === "/todo") {
            setHomeIcon("empty_home.png");
            setTodoIcon("black_todo_icon.png");
            setChatIcon("chat.png");
            setMyPageIcon("empty_user.png");
        } else if (path.startsWith("/chat")) {
            setHomeIcon("empty_home.png");
            setTodoIcon("todo_icon.png");
            setChatIcon("chat.png");
            setMyPageIcon("empty_user.png");
        } else if (path === "/mypage") {
            setHomeIcon("empty_home.png");
            setTodoIcon("todo_icon.png");
            setChatIcon("chat.png");
            setMyPageIcon("user.png");
        }
    }, [location]);

    const handleGoHome = () => {
        navigate("/home");
    };

    const handleGoTodoCalendar = () => {
        navigate("/todo");
    };

    const handleGoChat = () => {
        navigate(`/chat/${userRoomId}`);
    };

    const handleGoMyPage = () => {
        navigate("/mypage");
    };

    return (
        <>
            <Block.Box
                width="375px"
                height="83px"
                justifyContent="space-around"
                alignItems="center"
                borderRadius="20px 20px 0px 0px"
                boxShadow="0px -10px 20px -20px black"
            >
                <Block.Img src={homeIcon} alt="홈 아이콘" width="27px" height="27px" pointer onClick={handleGoHome} />
                <Block.Img
                    src={todoIcon}
                    alt="투두 아이콘"
                    width="27px"
                    height="27px"
                    pointer
                    onClick={handleGoTodoCalendar}
                />
                <Block.Img src={chatIcon} alt="채팅 아이콘" width="27px" height="30px" pointer onClick={handleGoChat} />
                <Block.Img
                    src={myPageIcon}
                    alt="유저 아이콘"
                    width="27px"
                    height="27px"
                    pointer
                    onClick={handleGoMyPage}
                />
            </Block.Box>
        </>
    );
}
