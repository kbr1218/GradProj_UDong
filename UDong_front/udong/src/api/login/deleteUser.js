// deleteUser.js
export const deleteUser = async userId => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = `/api/user/delete/${userId}`;

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
            return await response.text();
        } else if (response.status === 403) {
            throw new Error("403 Forbidden: User does not have permission to delete");
        } else {
            console.error("서버 응답이 올바르지 않습니다.");
            return null;
        }
    } catch (e) {
        console.error("API 불러오기 실패", e);
        return null;
    }
};
