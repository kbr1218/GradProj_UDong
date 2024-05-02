// postInviteUser.js
export const inviteUser = async (userId, email) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = `/api/invitations/invite/${userId}`;

    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inviteeEmail: email }),
        });
        return response.json();
    } catch (error) {
        console.error("초대 요청 중 오류 발생:", error);
    }
};
