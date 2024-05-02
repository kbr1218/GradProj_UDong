import { SetStateAction, useState, useEffect } from "react";
import BasicModal from "../../../utils/modal/BasicModal";
import React from "react";
import { Block, Margin, Text, Input, Button } from "../../../styles/ui";
import { useNavigate } from "react-router-dom";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

export default function AddGPTtodoModal({ isOpen, setIsOpen }: Props) {
    const navigate = useNavigate();

    const handleGoTodoPage = () => {
        navigate("/todo");
    };
    return (
        <>
            <BasicModal width="350px" height="240px" isOpen={isOpen} setIsOpen={setIsOpen} title={""}>
                <>
                    <Block.ColumnBox width="100%" height="180px" justifyContent="center" alignItems="center">
                        <Text.SemiBodyM>성공적으로</Text.SemiBodyM>
                        <Margin direction="column" size={8} />

                        <Text.SemiBodyM> 등록되었습니다!</Text.SemiBodyM>
                        <Margin direction="column" size={30} />
                        <Text.SmallText color="gray300">
                            TODO 페이지로 이동할까요?{" "}
                            <Text.SmallText color="gray400" pointer onClick={handleGoTodoPage}>
                                이동하기
                            </Text.SmallText>
                        </Text.SmallText>
                    </Block.ColumnBox>
                </>
            </BasicModal>
        </>
    );
}
