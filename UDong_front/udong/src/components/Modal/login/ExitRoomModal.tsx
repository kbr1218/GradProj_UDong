// ExitRoomModal.tsx
import { SetStateAction } from "react";
import Modal from "../../../utils/modal/Modal_ExitRoom";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../api/login/deleteUser";
import React from "react";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
    UserInfo: any;
};

export default function ExitRoomModal({ isOpen, setIsOpen, UserInfo }: Props) {
    const navigate = useNavigate();

    const handleExitFromRoom = async () => {
        try {
            const response = await deleteUser(UserInfo.id);
            if (response) {
                setIsOpen(false);
                navigate("/");
            } else {
                console.error("서버 응답이 올바르지 않습니다.");
            }
        } catch (error) {
            console.error("방을 나가는 중 오류 발생: ", error);
        }
    };

    const handleCancleExitRoom = async () => {
        setIsOpen(false); // 모달 닫기
    };

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={`방에서 나갈까요?`}
            width="320px"
            height="200px"
            content={
                <>
                    방에 남아있는 사용자가 없을 경우
                    <br />
                    방은 삭제됩니다.
                </>
            }
            CancelButton={{ label: "취소", onClick: handleCancleExitRoom, buttonStyle: null }}
            ExitButton={{ label: "나가기", onClick: handleExitFromRoom, buttonStyle: null }}
            children=""
            UserInfo={UserInfo}
        />
    );
}
