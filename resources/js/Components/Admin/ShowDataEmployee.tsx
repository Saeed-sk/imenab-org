import React from 'react';
import Modal from "@/Components/Modal";
import {Employee} from "@/types";

interface ShowDataProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    employee?: Employee;
}

const ShowDataEmployee: React.FC<ShowDataProps> = ({open, setOpen, employee}) => {
    return (
        <Modal show={open} onClose={setOpen}>
            <div className={""}>

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
                                سمت
                            </td>
                            <td className="px-6 py-2">
                                {employee?.position ? employee?.position?.title : "مشخص نشده"}
                            </td>
                        </tr>

                        <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-2">
                                شغل
                            </td>
                            <td className="px-6 py-2">
                                {employee?.position ? employee?.position?.job_title : "مشخص نشده"}
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

                        </tbody>
                    </table>
                </div>
            </div>
        </Modal>
    );
};

export default ShowDataEmployee;
