import React, { useState } from "react";
import PrevOrders from "../database/PrevOrders.json"
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import Button from "../ui/Button";
import styled from "styled-components";

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

function DeliveryStatus(props) {
    const [isShowingModal, toggleModal] = useModal();

    let deliverystatus =
        <Wrapper>
            {PrevOrders.map((prevoder, index) => {
                return (
                    <table>
                        <tr>
                            <td>고객 번호: </td>
                            <td>{prevoder.customernumber}</td>
                        </tr>
                        <tr>
                            <td>시킨 시각: </td>
                            <td>{prevoder.time}</td>
                        </tr>
                        <tr>
                            <td>시킨 음식: </td>
                            <td>{prevoder.dishname}</td>
                        </tr>
                        <tr>
                            <td>시킨 형태: </td>
                            <td>{prevoder.dishstyle}</td>
                        </tr>
                        <tr>
                            <td>현재 상태: </td>
                            <td>{prevoder.status}</td>
                        </tr>
                        <tr>
                            <td>상태 바꾸기: </td>
                            <td><select name="statusChange">
                                <option value="waiting">대기</option>
                                <option value="cooking">조리</option>
                                <option value="delivering">배송</option>
                                <option value="completed">완료</option>
                        </select></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><button type="submit">상태 수정 적용</button></td>
                        </tr>
                    </table>);
            })}
        </Wrapper>;

    return (<>
        <Modal show={isShowingModal} onCloseButtonClick={toggleModal} content={deliverystatus} subUrl="deliverystatus" />
        <Button title="배달 관리" onClick={toggleModal} /></>
    );
}

export default DeliveryStatus;