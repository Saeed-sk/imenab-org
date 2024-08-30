import React, {useState} from 'react';
import Modal from "@/Components/Modal";
import {router, useForm} from "@inertiajs/react";
import {DepartmentsPropType} from "@/types";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";
import axios from "axios";
import Select from "react-select";

import {MultiValue, ActionMeta} from 'react-select';

interface OptionType {
    label: string;
    value: string;
}

interface AccessPropType {
    label: string;
    value: string;
}

interface EditData {
    id: number;
    user_name: string;
    token: string;
    status: string;
    access: AccessPropType[];
    permission: string;
    departments_id: number;
    created_at: string | null;
    updated_at: string | null;
    department: DepartmentsPropType;
}

interface ResponseData {
    editData?: EditData;
    show: boolean;
    change: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const ApiCreate: React.FC<ResponseData> = ({editData, show, change, setShow, setChange}) => {
    const {data, setData, reset, post, errors, progress} = useForm({
        id: Number(editData?.id) || null,
        user_name: editData?.user_name || '',
        token: editData?.token || '',
        status: editData?.status || undefined,
        access: editData?.access || undefined,
        permission: editData?.permission || undefined,
    });
    let url: string = route('admin.api.create');
    if (editData) {
        url = route('admin.api.update', editData.id);
    }
    let checkBox = [{
        value: 'Departments',
        label: 'دپارتمان ها'
    }, {
        value: 'Employees',
        label: 'کارمندان'
    }, {
        value: 'Positions',
        label: 'سمت ها'
    }];

    function submit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        post(url, {
            onSuccess: () => {
                reset();
                setChange(!change);
                setShow(false);
            },
            onError: () => {
                setShow(true);
            }
        })
    }

    function generateApiToken() {
        let token = axios.get(route('admin.generate.token')).then(res => {
            setData("token", res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleChange = (newValue: MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
        const mutableValue: AccessPropType[] = newValue.map(option => ({
            label: option.label,
            value: option.value
        }));

        setData('access', mutableValue);
    };


    return (
        <Modal show={show} onClose={() => setShow(false)}>
            <form className={"flex flex-col p-10 gap-2"}
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => submit(e)}>
                {!data.id && (
                    <>
                        <InputLabel className={"mr-2"} htmlFor={"user_name"} value="نام"/>
                        <TextInput value={data.user_name ?? ""} id={"user_name"} name={"user_name"}
                                   onChange={(e) => setData("user_name", e.target.value)}/>
                        {errors.user_name && <InputError message={errors.user_name}/>}

                        <div className={"flex items-center relative w-full"}>
                            <div className={"w-full"}>
                                <InputLabel className={"mr-2"} htmlFor={"token"} value="توکن"/>
                                <TextInput readOnly value={data.token} className={"w-full"} id={"token"}
                                           name={"token"}/>
                                {errors.token && <InputError message={errors.token}/>}
                            </div>
                            <DangerButton type={"button"} className={"mt-5 w-1/5 justify-center absolute -left-3 top-0"}
                                          onClick={generateApiToken}>تولید
                                توکن
                            </DangerButton>
                        </div>
                    </>
                )}


                <div className={"flex w-full gap-5"}>
                    <div className={"w-full"}>
                        <InputLabel className={"mr-2 mb-2"} htmlFor={"permission"} value="سطح دسترسی"/>
                        <select value={data.permission ?? ""} className={"w-full selectInput"} name={"permission"}
                                id={"permission"}
                                onChange={(e) => setData("permission", e.target.value)}>
                            <option value={""}>انتخاب کنید</option>
                            <option value={"Write-Read"}>دریافت و تغییر</option>
                            <option value={"Read"}> دریافت</option>
                        </select>
                        {errors.permission && <InputError message={errors.permission}/>}
                    </div>

                    <div className={"w-full"}>
                        <InputLabel className={"mr-2 mb-2"} htmlFor={"status"} value="وضعیت"/>
                        <select value={data.status ?? ""}
                                className={"w-full status selectInput"}
                                name={"status"} id={"status"}
                                onChange={(e) => setData("status", e.target.value)}>
                            <option value={undefined}>انتخاب کنید</option>
                            <option value={"Active"}>فعال</option>
                            <option value={"Inactive"}>غیر فعال</option>
                        </select>
                        {errors.status && <InputError message={errors.status}/>}
                    </div>
                </div>


                <InputLabel className={"mr-2"} htmlFor={"access"} value="جداول"/>

                <div className={"w-full"}>
                    <Select
                        classNamePrefix={'selectInputSearch'}
                        isMulti
                        options={checkBox}
                        isClearable
                        name={"access"}
                        onChange={handleChange}
                        value={data.access ?? null}
                    />
                </div>
                {errors.access && <InputError message={errors.access}/>}
                <PrimaryButton disabled={!!progress} type={"submit"}
                               className={"justify-center mt-4 w-full mr-0"}>
                    ثبت
                </PrimaryButton>
            </form>
        </Modal>
    )
        ;
};

export default ApiCreate;
