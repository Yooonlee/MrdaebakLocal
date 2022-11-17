import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import Button from "../ui/Button";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {loginUser}from "../../_actions/user_action" // 유저 액션 추가

function LogIn() {
  const [isShowingModal, toggleModal] = useModal();
  const [ID, setID] = useState(""); // ID 저장 객체
  const [Password, setPassword] = useState(""); // PW 저장 객체
  const onIDHandler = (event) => { // ID입력이벤트 핸들
    setID(event.currentTarget.value);
    }
  const handleSubmit = e => {
    e.preventDefault()
  }
  const onPasswordHandler = (event) => { // 비번 입력 이벤트 핸들
    setPassword(event.currentTarget.value);
    }
  const onClickLogin = () => { // 로그인 버튼 눌럿을때 loginUser 함수 호출하는 기능
      loginUser(null)
  }
  let loginform =
    <form onSubmit={handleSubmit}> 
      아이디: <input type="text" value = {ID} name="id" onChange={onIDHandler}/><br />
      비밀번호: <input type="password" value = {Password} name="pw" onChange={onPasswordHandler} /><br />
      <button type='button' onClick={onClickLogin}>로그인</button>
    </form>;

  return (<>
    <Modal show={isShowingModal} onCloseButtonClick={toggleModal} content={loginform} />
    <Button title="로그인" onClick={toggleModal} /></>
  )
}

export default LogIn;
