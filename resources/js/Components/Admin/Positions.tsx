import React, {useEffect, useState} from 'react';
import PositionCreate from "@/Components/Admin/PositionCreate";
import axios from "axios";
import IconSelect from "@/Components/Icons/IconSelect";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import {router} from "@inertiajs/react";
import {DepartmentsPropType, PositionPropType, Link, EmployeePropType} from "@/types";
import ErrorComp from "@/Components/ErrorComp";
import Loading from "@/Components/Loading";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";


interface DepartmentsInterFace {
    departments?: DepartmentsPropType[]
}

const Positions: React.FC<DepartmentsInterFace> = ({departments}) => {
    if (departments === undefined || departments.length === 0) {
        return <ErrorComp text={"هیچ دپارتمانی برای نمایش اعضا وجود ندارد"}/>
    }
    const [change, setChange] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [positions, setPositions] = useState<PositionPropType[]>()
    const [error, setError] = useState<string | undefined>('');
    const [show, setShow] = useState<boolean>(false)
    const [editData, setEditData] = useState<PositionPropType | undefined>(undefined)
    const [page, setPage] = useState<string | number>(departments[0].department_id)
    const [open, setOpen] = useState<boolean>(false)
    const [employee, setEmployee] = useState<EmployeePropType | undefined>(undefined)

    async function fetchPositions() {
        setPositions(undefined)
        setLoading(true)
        setError(undefined)
        try {
            const response = await axios.get(route('admin.positions'), {
                headers: {
                    Accept: 'application/json',
                },
                params: {
                    id: page
                }
            })
            setPositions(response.data)
            if (response.data.length === 0) {
                setError('هیچ سمتی برای این دپارتمان وجود ندارد')
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message)
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect((): void => {
        fetchPositions()
    }, [page, change]);
    return (

        <>
            <Modal show={open} onClose={() => setOpen(false)}>
                <div className={"flex flex-col gap-10 p-10"}>
                    <h1 className={"text-xl"}>آیا از حذف کارمند از این سمت مطمئن هستید؟</h1>
                    <div className={"flex w-full gap-5"}>
                        <PrimaryButton onClick={() => {
                            router.post(route('admin.PositionsEmployee.delete',), {id: employee?.employee_id}, {
                                onSuccess: () => {
                                    setOpen(false)
                                    setChange(!change)
                                }
                            });
                        }} className={"w-full justify-center"}>
                            حذف
                        </PrimaryButton>
                        <DangerButton onClick={() => {
                            setOpen(false);
                            setEmployee(undefined)
                        }} className={"w-full justify-center"}>
                            لغو
                        </DangerButton>
                    </div>
                </div>
            </Modal>
            <PrimaryButton className={"fixed bottom-5 left-5 py-4 z-50"} onClick={() => {
                setShow(true);
                setEditData(undefined);
            }}>
                <IconSelect className={'text-2xl'} name={'add'}/>
            </PrimaryButton>
            <div className={"w-full"}>
                <InputLabel className={"mr-2 mb-2"} htmlFor={"department"}
                            value={"دپارتمان را مشخص کنید"}/>
                <select id={"department"} name={"department"} onChange={(e) => setPage(Number(e.target.value))}
                        className={"selectInput"}>
                    {departments.map(department => <option key={department.department_id}
                                                           value={department.department_id}>{department.name}</option>)}
                </select>
            </div>
            {show &&
                <PositionCreate positions={positions || []} show={show} departments_id={page} setShow={setShow}
                                editData={editData}
                                changed={change}
                                setChanged={setChange}/>
            }
            {error && <ErrorComp text={error}/>}
            {error === undefined &&
                (<>
                    <div className="relative overflow-x-auto sm:rounded-lg w-full">
                        <table
                            className="w-full text-sm text-left rtl:text-right text-gray-400">
                            <thead
                                className="text-xs uppercase bg-gray-700 text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    آیدی
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    سمت
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    شغل
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    سرپرست
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    کمترین حقوق
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    بیشترین حقوق
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    نام کارمند
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">تغییر</span>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">حذف</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                positions?.map((position, index) => {
                                    return (
                                        <tr key={index}
                                            className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600">
                                            <th scope="row"
                                                className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                                {position.id}
                                            </th>
                                            <td className="px-6 py-4">
                                                {position.title}
                                            </td>
                                            <td className="px-6 py-4">
                                                {position.job_title}
                                            </td>
                                            <td className="px-6 py-4">
                                                {position.parent_id !== null ? positions?.filter((pos) => pos.id === position.parent_id)[0].title + "-" + positions?.filter(pos => pos.id === position.parent_id)[0].job_title : "مشخص نشده"}
                                            </td>
                                            <td className="px-6 py-4">
                                                {position.min_salary}
                                            </td>
                                            <td className="px-6 py-4">
                                                {position.max_salary}
                                            </td>
                                            <td className="px-6 py-4">

                                                {position.employee ? (<button onClick={() => {
                                                    setOpen(true);
                                                    setEmployee(position.employee)
                                                }}>{position.employee.first_name + " " + position.employee.last_name}</button>) : "نامشخص"}

                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={(e) => {
                                                    e.preventDefault();
                                                    setEditData(position)
                                                    setShow(true)

                                                }}
                                                        className="font-medium text-blue-500 hover:underline">تغییر
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => {
                                                        router.post(route('admin.delete.positions'), {id: position.id})
                                                        setChange(!change);
                                                    }}
                                                    className="font-medium text-red-600 hover:underline">حذف
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </>)
            }
            {loading && <Loading/>}
        </>
    );
};

export default Positions;


