import { NavBar } from "../components/NavBar/NavBar";
import { Block, Button, Margin, Text } from "../styles/ui";
import { useEffect, useState } from "react";
import RoomNameEditModal from "../components/Modal/room/RoomNameEditModal";
import RulesEditModal from "../components/Modal/rules/RulesEditorModal";
import { getUserInfo } from "../api/login/getUserInfo";
import { useQuery } from "react-query";
import { getRoomInfo } from "../api/room/getRoomInfo";
import { getChores } from "../api/chores/getChores";
import { getRules } from "../api/rule/getRules";
import ChoresCreateModal from "../components/Modal/chores/ChoresCreateModal";
import ChoresDeleteModal from "../components/Modal/chores/ChoresDeleteModal";
import { useNavigate } from "react-router-dom";

// home 하다가 갑자기 components - modal

export interface User {
    id: number;
    name: string;
    roomId: number;
}

export interface Room {
    roomName: string;
    rules?: string[];
}

interface ChoresModalStates {
    [key: number]: boolean; // 집안일 ID를 키로 하고 해당 집안일에 대한 모달 상태를 값으로 가지는 객체
}

export default function Home() {
    const { data: userInfo } = useQuery(["user"], getUserInfo);
    const [user, setUser] = useState<User | null>(null);
    const [roomInfo, setRoomInfo] = useState<Room>();
    const [rules, setRules] = useState<any[]>([]);
    const [chores, setChores] = useState<any[]>([]);
    const [choresModalStates, setChoresModalStates] = useState<ChoresModalStates>({});
    const [isChoresCreateModalOpen, setIsChoresCreateModalOpen] = useState(false);

    useEffect(() => {
        if (userInfo) {
            setUser(userInfo);
            handleHome(userInfo);
        }
    }, [userInfo]);

    useEffect(() => {
        if (user && user.roomId) {
            fetchChores(user.roomId);
            fetchRules(user.roomId);
            // postCreateChores(user.roomId, "쓰레기버리기", ["MONDAY"])
        }
    }, [user, roomInfo]);

    const handleHome = async (user: User) => {
        // 변경된 부분
        try {
            const userRoomId = user.roomId;
            const room = await getRoomInfo(userRoomId);
            setRoomInfo(room);
        } catch (error) {
            console.error("Error fetching room info:", error);
        }
    };

    const fetchRules = async (roomId: number) => {
        try {
            const rulesData = await getRules(roomId);
            setRules(rulesData);
        } catch (error) {
            console.error("Error fetching rules:", error);
        }
    };

    const fetchChores = async (roomId: number) => {
        try {
            const response = await getChores(roomId);
            if (response && response.ok) {
                const choresData = await response.json();
                setChores(choresData);
            } else {
                console.error("Failed to fetch chores:", response?.statusText);
            }
        } catch (error) {
            console.error("Error fetching chores:", error);
        }
    };

    const [isRoomNameEditModalOpen, setIsRoomNameEditModalOpen] = useState(false);
    const [isRulesEditModalOpen, setIsRulesEditModalOpen] = useState(false);
    const [isChoresEditModalOpen, setIsChoresEditModalOpen] = useState(false);
    const [isChoresDeleteModalOpen, setIsChoresDeleteModalOpen] = useState(false);

    const handleModifyRoomName = () => {
        // 방 이름 수정하는 모달 띄우기
        setIsRoomNameEditModalOpen(true);
    };

    const handleModifyRoomRules = async () => {
        // 규칙 수정하는 모달 띄우기
        setIsRulesEditModalOpen(true);
    };

    const handleEditChore = (choreId: number) => {
        setIsChoresEditModalOpen(true);
        // edit modal
    };

    const handleDeleteChore = (choreId: number) => {
        // setIsChoresDeleteModalOpen(true);
        setChoresModalStates(prevState => ({
            ...prevState,
            [choreId]: true,
        }));
    };

    const handleAddChore = () => {
        setIsChoresCreateModalOpen(true);
    };

    if (!user) {
        return null;
    }

    // 요일에 따라 배경색을 변경하는 함수
    const getDayBackgroundColor = (day: string) => {
        switch (day) {
            case "MONDAY":
                return "#f4bf54";
            case "TUESDAY":
                return "#f4bf54";
            case "WEDNESDAY":
                return "#f4bf54";
            case "THURSDAY":
                return "#f4bf54";
            case "FRIDAY":
                return "#f4bf54";
            case "SATURDAY":
                return "#f4bf54";
            case "SUNDAY":
                return "#f4bf54";
            default:
                return "transparent";
        }
    };

    const getDayinKorean = (day: string) => {
        switch (day) {
            case "MONDAY":
                return "월";
            case "TUESDAY":
                return "화";
            case "WEDNESDAY":
                return "수";
            case "THURSDAY":
                return "목";
            case "FRIDAY":
                return "금";
            case "SATURDAY":
                return "토";
            case "SUNDAY":
                return "일";
            default:
                return "";
        }
    };

    return (
        <>
            {/* 모달 및 상태 업데이트 부분 */}
            <RulesEditModal isOpen={isRulesEditModalOpen} setIsOpen={setIsRulesEditModalOpen} roomId={user?.roomId} />
            <RoomNameEditModal isOpen={isRoomNameEditModalOpen} setIsOpen={setIsRoomNameEditModalOpen} />
            <ChoresCreateModal
                isOpen={isChoresCreateModalOpen}
                setIsOpen={setIsChoresCreateModalOpen}
                roomId={user.roomId}
            />

            {/* 화면 구성 부분 */}
            <Block.ColumnBox>
                {/* 상단 정보 표시 */}
                <Block.Box
                    width="100%"
                    // border="1px solid red"
                    bgColor="white"
                    padding="30px 30px 20px 20px"
                    borderRadius="15px 15px 0 0 "
                >
                    <Block.ColumnBox width="100%">
                        {/* 사용자 이름과 방 이름 */}
                        <Text.SemiBodyM color="gray400">
                            {user?.name} <Text.SemiBodyM color="gray300"> 님의,</Text.SemiBodyM>
                        </Text.SemiBodyM>
                        <Margin direction="column" size={8} />
                        <Text.BoldTitleS color="black">{roomInfo?.roomName} 😎</Text.BoldTitleS>
                    </Block.ColumnBox>
                    {/* 방 이름 수정 아이콘 */}
                    <Block.ColumnBox width="5px" justifyContent="flex-end">
                        <Block.Img
                            src="edit_pen.png"
                            alt="방 이름 편집"
                            width="18px"
                            height="18px"
                            pointer
                            onClick={handleModifyRoomName}
                        />
                    </Block.ColumnBox>
                </Block.Box>

                {/* 구분선 */}
                <Block.Bar width="100%" height="1px" bgColor="gray300" />

                {/* 공동 생활 규칙 */}
                <Block.ColumnBox width="100%" height="100%">
                    <Block.Box width="338px" margin="20px" alignItems="center">
                        {/* 공동 생활 규칙 목록 */}

                        <Block.ColumnBox
                            width="100%"
                            height="auto"
                            borderRadius="10px"
                            background="#2d3947"
                            padding="15px 20px 0px 20px"
                            pointer
                            justifyContent="center"
                            onClick={handleModifyRoomRules}
                        >
                            {/* 공동 생활 규칙 목록 표시 */}
                            {rules && rules.length > 0 ? (
                                rules.map((rule, index) => (
                                    <Block.Box
                                        key={index}
                                        style={{
                                            // width: "280px",
                                            display: "flex",
                                            // justifyContent: "center",
                                            alignItems: "center",
                                            margin: "6px 0px 6px 0",
                                            padding: index === rules.length - 1 ? "0" : "0 0 8px 0",
                                            borderBottom: index === rules.length - 1 ? "none" : "1px solid gray", // 마지막 요소에는 borderBottom을 적용하지 않음
                                        }}
                                    >
                                        {/* 이미지 추가 */}
                                        <Block.Img
                                            src="/rules_icon.png"
                                            alt="pin"
                                            width="15px"
                                            height="15px"
                                            style={{ marginRight: "10px" }}
                                        />
                                        <Text.RegulBody color="white" key={index} style={{ fontSize: "15px" }}>
                                            {rule.rule}
                                        </Text.RegulBody>
                                    </Block.Box>
                                ))
                            ) : (
                                <Block.ColumnBox width="100%" height="70px" justifyContent="center" alignItems="center">
                                    <Text.RegulBody color="white">아직 정해진 공동생활 규칙이 없습니다.</Text.RegulBody>
                                </Block.ColumnBox>
                            )}
                            <Margin direction="column" size={15} />
                        </Block.ColumnBox>
                    </Block.Box>

                    {/* 집안일 섹션 */}
                    {/* <Block.Bar width="100%" height="1px" bgColor="gray200" /> */}
                    <Block.ColumnBox width="338px" margin="3px 20px">
                        {/* 집안일 타이틀 */}

                        <Text.SemiBodyM color="gray400">집안일</Text.SemiBodyM>

                        {/* 집안일 설명 */}
                        <Margin direction="column" size={10} />

                        <Block.Box width="100%" justifyContent="space-between">
                            <Text.RegulBody color="gray400">매주 반복되는 집안일, 한 곳에 기록해두어요!</Text.RegulBody>

                            <Block.Img
                                width="14px"
                                height="14px"
                                src="/btn_add.png"
                                alt="+"
                                onClick={handleAddChore}
                                pointer
                                border="1px solid red"
                            />
                        </Block.Box>
                        <Margin direction="column" size={15} />

                        {/* 집안일 목록 */}
                        <Block.ColumnBox
                            width="100%"
                            height="255px"
                            borderRadius="10px"
                            padding="5px 10px 0 0px"
                            pointer
                            style={{ overflowY: "scroll" }}
                        >
                            {/* 집안일 목록 표시 */}
                            {chores.length > 0 ? (
                                chores.map((chore, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            borderBottom: index === chores.length - 1 ? "none" : "1px solid #ffeac5 ",
                                        }}
                                    >
                                        {/* 집안일 삭제 모달 */}
                                        <ChoresDeleteModal
                                            isOpen={choresModalStates[chore.id]}
                                            setIsOpen={isOpen =>
                                                setChoresModalStates((prevState: ChoresModalStates) => {
                                                    return {
                                                        ...prevState,
                                                        [chore.id]: isOpen as boolean,
                                                    };
                                                })
                                            }
                                            choresId={chore.id}
                                            chores={chore.chores}
                                        />

                                        <Block.ColumnBox>
                                            <Block.Box justifyContent="center" alignItems="center" padding="10px">
                                                {/* 이미지 추가 */}
                                                <Block.ColumnBox>
                                                    <Block.Box justifyContent="center" alignItems="center">
                                                        <Block.Img
                                                            src="/btn_chore.png"
                                                            alt="broom"
                                                            width="25px"
                                                            height="25px"
                                                            style={{ marginRight: "8px", marginBottom: "5px" }}
                                                        />
                                                        <Block.Box>
                                                            {/* 집안일 내용 */}
                                                            <Text.RegulBody>{chore.chores}</Text.RegulBody>
                                                            <Margin direction="row" size={15} />

                                                            {/* 집안일 담당자 */}
                                                            {chore.assignedUserName && (
                                                                <>
                                                                    <Text.RegulBody color="gray300">
                                                                        {chore.assignedUserName}
                                                                    </Text.RegulBody>
                                                                    <Margin direction="column" size={6} />
                                                                </>
                                                            )}
                                                        </Block.Box>
                                                    </Block.Box>

                                                    {/* 집안일 요일을 순서대로 출력 */}
                                                    <Block.Box width="100%" padding="0 0 0 30px">
                                                        {/* 월~일까지의 요일 배열을 순회하여, 선택된 요일이 있는지 확인하고 순서대로 출력 */}
                                                        {[
                                                            "MONDAY",
                                                            "TUESDAY",
                                                            "WEDNESDAY",
                                                            "THURSDAY",
                                                            "FRIDAY",
                                                            "SATURDAY",
                                                            "SUNDAY",
                                                        ].map(
                                                            (day: string) =>
                                                                // 사용자가 선택한 요일이 있는지 확인
                                                                chore.days.includes(day) && (
                                                                    <Text.RegulBody
                                                                        key={day}
                                                                        color="re400"
                                                                        style={{
                                                                            backgroundColor: "#ffeac5",
                                                                            padding: "8px 8px",
                                                                            borderRadius: "7px",
                                                                            margin: "0 4px 7px 0",
                                                                        }}
                                                                    >
                                                                        {getDayinKorean(day)}
                                                                    </Text.RegulBody>
                                                                )
                                                        )}
                                                    </Block.Box>
                                                    {/* <Block.Bar width="100%" height="1px" bgColor="newYNB100" /> */}
                                                </Block.ColumnBox>

                                                {/* 집안일 편집 및 삭제 버튼 */}

                                                <Block.Img
                                                    background="black"
                                                    width="16px"
                                                    height="18px"
                                                    src="/delete.png"
                                                    alt="삭제"
                                                    onClick={() => handleDeleteChore(chore.id)}
                                                />
                                            </Block.Box>
                                        </Block.ColumnBox>
                                    </div>
                                ))
                            ) : (
                                <Block.ColumnBox width="100%" height="80px" justifyContent="center" alignItems="center">
                                    <Text.RegulBody color="black">아직 설정된 집안일이 없습니다.</Text.RegulBody>
                                </Block.ColumnBox>
                            )}
                        </Block.ColumnBox>
                    </Block.ColumnBox>
                </Block.ColumnBox>
            </Block.ColumnBox>

            {/* 하단 네비게이션 바 */}
            <NavBar user={userInfo} userInfo={userInfo} />
        </>
    );
}
