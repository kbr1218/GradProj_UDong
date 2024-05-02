// createRoom.jsx
import { useEffect, useState } from "react";
import { Block, Button, Input, Text, Margin } from "../styles/ui";
import { useNavigate } from "react-router-dom";
import { postCreateRoom } from "../api/room/postCreateRoom";
import { postLogout } from "../api/login/postLogout";
import AfterRoomCreateModal from "../components/Modal/room/AfterRoomCreateModal";

export default function CreateRoom() {
    const navigate = useNavigate();
    // const { data: user } = useQuery(["user"], getUserInfo);

    const [roomName, setRoomName] = useState("");
    const [showModal, setShowModal] = useState(false); // AfterRoomCreateModal 표시 상태 추가


    const handleRoomName = e => {
        setRoomName(e.target.value);
    };


    const handleCreateRoom = async () => {
        try {
            const roomInfo = await postCreateRoom(roomName);
            if (roomInfo) {
                setShowModal(true);
            } else {
                console.error("방 만들기 실패");
            }
        } catch (error) {
            console.error("방 만들기 실패: ", error);
        }
    };

    const navigateBack = () => {
        navigate(-1);
    };

    useEffect(() => {}, []);

    return (
        <>
            <Block.ColumnBox alignItems="center" position="relative">
                <Margin direction="column" size={183} />
                <div>
                    <Block.ColumnBox width="338px" padding="0px 10px">
                        <Text.BoldTitleS>방 만들기</Text.BoldTitleS>
                        <Margin direction="column" size={12} />
                        <Text.RegulBody color="gray400">개성이 넘치는 우리만의 방 이름을 설정해보아요!</Text.RegulBody>
                        <Margin direction="column" size={18} />
                    </Block.ColumnBox>
                </div>

                <div>
                    <Input.FormInput placeholder="이름" onChange={handleRoomName} />
                </div>
                <Margin direction="column" size={60} />

                <Button.Button
                    width="100%"
                    height="51px"
                    bgColor="createRoomBtn"
                    onClick={handleCreateRoom}
                    style={{ borderRadius: "10px" }}
                >
                    <Text.SemiBodyS>방 만들기</Text.SemiBodyS>
                </Button.Button>
                <Margin direction="column" size={16} />
                <img
                    alt="back"
                    onClick={navigateBack}
                    src="goBack.png"
                    style={{
                        position: "absolute",
                        top: "28px", // 상단 여백
                        left: "25px", // 좌측 여백
                        //top: "112px", // 상단 여백
                        //left: "52px", // 좌측 여백
                        width: "21px", // 너비
                        height: "21px", // 높이
                        cursor: "pointer", // 커서 모양
                    }}
                />
            </Block.ColumnBox>
            {showModal && (
                <AfterRoomCreateModal
                    isOpen={showModal}
                    setIsOpen={setShowModal}
                />
            )} 
        </>
    );
}
