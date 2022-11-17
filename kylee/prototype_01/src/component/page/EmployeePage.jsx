import LogOut from "../ui/LogOut";
import Button from "../ui/Button";
import InvenMang from "../modal/InventoryManagement";
import AccMag from "../modal/AccounttManagement";
import DeliveryStatus from "../modal/DeliveryStatus";

function EmployeePage() {
    return (
        <>
            <InvenMang />
            <AccMag />
            <DeliveryStatus />
        </>
    )
}

export default EmployeePage;