// InviteConfirmationModal.tsx
import { inviteUser } from "../../../api/invitations/postInviteUser";
import { useState } from "react";
import Modal from "../../../utils/modal/Modal_YesNo";
import InvitationSuccessModal from "./InvitationSuccessModal";

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    email: string;
    userId: number | null;
    closeInviteMemberModal: () => void; // InviteMemberModal을 닫는 함수
}

export default function InviteConfirmationModal({ isOpen, setIsOpen, email, userId, closeInviteMemberModal }: Props) {
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleInviteUser = async () => {
        try {
            await inviteUser(userId, email);
            setShowSuccessModal(true);
        } catch (error) {}
        setIsOpen(false); // ConfirmInviteMemberModal 닫기
        closeInviteMemberModal(); // InviteMemberModal 닫기
    };

    const handleClose = () => {
        setIsOpen(false); // ConfirmInviteMemberModal 닫기
        closeInviteMemberModal(); // InviteMemberModal 닫기
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title="이메일 확인"
                width="320px"
                height="180px"
                content={
                    <>
                        전송 대상: {email} <br />
                        전송 후 취소할 수 없습니다!
                    </>
                }
                yesButton={{ label: "초대하기", onClick: handleInviteUser, buttonStyle: null }}
                noButton={{ label: "취소", onClick: handleClose, buttonStyle: null }}
            />
            <InvitationSuccessModal isOpen={showSuccessModal} setIsOpen={setShowSuccessModal} />
        </>
    );
}