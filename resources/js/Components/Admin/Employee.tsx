import React, {useEffect, useState} from 'react';
import axios from "axios";
import EmployeeEdit from "@/Components/Admin/EmployeeEdit";
import InputLabel from "@/Components/InputLabel";
import ShowDataEmployee from "@/Components/Admin/ShowDataEmployee";
import {DepartmentsPropType, PaginatedEmployees} from "@/types";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import IconSelect from "@/Components/Icons/IconSelect";
import {router} from "@inertiajs/react";
import ErrorComp from "@/Components/ErrorComp";
import {EmployeePropType, PositionPropType} from "@/types";
import TextInput from "@/Components/TextInput";
import Loading from "@/Components/Loading";

interface DepartmentsInterFace {
    departments?: DepartmentsPropType[];
}

const Employee: React.FC<DepartmentsInterFace> = ({departments}) => {
    if (!departments || departments.length === 0) {
        return <ErrorComp text={"هیچ دپارتمانی برای نمایش اعضا وجود ندارد"}/>;
    }

    const [open, setOpen] = useState<boolean>(false);
    const [change, setChange] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [employees, setEmployees] = useState<PaginatedEmployees | undefined>(undefined);
    const [params, setParams] = useState<number>(1);
    const [data, setData] = useState<EmployeePropType | undefined>(undefined);
    const [error, setError] = useState<string | undefined>("");
    const [show, setShow] = useState<boolean>(false);
    const [editData, setEditData] = useState<EmployeePropType | undefined>(undefined);
    const [page, setPage] = useState<number>(departments[0].department_id);
    const [positions, setPositions] = useState<PositionPropType[] | undefined>(undefined);
    const [searchData, setSearch] = useState<EmployeePropType[] | undefined>(undefined);
    const [query, setQuery] = useState<string | undefined>(undefined);
    const [searchBar, setSearchBar] = useState(false)
    useEffect(() => {
        setLoading(true);
        setError(undefined);

        function searchData() {
            axios.get(route('admin.employees.search'), {
                headers: {
                    Accept: 'application/json',
                }, params: {
                    query: query
                }
            }).then(res => res.data).then(data => {
                if (data?.results?.length > 0) {
                    setSearch(data.results)
                    setLoading(false);
                    setError(undefined);
                } else {
                    setError('جستجو هیچ نتیجه ای نداشت');
                    setLoading(false);
                }
            }).catch(err => {
                setLoading(false);
                setError('برای این دپارتمانت هیچ عضوی وجود ندارد');
                console.log(err);
            });
        }

        function fetchData() {
            setError(undefined);
            setEmployees(undefined);
            try {
                axios.get(route('admin.employees'), {
                    headers: {
                        Accept: 'application/json',
                    },
                    params: {
                        id: Number(page),
                        page: params,
                    },
                })
                    .then(res => res.data)
                    .then(data => {
                        if (data?.positions.length > 0) {
                            setPositions(data.positions);
                        }
                        if (data.data.data.length) {
                            if (!searchBar) {
                                setEmployees(data.data);
                            }
                        } else {
                            setError('برای این دپارتمانت هیچ عضوی وجود ندارد');
                        }
                    })
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setError(error.response?.data.message)
                }
            } finally {
                setLoading(false)
            }
        }

        if (searchBar) {
            searchData();
        } else {
            fetchData();
        }
    }, [params, page, change, query]);

    function handelSearch(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length >= 3) {
            setQuery(e.target.value);
        }
    }

    if (searchBar) {
        return (
            <>
                {show &&
                    <EmployeeEdit
                        departments={departments}
                        positions={positions || []}
                        departments_id={page}
                        change={change}
                        setChange={setChange}
                        editData={editData}
                        setShow={setShow}
                        show={show}
                    />
                }

                <div className={"w-full flex justify-center items-end"}>
                    <div className={"w-full relative"}>
                        <InputLabel className={"mr-2 mb-2"} htmlFor={"department"} value={"جستجو"}/>
                        <TextInput placeholder={"متن را وارد کنید"} id={"search"} name={"search"}
                                   className={`w-full`} onChange={(e) => handelSearch(e)}/>
                    </div>
                    <PrimaryButton className={"p-0 mx-5"} onClick={() => setSearchBar(!searchBar)}>
                        <IconSelect className={'text-3xl my-1'} name={'cancel'}/>
                    </PrimaryButton>
                </div>
                {error && <ErrorComp text={error}/>}
                {!error && (
                    <div className="relative overflow-x-auto sm:rounded-lg w-full min-h-screen">
                        {open && <ShowDataEmployee employee={data} open={open} setOpen={setOpen}/>}
                        <table
                            className="w-full text-sm text-left rtl:text-right text-gray-400 rounded-lg overflow-clip">
                            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">کد پرسنلی</th>
                                <th scope="col" className="px-6 py-3">نام</th>
                                <th scope="col" className="px-6 py-3">نام خانوادگی</th>
                                <th scope="col" className="px-6 py-3">سمت/شغل</th>
                                <th scope="col" className="px-6 py-3">دپارتمان</th>
                                <th scope="col" className="px-6 py-3">تاریخ استخدامی</th>
                                <th scope="col" className="px-6 py-3">شماره تماس</th>
                                <th scope="col" className="px-6 py-3">وضعیت</th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">تغییر</span>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">حذف</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {searchData?.map((employee: EmployeePropType, index: number) => {
                                let gender;
                                switch (employee.gender) {
                                    case "Male":
                                        gender = 'مرد';
                                        break;
                                    case "Female":
                                        gender = "زن";
                                        break;
                                    default:
                                        gender = "نا معلوم";
                                }
                                return (
                                    <tr
                                        onClick={() => {
                                            setOpen(true);
                                            setData(employee);
                                        }}
                                        key={index}
                                        className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
                                    >
                                        <td className="px-6 py-4">{employee.employee_id}</td>
                                        <td className="px-6 py-4">{employee.first_name}</td>
                                        <td className="px-6 py-4">{employee.last_name}</td>
                                        <td dir={"ltr"} className="px-6 py-4">
                                            {employee?.position ? employee.position?.title + '-' + employee.position.job_title : "نامشخص"}
                                        </td>
                                        <td dir={"ltr"} className="px-6 py-4">
                                            {employee?.department && employee?.department?.name}
                                        </td>
                                        <td dir={"ltr"} className="px-6 py-4">{employee.hire_date}</td>
                                        <td dir={"ltr"} className="px-6 py-4">{employee.phone_number}</td>
                                        <td className="px-6 py-4">
                                            {employee.status === "Active" ? "فعال" : "غیر فعال"}
                                        </td>
                                        <td
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setEditData(employee);
                                                setShow(true);
                                            }}
                                            className="px-6 py-4 text-right"
                                        >
                                            <button
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                تغییر
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    router.post(route('admin.employees.delete'), {employee_id: employee.employee_id});
                                                    setChange(!change);
                                                }}
                                                className="font-medium text-red-600 hover:underline"
                                            >
                                                حذف
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                )}
                {loading && <Loading/>}
            </>
        )
    } else {
        return (
            <>
                {show &&
                    <EmployeeEdit
                        departments={departments}
                        positions={positions || []}
                        departments_id={page}
                        change={change}
                        setChange={setChange}
                        editData={editData}
                        setShow={setShow}
                        show={show}
                    />
                }
                <PrimaryButton className={"fixed bottom-5 left-5 py-4 z-50"} onClick={() => {
                    setShow(true);
                    setEditData(undefined);
                }}>
                    <IconSelect className={'text-2xl'} name={'add'}/>
                </PrimaryButton>
                <div className={"w-full flex"}>
                    <div className={"w-full relative"}>
                        <InputLabel className={"mr-2 mb-2"} htmlFor={"department"} value={"دپارتمان را مشخص کنید"}/>
                        <select
                            defaultValue={page || undefined}
                            id={"department"}
                            name={"department"}
                            onChange={(e) => setPage(Number(e.target.value))}
                            className={"selectInput"}
                        >
                            {departments.map(department => (
                                <option key={department.department_id} value={department.department_id}>
                                    {department.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <PrimaryButton className={"mx-5 p-0"} onClick={() => setSearchBar(!searchBar)}>
                        <IconSelect className={'text-xl mx-2'} name={'search'}/>
                    </PrimaryButton>
                </div>
                {error && <ErrorComp text={error}/>}
                {!error && (
                    <>
                        <div className="relative overflow-x-auto sm:rounded-lg w-full">
                            {open && <ShowDataEmployee employee={data} open={open} setOpen={setOpen}/>}
                            <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">کد پرسنلی</th>
                                    <th scope="col" className="px-6 py-3">نام</th>
                                    <th scope="col" className="px-6 py-3">نام خانوادگی</th>
                                    <th scope="col" className="px-6 py-3">سمت/شغل</th>
                                    <th scope="col" className="px-6 py-3">تاریخ استخدامی</th>
                                    <th scope="col" className="px-6 py-3">شماره تماس</th>
                                    <th scope="col" className="px-6 py-3">وضعیت</th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">تغییر</span>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">حذف</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {employees?.data.map((employee: EmployeePropType, index: number) => {
                                    let gender;
                                    switch (employee.gender) {
                                        case "Male":
                                            gender = 'مرد';
                                            break;
                                        case "Female":
                                            gender = "زن";
                                            break;
                                        default:
                                            gender = "نا معلوم";
                                    }
                                    return (
                                        <tr
                                            onClick={() => {
                                                setOpen(true);
                                                setData(employee);
                                            }}
                                            key={index}
                                            className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
                                        >
                                            <td className="px-6 py-4">{employee.employee_id}</td>
                                            <td className="px-6 py-4">{employee.first_name}</td>
                                            <td className="px-6 py-4">{employee.last_name}</td>
                                            <td dir={"ltr"} className="px-6 py-4">
                                                {employee?.position ? employee.position?.title + '-' + employee.position.job_title : "نامشخص"}
                                            </td>
                                            <td dir={"ltr"} className="px-6 py-4">{employee.hire_date}</td>
                                            <td dir={"ltr"} className="px-6 py-4">{employee.phone_number}</td>
                                            <td className="px-6 py-4">
                                                {employee.status === "Active" ? "فعال" : "غیر فعال"}
                                            </td>
                                            <td
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    setEditData(employee);
                                                    setShow(true);
                                                }}
                                                className="px-6 py-4 text-right"
                                            >
                                                <button
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                    تغییر
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        router.post(route('admin.employees.delete'), {employee_id: employee.employee_id});
                                                        setChange(!change);
                                                    }}
                                                    className="font-medium text-red-600 hover:underline"
                                                >
                                                    حذف
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                        <Pagination links={employees ? employees.links : undefined} params={params}
                                    setParams={setParams}/>
                    </>
                )}
                {loading && <Loading/>}
            </>
        )
    }
};

export default Employee;
