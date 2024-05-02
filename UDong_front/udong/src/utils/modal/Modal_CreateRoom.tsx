// Modal_OK.tsx
import { SetStateAction, ReactNode } from "react";
import { Text, FlexBox } from "../../styles/ui";
import ReactModal from "react-modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { postLogout } from "../../api/login/postLogout";

export type ModalProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
    onConfirm: () => void;
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `,
    ContentWrapper: styled.div`
        width: 100%;
        height: 100%;
        overflow-y: auto;
    `,
    Header: styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        background-color: white;
    `,
    Title: styled(Text.BoldTitleS)`
        font-weight: bold;
        padding-top: 12px;
    `,
    Content: styled.div`
        margin-bottom: 8px;
        padding: 14px;
        color: #666a73;
        font-size: 15px;
        line-height: 1.3;
        text-align: center;
    `,
    ConfirmButton: styled.button`
        margin-bottom: 8px;
        padding: 8px 16px;
        background-color: #398ab9;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        box-shadow: 3px 3px 20px 0 rgba(0, 0, 0, 0.1);
    `,
};

export default function Modal_OK({ isOpen, title, width, height, content, children, setIsOpen, onConfirm }: Props) {
    const navigate = useNavigate();

    const handleGoReLogin = async () => {
        await postLogout();
        setIsOpen(false);
        navigate("/");
    };
    return (
        <>
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
                    <Style.ConfirmButton onClick={handleGoReLogin}>확인</Style.ConfirmButton>
                </Style.Wrapper>
            </ReactModal>
        </>
    );
}
