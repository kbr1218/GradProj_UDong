// getUserInfo.js
export const getUserInfo = async () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = "/api/user/getUserInfo";

    try {
        const response = await fetch(`${API_URL}${path}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
        });
        if (!response.ok) throw new Error("bad server condition");
        return response.json();
    } catch (e) {
        console.error("로그인 이후 이용해주세요.");
        return false;
    }
};
