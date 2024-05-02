// NoInvitationModal.tsx
import React, { SetStateAction } from "react";
import Modal from "../../../utils/modal/Modal_OK";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

export default function NoInvitationModal({ isOpen, setIsOpen }: Props) {
    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="메시지"
            width="320px"
            height="180px"
            content="현재 받은 초대가 없습니다. "
        >
            {/* NoInvitationModal에서는 아무것도 렌더링하지 않으므로 빈 children을 전달 */}
            {null}
        </Modal>
    );
}
