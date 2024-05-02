// Modal_forRule.tsx
import { SetStateAction, useEffect, useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import { Block, Margin, Text, Button } from "../../styles/ui";

export type ModalProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

type Props = ModalProps & {
    title: string;
    width: string;
    height: string;
    children: React.ReactNode;
};

const Style = {
    Wrapper: styled.div<{ width: string }>`
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        overflow: hidden;
        max-width: ${({ width }) => width};
    `,
    ContentWrapper: styled.div<{ width: string }>`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-width: ${({ width }) => width};
    `,
    Header: styled.div`
        height: 60px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 23px;
        background-color: #398ab9; // 헤더 배경색
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9999;
        border-bottom: none;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    `,
    TitleWrapper: styled.div`
        flex: 1;
        display: flex;

        justify-content: center;
        align-items: center;
        margin-top: 8px;
    `,
    GoBackButton: styled.button`
        border: none;
        background: #398ab9;
        padding: 0;
        cursor: pointer;
        margin-top: 5px;
    `,
    GoBackButtonWrapper: styled.div`
        flex: 1;
        display: flex;
        justify-content: left;
        align-items: center;
    `,
};

export default function Modal_forRule({ isOpen, title, width, height, children, setIsOpen }: Props) {
    return (
        <ReactModal
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: "9999999",
                },
                content: {
                    outline: "none",
                    margin: "0 auto 0",
                    padding: 0,
                    width,
                    height,
                    border: "none",
                    borderRadius: "5px",
                    boxShadow: "3px 3px 20px 0 rgba(0, 0, 0, 0.25)",
                    backgroundColor: "white",
                },
            }}
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            className="MODAL"
        >
            <Style.Wrapper width={width}>
                {/* 헤더 */}
                <Style.Header>
                    {/* 뒤로가기 버튼 */}
                    <Style.GoBackButton onClick={() => setIsOpen(false)}>
                        <img src="goBack.png" alt="go back" width="18px" style={{ cursor: "pointer" }} />
                    </Style.GoBackButton>

                    {/* 타이틀 */}
                    <Style.TitleWrapper>
                        <Text.MediBodyS color="white">{title}</Text.MediBodyS>
                    </Style.TitleWrapper>
                </Style.Header>

                {/* 나머지 내용 */}
                <Style.ContentWrapper width={width}>{children}</Style.ContentWrapper>
            </Style.Wrapper>
        </ReactModal>
    );
}
