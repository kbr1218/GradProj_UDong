// getRoomInfo.js
export const getRoomInfo = async roomId => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = `/api/room/${roomId}`;

    try {
        const response = await fetch(`${API_URL}${path}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("서버 응답이 올바르지 않습니다.");
        }

        const roomInfo = await response.json();

        return roomInfo;
    } catch (error) {
        console.error("방에 대한 정보를 불러오는 중 오류가 발생했습니다:", error);
        return null;
    }
};
