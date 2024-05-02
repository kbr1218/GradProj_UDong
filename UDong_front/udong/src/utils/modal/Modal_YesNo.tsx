// Modal_YesNo.tsx
import { SetStateAction, ReactNode } from "react";
import { Text, FlexBox } from "../../styles/ui";
import ReactModal from "react-modal";
import styled from "styled-components";

export type ModalProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
    yesButton: ButtonProps;
    noButton: ButtonProps;
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
    children?: ReactNode;
};

const Style = {
    Wrapper: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        overflow-y: hidden;
    `,
    Header: styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding-top: 16px;
        background-color: white;
    `,
    Title: styled(Text.BoldTitleS)`
        font-weight: bold;
        padding-top: 12px;
    `,
    Content: styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 16px;
        color: #666a73;
        font-size: 15px;
        line-height: 1.3;
    `,
    ButtonContainer: styled.div`
        display: flex;
        width: 100%;
        justify-content: center;
        padding-bottom: 20px;
    `,
    YesButton: styled.button`
        margin-left: 8px;
        padding: 8px 16px;
        background-color: #f2dd94;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        box-shadow: 3px 3px 20px 0 rgba(0, 0, 0, 0.1);
        color: black;
    `,
    NoButton: styled.button`
        padding: 8px 16px;
        background-color: #cccccc;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        box-shadow: 3px 3px 20px 0 rgba(0, 0, 0, 0.1);
        color: black;
    `,
};

export default function Modal_YesNo({
    isOpen,
    title,
    width,
    height,
    content,
    children,
    setIsOpen,
    yesButton,
    noButton,
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
                    <Style.NoButton onClick={noButton.onClick}>{noButton.label}</Style.NoButton>
                    <Style.YesButton onClick={yesButton.onClick}>{yesButton.label}</Style.YesButton>
                </Style.ButtonContainer>
            </Style.Wrapper>
        </ReactModal>
    );
}
