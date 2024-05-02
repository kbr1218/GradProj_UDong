// ChoresCreateModal.tsx
import Modal_forChore from "../../../utils/modal/Modal_forChore";
import { SetStateAction, useState, useEffect } from "react";
import { Block, Margin, Text, Button, Input } from "../../../styles/ui";
import styled from "styled-components";
import React from "react";
import { postCreateChores } from "../../../api/chores/postCreateChores";
import { getRoomInfo } from "../../../api/room/getRoomInfo";

const Style = {
    SaveButton: styled(Button.RadiusButton)`
        width: 100%;
        height: 38px;
        background-color: #398ab9;
        border-radius: 10px;
    `,
    CancelButton: styled(Button.RadiusButton)`
        width: 100%
        height: 38px;
        background-color: #bdbdbd;
        border-radius: 10px;
    `,
    RuleContainer: styled.div`
        display: flex;
        justify-content: space-between;
        margin: 0 0 30px 0;
    `,
    DeleteIcon: styled.img`
        width: 20px;
        height: 20px;
        cursor: pointer;
    `,
};

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
    roomId: number;
};

export default function ChoresCreateModal({ isOpen, setIsOpen, roomId }: Props) {
    const [inputValue, setInputValue] = useState(""); // 입력값 상태
    const [selectedUserId, setSelectedUserId] = useState(0);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const [user1Id, setUser1Id] = useState(0);
    const [user1Name, setUser1Name] = useState("");
    const [user2Id, setUser2Id] = useState(0);
    const [user2Name, setUser2Name] = useState("");

    const handleCancel = () => {
        setIsOpen(false); // 모달 닫기
    };

    // 사용자 선택 핸들러
    const handleUserSelect = (userId: number) => {
        setSelectedUserId(userId);
    };

    const handleDaySelect = (day: string) => {
        const updatedDays = [...selectedDays]; // 현재 선택된 요일 배열 복제
        const index = updatedDays.indexOf(day); // 선택한 요일이 배열에 있는지 확인

        if (index === -1) {
            // 선택한 요일이 배열에 없으면 추가
            updatedDays.push(day);
        } else {
            // 선택한 요일이 이미 배열에 있으면 제거
            updatedDays.splice(index, 1);
        }

        setSelectedDays(updatedDays); // 변경된 배열로 선택된 요일 상태 업데이트
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value); // 입력값 변경 시 상태 업데이트
    };

    const handleSaveChores = async () => {
        if (inputValue.trim() !== "") {
            // 입력값이 빈 칸이 아닌지 확인합니다.
            try {
                if (selectedDays.length === 0 && selectedUserId === 0) {
                    // Case 1: days와 userId가 모두 없는 경우
                    await postCreateChores(roomId, inputValue);

                    setInputValue(""); // 입력값 초기화
                    setIsOpen(false);
                    // window.location.reload(); // 새로고침
                } else if (selectedDays.length > 0 && selectedUserId === 0) {
                    // Case 2: days만 있는 경우
                    await postCreateChores(roomId, inputValue, selectedDays);
                    setInputValue(""); // 입력값 초기화
                    setIsOpen(false);
                } else if (selectedDays.length === 0 && selectedUserId !== 0) {
                    // Case 3: userId만 있는 경우
                    await postCreateChores(roomId, inputValue, [], selectedUserId);
                    setInputValue(""); // 입력값 초기화
                    setIsOpen(false);
                } else {
                    // Case 4: days와 userId가 모두 있는 경우
                    await postCreateChores(roomId, inputValue, selectedDays, selectedUserId);
                    setInputValue(""); // 입력값 초기화
                    setIsOpen(false);
                }
                setInputValue(""); // 입력값 초기화
                setIsOpen(false);
                window.location.reload(); // 새로고침
            } catch (error) {
                console.error("집안일 저장에 실패했습니다: ", error);
            }
        } else {
            console.error("입력값이 비어 있습니다. 저장되지 않았습니다.");
            setIsOpen(false);
        }
    };

    // const options = ["월", "화", "수", "목", "금", "토", "일"];
    // const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    // // 요일 선택 핸들러
    // const handleOptionSelect = (option: string) => {
    //     // 선택된 요일 배열을 복제하여 사용합니다.
    //     const updatedOptions = [...selectedOptions];

    //     // 클릭한 요일이 이미 선택된 요일 배열에 있는지 확인합니다.
    //     const index = updatedOptions.indexOf(option);

    //     if (index === -1) {
    //         // 선택된 요일 배열에 클릭한 요일이 없으면 추가합니다.
    //         updatedOptions.push(option);
    //     } else {
    //         // 선택된 요일 배열에 클릭한 요일이 이미 있으면 제거합니다.
    //         updatedOptions.splice(index, 1);
    //     }

    //     // 변경된 요일 배열을 선택된 요일 상태로 설정합니다.
    //     setSelectedOptions(updatedOptions);
    // };

    // 요일 버튼 스타일을 선택한 요일에 따라 동적으로 결정
    const getButtonStyle = (day: string) => {
        return {
            backgroundColor: selectedDays.includes(day) ? "#398ab9" : "", // 선택된 요일이면 배경색을 검정색으로 설정
            color: selectedDays.includes(day) ? "white" : "black", // 선택된 요일이면 글자색을 흰색으로 설정
            width: "25px",
            height: "25px",
            borderRadius: "5px",
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedRoom = await getRoomInfo(roomId);
                setUser1Id(fetchedRoom.userList[0].id);
                setUser1Name(fetchedRoom.userList[0].name);
                setUser2Id(fetchedRoom.userList[1].id);
                setUser2Name(fetchedRoom.userList[1].name);
            } catch (error) {
                console.error("방 정보를 가져오는 데 실패했습니다: ", error);
            }
        };

        if (isOpen) {
            fetchData(); // 모달이 열릴 때마다 규칙를 가져오도록 설정
        }
    }, [isOpen, roomId]);

    return (
        <Modal_forChore isOpen={isOpen} title="집안일 추가하기" width="320px" height="430px" setIsOpen={setIsOpen}>
            {/* 입력받는 칸 */}

            <Input.FormInput
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="집안일을 입력하세요."
                style={{ width: "270px", margin: "10px" }}
            />

            {/* <Style.RuleContainer>
                {options.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => handleOptionSelect(option)} // 클릭 시 handleOptionSelect 함수 호출
                        style={{
                            padding: "5px 10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            backgroundColor: selectedOptions.includes(option) ? "#f5eba8" : "", // 선택된 요일인지 확인하여 배경색 변경
                        }}
                    >
                        <Text.SmallText color={selectedOptions.includes(option) ? "white" : "black"}>
                            {option}
                        </Text.SmallText>
                    </div>
                ))}
            </Style.RuleContainer> */}

            {/* 요일 선택 */}
            <Block.Box width="230px">
                <Block.Box
                    width="100%"
                    height="50px"
                    justifyContent="space-evenly"
                    alignItems="center"
                    margin="0 0 10px 0"
                >
                    <Button.RadiusButton
                        style={getButtonStyle("MONDAY")} // 월요일 버튼 스타일 설정
                        onClick={() => handleDaySelect("MONDAY")}
                    >
                        월
                    </Button.RadiusButton>
                    <Button.RadiusButton
                        style={getButtonStyle("TUESDAY")} // 월요일 버튼 스타일 설정
                        onClick={() => handleDaySelect("TUESDAY")}
                    >
                        화
                    </Button.RadiusButton>
                    <Button.RadiusButton
                        style={getButtonStyle("WEDNESDAY")} // 월요일 버튼 스타일 설정
                        onClick={() => handleDaySelect("WEDNESDAY")}
                    >
                        수
                    </Button.RadiusButton>
                    <Button.RadiusButton
                        style={getButtonStyle("THURSDAY")} // 월요일 버튼 스타일 설정
                        onClick={() => handleDaySelect("THURSDAY")}
                    >
                        목
                    </Button.RadiusButton>
                    <Button.RadiusButton
                        style={getButtonStyle("FRIDAY")} // 월요일 버튼 스타일 설정
                        onClick={() => handleDaySelect("FRIDAY")}
                    >
                        금
                    </Button.RadiusButton>
                    <Button.RadiusButton
                        style={getButtonStyle("SATURDAY")} // 월요일 버튼 스타일 설정
                        onClick={() => handleDaySelect("SATURDAY")}
                    >
                        토
                    </Button.RadiusButton>
                    <Button.RadiusButton
                        style={getButtonStyle("SUNDAY")} // 월요일 버튼 스타일 설정
                        onClick={() => handleDaySelect("SUNDAY")}
                    >
                        일
                    </Button.RadiusButton>
                    {/* 나머지 요일 버튼들도 위와 같이 추가 */}
                </Block.Box>
            </Block.Box>
            <Block.Bar width="70px" height="10px" bgColor="gray200" />
            <Margin direction="column" size={10} />
            {/* 사용자 선택 */}
            <div>
                <Block.ColumnBox width="270px" padding="10px">
                    <Text.SmallText color="gray400">담당자를 지정해주세요. </Text.SmallText>
                    <Margin direction="column" size={20} />
                    <Block.Box>
                        <label>
                            <Input.InfoRadioBoxInput
                                type="radio"
                                value={user1Name}
                                checked={selectedUserId === user1Id} // 선택된 사용자와 비교하여 체크 여부 결정
                                onChange={() => handleUserSelect(user1Id)}
                            />
                            <Block.ColumnBox
                                width="100%"
                                height="30px"
                                padding="0 10px"
                                justifyContent="center"
                                alignItems="center"
                                borderRadius="18px"
                                background={selectedUserId === user1Id ? "#398ab9" : "#bebcbc"} // 선택된 사용자의 버튼 색상을 변경
                                pointer
                            >
                                <Text.RegulBody color={selectedUserId === user1Id ? "white" : "gray100"}>
                                    {user1Name}
                                </Text.RegulBody>
                            </Block.ColumnBox>
                        </label>
                        <Margin direction="row" size={18} />
                        <label>
                            <Input.InfoRadioBoxInput
                                type="radio"
                                value={user2Name}
                                checked={selectedUserId === user2Id} // 선택된 사용자와 비교하여 체크 여부 결정
                                onChange={() => handleUserSelect(user2Id)}
                            />

                            <Block.ColumnBox
                                width="100%"
                                height="30px"
                                padding="0 10px"
                                justifyContent="center"
                                alignItems="center"
                                borderRadius="18px"
                                background={selectedUserId === user2Id ? "#398ab9" : "#bebcbc"} // 선택된 사용자의 버튼 색상을 변경
                                pointer
                            >
                                <Text.RegulBody color={selectedUserId === user2Id ? "white" : "gray100"}>
                                    {user2Name}
                                </Text.RegulBody>
                            </Block.ColumnBox>
                        </label>
                    </Block.Box>
                </Block.ColumnBox>
            </div>

            <Margin direction="column" size={15} />

            <Block.Bar width="70px" height="10px" bgColor="gray200" />

            <Margin direction="column" size={25} />

            {/* 추가 버튼 */}

            <Block.Box width="280px" justifyContent="center">
                <Style.CancelButton onClick={handleCancel}>취소</Style.CancelButton>
                <Margin direction="row" size={20} />

                <Style.SaveButton onClick={handleSaveChores}>저장</Style.SaveButton>
            </Block.Box>

            <Block.ColumnBox></Block.ColumnBox>
        </Modal_forChore>
    );
}
