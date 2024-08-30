import React from 'react';
import Modal from "@/Components/Modal";
import {useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    pivot?: {
        model_type: string;
        model_id: number;
        role_id: number;
    };
}

interface EditData {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    roles: Role[];
}

interface UserEditPropType {
    roles: Role[];
    editData?: EditData;
    show: boolean;
    change: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserEdit: React.FC<UserEditPropType> = ({show, setShow, editData, roles, change, setChange}) => {

    const {data, setData, reset, post, errors, progress} = useForm({
        role_id: editData?.roles[0]?.id || null,
        id: editData?.id
    })

    function submit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        post(route('admin.add.role'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setShow(false);
                setChange(!change);
            },
            onError: () => {
                setShow(true);
            }
        })

    }

    return (
        <Modal show={show} onClose={() => setShow(false)}>
            <form onSubmit={submit} className={"flex flex-col p-10 gap-5"}>
                <div className={"px-3"}>
                    <InputLabel htmlFor={"role_id"} value={"نقش مورد نظر را وارد کنید"}/>
                    <select defaultValue={editData?.roles[0]?.id} id={"role_id"} name={"role_id"}
                            className={"selectInput"}
                            onChange={e => setData('role_id', Number(e.target.value))}>
                        <option value={-1}>هیچ کدام</option>
                        {roles.map((role) => (

                            <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                    </select>
                    {errors?.role_id && <InputError className={"text-red-500"}>{errors?.role_id}</InputError>}
                </div>
                <PrimaryButton disabled={!!progress} className={"flex items-center justify-center"}
                               type={"submit"}>تایید</PrimaryButton>
            </form>
        </Modal>
    );
};

export default UserEdit;
