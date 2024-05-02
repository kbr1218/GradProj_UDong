// Modal_ExitRoom.tsx (빨간색-회색 버튼)
import { SetStateAction, ReactNode } from "react";
import { Text, FlexBox } from "../../styles/ui";
import ReactModal from "react-modal";
import styled from "styled-components";

export type ModalProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
    CancelButton: ButtonProps;
    ExitButton: ButtonProps;
    UserInfo: any;
};

type ButtonProps = {
    label: string;
    onClick: () => void;
    buttonStyle: any;
};

type Props = ModalProps & {
    title: string;
    width: string;
    height: string;
    content: ReactNode;
    children: ReactNode;
};

const Style = {
    Wrapper: styled.div`
        width: 100%;
        height: 100%;
        overflow-y: hidden;
    `,
    ContentWrapper: styled.div`
        width: 100%;
        height: 100%;
        overflow-y: auto;
    `,
    Header: styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        background-color: white;
        text-align: center;
        border-radius: 10px;
    `,
    Title: styled(Text.BoldTitleS)`
        font-weight: bold;
        padding-top: 12px;
    `,
    Content: styled.div`
        padding: 16px;
        color: #666a73;
        font-size: 15px;
        line-height: 1.3;
        text-align: center;
    `,
    ButtonContainer: styled.div`
        display: flex;
        justify-content: center;
        padding: 12px;
        gap: 5px;
    `,
    ExitButton: styled.button`
        margin-left: 8px;
        padding: 8px 16px;
        background-color: #d1180b; /* 빨간색 */
        color: white;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        box-shadow: 3px 3px 20px 0 rgba(0, 0, 0, 0.1);
    `,
    CancelButton: styled.button`
        padding: 8px 16px;
        background-color: #cccccc;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        box-shadow: 3px 3px 20px 0 rgba(0, 0, 0, 0.1);
        color: black;
    `,
};

export default function Modal_ExitRoom({
    isOpen,
    title,
    width,
    height,
    content,
    children,
    setIsOpen,
    CancelButton,
    ExitButton,
}: Props) {
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
                    position: "relative",
                    top: "auto",
                    left: "auto",
                    right: "auto",
                    bottom: "auto",
                    margin: "auto",
                    width: width,
                    height: height,
                    border: "none",
                    borderRadius: "10px",
                    backgroundColor: "white",
                },
            }}
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            className="MODAL"
        >
            <Style.Wrapper>
                <Style.Header>
                    <Style.Title color="black">{title}</Style.Title>
                </Style.Header>
                <Style.Content>{content}</Style.Content>
                <FlexBox justifyContents="center" wrap={true}>
                    {children}
                </FlexBox>
                <Style.ButtonContainer>
                    <Style.CancelButton onClick={CancelButton.onClick}>{CancelButton.label}</Style.CancelButton>
                    <Style.ExitButton onClick={ExitButton.onClick}>{ExitButton.label}</Style.ExitButton>
                </Style.ButtonContainer>
            </Style.Wrapper>
        </ReactModal>
    );
}
