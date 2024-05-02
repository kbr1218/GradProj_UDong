import { SetStateAction, useState, useEffect } from "react";
import Modal_forInput from "../../../utils/modal/Modal_forInput";
import React from "react";
import { Block, Margin, Text, Input, Button } from "../../../styles/ui_forInput";
import { putUpdateRoomName } from "../../../api/room/putUpdateRoomName";
import { useQuery } from "react-query";
import { getUserInfo } from "../../../api/login/getUserInfo";
import { getRoomInfo } from "../../../api/room/getRoomInfo";
import { IUserInfo } from "../../../interfaces/user";
import { useNavigate } from "react-router-dom";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

export default function RoomNameEditModal({ isOpen, setIsOpen }: Props) {
    const navigate = useNavigate();

    const { data: user } = useQuery<IUserInfo>(["user"], getUserInfo);
    const roomId = user?.roomId;
    const [roomName, setRoomName] = useState<string>("");
    const [roomNewName, setRoomNewName] = useState("");

    const handleRoomName = async (user: IUserInfo) => {
        try {
            const room = await getRoomInfo(user.roomId);
            setRoomName(room.roomName);
        } catch (error) {
            console.error("방 정보를 가져오는 도중 오류가 발생했습니다:");
        }
    };

    const handleRoomNewName = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoomNewName(e.currentTarget.value);
        setRoomName(e.currentTarget.value);
    };

    const handlePutUpdateRoomName = async () => {
        await putUpdateRoomName(roomId, roomNewName);
        setIsOpen(false);
        navigate("/");
    };

    useEffect(() => {
        if (user && user.roomId) {
            handleRoomName(user);
        }
    }, [user]);

    return (
        <>
            <Modal_forInput
                width="320px"
                height="220px"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title={"방 이름 변경하기"}
            >
                <>
                    <Block.ColumnBox width="100%" height="100%" padding=" 20px">
                        <Input.FormInput
                            placeholder="방 이름을 설정해주세요."
                            defaultValue={roomName}
                            onChange={handleRoomNewName}
                        />

                        <Margin direction="column" size={20} />

                        <Button.Button
                            type="button"
                            width="100%"
                            height="40px"
                            bgColor="inviteBtn"
                            onClick={handlePutUpdateRoomName}
                        >
                            <Text.SemiBodyS>수정 완료</Text.SemiBodyS>
                        </Button.Button>
                    </Block.ColumnBox>
                </>
            </Modal_forInput>
        </>
    );
}
