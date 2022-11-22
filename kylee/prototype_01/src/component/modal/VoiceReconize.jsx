import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import styled from "styled-components";
import SpeechRecognition from 'react-speech-recognition'
import { useState } from "react";
import Dishes from "../database/Dishes.json"
import * as GV from "../GlobalVariable.jsx"
import { addOrder } from "../../_actions/user_action"

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
    const [msg, setMsg] = useState("주문하실 음식을 말씀해 주세요.");
    const [final, setFinal] = useState("주문하실 음식을 말씀해 주세요.");
    const [isEnd, setIsEnd] = useState(false);
    let dishname;
    let dishstyle;
    let dishamount;

    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    var SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
    var SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

    const menu = Dishes.map((dish, index) => dish.name);
    const style = Object.values(GV);

    var recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'ko-KR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function (event) {
        setFinal(event.results[0][0].transcript);
        console.log(event.results);
    }

    if (isShowingModal) {
        recognition.start();
        console.log(final);
        if (final == '스파게티') {
            dishname = final;
            setFinal(`${dishname}(을)를 주문하시겠습니까?<br />맞으면 예를, 아니면 주문하실 음식 이름을 말해주세요.`);
            if (final == '예') {
                setFinal(`${dishname}의 형태를 말씀해주세요. 보통, 고급, 호화가 있습니다.`);
                dishstyle = final;
                setFinal(`${dishstyle}로 주문하시겠습니까?<br />맞으면 예를, 아니면 주문하실 음식 형태를 말해주세요.`);
                if (final == '예') {
                    setFinal(`${dishname}에 ${dishstyle}로 주문합니다.<br />맞으면 예를, 아니면 아니오를 말해주세요.`);
                    if (final == '예') { recognition.stop(); }
                }
            }
        }
    }

    if (!isShowingModal) { recognition.stop(); };

    const voicereconize = final;

    return (<>
        <Modal show={isShowingModal} onCloseButtonClick={toggleModal} content={voicereconize} subUrl="voicereconize" title="음성인식" />
        <Mike onClick={toggleModal}>🎤</Mike>
    </>);
}

export default VoiceReconize;
