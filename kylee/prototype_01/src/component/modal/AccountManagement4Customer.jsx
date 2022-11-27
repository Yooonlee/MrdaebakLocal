import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import { Button, TopMenuButton } from "../ui/Button";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import {changeCustomerinfo}from "../../_actions/user_action"


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





function AccMag4Cus() {
    const [isShowingModal, toggleModal] = useModal();
    const [user, setUser] = useState("");
    const [refresh, setRefresh] = useState("");
    const [formdata, setFormdata] = useState({
        emailOri:"",
        email : "",
        address : "",
    });
    const { email, address } = formdata; // 비구조화 할당을 통해 값 추출

    const CheckHandler = async (e) =>{
        e.preventDefault();
        setRefresh(!refresh);
    };
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormdata({   
                ...formdata,
            [name] : value,
        });
    };
    const fetchData = async() => {
        const response = await axios.get("http://localhost:8000/customerinfo");
        setUser(response.data);
    };
    useEffect( ()=>{fetchData()} ,[refresh]);

    const userinfomap = Object.values(user)?.map((value)  => {
        const onClickChange = (event) => {
            
            event.preventDefault();
            let body = formdata;
            changeCustomerinfo(body);
        }
        formdata.emailOri = value.email;
        return(<div>
            <table>
                <tr>
                    <td>이름</td>
                    <td>{value.email}</td>
                </tr>
                <tr>
                    <td>이름 변경</td>
                    <td><input type="text" name="email"  value = {email}
                    onChange = {handleChange} /></td>
                </tr>
                <tr>
                    <td>주소</td>
                    <td>{value.address}</td>
                </tr>
                <tr>
                    <td>주소 변경</td>
                    <td><input type="text" name="address"  value = {address} 
                    onChange = {handleChange} /></td>
                </tr>
                <tr>
                    <td>단골손님여부</td>
                    <td>{value.isVip}</td>
                </tr>
                <tr>
                    <td colSpan="4"><Button title="수정하기" onClick = {onClickChange}/></td>
                </tr>
            </table>
        </div>)
    })
    let userinfo =
        <Wrapper>
            {userinfomap}
            <Button title="새로고침"onClick={CheckHandler}/>
        </Wrapper>;

    return (<>
        <Modal show={isShowingModal} onCloseButtonClick={toggleModal} content={userinfo}  />
        <TopMenuButton title="내 정보" onClick={toggleModal} /></>
    )
}

export default AccMag4Cus;