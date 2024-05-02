// AfterRoomCreateModal.tsx
import React, { SetStateAction } from "react";
import Modal from "../../../utils/modal/Modal_CreateRoom";
import { useNavigate } from "react-router-dom";
import { postLogout } from "../../../api/login/postLogout";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

export default function AfterRoomCreateModal({ isOpen, setIsOpen }: Props) {
    const navigate = useNavigate();

    const handleConfirm = async () => {
        try {
            await postLogout();
            navigate("/");
            setIsOpen(false);
        } catch (error) {
            console.error("로그아웃 및 이동에 실패했습니다:", error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="메시지"
            width="320px"
            height="180px"
            content={
                <>
                    방이 생성되었습니다! <br />
                    다시 로그인해주세요.
                </>
            }
            onConfirm={handleConfirm}
            children={null}
        />
    );
}
