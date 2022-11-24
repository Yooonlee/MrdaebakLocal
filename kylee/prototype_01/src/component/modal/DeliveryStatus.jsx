import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import { Button, TopMenuButton } from "../ui/Button";
import styled from "styled-components";
import axios from "axios";
import {registerStatus}from "../../_actions/user_action"

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
    const [prev, setPrev] = useState("");
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
        const response = await axios.get("http://localhost:8000/allorderlist");
        console.log(response.data);
        setPrev(response.data);
    };

    useEffect( ()=>{fetchData()} ,[refresh]);

    
    const Prevorderlist = Object.values(prev)?.map((order) => { 
        const onClickChange = (event) => {
            event.preventDefault();
            let body = {
              _id: order._id,
              dinnerMenu: order.dinnerMenu,
              dinnerStyle: order.dinnerStyle,
              status: selectedStatus
              }
              registerStatus(body);
        }
                return (
                    <table style={{ borderBottom: "1px solid #808080" }}>
                        <tr>
                            <td style={{ backgroundColor: "#d3d3d3" }}>주문 음식</td>
                            <td>{order.dinnerMenu}</td>
                            <td style={{ backgroundColor: "#d3d3d3" }}>주문 스타일</td>
                            <td>{order.dinnerStyle}</td>
                        </tr>
                        <tr>
                            <td style={{ backgroundColor: "#d3d3d3" }}>가격</td>
                            <td>{order.price}</td>
                            <td style={{ backgroundColor: "#d3d3d3" }}>개수</td>
                            <td>{order.num}</td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ backgroundColor: "#d3d3d3" }}>주문 상태</td>
                            <td colSpan="2">{order.status}</td>
                        </tr>
                        <tr>
                            <td>상태 바꾸기: </td>
                            <td><select name="statusChange" onChange={onStatusHandler} class="statusoption">
                                <option value="cancled" selected={"cancled" === order.status}>취소</option>
                                <option value="waiting" selected={"waiting" === order.status}>대기</option>
                                <option value="cooking" selected={"cooking" === order.status}>조리</option>
                                <option value="delivering" selected={"delivering" === order.status}>배달</option>
                                <option value="completed" selected={"completed" === order.status}>배달 완료</option>
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