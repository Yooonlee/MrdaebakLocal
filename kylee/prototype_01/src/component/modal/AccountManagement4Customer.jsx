import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import { Button, TopMenuButton } from "../ui/Button";
import React, { useState, useEffect } from "react";
import axios from "axios";
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

function AccMag4Cus() {
    const [isShowingModal, toggleModal] = useModal();
    const [cart, setCart] = useState("");
    const [refresh, setRefresh] = useState("");

    
    const fetchData = async() => {
        const response = await axios.get("http://localhost:8000/customerinfo");
        setCart(response.data);
    };

    useEffect( ()=>{fetchData()} ,[refresh]);

    const CheckHandler = async (e) =>{
        e.preventDefault();
        setRefresh(!refresh);
    }
    const userinfomap = Object.keys(cart)?.map((key,  i)  => {
        console.log(subject.email);
        return(<div>
            <table>
                <tr>
                    <td>아이디: </td>
                    <td>{value}</td>
                </tr>
                <tr>
                    <td>비밀번호: </td>
                    <td><input type="password" name="pw" placeholder={value.password} /></td>
                </tr>
                <tr>
                    <td>주소: </td>
                    <td><input type="address" name="address" placeholder={value.address} /></td>
                </tr>
                <tr>
                    <td colSpan="2"><button type="submit">수정하기</button></td>
                </tr>
            </table>
        </div>);
    });
    let userinfo =
        <Wrapper>
            {userinfomap}
            <Button title="새로고침"onClick={CheckHandler}/>
        </Wrapper>;

    return (<>
        <Modal show={isShowingModal} onCloseButtonClick={toggleModal} content={userinfo} subUrl="myaccount" />
        <TopMenuButton title="나의정보" onClick={toggleModal} /></>
    )
}

export default AccMag4Cus;