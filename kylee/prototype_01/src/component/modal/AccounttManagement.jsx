import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import { Button, TopMenuButton } from "../ui/Button";
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
                    <table style={{ borderBottom: "1px solid #808080" }}>
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
                            <td>권한: </td>
                            <td>
                                <select>
                                    <option value="0" selected={userdata.role=="0"}>고객</option>
                                    <option value="1" selected={userdata.role=="1"}>조리원</option>
                                    <option value="2" selected={userdata.role=="2"}>배달원</option>
                                    <option value="3" selected={userdata.role=="3"}>관리자</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2"><button type="submit">수정하기</button></td>
                        </tr>
                    </table>);
            })}
        </Wrapper>;

    return (<>
        <Modal show={isShowingModal} onCloseButtonClick={toggleModal} content={accmag} subUrl="accountmanagement" />
        <TopMenuButton title="고객 정보" onClick={toggleModal} /></>
    )
}

export default AccMag;