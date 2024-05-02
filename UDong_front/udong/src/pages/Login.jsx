// Login.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../components/login/GoogleLogin";
import { postLoginToken } from "../api/login/postLoginToken";
import { getUserInfo } from "../api/login/getUserInfo";
import { Block, Margin, Text } from "../styles/ui";

export default function Login({ isLogin, setIsLogin }) {
    const navigate = useNavigate();

    // https://stackoverflow.com/questions/49819183/react-what-is-the-best-way-to-handle-login-and-authentication
    const onGoogleSignIn = async res => {
        const { credential } = res;
        const loginState = await postLoginToken(credential);
        if (loginState) {
            const userInfo = await getUserInfo();
            if (userInfo && userInfo.roomId) {
                navigate("/home");
            } else {
                navigate("/choice");
            }
        }
    };

    useEffect(() => {
        const checkLoginAndRedirect = async () => {
            const userInfo = await getUserInfo();
            // 로그인 되어있고 roomId가 있다면 /home으로
            if (isLogin && userInfo && userInfo.roomId) {
                navigate("/home");
            }
        };
        checkLoginAndRedirect();
    }, [isLogin, navigate]);

    return (
        <>
            <Block.ColumnBox
                width="100%"
                height="100% "
                alignItems="center"
                justifyContent="center"
                background="#fffad3"
        
            >
                <Block.Img src="UDongLogoWTitle.png" alt="로고" />
                <Margin direction="column" size={75} />
                <GoogleLogin onGoogleSignIn={onGoogleSignIn} text="로그인" />
            </Block.ColumnBox>
        </>
    );
}
