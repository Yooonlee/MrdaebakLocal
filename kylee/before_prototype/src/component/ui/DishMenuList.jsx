import React from "react";
import styled from "styled-components";
import DishMenuListItem from "./DishMenuListItem";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-item: center;
    text-align: center;
    justify-content: center;
    flex-wrap: wrap;
    
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

function DishMenuList(props) {
    const { dishes, onClickButton, isLogedin } = props;

    return (
        <Wrapper>
            {dishes.map((dish, index) => {
                return (
                    <DishMenuListItem key={dish.id} dish={dish} onClick={() => {onClickButton(dish);}} isLogedin={isLogedin} />
                );
            })}
        </Wrapper>
    );
}

export default DishMenuList;