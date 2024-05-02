// GoToLoginModal.tsx
import { useNavigate } from "react-router-dom";
import Modal from "../../../utils/modal/Modal_YesNo";
import { postLogout } from "../../../api/login/postLogout";

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleGoToLogin: () => void;
}

export default function GoToLoginModal({ isOpen, setIsOpen }: Props) {
    const navigate = useNavigate();

    const handleGoToLogin = async () => {
        await postLogout();
        navigate("/");
    };

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="🦦"
            width="320px"
            height="180px"
            content="로그인 화면으로 돌아갑니다."
            yesButton={{ label: "예", onClick: handleGoToLogin, buttonStyle: null }}
            noButton={{ label: "아니오", onClick: () => setIsOpen(false), buttonStyle: null }}
        />
    );
}
