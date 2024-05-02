import { SetStateAction } from "react";
import React, { ReactNode, useEffect } from "react";
import { Text, FlexBox, Block, Button } from "../../styles/ui";
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
    maxHeight?: string;
    children: ReactNode;
};

const Style = {
    Wrapper: styled.div`
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            display: none;
        }
    `,
    Header: styled.div`
        height: 50.5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 23px;
        /* border-bottom: 1px solid #eee; */
        background-color: white;
        position: sticky;
        top: 0;
    `,
};

export default function BasicModal({ isOpen, title, width, height, maxHeight, children, setIsOpen }: Props) {
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
        <>
            <ReactModal
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        zIndex: "9999999",
                    },
                    content: {
                        outline: "none",
                        margin: "0 auto",
                        marginTop: "320px",
                        padding: 0,
                        width,
                        height,
                        maxHeight: maxHeight ? maxHeight : "600px",
                        border: "solid 1px #d3d3d3",
                        borderRadius: "5px",
                        boxShadow: "3px 3px 20px 0 rgba(0, 0, 0, 0.25)",
                        overflowY: "scroll",
                        backgroundColor: "white",
                    },
                }}
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                className="MODAL"
            >
                <Style.Wrapper>
                    <Style.Header>
                        <Text.MediBodyS color="black">{title}</Text.MediBodyS>
                        <Block.Box onClick={() => setIsOpen(false)} justifyContent="flex-end">
                            <Text.MediBodyS color="black">
                                <Block.Img
                                    background="0"
                                    border="0"
                                    src="/close.png"
                                    alt="close"
                                    width="12px"
                                    style={{ cursor: "pointer" }}
                                />
                            </Text.MediBodyS>
                        </Block.Box>
                    </Style.Header>
                    <FlexBox justifyContents="center" wrap={true}>
                        {children}
                    </FlexBox>
                </Style.Wrapper>
            </ReactModal>
        </>
    );
}
