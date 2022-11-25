import LogOut from "../ui/LogOut";
import Button from "../ui/Button";
import InvenMang from "../modal/InventoryManagement";
import AccMag from "../modal/AccounttManagement";
import DeliveryStatus from "../modal/DeliveryStatus";

function EmployeePage(props) {
    const role = props.role;
    if (role === 1)  // 요리사 cook
    {
        return (<><InvenMang /><DeliveryStatus /></>);
    }
    else if (role === 2) // 배달부 delivery
    {
        return (<DeliveryStatus />);
    }
    else if (role === 3) // 관리자? 
    {
        return (<><InvenMang /><DeliveryStatus /></>);
    }
    else  // 로그인 안된 상태  
    {
        return (<></>);
    }
}

export default EmployeePage;