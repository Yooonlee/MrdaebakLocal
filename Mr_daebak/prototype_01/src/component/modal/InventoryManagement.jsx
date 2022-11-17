import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import Button from "../ui/Button";
import React, { useState } from "react";
import Inventories from "../database/Inventory.json";
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

function InvenMang() {
    const [isShowingModal, toggleModal] = useModal();

    let prevorders =
        <Wrapper>
            {Inventories.map((inventory, index) => {
                return (
                    <table>
                        <tr>
                            <td>이름</td>
                            <td>{inventory.name}</td>
                            <td>수량</td>
                            <td>{inventory.amount}</td>
                        </tr>
                        <tr>
                            <td>이름 변경</td>
                            <td><input type="text" name="name" placeholder={inventory.name} /></td>
                            <td>수량 변경</td>
                            <td><input type="text" name="amount" placeholder={inventory.amount} /></td>
                        </tr>
                        <tr>
                            <td colSpan="4"><Button title="변경" /></td>
                        </tr>
                    </table>
                );
            })}
        </Wrapper>;

    return (<>
        <Modal show={isShowingModal} onCloseButtonClick={toggleModal} content={prevorders} subUrl="inventorymanagement" />
        <Button title="재고 관리" onClick={toggleModal} /></>
    )
}

export default InvenMang;