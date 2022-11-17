import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import Button from "../ui/Button";
import React, { useState } from "react";
import Carts from "../database/Cart.json";
import styled from "styled-components";
import Pay from "./Pay";

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

function Cart() {
    const [isShowingModal, toggleModal] = useModal();

    let carts =
        <Wrapper>
            {Carts.map((cart, index) => {
                return (
                    <table>
                        <tr>
                            <td>주문 음식</td>
                            <td>{cart.dishname}</td>
                            <td>주문 형태</td>
                            <td>{cart.dishstyle}</td>
                        </tr>
                        <tr>
                            <td colSpan="4"><Button title="취소" /></td>
                        </tr>
                    </table>
                );
            })}
            <Pay />
        </Wrapper>;

    return (<>
        <Modal show={isShowingModal} onCloseButtonClick={toggleModal} content={carts} subUrl="carts" />
        <Button title="장바구니" onClick={toggleModal} /></>
    )
}

export default Cart;