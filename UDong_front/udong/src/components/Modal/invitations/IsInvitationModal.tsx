// IsInvitationModal.tsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { acceptInvitation } from "../../../api/invitations/putAcceptInvitation";
import { declineInvitation } from "../../../api/invitations/deleteDeclineInvitation";
import Modal from "../../../utils/modal/Modal_YesNo";
import { postLogout } from "../../../api/login/postLogout";
import { useEffect, useState } from "react";

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    invitationData: any;
}

export default function IsInvitationModal({ isOpen, setIsOpen, invitationData }: Props) {
    const navigate = useNavigate();
    const [roomInfo, setRoomInfo] = useState<any>(null); // roomInfo 상태 추가

    const handleAcceptInvitation = async () => {
        try {
            const response = await acceptInvitation(invitationData.id);
            setIsOpen(false);
            await postLogout();
            navigate("/");
        } catch (error) {
            console.error("초대 수락 중 오류 발생:", error);
        }
    };
    
    const handleDeclineInvitation = async () => {
        try {
            await declineInvitation(invitationData.id);
            setIsOpen(false); // 모달 닫기
        } catch (error) {
            console.error("초대 거절 중 오류 발생:", error);
        }
    };

    return (
        <>
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={`${invitationData.inviter.name}님의 초대`}
            width="320px"
            height="180px"
            content={
                <>
                    초대 수락 후 <br />
                    로그인을 다시 해주세요.
                </>
            }
            yesButton={{ label: "수락", onClick: handleAcceptInvitation, buttonStyle: null }}
            noButton={{ label: "거절", onClick: handleDeclineInvitation, buttonStyle: null }}
            children=""
        />
    </>
);
}
