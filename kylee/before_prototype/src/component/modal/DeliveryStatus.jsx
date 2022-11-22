import React, { useState, useEffect } from "react";
import PrevOrders from "../database/PrevOrders.json"
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import { Button, TopMenuButton } from "../ui/Button";
import styled from "styled-components";
import axios from "axios";
import {registerStatus}from "../../_actions/user_action"
import * as GV from "../GlobalVariable.jsx"

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
    const [prevOrder, setPrevOrder] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [refresh, setRefresh] = useState("");

    const CheckHandler = async (e) =>{
        e.preventDefault();
        setRefresh(!refresh);
    }
    const onStatusHandler = (event) => {
        setSelectedStatus(event.currentTarget.value)
        }
    const fetchData = async() => {
        const response = await axios.get("http://localhost:8000/deliver");
        setPrevOrder(response.data);
        
    };

    useEffect( ()=>{fetchData()} ,[refresh]);

    
    const Prevorderlist = Object.values(PrevOrders)?.map((prevoderCon) => { //PrevOrders 대신 prevOrder 넣어야 함
        const onClickChange = (event) => {
            event.preventDefault();
            let body = {
              id: prevoderCon.customernumber,
              time: prevoderCon.time,
              dinnerMenu: prevoderCon.dishname,
              dinnerStyle: prevoderCon.dishstyle,
              status: selectedStatus
              }
              registerStatus(body);
        }
                return (
                    <table style={{ borderBottom: "1px solid #808080" }}>
                        <tr>
                            <td>고객 번호: </td>
                            <td>{prevoderCon.customernumber}</td>
                        </tr>
                        <tr>
                            <td>시킨 시각: </td>
                            <td>{prevoderCon.time}</td>
                        </tr>
                        <tr>
                            <td>시킨 음식: </td>
                            <td>{prevoderCon.dishname}</td>
                        </tr>
                        <tr>
                            <td>시킨 형태: </td>
                            <td>{GV.styleDic[prevoderCon.dishstyle]}</td>
                        </tr>
                        <tr>
                            <td>현재 상태: </td>
                            <td>{GV.styleDic[prevoderCon.status]}</td>
                        </tr>
                        <tr>
                            <td>상태 바꾸기: </td>
                            <td><select name="statusChange" onChange={onStatusHandler} class="statusoption">
                                <option value="cancled" selected={"cancled" == prevoderCon.status}>취소</option>
                                <option value="waiting" selected={"waiting" == prevoderCon.status}>대기</option>
                                <option value="cooking" selected={"cooking" == prevoderCon.status}>조리</option>
                                <option value="delivering" selected={"delivering" == prevoderCon.status}>배달</option>
                                <option value="completed" selected={"completed" == prevoderCon.status}>배달 완료</option>
                        </select></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><button type="submit" onClick = {onClickChange}>상태 수정 적용</button></td>
                        </tr>
                    </table>);
            })
    let deliverystatus =
        <Wrapper>
            {Prevorderlist}
            <Button title="확인" onClick={CheckHandler} />
        </Wrapper>;

    return (<>
        <Modal show={isShowingModal} onCloseButtonClick={toggleModal} content={deliverystatus} subUrl="deliverystatus" />
        <TopMenuButton title="배달 관리" onClick={toggleModal} /></>
    );
}

export default DeliveryStatus;