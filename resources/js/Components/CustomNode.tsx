import React, { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import IconSelect from "@/Components/Icons/IconSelect";
import Modal from "@/Components/Modal";

interface Employee {
    first_name: string;
    last_name: string;
    employee_id: string;
    national_id: string;
    gender: string;
    phone_number: string;
    password: string;
    children_count:number;
    email: string;
    date_of_brith: string;
    address: string;
    hire_date: string;
    marital_status: string;
    status: string;
    image?: string;
}

interface Job {
    title: string;
}

interface PositionData {
    title: string;
    min_salary: number;
    max_salary: number;
    job_title:string;
}

interface CustomNodeData {
    label: string;
    name: string;
    toggleNode: () => void;
    expanded: boolean;
    employee?: Employee;
    jobs?: Job;
    position?: PositionData;
}

interface CustomNodeProps {
    data: CustomNodeData;
}

function CustomNode({ data }: CustomNodeProps) {
    const [show, setShow] = useState(false);

    const { name, employee, jobs, position, toggleNode, expanded, label } = data;

    const displayName = name === "null" && employee
        ? `${employee.first_name} ${employee.last_name}`
        : name || "نامشخص";

    const imageSrc = employee?.image ? `/${employee.image}` : undefined;

    return (
        <div className="shadow-lg rounded-md bg-slate-900 border-2 border-stone-700 min-w-[250px] min-h-[100px] flex items-center justify-center relative">
            <div onClick={() => setShow(true)} className="flex w-full h-full gap-2">
                {show && (
                    <Modal show={show} onClose={() => setShow(false)}>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead
                                    className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                </thead>
                                <tbody>
                                <tr className="bg-white border-b hover:bg-gray-100 ">
                                    <td className="px-6">
                                        عکس
                                    </td>
                                    <td className="px-6">
                                        <div className={"w-full text-center flex items-center justify-center"}><img
                                            className={"w-48 "}
                                            src={`/${employee?.image}`}
                                            alt={`عکس نمایه ${employee?.first_name}`}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b hover:bg-gray-50 ">
                                    <td className="px-6 py-2">
                                        کد پرسنلی
                                    </td>
                                    <td className="px-6 py-2">
                                        {employee?.employee_id}
                                    </td>
                                </tr>

                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-2">
                                        نام
                                    </td>
                                    <td className="px-6 py-2">
                                        {employee?.first_name}
                                    </td>
                                </tr>

                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-2">
                                        نام خانوادگی
                                    </td>
                                    <td className="px-6 py-2">
                                        {employee?.last_name}
                                    </td>
                                </tr>

                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-2">
                                        آدرس
                                    </td>
                                    <td className="px-6 py-2">
                                        {employee?.address}
                                    </td>
                                </tr>

                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-2">
                                        جنیست
                                    </td>
                                    <td className="px-6 py-2">
                                        {employee?.gender === "Male" && "مرد"}
                                        {employee?.gender === "Female" && "مرد"}
                                        {employee?.gender === "Other" && "نا معلوم"}
                                    </td>
                                </tr>

                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-2">
                                        تأهل
                                    </td>
                                    <td className="px-6 py-2">
                                        {employee?.marital_status === "Single" && "مجرد"}
                                        {employee?.marital_status === "Married" && "متاهل"}
                                    </td>
                                </tr>

                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-2">
                                        ایمیل
                                    </td>
                                    <td dir={"ltr"} className="px-6 py-2">
                                        {employee?.email}
                                    </td>
                                </tr>

                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-2">
                                        کدملی
                                    </td>
                                    <td dir={"ltr"} className="px-2 py-2 ">
                                        {employee?.national_id}
                                    </td>
                                </tr>

                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-2">
                                        شماره تماس
                                    </td>
                                    <td dir={"ltr"} className="px-6 py-2 text-right">
                                        {employee?.phone_number}
                                    </td>
                                </tr>

                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-2">
                                        تاریخ استخدامی
                                    </td>
                                    <td dir={"ltr"} className="px-6 py-2 text-right">
                                        {employee?.hire_date}
                                    </td>
                                </tr>

                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-2">
                                        تاریخ تولد
                                    </td>
                                    <td dir={"ltr"} className="px-6 py-2 text-right">
                                        {employee?.date_of_brith}
                                    </td>
                                </tr>

                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-2">
                                        تأهل
                                    </td>
                                    <td className="px-6 py-2">
                                        {employee?.status === "Active" ? "فعال" : "غیر فعال"}
                                    </td>
                                </tr>

                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-2">
                                        تعداد فرزندان
                                    </td>
                                    <td dir={"ltr"} className="px-6 py-2 text-right">
                                        {employee?.children_count}
                                    </td>
                                </tr>

                                <tr className="bg-white border-b hover:bg-gray-50 ">
                                    <td className="px-6 py-2">
                                        رمز عبور
                                    </td>
                                    <td dir={"ltr"} className="px-6 py-2 text-right">
                                        {employee?.password}
                                    </td>
                                </tr>

                                <tr className="bg-white border-b hover:bg-gray-50 ">
                                    <td className="px-6 py-2">
                                        سمت
                                    </td>
                                    <td dir={"ltr"} className="px-6 py-2 text-right">
                                        {position?.title}
                                    </td>
                                </tr>

                                <tr className="bg-white border-b hover:bg-gray-50 ">
                                    <td className="px-6 py-2">
                                        شغل
                                    </td>
                                    <td dir={"ltr"} className="px-6 py-2 text-right">
                                        {position?.job_title}
                                    </td>
                                </tr>

                                <tr className="bg-white border-b hover:bg-gray-50 ">
                                    <td className="px-6 py-2">
                                        کمترین و بیشترین میزان حقوق
                                    </td>
                                    <td dir={"ltr"} className="px-6 py-2 text-right">
                                        {position?.min_salary} - {position?.max_salary}
                                    </td>
                                </tr>

                                </tbody>
                            </table>
                        </div>

                    </Modal>
                )}
                <div className="flex justify-center items-center w-1/4 m-4">
                    <div className="overflow-hidden rounded-full bg-gray-200">
                        {imageSrc ? (
                            <img className="w-20 aspect-square" src={imageSrc} alt={displayName} />
                        ) : (
                            <IconSelect className="text-6xl text-gray-800" name="profile" />
                        )}
                    </div>
                </div>
                <div className="ml-2 w-3/4 flex flex-col items-center justify-center gap-2">
                    <div className="font-bold text-gray-300 text-center">{label}</div>
                    <div className="text-gray-400 text-center">{displayName}</div>
                    <div onClick={(event) => event.stopPropagation()}>
                        <button
                            className="text-white hover:text-gray-500 transition-all absolute -bottom-3 left-[45%] bg-slate-900 z-50 rounded-lg"
                            onClick={toggleNode}
                        >
                            {expanded ? <IconSelect className="text-2xl" name="minus" /> : <IconSelect className="text-2xl" name="plus" />}
                        </button>
                    </div>
                </div>
            </div>
            <Handle
                type="target"
                position={Position.Top}
                className="w-16 !bg-teal-500"
            />
            <Handle
                type="source"
                position={Position.Bottom}
                className="w-4 !bg-teal-500"
            />
        </div>
    );
}

export default memo(CustomNode);
