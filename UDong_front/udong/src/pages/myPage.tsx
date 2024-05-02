// myPage.tsx
import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar/NavBar";
import { Block, Button, Text, Margin } from "../styles/ui";
import ExitRoomModal from "../components/Modal/login/ExitRoomModal";
import InviteMemberModal from "../components/Modal/invitations/InviteMemberModal";
import GoToLoginModal from "../components/Modal/login/GoToLoginModal";
import { getUserInfo } from "../api/login/getUserInfo";
import { useQuery } from "react-query";
import { getRoomInfo } from "../api/room/getRoomInfo";
import { IRoomInfo } from "../interfaces/room";
import { IUserInfo } from "../interfaces/user";
import { useNavigate, useLocation } from "react-router-dom";

export default function MyPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isCreated, setIsCreated] = useState(false);
    const { data: userInfo } = useQuery<IUserInfo>(["userInfo"], getUserInfo);

    const { data: room, error: roomError } = useQuery<IRoomInfo>(
        ["room", userInfo?.roomId ?? ""],
        () => getRoomInfo(userInfo?.roomId ?? 0),
        {
            enabled: !!userInfo?.roomId,
        }
    );

    const [isInviteMemberModalOpen, setIsInviteMemberModalOpen] = useState(false);
    const [isExitRoomModalOpen, setIsExitRoomModalOpen] = useState(false);
    const [isGoToLoginModalOpen, setIsGoToLoginModalOpen] = useState(false);

    const handleInviteMember = () => {
        setIsInviteMemberModalOpen(true);
    };

    const handleExitRoom = async () => {
        setIsExitRoomModalOpen(true);
    };

    const handleGoToLogin = () => {
        setIsGoToLoginModalOpen(true);
    };

    if (roomError) {
        console.error("방 정보를 가져오는 중 오류 발생:", roomError);
    }

    useEffect(() => {
        const checkLoginAndRedirect = async () => {
            const userInfoData = await getUserInfo();
            // 로그인 되어있고 방이 있다면 /home으로 이동
            if (!(userInfoData || userInfoData.roomId)) {
                navigate("/");
            }
        };
        checkLoginAndRedirect();
    }, [navigate]);

    return (
        <>
            <InviteMemberModal isOpen={isInviteMemberModalOpen} setIsOpen={setIsInviteMemberModalOpen} />
            <ExitRoomModal isOpen={isExitRoomModalOpen} setIsOpen={setIsExitRoomModalOpen} UserInfo={userInfo} />
            <GoToLoginModal
                isOpen={isGoToLoginModalOpen}
                setIsOpen={setIsGoToLoginModalOpen}
                handleGoToLogin={handleGoToLogin}
            />
            <Block.ColumnBox background="#2d3947" style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}>
                <Block.ColumnBox padding="50px 0 30px 30px">
                    <Text.BoldTitleS color="white">내 프로필</Text.BoldTitleS>
                </Block.ColumnBox>

                <Block.ColumnBox width="100%" height="100%" background="#fefefe">
                    <Block.Box width="100%">
                        <Block.ColumnBox padding="30px" justifyContent="flex-end" alignItems="flex-end">
                            <Text.SemiBodyM color="gray300">{room?.roomName}</Text.SemiBodyM>
                            <Margin direction="column" size={13} />
                            <Text.SemiBodyM color="gray300">
                                <Text.SemiBodyM color="gray400">{userInfo?.name}</Text.SemiBodyM> 님
                            </Text.SemiBodyM>
                        </Block.ColumnBox>
                    </Block.Box>

                    <Margin direction="column" size={80} />

                    <Block.ColumnBox alignItems="center" pointer>
                        <Button.RadiusButton
                            width="300px"
                            height="45px"
                            borderRadius="10px"
                            bgColor="yellow"
                            onClick={handleInviteMember}
                        >
                            <Text.SemiBodyS>룸메이트 초대하기</Text.SemiBodyS>
                        </Button.RadiusButton>
                        <Margin direction="column" size={13} />
                        <Button.RadiusButton
                            width="300px"
                            height="45px"
                            borderRadius="10px"
                            bgColor="yellow"
                            onClick={handleExitRoom}
                        >
                            <Text.SemiBodyS>방 나가기</Text.SemiBodyS>
                        </Button.RadiusButton>
                    </Block.ColumnBox>
                </Block.ColumnBox>
            </Block.ColumnBox>
            <Block.ColumnBox
                width="100%"
                height="150px"
                justifyContent="flex-end"
                alignItems="flex-end"
                padding="0 30px 0 0"
            >
                <Text.SemiBodyS
                    color="gray300"
                    pointer
                    onClick={handleGoToLogin}
                    style={{ textDecorationLine: "underline" }}
                >
                    로그아웃
                </Text.SemiBodyS>
            </Block.ColumnBox>
            <NavBar user={userInfo} userInfo={userInfo} />
        </>
    );
}
