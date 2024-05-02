export const deleteAllChores = async roomId => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = `/api/chores/deletAll/${roomId}`;

    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
        });
        return response.json().message;
    } catch (e) {
        console.error("집안일 전부 삭제하기 실패");
    }
};
