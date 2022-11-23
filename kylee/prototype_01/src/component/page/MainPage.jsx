import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DishMenuList from "../ui/DishMenuList";
import Dishes from "../database/Dishes.json"
import {Button} from "../ui/Button";

import "../ui/Modal.css";
import LogIn from "../modal/LogIn";
import LogOut from "../ui/LogOut";
import SignUp from "../modal/SignUp";
import PrevOrderList from "../modal/PrevOrderList";
import Cart from "../modal/Cart";
import AccMag4Cus from "../modal/AccountManagement4Customer";
import EmployeePage from "./EmployeePage";

import axios from "axios";
import VoiceReconize from "../modal/VoiceReconize"


const TopMenu = styled.div`
    padding: 16px;
    width: clac(100% - 32px);
    background-color: #e20c32;
    display: flex;
    flex-direction: row;
    align-item: center;
    justify-content: center;
`;
 
const MangingMenu = styled.div`
     padding: 16px;
     width: clac(100% - 32px);
    background-color: #00d4fa;
     display: flex;
     flex-direction: row;
     align-item: center;
     justify-content: center;
     margin-bottom:100px;
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
        console.log(response.data[0]);
        setUser(response.data[0]);
    };
    useEffect( ()=>{fetchData()} ,[refresh]);    

    return (
        <>
            <TopMenu>
                <img src={require("../image/mrdaebak_logo.png")} height="50px" style={{ position: "absolute", top: "0.5rem", left: "20rem" }} />
                { (user.token != null)  && (user.role != 77)  ?  <><PrevOrderList /><Cart /><AccMag4Cus /><LogOut /><VoiceReconize /></> : <><LogIn /><SignUp /></>}
                <Button title="확인"onClick={CheckHandler}/>
            </TopMenu>
            { user.role > 0 ? <MangingMenu><EmployeePage role={user.role} /></MangingMenu> : <></>}
            <MainPageMenuList>
                <DishMenuList dishes={Dishes} isLogedin={user.token} />
            </MainPageMenuList>
        </>
    )
}

export default MainPage;