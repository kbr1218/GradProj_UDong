export const deleteChores = async choreId => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = `/api/chores/delete/${choreId}`;

    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
        });
        if (response.ok) {
            return response;
        } else {
            console.error("집안일 삭제 실패");
            // 혹은 다른 처리 방법을 선택할 수 있습니다.
            return null;
        }
    } catch (e) {
        console.error("집안일 삭제 실패");
    }
};
