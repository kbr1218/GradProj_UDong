// putUpdateTodoStatus.js
export const updateTodoStatus = async (todoId, newStatus) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = `/api/todolist/update/status/${todoId}`;

    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
            body: JSON.stringify(newStatus),
        });
        return response.text();
    } catch (e) {
        console.error("투두 상태 업데이트 실패");
    }
};
