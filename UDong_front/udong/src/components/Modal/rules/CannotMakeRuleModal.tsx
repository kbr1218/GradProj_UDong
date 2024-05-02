// CannotMakeRuleModal.tsx
import React, { SetStateAction } from "react";
import Modal from "../../../utils/modal/Modal_OK";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

export default function CannotMakeRuleModal({ isOpen, setIsOpen }: Props) {
    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="규칙 만들기 실패"
            width="320px"
            height="180px"
            content="규칙은 최대 3개까지 만들 수 있습니다. "
        >
            {/* NoInvitationModal에서는 아무것도 렌더링하지 않으므로 빈 children을 전달 */}
            {null}
        </Modal>
    );
}