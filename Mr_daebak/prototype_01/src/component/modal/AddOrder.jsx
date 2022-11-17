import React, { useState } from "react";
import Dishes from "../database/Dishes.json"
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import Button from "../ui/Button";

function AddOrder(props) {
    const { dishid } = props;
    const [isShowingModal, toggleModal] = useModal();

    const dish = Dishes.find((item) => { return item.id == dishid; });

    const orderwindow =
        <table width="400px">
            <tr>
                <td><img src={dish.picture} alt="그림 없음" height="150px" /></td>
            </tr>
            <tr>
                <td>음식 이름: {dish.name}</td>
            </tr>
            <tr>
                <td>가격: {dish.price}원</td>
            </tr>
            <tr>
                <td>{dish.description}</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>
                    형식:&nbsp;&nbsp;
                    <select name="style">
                    <option value="simple">간단</option>
                    <option value="grand">보통</option>
                    <option value="delux">호화</option>
                </select>
                </td>
            </tr>
            <tr>
                <td>개수: <input type="text" name="amount" /></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td><Button title="장바구니 넣기" onClick={toggleModal} /></td>
            </tr>
        </table>;

    return (<>
        <Modal show={isShowingModal} onCloseButtonClick={toggleModal} content={orderwindow} subUrl="addorder" />
        <Button title="주문" onClick={toggleModal} /></>
    );
}

export default AddOrder;