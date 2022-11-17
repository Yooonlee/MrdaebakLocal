import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DishMenuList from "../ui/DishMenuList";
import Dishes from "../database/Dishes.json"
import Button from "../ui/Button";
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
    //const navigate = useNavigate();
    
    return (
        <>
            <TopMenu>
                {account.id ? <><PrevOrderList /><Cart /><AccMag4Cus /><LogOut /></> : <><LogIn /><SignUp /></>}
            </TopMenu>
            {account.isEmployee ? <TopMenu><EmployeePage /></TopMenu> : <></>}
            <MainPageMenuList>
                <DishMenuList dishes={Dishes} />
            </MainPageMenuList>
        </>
    )
}

export default MainPage;