import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import Button from "../ui/Button";
import React, { useState } from "react";
import styled from "styled-components";
import UserDatas from "../database/FullAccount.json"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-item: center;
    justify-content: space-around;
    
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

function AccMag() {
    const [isShowingModal, toggleModal] = useModal();

    let accmag =
        <Wrapper>
            {UserDatas.map((userdata, index) => {
                return (
                    <table>
                        <tr>
                            <td>이름: </td>
                            <td><input type="text" name="name" placeholder={userdata.pw} /></td>
                        </tr>
                        <tr>
                            <td>아이디: </td>
                            <td><input type="text" name="id" placeholder={userdata.id} /></td>
                        </tr>
                        <tr>
                            <td>비밀번호: </td>
                            <td><input type="password" name="pw" placeholder={userdata.pw} /></td>
                        </tr>
                        <tr>
                            <td>주소: </td>
                            <td><input type="address" name="address" placeholder={userdata.address} /></td>
                        </tr>
                        <tr>
                            <td>전자우편: </td>
                            <td><input type="text" name="email" placeholder={userdata.email} /></td>
                        </tr>
                        <tr>
                            <td>전화번호: </td>
                            <td><input type="phone" name="phone" placeholder={userdata.phone} /></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><button type="submit">수정하기</button></td>
                        </tr>
                    </table>);
            })}
        </Wrapper>;

    return (<>
        <Modal show={isShowingModal} onCloseButtonClick={toggleModal} content={accmag} subUrl="accountmanagement" />
        <Button title="고객 정보" onClick={toggleModal} /></>
    )
}

export default AccMag;