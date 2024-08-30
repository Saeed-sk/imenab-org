import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pagination from "@/Components/Pagination";
import UserEdit from "@/Components/Admin/UserEdit";
import ErrorComp from "@/Components/ErrorComp";
import {router} from "@inertiajs/react";
import Loading from "@/Components/Loading";

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    roles: any[];
}

interface PaginationData {
    current_page: number;
    data: User[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}

const Users: React.FC = () => {
    const [data, setData] = useState<PaginationData | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)
    const [roles, setRoles] = useState<Role[]>([])
    const [params, setParams] = useState<number>(1)
    const [show, setShow] = useState<boolean>(false)
    const [editData, setEditData] = useState<User | undefined>(undefined)
    const [change, setChange] = useState(false)
    const [error, setError] = useState<string | undefined>('')
    useEffect(() => {
        axios.get(route('admin.roles'), {
            headers: {
                Accept: 'application/json',
            }
        }).then(res => res.data).then(data => {
            setRoles(data?.data)
        }).catch(error => console.log(error));
    }, []);

    useEffect(() => {
        axios.get(route('admin.users'), {
            headers: {
                Accept: 'application/json',
            },
            params: {
                page: params
            }
        }).then(res => res.data).then(data => {
            if (data.data.data.length) {
                setData(data.data)
                setLoading(false)
                setError(undefined)
            } else {
                setError('عضوی وجود ندارد')
                setLoading(false)
            }
        }).catch(error => console.log(error));
    }, [params, change]);

    return (
        <>
            {error !== undefined && <ErrorComp text={error}/>}
            {error !== undefined && loading && <Loading/>}
            {error === undefined && data !== undefined &&
                (<>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-5 w-full">
                        {show && <UserEdit roles={roles} editData={editData} show={show} setShow={setShow}
                                           setChange={setChange}
                                           change={change}/>}
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
                                    دسترسی
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ایمیل
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
                                data?.data?.map((user, index) => {
                                    return (
                                        <tr key={index}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {user.id}
                                            </th>
                                            <td className="px-6 py-4">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.roles[0]?.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => {
                                                    setShow(true);
                                                    setEditData(user);
                                                }}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline">تغییر
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => {
                                                        router.post(route('admin.remove.user'), {id: user.id})
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
                    <Pagination links={data.links} params={params} setParams={setParams}/>
                </>)
            }
        </>
    );
};

export default Users;
