import { Block } from "./styles/ui";
import { Reset } from "styled-reset";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";
import { getUserInfo } from "./api/login/getUserInfo";
import { Outlet, useNavigate } from "react-router-dom";
import React from "react";

// Context 생성
const AuthContext = React.createContext(false);

export default function App() {
    const queryClient = new QueryClient();
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const initLogin = async () => {
            try {
                const user = await getUserInfo();
                setIsLogin(true); // 로그인 성공 시 상태를 true로 변경
            } catch (error) {
                setIsLogin(false); // 로그인 실패 시 상태를 false로 유지하고 로그인 페이지로 이동
                navigate("/");
            }
        };
        initLogin();
    }, []);

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Reset />
                <Block.AppWrapper>
                    <Block.ServiceWrapper>
                        <AuthContext.Provider value={isLogin}>
                            <Outlet />
                        </AuthContext.Provider>
                    </Block.ServiceWrapper>
                </Block.AppWrapper>
            </QueryClientProvider>
        </>
    );
}

// AuthContext export
export { AuthContext };
