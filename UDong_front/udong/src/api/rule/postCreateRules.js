//postCreatRules.js
export const postCreateRules = async (roomId, rule) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = `/api/room/rule/${roomId}`;

    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: "POST",
            credentials: "include", // include, *same-origin, omit
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rule),
        });
    } catch (e) {
        console.error("규칙 생성에 실패하였습니다.");
    }
};
