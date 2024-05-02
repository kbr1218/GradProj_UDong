export const putUpdateRoomName = async (roomId, roomName) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = "/api/room/updateRoomName";

    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: "PUT",
            credentials: "include", // include, *same-origin, omit
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: roomId, roomName: roomName }),
        });
        return response.json().message;
    } catch (e) {
        console.error("방 이름 업데이트에 실패했습니다.");
    }
};
