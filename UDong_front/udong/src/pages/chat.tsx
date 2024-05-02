import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TryChat from "../components/Chat/TryChat";
import { useQuery } from "react-query";
import { IUserInfo } from "../interfaces/user";
import { getUserInfo } from "../api/login/getUserInfo";
import { Block, Margin, Text } from "../styles/ui";

export default function Chat() {
    // const { roomId } = useParams();

    const params = useParams();
    const roomIdString = params.roomId; // string | undefined

    let roomId: number;

    if (roomIdString) {
        roomId = parseInt(roomIdString);
    } else {
        throw new Error("Room ID is not provided.");
    }

    const { data: userInfo } = useQuery<IUserInfo>(["userInfo"], getUserInfo);
    const senderId = userInfo?.id;

    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate("/home");
    };
    return (
        <>
            <>
                <Block.ColumnBox width="100%" height="100%" justifyContent="space-between">
                    <Block.Box
                        width="100%"
                        height="100px"
                        justifyContent="space-around"
                        alignItems="center"
                        // bgColor="createRoomBtn"
                        style={{
                            borderTopLeftRadius: "18px",
                            borderTopRightRadius: "18px",
                            backgroundColor: "#59697a",
                        }}
                    >
                        <Block.Box width="100%">
                            <Margin direction="row" size={30} />
                            <Block.Box width="40px" onClick={handleGoHome} pointer>
                                <Block.Img width="10px" src="/white-left-arrow.svg" alt="홈으로" />
                            </Block.Box>
                        </Block.Box>

                        <Block.Box width="100%" height="30px">
                            <Text.SemiTitle color="white">Messages</Text.SemiTitle>
                        </Block.Box>
                        <Block.Box width="100%"></Block.Box>
                    </Block.Box>
                    <TryChat roomId={roomId} senderId={senderId} />
                </Block.ColumnBox>
            </>
        </>
    );
}
