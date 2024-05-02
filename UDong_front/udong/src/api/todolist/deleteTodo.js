export const deleteTodo = async todoId => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = `/api/todolist/delete/${todoId}`;

    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
        });
        return response.text();
    } catch (e) {
        console.error("투두 삭제 실패");
    }
};
