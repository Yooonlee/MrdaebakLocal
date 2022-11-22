import styled from "styled-components";
import { Button, TopMenuButton } from "./Button"

const Modal = styled.div`
    padding: 8px 16px;
    font-size: 16px;
    border-width: 1px;
    border-radius: 8px;
    cursor: pointer;
`;

function Modal2(props) {
    const { content } = props;

    return <Modal onClick={onClick}>{title || "이름 지정 안됨"}</Modal>;
}

export default Modal2;