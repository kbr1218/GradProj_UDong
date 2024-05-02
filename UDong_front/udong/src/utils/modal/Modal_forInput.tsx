// Modal_forInput.tsx
import { SetStateAction, useEffect } from "react";
import { Text, FlexBox } from "../../styles/ui_forInput";
import ReactModal from "react-modal";
import styled from "styled-components";

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
    Wrapper: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        overflow: hidden;
        padding: 10px 0 0 0;
    `,
    ContentWrapper: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    `,
    Header: styled.div<{ width: string }>`
        height: 50.5px;
        width: ${({ width }) => width};
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 23px;
        background-color: white;
        position: sticky;
        top: 0;
        border-bottom: none;
        border-radius: 10px;
    `,
    Title: styled(Text.MediBodyS)`
        font-weight: bold;
        padding-top: 12px;
        text-align: center;
        flex: 1;
    `,
    ButtonWrapper: styled(FlexBox)`
        width: 100%;
        justify-content: center;
        margin-bottom: 30px;
    `,
    GoBackButton: styled.button`
        border: none;
        background: none;
        padding: 0;
        cursor: pointer;
        margin-left: 6px;
        margin-top: 6px;
    `,
};

export default function Modal_forInput({ isOpen, title, width, height, children, setIsOpen }: Props) {
    useEffect(() => {
        const handleClose = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleClose);
        }

        return () => {
            window.removeEventListener("keydown", handleClose);
        };
    }, [isOpen, setIsOpen]);

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
                    borderRadius: "10px",
                    boxShadow: "3px 3px 20px 0 rgba(0, 0, 0, 0.25)",
                    backgroundColor: "white",
                },
            }}
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            className="MODAL"
        >
            <Style.Wrapper>
                <Style.ContentWrapper>
                    <Style.Header width={width}>
                        <Style.GoBackButton onClick={() => setIsOpen(false)}>
                            <Text.MediBodyS color="black">
                                <img src="goBack.png" alt="go back" width="18px" style={{ cursor: "pointer" }} />
                            </Text.MediBodyS>
                        </Style.GoBackButton>
                        <Style.Title color="black">{title}</Style.Title>
                    </Style.Header>
                    {children}
                    <Style.ButtonWrapper>{children}</Style.ButtonWrapper>
                </Style.ContentWrapper>
            </Style.Wrapper>
        </ReactModal>
    );
}
