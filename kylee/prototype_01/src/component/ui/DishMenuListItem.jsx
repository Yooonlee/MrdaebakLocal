import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, TopMenuButton } from "./Button";
import AddOrder from "../modal/AddOrder";
import axios from "axios";

const Wrapper = styled.span`
    text-align: center;
    width: 20%;
    height: 20%;
    padding: 8px;
    border: 1px solid grey;
    boerder-radius: 8px;
    cursor: pointer;
    background: white;
    .menu-hovered {
        display: none;
    }
    :hover {
        border: 5px solid red;
        transform: scale(1.2);
        background: grey;
        .menu-hovered {
            display: block;
        }
    }
`;

const NameText = styled.p`
    font-size: 20px;
    font-weight: 500;
`;

const DescriptionText = styled.p`
    font-size: 15px;
    font-weight: 500;
`;

function DishMenuListItem(props) {
    const { dish, isLogedin } = props;
    const [user, setUser] = useState("");


    const fetchData = async() => {
        const response = await axios.get("http://localhost:8000/customerinfo");
        console.log(response.data[0]);
        setUser(response.data[0]);
    };
    useEffect( ()=>{fetchData()} ,[]);    
    let tempprice = dish.pricesimple ? dish.pricesimple : dish.pricegrand


    const content =
        <>
            <table>
                <tr>
                    <td colSpan="2"><img src={dish.picture} alt="그림 없음" width="125px" height="125px" /></td>
                </tr>
                <tr>
                    <td><NameText>{dish.name}</NameText></td>
                    <td>{user.isVip === "VIP" ? <>{tempprice / 2}원</>: <>{tempprice}원</>}</td>
                </tr>
            </table>
            <div class="menu-hovered">
                <DescriptionText>{dish.descriptioncommon}</DescriptionText>
                <AddOrder dishid={dish.id} isLogedin={isLogedin} />
            </div>
        </>;

    return (
        <Wrapper>
            {content}
        </Wrapper>
    );
}

export default DishMenuListItem;