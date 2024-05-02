// postCreateRoom.js
export const postCreateRoom = async roomName => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = "/api/room/create";

    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: "POST",
            credentials: "include", // include, *same-origin, omit
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ roomName: roomName }),
        });

        if (response.ok) {
            const roomInfo = await response.json();
            // 방 정보 반환
            return roomInfo;
        } else {
            throw new Error("방 만들기 실패");
        }
    } catch (e) {
        console.error("로그인한 사용자 정보가 없습니다.");
        return null;
    }
};
