import React from "react";
import styled from "styled-components";

const Common = styled.button`
    padding: 8px 16px;
    font-size: 16px;
    border-width: 1px;
    border-radius: 8px;
    cursor: pointer;
`;

function CommonButton(props) {
    const { title, onClick } = props;

    return <Common onClick={onClick}>{title || "이름 지정 안됨"}</Common>;
}

const TopMenu = styled.button`
background-color: transparent;
  border-top: none;
border-bottom: none;
border-left: soild white;
border-right: soild white;
  color: white;
    padding: 8px 16px;
    font-size: 16px;
font-weight: bold;
    border-width: 1px;
    cursor: pointer;
`;

function TopMenuButton(props) {
    const { title, onClick } = props;

    return <TopMenu onClick={onClick}>{title || "이름 지정 안됨"}</TopMenu>;
}

export { CommonButton as Button, TopMenuButton } ;