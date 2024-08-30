import React from 'react';
import LayoutSelect from "@/Layouts/LayoutSelect";
import Chart from "@/Components/Admin/Chart";
import {DepartmentsPropType} from "@/types";

interface DashboardPropType {
    departments?: DepartmentsPropType[]
}
const UserPage: React.FC<DashboardPropType> = ({departments})=> {
    return (
        <LayoutSelect>
            <Chart departments={departments}/>
        </LayoutSelect>
    );
};

export default UserPage;
