// RulesEditorModal.tsx
import Modal_forRule from "../../../utils/modal/Modal_forRule";
import { postCreateRules } from "../../../api/rule/postCreateRules";
import { deleteRule } from "../../../api/rule/deleteRule";
import { getRules } from "../../../api/rule/getRules";
import CannotMakeRuleModal from "./CannotMakeRuleModal";
import { SetStateAction, useState, useEffect } from "react";
import { Block, Margin, Text, Button } from "../../../styles/ui";
import styled from "styled-components";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

type Rule = {
    id: number;
    rule: string;
};

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
    roomId: number;
};

const Style = {
    TopWrapper: styled.div`
        position: absolute;
        top: 80px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `,
    Input: styled.input`
        margin: 10px 0;
        border: none;
        border-bottom: 2px solid #868e96;
        width: 85%;
        height: 25px;
        font-size: 16px;
        padding: 5px;
        box-sizing: border-box;
        outline: none;
    `,
    SaveButton: styled(Button.RadiusButton)`
        width: 60px;
        height: 30px;
        background-color: #398ab9;
        border-radius: 5px;
        margin: 10px 0;
    `,
    DashedLine: styled.div`
        border-bottom: 1px dashed #868e96;
        width: 90%;
        margin-top: 20px;
        margin-bottom: 10px;
    `,
    RuleContainer: styled.div`
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 8px;
        padding: 0 20px 0 20px;
    `,
    DeleteIcon: styled.img`
        width: 20px;
        height: 20px;
        cursor: pointer;
    `,
};

export default function RulesEditorModal({ isOpen, setIsOpen, roomId }: Props) {
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState(""); // 입력값 상태
    const [rules, setRules] = useState<Rule[]>([]); // 규칙 목록 상태
    const [showCannotMakeRuleModal, setShowCannotMakeRuleModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedRules = await getRules(roomId);
                setRules(fetchedRules.slice(0, 5));
            } catch (error) {
                console.error("사용자 정보를 가져오는 데 실패했습니다: ", error);
            }
        };

        if (isOpen) {
            fetchData(); // 모달이 열릴 때마다 규칙를 가져오도록 설정
        }
    }, [isOpen, roomId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value); // 입력값 변경 시 상태 업데이트
    };

    const handleSaveRule = async () => {
        try {
            const fetchedRules = await getRules(roomId);
            if (fetchedRules.length < 5) {
                await postCreateRules(roomId, inputValue);
                window.location.reload();

                // 규칙을 저장한 후에 규칙 목록을 다시 가져와서 업데이트
                const fetchedRules = await getRules(roomId);
                setRules(fetchedRules);
                setInputValue(""); // 입력값 초기화
            } else {
                setShowCannotMakeRuleModal(true);
            }
        } catch (error) {
            console.error("규칙 저장에 실패했습니다: ", error);
        }
    };

    const handleDeleteRule = async (id: number) => {
        try {
            await deleteRule(id);

            // 규칙을 삭제한 후에 규칙 목록을 다시 가져와서 업데이트
            const fetchedRules = await getRules(roomId);
            setRules(fetchedRules);
            window.location.reload();
        } catch (error) {
            console.error("규칙 삭제에 실패했습니다: ", error);
        }
    };

    return (
        <>
            <Modal_forRule isOpen={isOpen} title="공동 생활 규칙" width="320px" height="500px" setIsOpen={setIsOpen}>
                <Style.TopWrapper>
                    {/* 입력받는 칸 */}
                    <Style.Input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="여기에 규칙을 입력해주세요."
                        style={{ fontSize: "14px", height: "45px" }}
                    />

                    {/* 추가 버튼 */}
                    <Block.ColumnBox width="100%" alignItems="flex-end" padding="0 20px">
                        <Style.SaveButton onClick={handleSaveRule}>추가</Style.SaveButton>
                    </Block.ColumnBox>

                    {/* 점선 */}
                    <Style.DashedLine />

                    {/* 규칙 목록 출력 */}
                    {rules.length > 0 ? (
                        <Block.ColumnBox>
                            {rules.map(rule => (
                                <Style.RuleContainer key={rule.id}>
                                    {/* 규칙 */}
                                    <Block.Box width="100%" padding="10px" justifyContent="space-between">
                                        <Text.SemiBodyS>{rule.rule}</Text.SemiBodyS>

                                        {/* 쓰레기통 아이콘 */}
                                        <Style.DeleteIcon
                                            src="trashcan.png"
                                            alt="삭제"
                                            onClick={() => handleDeleteRule(rule.id)}
                                        />
                                    </Block.Box>
                                </Style.RuleContainer>
                            ))}
                        </Block.ColumnBox>
                    ) : (
                        <Block.ColumnBox width="100%" height="250px" justifyContent="center" alignItems="center">
                            <Text.RegulBody>규칙이 없습니다.</Text.RegulBody>
                        </Block.ColumnBox>
                    )}
                </Style.TopWrapper>
            </Modal_forRule>
            {showCannotMakeRuleModal && (
                <CannotMakeRuleModal isOpen={showCannotMakeRuleModal} setIsOpen={setShowCannotMakeRuleModal} />
            )}
        </>
    );
}
