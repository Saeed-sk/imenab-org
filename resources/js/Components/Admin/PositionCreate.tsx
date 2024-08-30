import React from 'react';
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import {useForm} from "@inertiajs/react";
import InputError from "@/Components/InputError";
import {PositionPropType} from "@/types";
import Select from "react-select";

interface EditData {
    positions?: PositionPropType[];
    id: number;
    title: string;
    description: string;
    min_salary: string;
    max_salary: string;
    parent_id: number | null;
    departments_id: number;
    created_at: string;
    updated_at: string;
    job_title: string
}

interface Props {
    show: boolean;
    editData?: EditData;
    changed: boolean;
    setChanged: (value: boolean) => void;
    setShow: (value: boolean) => void;
    departments_id: number | string;
    positions: PositionPropType[];
}

interface OptionType {
    value: number;
    label: string;
}

const PositionCreate: React.FC<Props> = ({editData, show, setShow, setChanged, changed, departments_id, positions}) => {
    const {data, setData, reset, post, errors, progress} = useForm({
        id: editData?.id ?? null,
        title: editData?.title ?? "",
        job_title: editData?.job_title ?? "",
        description: editData?.description ?? "",
        min_salary: editData?.min_salary ?? "",
        max_salary: editData?.max_salary ?? "",
        parent_id: editData?.parent_id ?? null,
        department_id: Number(departments_id),
        forall: false
    });
    const options: OptionType[] = positions.filter(position => position.id !== editData?.id).map(position => ({
        value: position.id,
        label: position.title + '-' + position.job_title,
    }));
    let url = route('admin.create.positions');
    if (editData) {
        url = route('admin.edit.positions');
    }
    const handleChange = (selectedOption: OptionType | null) => {
        setData("parent_id", selectedOption ? selectedOption.value : null);
    };

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        post(url, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setChanged(!changed);
                setShow(false);
            },
            onError: () => {
                setShow(true);
            },
        });
    };

    return (
        <Modal show={show} onClose={() => setShow(false)}>
            <form className="flex flex-col p-10 gap-2" onSubmit={submit}>
                <InputLabel className="mr-2" htmlFor="title" value="سمت"/>
                <TextInput
                    value={data.title ?? ""}
                    id="title"
                    name="title"
                    onChange={(e) => setData("title", e.target.value)}
                />
                {errors.title && <InputError message={errors.title}/>}

                <InputLabel className="mr-2" htmlFor="job_title" value="شغل"/>
                <TextInput
                    value={data.job_title ?? ""}
                    id="job_title"
                    name="job_title"
                    onChange={(e) => setData("job_title", e.target.value)}
                />
                {errors.job_title && <InputError message={errors.job_title}/>}

                <InputLabel className="mr-2" htmlFor="description" value="توضیحات"/>
                <TextInput
                    value={data.description ?? ""}
                    id="description"
                    name="description"
                    onChange={(e) => setData("description", e.target.value)}
                />
                {errors.description && <InputError message={errors.description}/>}

                <InputLabel className="mr-2" htmlFor="min_salary" value="کمترین میزان حقوق"/>
                <TextInput
                    value={data.min_salary ?? ""}
                    id="min_salary"
                    name="min_salary"
                    onChange={(e) => setData("min_salary", e.target.value)}
                />
                {errors.min_salary && <InputError message={errors.min_salary}/>}

                <InputLabel className="mr-2" htmlFor="max_salary" value="بیشترین مقدار حقوق"/>
                <TextInput
                    value={data.max_salary ?? ""}
                    id="max_salary"
                    name="max_salary"
                    onChange={(e) => setData("max_salary", e.target.value)}
                />
                {errors.max_salary && <InputError message={errors.max_salary}/>}

                {
                    !data.forall && (
                        <div className="w-full">
                            <InputLabel className="mr-2" htmlFor="parent_id" value="سرپرست"/>
                            <Select
                                id="parent_id"
                                name="parent_id"
                                classNamePrefix="selectInputSearch"
                                options={options}
                                defaultValue={options.find(option => option.value === data.parent_id) || null}
                                onChange={handleChange}
                                placeholder="سمت مورد نظر را وارد کنید"
                                isClearable
                            />
                            {errors.parent_id && <InputError message={errors.parent_id}/>}
                        </div>
                    )
                }
                {!editData && (
                    <div className={"flex items-center gap-2 pr-5 my-3"}>
                        <input className={""} type={'checkbox'} id={"forall"} name={"forall"} checked={data.forall}
                               onChange={() => setData("forall", !data.forall)}/>
                        <InputLabel className={"text-lg"} htmlFor={"forall"}>ثبت برای همه دپارتمان ها</InputLabel>
                    </div>
                )}
                <PrimaryButton disabled={!!progress} type="submit" className="justify-center mt-4">
                    ثبت
                </PrimaryButton>
            </form>
        </Modal>
    );
};

export default PositionCreate;
