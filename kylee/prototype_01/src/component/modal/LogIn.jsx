import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import { Button, TopMenuButton } from "../ui/Button";
import React, { useState, useEffect } from 'react';
import {loginUser}from "../../_actions/user_action" // 유저 액션 추가

function LogIn() {
  const [isShowingModal, toggleModal] = useModal();
  const [Email, setEmail] = useState(""); // ID 저장 객체
  const [Password, setPassword] = useState(""); // PW 저장 객체
  const onEmailHandler = (event) => { // ID입력이벤트 핸들
    setEmail(event.currentTarget.value);
    }
  const onPasswordHandler = (event) => { // 비번 입력 이벤트 핸들
    setPassword(event.currentTarget.value);
    }
  const onClickLogin = async (e) => { // 로그인 버튼 눌럿을때 loginUser 함수 호출하는 기능
    e.preventDefault()
    let body = {
      email: Email,
      password: Password
    }
    loginUser(body);
  }
  let loginform =
    <form> 
      아이디: <input type="text" value = {Email} name="email" onChange={onEmailHandler}/><br />
      비밀번호: <input type="password" value = {Password} name="pw" onChange={onPasswordHandler} /><br />
      <button type='button' onClick={onClickLogin}>로그인</button>
    </form>;

  return (<>
    <Modal show={isShowingModal} onCloseButtonClick={toggleModal} content={loginform} />
    <TopMenuButton title="로그인" onClick={toggleModal} /></>
  )
}

export default LogIn;
