import LogOut from "../ui/LogOut";
import Button from "../ui/Button";
import InvenMang from "../modal/InventoryManagement";
import AccMag from "../modal/AccounttManagement";
import DeliveryStatus from "../modal/DeliveryStatus";

function EmployeePage(role) {
    if (role === 1) //������
    {
        return (<><InvenMang /><DeliveryStatus /></>);
    }
    else if (role === 2) //��޿�
    {
        return (<DeliveryStatus />);
    }
    else if (role === 3) //������
    {
        return (<><InvenMang /><DeliveryStatus /><AccMag /></>);
    }
}

export default EmployeePage;