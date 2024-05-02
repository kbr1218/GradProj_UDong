// choice.jsx
import { useEffect, useState } from "react";
import { Block, Text, Margin } from "../styles/ui";
import { useNavigate, useLocation } from "react-router-dom";
import CreateRoom from "./createRoom";
import IsInvitationModal from "../components/Modal/invitations/IsInvitationModal";
import NoInvitationModal from "../components/Modal/invitations/NoInvitationModal";
import { getInvitation } from "../api/invitations/getInvitation";
import { getUserInfo } from "../api/login/getUserInfo";

// 개설하기 or 참여하기 선택하는 곳

export default function Choice({ isLogin, setIsLogin }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isCreated, setIsCreated] = useState(false);
    const [userInfo, setUserInfo] = useState(null); // userInfo 상태 추가
    const [invitationData, setInvitationData] = useState(null);
    const [showIsInvitationModal, setShowIsInvitationModal] = useState(false);
    const [showNoInvitationModal, setShowNoInvitationModal] = useState(false);

    useEffect(() => {
        // isLogin이라는 상태 변수가 변경될 때마다 사용자 정보를 가져와서 방이 있는지 확인하고

        const checkLoginAndRedirect = async () => {
            const userInfoData = await getUserInfo();
            setUserInfo(userInfoData); // 사용자 정보 설정
            // 로그인 되어있고 방이 있다면 /home으로 이동
            if (isLogin && userInfoData && userInfoData.roomId) {
                navigate("/home");
            }
        };
        checkLoginAndRedirect();
    }, [isLogin, navigate]);

    useEffect(() => {
        const handleBackNavigation = () => {
            if (location.pathname !== "/home" && location.pathname !== "/") {
                navigate("/home");
            }
        };

        window.addEventListener("popstate", handleBackNavigation);

        return () => {
            window.removeEventListener("popstate", handleBackNavigation);
        };
    }, [navigate, location]);

    const handleCreateRoom = () => {
        setIsCreated(true);
        navigate("/createRoom");
    };

    const handleInviteRoom = async () => {
        setIsCreated(false);
        const userInfoData = await getUserInfo();
        if (!userInfoData) {
            console.error("사용자 정보를 가져올 수 없습니다.");
            return;
        }
        try {
            const userId = userInfoData.id;
            const response = await getInvitation(userId);
            if (response === false) {
                setShowNoInvitationModal(true);
            } else if (response !== null) {
                setInvitationData(response);
                setShowIsInvitationModal(true);
            } else {
                console.error("Error: Invitation API 호출 에러");
                // 에러 발생 시 처리할 내용 추가
            }
        } catch (error) {
            console.error("API 호출 에러: ", error);
            // 에러 발생 시 처리할 내용 추가
        }
    };

    return (
        <>
            <Block.ColumnBox width="100%" height="100%" justifyContent="center" alignItems="center">
                <Block.ColumnBox justifyContent="center" alignItems="center">
                    <Block.ColumnBox
                        bgColor="white"
                        width="338px"
                        height="180px"
                        borderRadius="8px"
                        background="#f4bf54"
                        pointer
                        onClick={handleCreateRoom}
                    >
                        <Block.ColumnBox padding="20px 20px">
                            <Text.BoldTitleS color="white">개설하기</Text.BoldTitleS>
                            <Margin direction="column" size={15} />
                            <Text.RegulBody color="white">룸메이트와 함께 규칙을 공유할 방을 개설해요</Text.RegulBody>
                        </Block.ColumnBox>
                    </Block.ColumnBox>
                    {isCreated && <CreateRoom />}

                    <Margin direction="column" size={35} />
                    <Block.ColumnBox
                        bgColor="white"
                        width="338px"
                        height="180px"
                        borderRadius="8px"
                        background="#398ab9"
                        pointer
                        onClick={handleInviteRoom}
                    >
                        <Block.ColumnBox padding="20px 20px">
                            <Text.BoldTitleS color="white">참여하기</Text.BoldTitleS>
                            <Margin direction="column" size={15} />
                            <Text.RegulBody color="white">룸메이트에게 초대받은 방에 참여해요</Text.RegulBody>
                        </Block.ColumnBox>
                    </Block.ColumnBox>
                </Block.ColumnBox>
            </Block.ColumnBox>

            {showIsInvitationModal && (
                <IsInvitationModal isOpen={true} setIsOpen={setShowIsInvitationModal} invitationData={invitationData} />
            )}
            {showNoInvitationModal && <NoInvitationModal isOpen={true} setIsOpen={setShowNoInvitationModal} />}
        </>
    );
}
