import React, { useState, useEffect } from "react";
import Dishes from "../database/Dishes.json"
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import { Button, TopMenuButton } from "../ui/Button";
import {addOrder}from "../../_actions/user_action"
import { useLocation } from 'react-router-dom';
import axios from "axios";


function AddOrder(props) {
    const { dishid, isLogedin } = props;
    const [isShowingModal, toggleModal] = useModal();
    const [user, setUser] = useState("");
    const [dishCount, setDishCount] = useState(1);
    const dishPlusOne = () => {
        setDishCount((prev) => prev + 1);
    }
    const dishMinusOne = () => {
        setDishCount((prev) => prev - 1);
    }
    //vip 가격 설정
    const fetchData = async() => {
        const response = await axios.get("http://localhost:8000/customerinfo");
        console.log(response.data[0]);
        setUser(response.data[0]);
    };
    useEffect( ()=>{fetchData()} ,[]);    

    const [selectedStyle, setSelectedStyle] = useState("simple");
    const handleChange = (event) => {
        setSelectedStyle(event.target.value)
    }
    const dish = Dishes.find((item) => { return item.id === dishid; });
    const onClickAddorder = (event) => {
        event.preventDefault();
        
        let sum = eval("dish.price" + selectedStyle)
        if(user.isVip === "VIP")
        {
            console.log("ddddd");
            sum = eval("dish.price" + selectedStyle)/2;    
        }
        let body = {
         dinnerMenu: dish.name,
         price: sum,
         dinnerStyle: selectedStyle,
         num: dishCount
        }
        addOrder(body).payload
        .then(alert('장바구니 등록 완료하였습니다.') )
        .catch(err => {
            console.log(err);
          });
    }


    const orderwindow =
    <table width="400px">
    <tr>
        <td colSpan="3"><img src={dish.picture} alt="그림 없음" height="150px" /></td>
    </tr>
    <tr>
        <td colSpan="3">음식 이름: {dish.name}</td>
    </tr>
    <tr>
        {user.isVip === "VIP"?  <td colSpan="3">가격: {eval("dish.price" + selectedStyle)/2}원</td>:<td colSpan="3">가격: {eval("dish.price" + selectedStyle)}원</td>}
    </tr>
    <tr>
        <td colSpan="3">{dish.descriptioncommon}</td>
    </tr>
    <tr>
        <td colSpan="3">{eval("dish.description" + selectedStyle)}</td>
    </tr>
    <tr>
        <td colSpan="3">&nbsp;</td>
    </tr>
    <tr>
        <td>
            <fieldset colSpan="3">
                <legend>음식 형태</legend>
                { dish.id === 4 ? null : <><input type="radio" value="simple" onClick={handleChange} checked={selectedStyle === "simple"} />보통</>}
                <input type="radio" value="grand" onClick={handleChange} checked={selectedStyle === "grand"} />고급
                <input type="radio" value="delux" onClick={handleChange} checked={selectedStyle === "delux"} />호화
            </fieldset>

        </td>
    </tr>
    <tr>
        <td colSpan="3">개수</td>
    </tr>
            <tr>
                <td width="40%">
                    <button onClick={dishMinusOne} style={{ width: "100%", height: "2rem", borderRadius: "1rem 0 0 1rem / 1rem 0 0 1rem", fontSize: "1.5rem" }} disabled={dishCount <= 1}>-</button>
                </td><td>
                    {dishCount}
                </td><td width="40%">
                    <button onClick={dishPlusOne} style={{ width: "100%", height: "2rem", borderRadius: "0 1rem 1rem 0 / 0 1rem 1rem 0", fontSize: "1.5rem" }} >+</button>
                </td>
            </tr>
    <tr>
        <td colSpan="3">&nbsp;</td>
    </tr>
    <tr>
        <td colSpan="3"><Button title="장바구니 넣기" onClick={onClickAddorder} /></td>
    </tr>  
        </table>;

    return (<>
        { isLogedin ? <><Modal show={isShowingModal} onCloseButtonClick={toggleModal} content={orderwindow} subUrl="addorder" title="주문" /><Button title="주문" onClick={toggleModal} /></> : <Button title="로그인해야 합니다." disabled /> }
    </>);
}

export default AddOrder;