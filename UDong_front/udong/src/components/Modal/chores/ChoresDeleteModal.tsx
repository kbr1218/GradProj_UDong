// ChoresDeleteModal.tsx
import Modal from "../../../utils/modal/Modal_YesNo";
import { deleteChores } from "../../../api/chores/deleteChores";
import { getChores } from "../../../api/chores/getChores";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    choresId: number;
    chores: string;
}

export default function ChoresDeleteModal({ isOpen, setIsOpen, choresId, chores }: Props) {
    const handleDeleteChore = async () => {
        try {
            await deleteChores(choresId);
            setIsOpen(false);
            window.location.reload(); //새고
        } catch (error) {
            console.error("Error while deleting chores", error);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="집안일 삭제하기"
            width="320px"
            height="180px"
            content={<>[{chores}] 삭제하시겠습니까?</>}
            yesButton={{ label: "삭제하기", onClick: handleDeleteChore, buttonStyle: null }}
            noButton={{ label: "취소", onClick: handleClose, buttonStyle: null }}
        />
    );
}
