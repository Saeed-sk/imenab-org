import React, {useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import OrgChartEditor from '@/Components/OrgChartEditor';
import ErrorComp from '@/Components/ErrorComp';
import {DepartmentsPropType, EmployeePropType, PositionPropType} from '@/types';

interface DepartmentsInterFace {
    departments?: DepartmentsPropType[]
}

interface Node {
    id: string;
    label: any;
    name: any;
    src?: string | undefined;
    children: Node[];
    position?: PositionPropType,
    employee?: EmployeePropType
}

const Chart: React.FC<DepartmentsInterFace> = ({departments}) => {
    if (departments === undefined || departments.length === 0) {
        return <ErrorComp text={"هیچ دپارتمانی برای نمایش اعضا وجود ندارد"}/>;
    }

    const [data, setData] = useState<any[] | undefined>(undefined);
    const [employees, setEmployees] = useState<EmployeePropType[] | undefined>(undefined);
    const [change, setChange] = useState<boolean>(false);
    const [positions, setPositions] = useState<PositionPropType[] | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setData(undefined);
        axios.get(route('admin.chart'), {
            headers: {
                Accept: 'application/json',
            }
        }).then(res => res.data).then(data => {
            setData(data.departments);
            setEmployees(data.employees);
            setPositions(data.positions)
        }).catch(err => {
            console.log(err);
        });
    }, [change]);

    const convertData = (departments: any): Node => {
        let nodeMap: Node = {
            id: '1',
            label: "ایمن آب",
            name: "شرکت اصلی",
            src: undefined, // Provide a default src
            children: [],
        };

        const loop = (pos: any) => {
            let employeeData = employees?.filter(employee => employee.positions_id === pos.id)[0]
            const node: Node = {
                id: `${uuidv4()}`,
                label: pos.title,
                name: employeeData ? employeeData.first_name + " " + employeeData.last_name : "نامشخص",
                src: pos.src ?? undefined,
                children: [],
                position: pos,
                employee: employeeData ?? undefined
            };

            if (pos.children) {
                node.children = pos.children.map((child: any) => loop(child));
            }

            return node;
        };

        departments.forEach((department: any) => {
            let parent = employees?.filter((employee) => employee.employee_id === department.department_head)[0]
            nodeMap.children.push({
                id: `${uuidv4()}`,
                label: department.name,
                name: parent ? parent.first_name + " " + parent.last_name : "نامشخص",
                src: department.src ?? undefined,
                children: positions?.filter(positions => positions.departments_id === department.department_id).map((pos: any) => loop(pos)) ?? []
            });
        });

        return nodeMap;
    };

    const [tree, setTree] = useState<Node | undefined>(undefined);

    useEffect(() => {
        if (data) {
            const uut = convertData(data);
            setTree(uut);
        }
    }, [data]);
    return (
        <section className="relative flex flex-col items-center justify-center m-5 gap-5 h-[93%]">
            {tree && <OrgChartEditor tree={tree}/>}
        </section>
    );
};

export default Chart;
