// getInvitation.js
export const getInvitation = async userId => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = `/api/invitations/getInvitation/${userId}`;

    try {
        const response = await fetch(`${API_URL}${path}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
        });

        if (response.ok) {
            return await response.json();
        } else if (response.status === 404) {
            return false;
        } else {
            // 그 외의 경우 null 반환
            console.error("서버 응답이 올바르지 않습니다.");
            return null;
        }
    } catch (e) {
        console.error("API 불러오기 실패:", e);
        return null;
    }
};
