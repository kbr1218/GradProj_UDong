export const getChat = async roomId => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = `/chat/${roomId}`;

    try {
        const response = await fetch(`${API_URL}${path}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
        });
        const data = await response.json();
        return data; // 채팅 데이터 반환
    } catch (e) {
        console.error("로그인 이후 이용해주세요.");
        return [];
    }
};
