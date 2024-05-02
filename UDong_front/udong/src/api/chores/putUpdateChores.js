export const putUpdateChores = async (choresId, chores, days, assignedUserId) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = "/api/todolist/update";

    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: "PUT",
            credentials: "include", // include, *same-origin, omit
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                choresId: choresId,
                chores: chores,
                days: days,
                assignedUserId: assignedUserId,
            }),
        });
        return response.json().message;
    } catch (e) {
        console.error("집안일 업데이트 실패");
    }
};
