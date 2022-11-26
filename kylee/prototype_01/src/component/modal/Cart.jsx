import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import { Button, TopMenuButton } from "../ui/Button";
import React, { useState, useEffect } from "react";
import Carts from "../database/Cart.json";
import {Order}from "../../_actions/user_action"
import {cancelCart}from "../../_actions/user_action"
import axios from "axios";
import {registerStatus2}from "../../_actions/user_action"

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
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedNum, setNumStatus] = useState("");
    const [refresh, setRefresh] = useState("");
    // const [formdata, setFormdata] = useState({
    //     _id: "", 
    //     num: "",
    //     dinnerStyle: "",
    // });
    // const { _id, num, dinnerStyle } = formdata; // 비구조화 할당을 통해 값 추출


    const CheckHandler = async (e) =>{
        e.preventDefault();
        setRefresh(!refresh);
    }
    const onStatusHandler = (event) => {
        setSelectedStatus(event.currentTarget.value)
        }
    const onNumHandler = (event) => {
        setNumStatus(event.currentTarget.value)
        }
    // const onStatusHandler = (event) => {
    //     const {name, value} = event.target;
    //     setFormdata({   
    //             ...formdata,
    //         [name] : value,
    //         });
    //     }
    //삭제
    const onRemove = (id) => {
        const newcart = cart.filter((cartCon) => cartCon._id !== id);
        console.log(newcart);
        setCart(newcart);
        cancelCart(newcart);
      };
    //불러와서 보여주기
    const fetchData = async() => {
        const response = await axios.get("http://localhost:8000/cart");
        setCart(response.data);
    };

    useEffect( ()=>{fetchData()} ,[refresh]);
    //주문하기
    const onClickOrder = (event) => {
        event.preventDefault();
        Order(cart);
    };

    
    const cartlist = Object.values(cart)?.map((cartCon) => {
        //수정하기
        const onClickChange = (event) => {
            event.preventDefault();
            let body = {
                _id: cartCon._id,
                dinnerStyle: selectedStatus,
                num: selectedNum,
                }
            registerStatus2(body);
        }
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
                      <td>스타일 바꾸기: </td>
                      <td><select name="dinnerStyle" onChange={onStatusHandler} class="statusoption">
                        <option value="simple" selected={"simple" === cartCon.dinnerStyle}>보통</option>
                        <option value="grand" selected={"grand" === cartCon.dinnerStyle}>고급</option>
                       <option value="delux" selected={"delux" === cartCon.dinnerStyle}>호화</option>
                        </select>
                      </td>
                </tr>
                <tr>
                    <td>수량 변경</td>
                    <td><input type="text" name="num" onChange={onNumHandler}    /></td>
                </tr>
                <tr>
                    <td colSpan="4"><Button title="취소" onClick={() =>  {
                        console.log(cartCon._id);
                        if (window.confirm(`${cartCon.dinnerMenu}를 정말 삭제하시겠습니까?`)){
                            onRemove(cartCon._id)
                        }; 
                        }} /></td>
                </tr>
                <tr>
                  <td colSpan="2"><button type="submit" onClick = {onClickChange}>상태 수정 적용</button></td>
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