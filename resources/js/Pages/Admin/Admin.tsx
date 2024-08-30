import React, {useState} from 'react';
import LayoutSelect from "@/Layouts/LayoutSelect";
import Employee from "@/Components/Admin/Employee";
import {Menu, MenuItem, Sidebar} from "react-pro-sidebar";
import Positions from "@/Components/Admin/Positions";
import IconSelect from "@/Components/Icons/IconSelect";
import Department from "@/Components/Admin/Department";
import {DepartmentsPropType} from "@/types";
import Chart from "@/Components/Admin/Chart";

interface DashboardPropType {
    departments?: DepartmentsPropType[]
}

const Admin: React.FC<DashboardPropType> = ({departments}) => {
    const [page, setPage] = useState('departments');
    const [collapsed, setCollapsed] = useState(true)
    let DynamicComponent;
    switch (page) {
        case 'employee':
            DynamicComponent = Employee;
            break;
        case 'positions':
            DynamicComponent = Positions;
            break;
        case 'departments':
            DynamicComponent = Department;
            break;
        case 'chart':
            DynamicComponent = Chart;
            break;
        default:
            DynamicComponent = Employee;
    }
    return (
        <LayoutSelect classNames={"grid grid-cols-12 grid-rows-1 justify-center relative"}>

            <section className={"w-full bg-gray-200 col-span-full h-full pr-24 flex flex-col gap-4 p-8"}>
                <DynamicComponent departments={departments}/>
            </section>
            <div className={"absolute top-0 right-0 h-full bg-white"}>
                <Sidebar onMouseEnter={() => setCollapsed(false)} onMouseLeave={() => setCollapsed(true)} rtl={true}
                         collapsed={collapsed} className={"h-full"}>
                    <Menu>

                        <MenuItem onClick={() => setPage('departments')}
                                  icon={<IconSelect className={"text-2xl"} name={'department'}/>}
                                  className={`cursor-pointer ${page === 'departments' && 'text-BBrown-600'}`}
                        >
                            دپارتمان ها
                        </MenuItem>

                        <MenuItem onClick={() => setPage('positions')}
                                  icon={<IconSelect className={"text-2xl"} name={'position'}/>}
                                  className={`cursor-pointer ${page === 'positions' && 'text-BBrown-600'}`}
                        >
                            سمت ها
                        </MenuItem>

                        <MenuItem onClick={() => setPage('employee')}
                                  icon={<IconSelect className={"text-2xl"} name={'employee'}/>}
                                  className={`cursor-pointer ${page === 'employee' && 'text-BBrown-600'}`}
                        >
                            کارمندان
                        </MenuItem>

                        <MenuItem onClick={() => setPage('chart')}
                                  icon={<IconSelect className={"text-2xl"} name={'chart'}/>}
                                  className={`cursor-pointer ${page === 'chart' && 'text-BBrown-600'}`}
                        >
                            چارت
                        </MenuItem>


                    </Menu>

                </Sidebar>
            </div>
        </LayoutSelect>
    );
};

export default Admin;

