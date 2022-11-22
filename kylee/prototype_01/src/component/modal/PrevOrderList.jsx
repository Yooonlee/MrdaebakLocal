import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import { Button, TopMenuButton } from "../ui/Button";
import React, { useState } from "react";
import Orders from "../database/PrevOrders.json";
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

function PrevOrderList() {
    const [isShowingModal, toggleModal] = useModal();

    let prevorders =
        <Wrapper>
            {Orders.map((order, index) => {
                return (
                    <table style={{ borderBottom: "1px solid #808080" }}>
                        <tr>
                            <td style={{ backgroundColor: "#d3d3d3" }}>주문 번호</td>
                            <td>{order.id}</td>
                            <td style={{ backgroundColor: "#d3d3d3" }}>주문 시각</td>
                            <td>{order.time}</td>
                        </tr>
                        <tr>
                            <td style={{ backgroundColor: "#d3d3d3" }}>주문 음식</td>
                            <td>{order.dishname}</td>
                            <td style={{ backgroundColor: "#d3d3d3" }}>주문 형태</td>
                            <td>{order.dishstyle}</td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ backgroundColor: "#d3d3d3" }}>주문 상태</td>
                            <td colSpan="2">{order.status}</td>
                        </tr>
                    </table>
                );
            })}
        </Wrapper>;

    return (<>
        <Modal show={isShowingModal} onCloseButtonClick={toggleModal} content={prevorders} subUrl="prevorder" />
        <TopMenuButton title="과거 주문 내역" onClick={toggleModal} /></>
    )
}

export default PrevOrderList;