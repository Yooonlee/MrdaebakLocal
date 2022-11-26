import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import { Button, TopMenuButton } from "../ui/Button";
import React, { useState, useEffect } from "react";
import Carts from "../database/Cart.json";
import {Order}from "../../_actions/user_action"
import {cancelCart}from "../../_actions/user_action"
import axios from "axios";

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
    const [cart, setCart] = useState("");
    const [refresh, setRefresh] = useState("");

    const CheckHandler = async (e) =>{
        e.preventDefault();
        setRefresh(!refresh);
    }
    
    const fetchData = async() => {
        const response = await axios.get("http://localhost:8000/cart");
        setCart(response.data);
    };

    useEffect( ()=>{fetchData()} ,[refresh]);

    const onClickOrder = (event) => {
        event.preventDefault();
        Order(cart);
    }

    const onRemove = (id) => {
        const newcart = cart.filter((cartCon) => cartCon._id !== id);
        console.log(newcart);
        setCart(newcart);
        cancelCart(newcart);
      };
    const cartlist = Object.values(cart)?.map((cartCon) => {
        return(<div>
            <table style={{ borderBottom: "1px solid #e1a43f" }}>
                <tr>
                    <td style={{ backgroundColor: "#ff7f00" }}>주문 음식</td>
                    <td>{cartCon.dinnerMenu}</td>
                    <td style={{ backgroundColor: "#ff7f00" }}>주문 형태</td>
                    <td>{cartCon.dinnerStyle}</td>
                 </tr>
                 <tr>
                    <td style={{ backgroundColor: "#ff7f00" }}>주문 수량</td>
                    <td>{cartCon.num}</td>
                    <td style={{ backgroundColor: "#ff7f00" }}>주문 가격</td>
                    <td>{cartCon.price}</td>
                </tr>
                <tr>
                    <td colSpan="4"><Button title="취소" onClick={() =>  {
                        console.log(cartCon._id);
                        if (window.confirm(`${cartCon.dinnerMenu}를 정말 삭제하시겠습니까?`)){
                            onRemove(cartCon._id)
                        }; 
                        }} /></td>
                </tr>
            </table>
        </div>)
    })
    let carts =
        <Wrapper>
            {cartlist}
            <Button title="결제" onClick={onClickOrder} />
            <Button title="확인"onClick={CheckHandler}/>
        </Wrapper>;

    return (<>
        <Modal show={isShowingModal} onCloseButtonClick={toggleModal} content={carts} subUrl="carts" />
        <TopMenuButton title="장바구니" onClick={toggleModal} /></>
    )
}

export default Cart;