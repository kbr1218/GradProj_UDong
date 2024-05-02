// getRules.js
export const getRules = async roomId => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = `/api/room/rule/${roomId}`;

    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const rules = await response.json();

            // rule에서 따옴표 제거
            const cleanRules = rules.map(rule => ({
                id: rule.id,
                rule: rule.rule.replace(/['"]/g, ""),
                roomId: rule.roomId,
            }));
            return cleanRules;
        } else {
            console.error("서버에서 규칙을 가져오는 데 실패했습니다.");
            return null;
        }
    } catch (error) {
        console.error("규칙을 가져오는 중 오류가 발생했습니다:", error);
        return null;
    }
};
