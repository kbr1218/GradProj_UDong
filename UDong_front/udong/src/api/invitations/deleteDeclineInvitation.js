// declineInvitation.js
export const declineInvitation = async invitationId => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = `/api/invitations/decline/${invitationId}`;

    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            if (response.status === 404) {
                return "해당 초대를 찾을 수 없습니다.";
            } else {
                throw new Error("bad server condition");
            }
        }

        return "초대를 거절했습니다.";
    } catch (e) {
        console.error("초대를 거절할 수 없습니다:", e);
        return false;
    }
};
