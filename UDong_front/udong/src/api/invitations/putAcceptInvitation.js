// acceptInvitation.js
export const acceptInvitation = async invitationId => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = `/api/invitations/accept/${invitationId}`;

    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: "PUT",
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
            console.error("서버 응답이 올바르지 않습니다.");
            return null;
        }
    } catch (e) {
        console.error("API 불러오기 실패", e);
        return null;
    }
};
