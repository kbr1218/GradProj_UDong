export const postSaveMessage = async (roomId, senderId, message) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = `/chat/${roomId}`;

    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: "POST",
            credentials: "include", // include, *same-origin, omit
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: [{ senderId: senderId, message: message }],
        });
        // 규칙이 성공적으로 생성되었습니다. 메세지 리턴
        return response.json();
    } catch (e) {
        console.error("규칙 생성에 실패하였습니다.");
    }
};
