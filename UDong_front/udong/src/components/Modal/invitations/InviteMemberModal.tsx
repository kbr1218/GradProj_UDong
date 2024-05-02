// inviteMemberModal.tsx
import { SetStateAction, useState, useEffect } from "react";
import React from "react";
import Modal_forInput from "../../../utils/modal/Modal_forInput";
import ConfirmInviteMemberModal from "./InviteConfirmationModal";
import { Block, Margin, Text, Input, Button } from "../../../styles/ui_forInput";
import { getUserInfo } from "../../../api/login/getUserInfo";

// UserInfo 인터페이스 정의
interface UserInfo {
    id: number;
    name: string;
    email: string;
    roomId: number;
    pictureUrl: string;
    role: string;
}

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function InviteMemberModal({ isOpen, setIsOpen }: Props) {
    const [email, setEmail] = useState("");
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    // InviteMemberModal을 닫는 함수 정의
    const closeInviteMemberModal = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const userInfoData = await getUserInfo();
                setUserInfo(userInfoData);
            } catch (error) {
                console.error("Error while fetching user info:", error);
            }
        }
        fetchUserInfo();
    }, []);

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    };

    const handleInvite = () => {
        if (userInfo && userInfo.id !== null) {
            setShowConfirmationModal(true);
        } else {
            console.error("userId is null. inviteUser API 요청 불가.");
        }
    };

    return (
        <>
            <Modal_forInput
                width="320px"
                height="230px"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title={"이메일을 입력하세요."}
            >
                <>
                    <Block.ColumnBox width="100%" height="100%" padding=" 20px">
                        <Input.FormInput
                            placeholder="가입된 사용자에게만 전송이 가능합니다."
                            defaultValue={email}
                            onChange={handleEmailInput}
                        />
                        <Margin direction="column" size={18} />
                        <Button.Button
                            type="button"
                            width="100%"
                            height="40px"
                            onClick={handleInvite}
                            style={{ backgroundColor: "#398ab9" }}
                        >
                            <Text.SemiBodyS>초대하기</Text.SemiBodyS>
                        </Button.Button>
                    </Block.ColumnBox>
                </>
            </Modal_forInput>
            <ConfirmInviteMemberModal
                isOpen={showConfirmationModal}
                setIsOpen={setShowConfirmationModal}
                email={email}
                userId={userInfo ? userInfo.id : null}
                closeInviteMemberModal={closeInviteMemberModal}
            />
        </>
    );
}
