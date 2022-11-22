import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import styled from "styled-components";

function VoiceReconize() {
    const Mike = styled.button`
position: fixed;
bottom: 20px;
background-color: transparent;
margin-left: auto;
margin-right: auto;
font-size: 5rem;
font-weight: bold;
height: 10rem;
width: 10rem;
border-radius: 5rem;
:hover {
transform: scale(1.2);
background-color: #50bcdf;
}
`;

    const [isShowingModal, toggleModal] = useModal();

    //const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    //const recognition = new SpeechRecognition();
    //recognition.lang = "ko-KR";
    //recognition.interimResults = true;
    //recognition.maxAlternatives = 10000;

    //recognition.onresult

    const voicereconize = <div>assad</div>

    return (<>
        <Modal show={isShowingModal} onCloseButtonClick={toggleModal} content={voicereconize} subUrl="voicereconize" title="음성인식" />
        <Mike onClick={toggleModal}>🎤</Mike>
    </>);
}

export default VoiceReconize;