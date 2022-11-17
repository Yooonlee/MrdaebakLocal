import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import Button from "../ui/Button";
import React, { useState } from "react";

function LogIn() {
  const [isShowingModal, toggleModal] = useModal();

  let loginform =
    <form>
      아이디: <input type="text" name="id" /><br />
      비밀번호: <input type="password" name="pw" /><br />
      <button type="submit">로그인</button></form>;

  return (<>
    <Modal show={isShowingModal} onCloseButtonClick={toggleModal} content={loginform} subUrl="login" />
    <Button title="로그인" onClick={toggleModal} /></>
  )
}

export default LogIn;