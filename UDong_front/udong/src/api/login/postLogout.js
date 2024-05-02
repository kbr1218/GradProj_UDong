// postLogout.js
export const postLogout = async () => {
    const API_URL = process.env.REACT_APP_API_URL;
    //const path = "/api/oauth/logout";
    const path = "/logout";

    try {
        await fetch(`${API_URL}${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
        });
    } catch (e) {
        console.error("로그아웃 요청 중 에러가 발생했습니다.", e);
        return false;
    }
};
