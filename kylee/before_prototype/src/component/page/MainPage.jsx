import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DishMenuList from "../ui/DishMenuList";
import Dishes from "../database/Dishes.json"
import {Button} from "../ui/Button";
import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import "../ui/Modal.css";
import LogIn from "../modal/LogIn";
import LogOut from "../ui/LogOut";
import SignUp from "../modal/SignUp";
import PrevOrderList from "../modal/PrevOrderList";
import Cart from "../modal/Cart";
import AccMag4Cus from "../modal/AccountManagement4Customer";
import EmployeePage from "./EmployeePage";
import account from "../database/Account.json"
import {useCustomerinfo} from "../../_actions/user_action" 
import axios from "axios";
import VoiceReconize from "../modal/VoiceReconize"


const TopMenu = styled.div`
    padding: 16px;
    width: clac(100% - 32px);
    background-color: red;
    display: flex;
    flex-direction: row;
    align-item: center;
    justify-content: center;
`;

const MainPageMenuList = styled.div`
    padding-top: 50px;
    width: 80%;
    margin-left:auto; 
    margin-right:auto;
    margin-bottom:100px;
`;

function MainPage(props) {
    const { } = props;
    const [user, setUser] = useState("");
    const [refresh, setRefresh] = useState("");

    const CheckHandler = async (e) =>{
        e.preventDefault();
        setRefresh(!refresh);
    }

    //const navigate = useNavigate();
    const fetchData = async() => {
        const response = await axios.get("http://localhost:8000/customerinfo");
        setUser(response.data);
    };

    useEffect( ()=>{fetchData()} ,[refresh]);
    console.log(user.role);
    return (
        <>
            <TopMenu>
                <img src={require("../image/mrdaebak_logo.png")} height="50px" style={{ position: "absolute", top: "0.5rem", left: "20rem" }} />
                { user.token ?  <><PrevOrderList /><Cart /><AccMag4Cus /><LogOut /><VoiceReconize /></> : <><LogIn /><SignUp /></>}
                <Button title="확인"onClick={CheckHandler}/>
            </TopMenu>
            { user.role !== 0 ? <TopMenu><EmployeePage role={user.role} /></TopMenu> : <></>}
            <MainPageMenuList>
                <DishMenuList dishes={Dishes} isLogedin={user.token} />
            </MainPageMenuList>
        </>
    )
}

export default MainPage;