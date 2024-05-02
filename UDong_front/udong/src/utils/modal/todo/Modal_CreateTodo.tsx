// Modal_CreateTodo.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Block, Button, Margin, Text } from "../../../styles/ui";
import { postCreateTodo } from "../../../api/todolist/postCreateTodo";
import ReactModal from "react-modal";
import { getUserInfo } from "../../../api/login/getUserInfo";
import { getRoomInfo } from "../../../api/room/getRoomInfo";
import { useNavigate } from "react-router-dom";

const ModalWrapper = styled.div`
    width: 100%;
    height: 100%;
    /* overflow-y: scroll; */
    &::-webkit-scrollbar {
        display: none;
    }
    outline: none;
    /* border: 1px solid red; */
`;
const InsertForm = styled.form`
    padding-left: 32px;
    padding-top: 32px;
    padding-right: 32px;
    padding-bottom: 22px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    z-index: 5;
    width: 100%;
    height: 100px;
`;
const Input = styled.input`
    padding: 8px 8px 8px 14px;
    border-radius: 10px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 14px;
    box-sizing: border-box;
`;
const SubmitButton = styled.button`
    background-color: #398ab9;
    width: 240px;
    height: 40px;
    color: white;
    border: none;
    border-radius: 30px;
    /* padding: 10px 10px; */
    font-size: 16px;
    cursor: pointer;
    margin: 10px;
`;
const HorizontalContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const Header = styled.div`
    text-align: center;
    padding-top: 27px;
    /* background-color: #398ab9; */
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
`;
const OptionButton = styled(Button.RadiusButton)<{ selected: boolean }>`
    background-color: ${({ selected }) => (selected ? "rgb(181, 181, 181)" : "rgb(242, 242, 242)")};
    color: black;
    margin-right: 12px;
    padding: 20px;
    width: auto;
    height: 30px;
    border-radius: 20px;
`;

// Props 타입 정의
type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedDate: string | null;
    closeModal: () => void;
};

const Modal_CreateTodo = ({ isOpen, setIsOpen, selectedDate, closeModal }: Props) => {
    const [todoValue, setTodoValue] = useState("");
    const [userList, setUserList] = useState<{ id: number; name: string }[]>([]);
    const [selectedUser, setSelectedUser] = useState<number | null>(null);
    const [roomId, setRoomId] = useState<number | null>(null);
    const [assignedUserName, setAssignedUserName] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const userInfoResponse = await getUserInfo();
                const roomId = userInfoResponse?.roomId;

                if (roomId) {
                    const roomInfoResponse = await getRoomInfo(roomId);
                    const userList = roomInfoResponse.userList;
                    setRoomId(roomId);
                    setUserList(userList);
                }
            } catch (error) {
                console.error("Error fetching room data:", error);
            }
        };

        if (isOpen) {
            fetchRoomData();
        }
    }, [isOpen]);

    const handleUserSelect = (userId: number, userName: string) => {
        setSelectedUser(userId === selectedUser ? null : userId);
        setAssignedUserName(userId === selectedUser ? null : userName); // 사용자 선택 시 assignedUserName 업데이트
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoValue(e.target.value);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (todoValue.trim() === "") return;

        if (!roomId) {
            console.error("Room ID is not available");
            return;
        }
        if (!selectedDate) {
            console.error("Selected date is not available");
            return;
        }

        // const assignedUserName = selectedUser ? userList.find(user => user.id === selectedUser)?.name : null;
        // const assignedId = selectedUser || null;
        try {
            await postCreateTodo(roomId, todoValue, selectedDate, assignedUserName);
            setTodoValue("");
            closeModal(); // 모달 닫기
            window.location.reload();
            navigate("/todo");
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    };

    useEffect(() => {
        // 모달이 열릴 때마다 상태 초기화
        if (isOpen) {
            setTodoValue(""); // 할 일 입력값 초기화
            setSelectedUser(null); // 선택된 사용자 초기화
            setAssignedUserName(null); // 담당자 이름 초기화
        }
    }, [isOpen]);

    return (
        <ReactModal
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    zIndex: "9999999",
                },
                content: {
                    outline: "none",
                    margin: "0 auto",
                    marginTop: "320px",
                    padding: 0,
                    width: "350px", // 너비 설정
                    height: "280px", // 높이 설정
                    border: "0",
                    borderRadius: "20px",
                    boxShadow: "3px 3px 20px 0 rgba(0, 0, 0, 0.25)",
                    overflowY: "hidden",
                    backgroundColor: "white",
                },
            }}
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            className="MODAL"
        >
            <ModalWrapper>
                <Block.ColumnBox
                    width="100%"
                    height="100%"
                    alignItems="flex-end"
                    justifyContent="space-evenly"
                    zIndex="5"
                >
                    {/* 헤더 */}
                    <Header>
                        <Block.Box justifyContent="space-between">
                            <Margin direction="row" size={20} />
                            <Block.Img width="20px" src="/goBack.png" alt="뒤로가기" pointer onClick={closeModal} />
                            <Block.Box width="100%" justifyContent="center" alignItems="center">
                                <Text.BoldTitleS>{selectedDate}</Text.BoldTitleS>
                                <Margin direction="row" size={36} />
                            </Block.Box>
                        </Block.Box>
                    </Header>
                    <InsertForm onSubmit={onSubmit}>
                        <Block.ColumnBox>
                            <Input autoFocus placeholder="할 일을 입력해주세요" onChange={onChange} value={todoValue} />
                        </Block.ColumnBox>
                    </InsertForm>

                    {/* 사용자 이름 버튼 렌더링 */}
                    <Block.ColumnBox>
                        <Block.Box justifyContent="center">
                            {userList.map(user => (
                                <OptionButton
                                    key={user.id}
                                    selected={user.id === selectedUser}
                                    onClick={() => handleUserSelect(user.id, user.name)}
                                >
                                    <Text.SmallText>{user.name}</Text.SmallText>
                                </OptionButton>
                            ))}
                        </Block.Box>
                    </Block.ColumnBox>
                    <Margin direction="column" size={20} />

                    {/* 하단 가운데에 등록 버튼 추가 */}
                    <Block.ColumnBox justifyContent="center" alignItems="center" style={{ marginBottom: "10px" }}>
                        <SubmitButton onClick={onSubmit}>등록</SubmitButton>
                    </Block.ColumnBox>
                </Block.ColumnBox>
            </ModalWrapper>
        </ReactModal>
    );
};

export { Modal_CreateTodo };
