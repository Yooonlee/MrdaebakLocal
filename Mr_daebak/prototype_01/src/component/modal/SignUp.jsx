import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import Button from "../ui/Button";
import React, { useState } from "react";

function SignUp() {
  const [isShowingModal, toggleModal] = useModal();

  let signupform =
    <form>
      아이디: <input type="text" name="id" /><br />
      비밀번호: <input type="password" name="pw" /><br />
      주소: <input type="address" name="address"  /><br />
      전자우편: <input type="text" name="email"  /><br />
      전화번호: <input type="phone" name="phone"  /><br />
      <button type="submit">가입하기</button></form>;

  return (<>
    <Modal show={isShowingModal} onCloseButtonClick={toggleModal} content={signupform} subUrl="signup" />
    <Button title="회원가입" onClick={toggleModal} /></>
  )
}

export default SignUp;