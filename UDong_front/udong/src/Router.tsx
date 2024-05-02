import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Choice from "../src/pages/choice";
import Home from "../src/pages/home";
import NotFound from "../src/pages/notFound";
import Todo from "../src/pages/todo";
import MyPage from "../src/pages/myPage";
import Chat from "../src/pages/chat";
import CreateRoom from "../src/pages/createRoom";
import Login from "./pages/Login";
import React from "react";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Login isLogin setIsLogin />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/choice",
                element: <Choice isLogin setIsLogin />,
            },
            {
                path: "/todo",
                element: <Todo />,
            },
            {
                path: "/chat/:roomId",
                element: <Chat />,
            },
            {
                path: "/createRoom",
                element: <CreateRoom />,
            },
            {
                path: "/mypage",
                element: <MyPage />,
            },
        ],
        errorElement: <NotFound />,
    },
]);
