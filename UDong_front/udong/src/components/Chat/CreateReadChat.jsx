import { useRef, useState, useEffect } from "react";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { Block, Input, Margin } from "../../styles/ui";
import { v4 as uuidv4 } from "uuid";

export default function CreateReadChat(Props) {
    const [chatList, setChatList] = useState([]);
    const [chat, setChat] = useState("");

    const client = useRef({});

    const roomId = Props.roomId;
    const senderId = Props.senderId;

    const connect = () => {
        // const sessionId = uuidv4();

        client.current = new StompJs.Client({
            //brokerURL: "ws://localhost:8080/ws",
            brokerURL: "/ws",
            //webSocketFactory: () => new SockJS("/ws"),
            onConnect: () => {
                subscribe();
            },
            debug: function (str) {},
            onStompError: frame => {},
        });

        client.current.activate();
    };

    const publish = (roomId, senderId, chat) => {
        if (!client.current.connected) return;

        client.current.publish({
            destination: "/pub/chat",
            body: JSON.stringify({
                roomId: roomId,
                senderId: senderId,
                message: chat,
            }),
        });

        setChat(chat);
    };

    const subscribe = () => {
        client.current.subscribe("/sub/chat/" + roomId, body => {
            const json_body = JSON.parse(body.body);
            setChatList(_chat_list => [..._chat_list, json_body]);
        });
    };

    const disconnect = () => {
        client.current.deactivate();
    };

    const handleChange = event => {
        // 채팅 입력 시 state에 값 설정
        setChat(event.target.value);
    };

    const handleSubmit = (roomId, senderId, event, chat) => {
        // 보내기 버튼 눌렀을 때 publish
        event.preventDefault();

        publish(roomId, senderId, chat);
    };

    useEffect(() => {
        connect();

        return () => disconnect();
    }, []);

    return (
        <>
            <Block.ColumnBox width="85%" height="80%" margin="0 0 0 15px" border="1px solid red">
                <Input.FormInput
                    placeholde="채팅을 입력하세요."
                    width="406px"
                    height="35px"
                    fontSize="16px"
                    value={chat}
                    onChange={handleChange}
                />
            </Block.ColumnBox>
            <Block.Img src="/send.png" alt="채팅전송버튼" width="27px" height="27px" pointer onClick={handleSubmit} />

            <Margin direction="row" size={10} />
        </>
    );
}
