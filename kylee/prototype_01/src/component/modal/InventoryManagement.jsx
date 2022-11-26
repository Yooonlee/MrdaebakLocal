import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import { Button, TopMenuButton } from "../ui/Button";
import React, { useState, useEffect } from "react";
import Inventories from "../database/Inventory.json";
import styled from "styled-components";
import axios from "axios";
import {registerInven}from "../../_actions/user_action"

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
    const [inven, setInven] = useState("");
    const [formdata, setFormdata] = useState({
        coffee : 0,
        wine : 0,
        shamp : 0,
        steak : 0,
        salad : 0,
        egg : 0,
        bacon : 0,
        bread : 0,
        baguette : 0,
    });
    const { coffee, wine, shamp, steak, salad, egg, bacon, bread, baguette } = formdata; // 비구조화 할당을 통해 값 추출

    const [refresh, setRefresh] = useState("");

    const CheckHandler = async (e) =>{
        e.preventDefault();
        setRefresh(!refresh);
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormdata({   
                ...formdata,
            [name] : value,
            });
    }
    const fetchData = async() => {
        const response = await axios.get("http://localhost:8000/inventory");
        setInven(response.data);
    };

    useEffect( ()=>{fetchData()} ,[refresh]);

    
    const Invenlist = Object.values(inven)?.map((invenCon) => { 
        const onClickChange = (event) => {
            
            event.preventDefault();
            let body = formdata;
            registerInven(body);
        }
        return (
        <div>
            <table style={{ borderBottom: "1px solid #808080" }}>
                <tr>
                    <td>이름</td>
                    <td>커피</td>
                    <td>수량</td>
                    <td>{invenCon.coffee}</td>
                </tr>
                <tr>
                    <td>수량 변경</td>
                    <td><input type="text" name="coffee"  value = {coffee}
                    onChange = {handleChange} /></td>
                </tr>
                <tr>
                    <td>이름</td>
                    <td>와인</td>
                    <td>수량</td>
                    <td>{invenCon.wine}</td>
                </tr>
                <tr>
                    <td>수량 변경</td>
                    <td><input type="text" name="wine"  value = {wine} 
                    onChange = {handleChange} /></td>
                </tr>
                <tr>
                    <td>이름</td>
                    <td>샴페인</td>
                    <td>수량</td>
                    <td>{invenCon.shamp}</td>
                </tr>
                <tr>
                    <td>수량 변경</td>
                    <td><input type="text" name="shamp"  value = {shamp} 
                    onChange = {handleChange} /></td>
                </tr>
                <tr>
                    <td>이름</td>
                    <td>스테이크</td>
                    <td>수량</td>
                    <td>{invenCon.steak}</td>
                </tr>
                <tr>
                    <td>수량 변경</td>
                    <td><input type="text" name="steak"  value = {steak} 
                    onChange = {handleChange} /></td>
                </tr>
                <tr>
                    <td>이름</td>
                    <td>샐러드</td>
                    <td>수량</td>
                    <td>{invenCon.salad}</td>
                </tr>
                <tr>
                    <td>수량 변경</td>
                    <td><input type="text" name="salad"  value = {salad} 
                    onChange = {handleChange} /></td>
                </tr>
                <tr>
                    <td>이름</td>
                    <td>계란</td>
                    <td>수량</td>
                    <td>{invenCon.egg}</td>
                </tr>
                <tr>
                    <td>수량 변경</td>
                    <td><input type="text" name="egg"  value = {egg} 
                    onChange = {handleChange} /></td>
                </tr>
                <tr>
                    <td>이름</td>
                    <td>베이컨</td>
                    <td>수량</td>
                    <td>{invenCon.bacon}</td>
                </tr>
                <tr>
                    <td>수량 변경</td>
                    <td><input type="text" name="bacon"  value = {bacon} 
                    onChange = {handleChange} /></td>
                </tr>
                <tr>
                    <td>이름</td>
                    <td>빵</td>
                    <td>수량</td>
                    <td>{invenCon.bread}</td>
                </tr>
                <tr>
                    <td>수량 변경</td>
                    <td><input type="text" name="bread"  value = {bread} 
                    onChange = {handleChange} /></td>
                </tr>
                <tr>
                    <td>이름</td>
                    <td>바게트</td>
                    <td>수량</td>
                    <td>{invenCon.baguette}</td>
                </tr>
                <tr>
                    <td>수량 변경</td>
                    <td><input type="text" name="baguette"  value = {baguette} 
                    onChange = {handleChange} /></td>
                </tr>
                <tr>
                    <td colSpan="4"><Button title="변경" onClick = {onClickChange}/></td>
                </tr>
            </table>
        </div>)
        })
    let prevorders =
        <Wrapper>
            {Invenlist}
            <Button title="확인" onClick={CheckHandler} />
        </Wrapper>;

    return (<>
        <Modal show={isShowingModal} onCloseButtonClick={toggleModal} content={prevorders} subUrl="inventorymanagement" />
        <TopMenuButton title="재고 관리" onClick={toggleModal} />
        
        </>
    )
}

export default InvenMang;