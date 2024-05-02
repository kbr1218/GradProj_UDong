// deleteRule.js
export const deleteRule = async ruleId => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = `/api/room/rule/${ruleId}`;

    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
        });
        return response.text();
    } catch (e) {
        console.error("규칙 삭제 실패");
    }
};
