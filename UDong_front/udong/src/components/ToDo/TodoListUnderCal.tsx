// TodoListUnderCal.tsx
import React, { useEffect, useState } from "react";
import { updateTodoStatus } from "../../api/todolist/putUpdateTodoStatus";
import { Block, Margin, Text, Input } from "../../styles/ui";

interface Todo {
    id: number;
    content: string;
    status: boolean;
    assignedUserName: string | null; // 할 일에 할당된 사용자의 이름
}

interface User {
    id: number;
    name: string;
}

interface TodoListProps {
    todos: Todo[];
    onDeleteTodo: (id: number) => void; // Function to handle todo deletion
    userList: User[]; // 사용자 목록
}

const TodoListUnderCal: React.FC<TodoListProps> = ({ todos, onDeleteTodo, userList }) => {
    // 각 todo의 상태를 저장하는 객체
    const [todoStatus, setTodoStatus] = useState<{ [id: number]: boolean }>({});

    useEffect(() => {
        // 컴포넌트가 마운트될 때 서버에서 최신 상태를 가져옴
        updateTodoStatusFromServer();
    }, []);

    const updateTodoStatusFromServer = async () => {
        try {
            const updatedStatuses: { [id: number]: boolean } = {};
            for (const todo of todos) {
                const response = await updateTodoStatus(todo.id, todo.status);
                updatedStatuses[todo.id] = todo.status;
            }
            setTodoStatus(updatedStatuses);
        } catch (error) {
            console.error("투두 상태 가져오기 실패:", error);
        }
    };
    // 각 체크박스의 상태를 변경하는 함수
    const handleCheckboxChange = async (id: number, currentStatus: boolean) => {
        const newStatus = !currentStatus; // 현재 상태를 반전시킴

        try {
            // API 호출하여 상태 업데이트
            await updateTodoStatus(id, newStatus);
            // 상태 업데이트
            setTodoStatus(prev => ({
                ...prev,
                [id]: newStatus,
            }));
        } catch (error) {
            console.error("투두 상태 업데이트 실패:", error);
        }
    };

    const handleDelete = (id: number) => {
        onDeleteTodo(id); // Call the onDeleteTodo function with the todo id
    };

    return (
        <Block.ColumnBox
            width="100%"
            height="170px"
            // border="1px solid red"
            padding="0 10px 0 18px"
            style={{ overflowY: "scroll" }}
        >
            <Block.ColumnBox width="100%" height="280px">
                <Block.ColumnBox>
                    {todos.map(todo => (
                        <Block.Box key={todo.id}>
                            <Block.Box width="100%" height="45px">
                                <Block.Box
                                    alignItems="center"
                                    style={{ display: "flex" }}
                                    justifyContent="space-between"
                                    // border="1px solid red"
                                >
                                    <Block.Box width="auto" alignItems="center">
                                        <Input.CheckBoxInput
                                            type="checkbox"
                                            checked={todoStatus[todo.id] || false} // 해당 todo의 상태 가져오기
                                            onChange={() => handleCheckboxChange(todo.id, todoStatus[todo.id] || false)} // 체크박스 클릭 시 상태 업데이트 함수 호출
                                        />
                                        <Text.SemiBodyS color="gray400">
                                            {/* Todo 내용 */}
                                            {todo.content}
                                        </Text.SemiBodyS>
                                    </Block.Box>
                                    {todo.assignedUserName !== null && (
                                        <Block.Box
                                            style={{
                                                backgroundColor: "#adb0b2",
                                                borderRadius: "10px",
                                                padding: "8px 8px",
                                                color: "white",
                                                justifyContent: "center",
                                                width: "auto",
                                            }}
                                        >
                                            <Text.SmallText>{todo.assignedUserName}</Text.SmallText>
                                        </Block.Box>
                                    )}
                                </Block.Box>
                                <button
                                    onClick={() => handleDelete(todo.id)}
                                    style={{
                                        marginLeft: "10px",
                                        cursor: "pointer",
                                        backgroundColor: "transparent",
                                        border: "none",
                                    }}
                                >
                                    <img
                                        src="trashcan.png"
                                        alt="Delete"
                                        style={{
                                            marginLeft: "10px",
                                            cursor: "pointer",
                                            width: "20px",
                                            height: "20px",
                                            backgroundColor: "transparent",
                                            border: "none",
                                        }}
                                    />
                                </button>
                            </Block.Box>
                        </Block.Box>
                    ))}
                </Block.ColumnBox>
            </Block.ColumnBox>
        </Block.ColumnBox>
    );
};

export default TodoListUnderCal;
