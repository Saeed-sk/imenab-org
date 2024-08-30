import React, { useEffect, useState } from 'react';
import DepartmentCreate from "@/Components/Admin/DepartmentCreate";
import IconSelect from "@/Components/Icons/IconSelect";
import PrimaryButton from "@/Components/PrimaryButton";
import { router } from "@inertiajs/react";
import { DepartmentsPropType, EmployeePropType } from "@/types";
import ErrorComp from "@/Components/ErrorComp";
import axios from "axios";

const Department: React.FC<{ departments: DepartmentsPropType[] | undefined }> = ({ departments }) => {
    const [changed, setChanged] = useState<boolean>(false);
    const [show, setShow] = useState(false);
    const [editData, setEditData] = useState<DepartmentsPropType | undefined>(undefined);
    const [employees, setEmployees] = useState<EmployeePropType[] | undefined>(undefined);
    const [error, setError] = useState<string | undefined>();

    function handleEdit(data: DepartmentsPropType) {
        setEditData(data);
        setShow(true);
    }

    useEffect(() => {
        function getEmployees() {
            axios.get(route('admin.employees.all')).then(res => res.data).then(data => {
                setEmployees(data);
            }).catch((err) => setError('خطا در دریافت اطلاعات کارمندان'));
        }

        departments?.length && getEmployees();

    }, []);

    if (departments !== undefined && departments?.length < 1) {
        return (
            <div className={"w-full h-full"}>
                <ErrorComp text={"هیچ دپارتمانی برای نمایش اعضا وجود ندارد"} />
                <PrimaryButton className={"fixed bottom-5 left-5 py-4 z-50"} onClick={() => {
                    setShow(true);
                    setEditData(undefined);
                }}>
                    <IconSelect className={'text-2xl'} name={'add'} />
                </PrimaryButton>
                {show && <DepartmentCreate show={show} setShow={setShow} setChanged={setChanged} changed={changed} employees={employees || []} />}
            </div>
        );
    }

    if (error) {
        return <div className={"w-full flex flex-col items-center justify-center"}>
            <ErrorComp text={error} />
        </div>;
    }

    return (
        <>
            <PrimaryButton className={"fixed bottom-5 left-5 py-4 z-50"} onClick={() => {
                setShow(true);
                setEditData(undefined);
            }}>
                <IconSelect className={'text-2xl'} name={'add'} />
            </PrimaryButton>
            {show && <DepartmentCreate employees={employees || []} editData={editData} show={show} setShow={setShow} setChanged={setChanged} changed={changed} />}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">آیدی</th>
                        <th scope="col" className="px-6 py-3">نام</th>
                        <th scope="col" className="px-6 py-3">سرپرست</th>
                        <th scope="col" className="px-6 py-3"><span className="sr-only">تغییر</span></th>
                        <th scope="col" className="px-6 py-3"><span className="sr-only">حذف</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        departments && departments.map((department: DepartmentsPropType) => {
                            return (
                                <tr key={department.department_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {department.department_id}
                                    </th>
                                    <td className="px-6 py-4">{department.name}</td>
                                    <td className="px-6 py-4">
                                        {department.department_head ?
                                            `${employees?.find(employee => employee.employee_id === department.department_head)?.first_name} ${employees?.find(employee => employee.employee_id === department.department_head)?.last_name}`
                                            : "نا مشخص"}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleEdit(department)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">تغییر</button>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => {
                                            router.post(route('admin.delete.department'), { department_id: department.department_id });
                                            setChanged(!changed);
                                        }} className="font-medium text-red-600 hover:underline">حذف</button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Department;
