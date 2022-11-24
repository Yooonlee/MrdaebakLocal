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
    const [user, setUser] = useState("");
    const [refresh, setRefresh] = useState("");

    const CheckHandler = async (e) =>{
        e.preventDefault();
        setRefresh(!refresh);
    }
    
    const fetchData = async() => {
        const response = await axios.get("http://localhost:8000/allcustomerinfo");
        setUser(response.data);
    };
    useEffect( ()=>{fetchData()} ,[refresh]);
    
    
    const userinfomap = Object.values(user)?.map((value)  => {

        return(<div>
            <table>
                <tr>
                    <td>아이디</td>
                    <td>{value.email}</td>
                </tr>
                <tr>
                    <td>주소</td>
                    <td>{value.address}</td>
                </tr>
                <tr>
                    <td colSpan="4"><Button title="수정하기" /></td>
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
        <TopMenuButton title="모든고객정보" onClick={toggleModal} /></>
    )
}

export default AccMag4Cus;