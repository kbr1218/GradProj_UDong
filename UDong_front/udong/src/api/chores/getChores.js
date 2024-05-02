export const getChores = async roomId => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = `/api/chores/get/${roomId}`;

    try {
        const response = await fetch(`${API_URL}${path}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
        });
        return response; // list
    } catch (e) {
        console.error("로그인 이후 이용해주세요.");
    }
};
