import React, { useState, useEffect, useRef } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { getChat } from "../../api/chat/getChat";
import useKoreaTime from "../../hooks/useKoreaTime";
import { Block, Button, Input, Margin, Text } from "../../styles/ui";
import { postCreateTodo } from "../../api/todolist/postCreateTodo";
import AddGPTtodoModal from "../Modal/chat/AddGPTtodoModal";
import { useQuery } from "react-query";
import { getUserInfo } from "../../api/login/getUserInfo";

var stompClient = null;

export default function TryChat(Props) {
    const { data: user } = useQuery(["user"], getUserInfo);

    const roomId = Props.roomId;
    const senderId = Props.senderId;
    const isoDateTime = useKoreaTime();

    const [chat, setChat] = useState([]);
    const [userData, setUserData] = useState({
        senderId: senderId,
        roomId: roomId,
        connected: false,
        message: "",
    });

    const [isOpen, setIsOpen] = useState(false);
    const handleModalOpen = () => {
        setIsOpen(true);
    };

    const handleValue = e => {
        const { value, name } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const registerUser = () => {
        let Sock = new SockJS("https://port-0-smwu-back-iad5e2alq3rwcdo.sel4.cloudtype.app/ws");
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        setUserData({ ...userData, connected: true });
        stompClient.subscribe("/chatroom/public", onMessageReceived);
    };

    const onMessageReceived = payload => {
        let payloadData = JSON.parse(payload.body);

        if (payloadData.body.roomId === userData.roomId) {
            const { senderId, senderName, message, time, gptResponse } = payloadData.body;

            let chatMessage;

            if (gptResponse && gptResponse.body) {
                const { todo, date, time } = JSON.parse(gptResponse.body);

                let todoMessage = "";

                if (todo) {
                    if (date) {
                        todoMessage = `${date}에 ${todo}을(를) 투두리스트에 등록하시겠습니까?`;
                    } else {
                        todoMessage = `${todo}를 투두리스트에 등록하시겠습니까?`;
                    }
                }

                chatMessage = {
                    senderId,
                    senderName,
                    message,
                    todoMessage,
                    time: isoDateTime,
                    isTodo: true, // Add flag to indicate it's a todo message
                    todo: todo,
                    date: date,
                };
            } else {
                chatMessage = {
                    senderId,
                    senderName,
                    message,
                    time: isoDateTime,
                    isTodo: false, // Add flag to indicate it's not a todo message
                };
            }

            // 자신이 보낸 메시지인지 확인하여 처리
            if (senderId !== user?.id) {
                setChat(prevChat => [...prevChat, chatMessage].sort((a, b) => a.time - b.time)); // 시간을 기준으로 채팅 정렬
            }
        } else {
            console.error("유저의 방번호와 현재 파라미터 불일치");
        }
    };

    const onError = err => {
        console.error("채팅 에러");
    };

    const sendMessage = () => {
        if (stompClient && userData.message.trim().length > 0) {
            let chatMessage = {
                senderId: senderId,
                roomId: roomId,
                message: userData.message,
                time: isoDateTime,
            };
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            // setChat(prevChat => [...prevChat, chatMessage]); // 메시지를 보낸 후 채팅 내용을 갱신
            setUserData({ ...userData, message: "" }); // 입력 창 초기화
        }
    };

    const handleKeyDown = e => {
        if (e.key === "Enter") {
            e.preventDefault(); // Enter 키 기본 동작 제거
            sendMessage();
        }
    };

    const handleGptTodo = async (roomId, todo, date) => {
        try {
            await postCreateTodo(roomId, todo, date);
            handleModalOpen(true);
        } catch (error) {
            console.error("Error creating gpt-todo:", error);
        }
    };

    const [isMine, setIsMine] = useState(false);
    const handleSender = () => {
        if (chat.senderId === user.id) {
            setIsMine(true);
        } else {
            setIsMine(false);
        }
    };

    const messageEndRef = useRef();

    useEffect(() => {
        registerUser();
        const fetchChat = async () => {
            const chatData = await getChat(roomId);
            setChat(chatData);
        };
        fetchChat();
    }, [roomId]);

    // useEffect(() => {
    //     registerUser();
    //     const fetchChat = async () => {
    //         const chatData = await getChat(roomId);
    //         setChat(chatData);
    //     };
    //     fetchChat();
    //     return () => {
    //         if (stompClient) {
    //             stompClient.disconnect();
    //         }
    //     }
    // }, []);

    useEffect(() => {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    return (
        <>
            <AddGPTtodoModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <Block.ColumnBox
                width="100%"
                height="73%"
                padding="20px"
                style={{
                    overflow: "auto",
                }}
            >
                <Block.ColumnBox width="100%" height="650px" overflowY="scroll">
                    {chat.map((chat, index) => (
                        <div key={index}>
                            <Margin direction="column" size={4} />
                            {chat.senderId === user.id ? ( // 메시지를 보낸 사용자의 ID와 현재 사용자의 ID가 같은 경우
                                <Block.Box
                                    style={{
                                        borderRadius: "20px",
                                        padding: "15px 20px",
                                        width: "70%",
                                        marginLeft: "35%",
                                        background: "#F2DD94",

                                        display: "flex", // 부모 요소에 flex 속성 추가
                                        justifyContent: "flex-end", // 부모 요소에 오른쪽 정렬을 위한 justify-content 속성 추가
                                    }}
                                >
                                    <div style={{ textAlign: "right" }}>
                                        <div style={{ fontSize: "small", color: "gray" }}>{`${chat.senderName}  `}</div>
                                        <br></br>

                                        {chat.message}

                                        <br />
                                    </div>
                                </Block.Box>
                            ) : (
                                // 메시지를 보낸 사용자의 ID와 현재 사용자의 ID가 다른 경우
                                <Block.Box
                                    justifyContent="flex-start"
                                    style={{
                                        borderRadius: "20px",
                                        padding: "15px 20px",
                                        width: "70%",
                                        marginRight: "35%",
                                        background: "#aac8ed",
                                    }}
                                >
                                    <div style={{ textAlign: "left" }}>
                                        <div style={{ fontSize: "small", color: "gray" }}>{`${chat.senderName}  `}</div>

                                        <br></br>
                                        {chat.message}
                                    </div>
                                </Block.Box>
                            )}
                            <Margin direction="column" size={4} />
                            {chat.isTodo && chat.todo !== null && (
                                <Block.ColumnBox
                                    width="100%"
                                    height="60px"
                                    justifyContent="center"
                                    alignItems="center"
                                    padding="12px 10px 10px 10px"
                                    margin="5px"
                                    borderRadius="10px"
                                    bgColor="mainYellow"
                                >
                                    <Text.RegulBody style={{ color: "white", display: "flex", lineHeight: "20px" }}>
                                        <Block.Box width="200px">{chat.todoMessage}</Block.Box>
                                        <Margin direction="row" size={20} />
                                        <button
                                            style={{ border: "0", background: "0", cursor: "pointer" }}
                                            onClick={() =>
                                                handleGptTodo(roomId, chat.todo, chat.date ? chat.date : null)
                                            }
                                        >
                                            <Text.RegistText color="black">등록하기</Text.RegistText>
                                        </button>
                                    </Text.RegulBody>
                                </Block.ColumnBox>
                            )}
                        </div>
                    ))}
                    <div ref={messageEndRef}></div>
                </Block.ColumnBox>

                {/* 채팅 입력창 UI */}
            </Block.ColumnBox>
            <Block.Box>
                <Input.ChatInput
                    width="100%"
                    height="100%"
                    type="text"
                    name="message"
                    value={userData.message}
                    onChange={handleValue}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message.."
                />

                <Block.ColumnBox width="45px" justifyContent="center" alignItems="center">
                    <Block.Img src="/send.png" alt="전송버튼" onClick={sendMessage} margin="0 20px 0 0" pointer />
                </Block.ColumnBox>
            </Block.Box>
        </>
    );
}
