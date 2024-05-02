// ChoreEditorModal.tsx
import Modal_forRule from "../../../utils/modal/Modal_forRule";
import { postCreateRules } from "../../../api/rule/postCreateRules";
import { getUserInfo } from "../../../api/login/getUserInfo";
import { SetStateAction, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
    choresId: number;
    chores: string;
};

export default function ChoresEditModal({ isOpen, setIsOpen }: Props) {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState<number | null>(null);
    const [rule, setRule] = useState<string>("");

    useEffect(() => {
        const fetchRoomId = async () => {
            try {
                const userInfo = await getUserInfo();
                if (userInfo && userInfo.roomId) {
                    setRoomId(userInfo.roomId);
                } else {
                    console.error("사용자 정보나 roomId를 가져오는 데 실패했습니다.");
                }
            } catch (error) {
                console.error("사용자 정보나 roomId를 가져오는 중 오류가 발생했습니다:", error);
            }
        };
        fetchRoomId();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRule(e.target.value);
    };

    const handleSaveRule = async () => {
        try {
            if (roomId !== null) {
                await postCreateRules(roomId, rule);
                navigate("/home", { replace: true });
            } else {
                console.error("유효하지 않은 roomId");
            }
        } catch (error) {
            console.error("저장 중 오류 발생:", error);
        }
        setIsOpen(false);
    };

    return (
        <Modal_forRule isOpen={isOpen} title="규칙 추가하기" width="300px" height="150px" setIsOpen={setIsOpen}>
            <input type="text" value={rule} onChange={handleInputChange} placeholder="규칙을 입력해주세요" />
            <button onClick={handleSaveRule}>저장</button>
        </Modal_forRule>
    );
}
