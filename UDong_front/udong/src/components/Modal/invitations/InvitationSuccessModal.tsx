// InvitationSuccessModal.tsx
import React, { SetStateAction } from "react";
import Modal from "../../../utils/modal/Modal_OK";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

export default function AfterRoomCreateModal({ isOpen, setIsOpen }: Props) {
    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="메시지"
            width="320px"
            height="180px"
            content="초대에 성공했습니다."
        >
            {null}
        </Modal>
    );
}