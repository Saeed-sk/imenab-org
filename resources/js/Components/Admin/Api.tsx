import React, {useEffect, useState} from 'react';
import {DepartmentsPropType, Link} from "@/types";
import ErrorComp from "@/Components/ErrorComp";
import ApiCreate from "@/Components/Admin/ApiCreate";
import axios from "axios";
import {router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import IconSelect from "@/Components/Icons/IconSelect";
import Loading from "@/Components/Loading";

interface AccessPropType {
    value: string;
    label: string;
}

interface ApiType {
    id: number;
    user_name: string;
    token: string;
    department: DepartmentsPropType;
    status: string;
    access: any[];
    permission: string;
    departments_id: number;
    created_at: string | null;
    updated_at: string | null;
}

interface PaginationResponse {
    current_page: number;
    data: ApiType[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

const Api: React.FC<{ departments: DepartmentsPropType[] | undefined }> = ({departments}) => {
    if (departments === undefined || departments.length === 0) {
        return <ErrorComp text={"هیچ دیتایی برای اشتراک وجود ندارد"}/>;
    }
    const [error, setError] = useState<string | undefined>('');
    const [apiAccess, setApiAccess] = useState<PaginationResponse | undefined>();
    const [show, setShow] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [editData, setEditData] = useState<ApiType | undefined>();
    const [change, setChange] = useState<boolean>(false);
    const [params, setParams] = useState<number>(1)
    useEffect(() => {
        setLoading(true)
        axios.get(route('admin.api'), {
            headers: {
                Accept: 'application/json',
            },
            params: {
                id: params,
            }
        }).then(res => res.data).then((data) => {
            if (data.data.data.length) {
                setApiAccess(data.data)
                setLoading(false)
                setError(undefined)
            } else {
                setError('هیج api یافت نشد')
                setLoading(false)
            }
        }).catch(error => setError(error.message))
    }, [params, change]);

    function handelEdit(data: ApiType) {
        setShow(true)
        setEditData(data)
    }

    return (
        <>
            {error !== undefined && <ErrorComp text={error}/>}
            {error === '' && loading && <Loading/>}
            <PrimaryButton className={"fixed bottom-5 left-5 py-4 z-50"} onClick={() => {
                setShow(true);
                setEditData(undefined);
            }}>
                <IconSelect className={'text-2xl'} name={'add'}/>
            </PrimaryButton>
            {show &&
                <ApiCreate editData={editData ? editData : undefined} show={show} setShow={setShow} change={change}
                           setChange={setChange}/>}
            {apiAccess !== undefined &&
                (
                    <>
                        <div className={"absolute bottom-10 text-white font-bold flex gap-2"}>
                            <div className={"bg-slate-600 p-5 rounded-2xl"}>
                                <span>درخواست:</span>
                                <span>{route('api.request.data')}</span>
                            </div>
                            <div className={"p-5 bg-slate-600 rounded-2xl"}>
                                <span>تغییر:</span>
                                <span>{route('api.request.update')}</span>
                            </div>
                        </div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full ">

                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead
                                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        آیدی
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        نام
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        توکن
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        وضعیت
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        دسترسی
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        سطح دسترسی
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
                                    apiAccess?.data.map((api: ApiType) => {
                                        let permission;
                                        let status;
                                        switch (api.status) {
                                            case "Active":
                                                status = 'فعال';
                                                break;
                                            case "Inactive":
                                                status = "غیر فعال";
                                                break
                                            default :
                                                status = "نا معلوم"
                                        }
                                        switch (api.permission) {
                                            case "Write-Read":
                                                permission = "دریافت و تغییر";
                                                break
                                            case "Write":
                                                permission = "فقط تغییر";
                                                break
                                            default :
                                                permission = "نا معلوم"
                                                break;
                                        }
                                        return (
                                            <tr key={api.id}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {api.id}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {api.user_name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {api.token}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {status}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {api.access.map(((acs, index) => {
                                                        return acs.label + " ,"
                                                    }))}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {permission}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button onClick={() => handelEdit(api)}
                                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline">تغییر
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => {
                                                            router.post(route('admin.api.delete'), {id: api.id})
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
                        <Pagination links={apiAccess?.links} params={params} setParams={setParams}/>
                    </>
                )
            }
        </>
    );
};

export default Api;
