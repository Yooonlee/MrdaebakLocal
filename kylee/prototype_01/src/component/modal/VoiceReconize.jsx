import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import styled from "styled-components";
//import SpeechRecognition from 'react-speech-recognition'
import { useState } from "react";
import Dishes from "../database/Dishes.json";
import {styleDic} from "../GlobalVariable.jsx";
import { addOrder } from "../../_actions/user_action";

const menu = Dishes.map((dish, index) => dish.name);
const style = Object.values(styleDic);
let dishinfo;

let dishname = [];
let dishstyle = [];
let firstanswer;
let secondanswer;
let temp;
let msg = `주문 가능 음식\n${menu}\n주문하실 음식을 말씀해 주세요.\n취소하려면 아래 닫기를 눌러주세요.`;
let sum;
let body;

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
    //const [msg, setMsg] = useState("주문하실 음식을 말씀해 주세요.");
    const [final, setFinal] = useState("");

    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;

    var recognition = new SpeechRecognition();
    if (SpeechGrammarList) {
        // SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
        // This code is provided as a demonstration of possible capability. You may choose not to use it.
        var speechRecognitionList = new SpeechGrammarList();
        var grammar = menu.join(' | ') + ' | ' + style.join(' | ') + ';'
        speechRecognitionList.addFromString(grammar, 1);
        recognition.grammars = speechRecognitionList;
    }
    recognition.continuous = true;
    recognition.lang = 'ko-KR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function (event) {
        setFinal(event.results[0][0].transcript);
    }

    if (isShowingModal) {
        recognition.start();
        A();
    }
    function A() {
        if (menu.includes(final)) {
            dishname.push(final);
            msg = `${dishname[0]}의 형태를 말씀해주세요.\n보통, 고급, 호화가 있습니다.\n
            샴페인 축제 디너에는 보통 형태가 없습니다.\n
            취소하려면 아래 닫기를 눌러주세요.\n`;
        }

        if ((style.includes(final)) && (menu.includes(dishname[0]))) {
            dishstyle.push(final);
            if (dishstyle[0] == '보통' && dishname[0] == '샴페인 축제 디너') {
                dishstyle = [];
            } else {
                B();
            }
        }

        function B() {
            Add();
            msg = `${dishname[0]}에 ${dishstyle[0]}(으)로 주문합니다.\n잠시 기다려 주십시오.`;
            setTimeout(() => { toggleModal(); }, 5000);
            recognition.stop();
            window.location.reload();
        }
    }

    function Add() {
        dishinfo = Dishes.find((item) => { return item.name == dishname[0]; });
        sum = eval("dishinfo.price" + dishstyle[0]);
        body = {
         dinnerMenu: dishname[0],
         price: sum,
         dinnerStyle: dishstyle[0],
         num: 1
        };
        addOrder(body).payload
        .catch(err => {
            console.log(err);
          });
        }

    return (<>
        <Modal show={isShowingModal} onCloseButtonClick={toggleModal} content={msg} subUrl="voicereconize" title="음성인식" />
        <Mike onClick={toggleModal}>🎤</Mike>
    </>);
}

export default VoiceReconize;