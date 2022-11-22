import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import { Button, TopMenuButton } from "../ui/Button";
import React, { useState , useEffect} from "react";
import Orders from "../database/PrevOrders.json";
import styled from "styled-components";
import axios from "axios";

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

function PrevOrderList() {
    const [isShowingModal, toggleModal] = useModal();
    const [prev, setPrev] = useState("");
    const [refresh, setRefresh] = useState("");

    const CheckHandler = async (e) =>{
        e.preventDefault();
        setRefresh(!refresh);
    }
    const fetchData = async() => {
        const response = await axios.get("http://localhost:8000/myorderlist");
        console.log(response.data);
        setPrev(response.data);
    };

    useEffect( ()=>{fetchData()} ,[refresh]);

    const prevorderlist = Object.values(prev)?.map((order) => {
        return(<div>
            <table style={{ borderBottom: "1px solid #808080" }}>  
                        <tr>
                            <td style={{ backgroundColor: "#d3d3d3" }}>주문 음식</td>
                            <td>{order.dinnerMenu}</td>
                            <td style={{ backgroundColor: "#d3d3d3" }}>주문 스타일</td>
                            <td>{order.dinnerStyle}</td>
                        </tr>
                        <tr>
                            <td style={{ backgroundColor: "#d3d3d3" }}>가격</td>
                            <td>{order.price}</td>
                            <td style={{ backgroundColor: "#d3d3d3" }}>개수</td>
                            <td>{order.num}</td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ backgroundColor: "#d3d3d3" }}>주문 상태</td>
                            <td colSpan="2">{order.status}</td>
                        </tr>
                    </table>
        </div>)
    })
    let prevorders =
        <Wrapper>
            {prevorderlist}
            <Button title="확인"onClick={CheckHandler}/>
        </Wrapper>;

    return (<>
        <Modal show={isShowingModal} onCloseButtonClick={toggleModal} content={prevorders} subUrl="prevorder" />
        <TopMenuButton title="과거주문내역" onClick={toggleModal} /></>
    )

}

export default PrevOrderList;