export const postCreateTodo = async (roomId, content, date, assignedUserName) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = `/api/todolist/create/${roomId}`;

    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: "POST",
            credentials: "include", // include, *same-origin, omit
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content, date, assignedUserName }),
        });
        // 규칙이 성공적으로 생성되었습니다. 메세지 리턴
    } catch (e) {
        console.error("규칙 생성에 실패하였습니다.");
    }
};
