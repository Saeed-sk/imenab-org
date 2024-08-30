import React from 'react';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import { DepartmentsPropType, EmployeePropType } from '@/types';
import Select from 'react-select';

interface DepartmentCreateProps {
    editData?: DepartmentsPropType;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    setChanged: React.Dispatch<React.SetStateAction<boolean>>;
    changed: boolean;
    employees: EmployeePropType[];
}

interface OptionType {
    value: number;
    label: string;
}

const DepartmentCreate: React.FC<DepartmentCreateProps> = ({
                                                               editData,
                                                               employees,
                                                               show,
                                                               setShow,
                                                               setChanged,
                                                               changed
                                                           }) => {
    const { data, setData, reset, post, errors, progress } = useForm({
        department_id: editData ? Number(editData.department_id) : undefined,
        name: editData?.name ? editData.name : '',
        department_head: editData?.department_head ? Number(editData.department_head) : null,
    });

    let url = route('admin.create.department');
    if (editData?.department_id) {
        url = route('admin.update.department');
    }

    function submit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        post(url, {
            onSuccess: () => {
                reset();
                setChanged(!changed);
                setShow(false);
                router.reload({ only: ['departments'] });
            },
            onError: () => {
                setShow(true);
            }
        });
    }

    const handleChange = (selectedOption: OptionType | null) => {
        if (selectedOption) {
            setData('department_head', selectedOption.value);
        } else {
            setData('department_head', null);
        }
    };

    let options = employees.map((employee) => {
        return {
            value: employee.employee_id,
            label: employee.first_name + ' ' + employee.last_name
        };
    });

    return (
        <>
            <Modal show={show} onClose={setShow}>
                <form className="flex flex-col p-10 gap-2" onSubmit={(e: React.FormEvent<HTMLFormElement>) => submit(e)}>
                    <InputLabel className="mr-2" htmlFor="department_id" value="آیدی دپارتمان" />
                    <TextInput
                        value={data.department_id ?? ''}
                        id="department_id"
                        name="department_id"
                        onChange={(e) => setData('department_id', Number(e.target.value))} // Convert to number
                    />
                    {errors.department_id && <InputError message={errors.department_id} />}

                    <InputLabel className="mr-2" htmlFor="name" value="نام" />
                    <TextInput
                        value={data.name ?? ''}
                        id="name"
                        name="name"
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name && <InputError message={errors.name} />}

                    <InputLabel className="mr-2" htmlFor="parent_id" value="سرپست" />
                    <Select
                        id="positions_id"
                        name="positions_id"
                        classNamePrefix="selectInputSearch"
                        options={options}
                        defaultValue={
                            data.department_head
                                ? options.find((option) => option.value === data.department_head)
                                : null
                        }
                        onChange={handleChange}
                        placeholder="سمت مورد نظر را وارد کنید"
                        isClearable={true}
                    />
                    {errors.department_head && <InputError message={errors.department_head} />}

                    <PrimaryButton disabled={!!progress} type="submit" className="justify-center mt-4">
                        ثبت
                    </PrimaryButton>
                </form>
            </Modal>
        </>
    );
};

export default DepartmentCreate;
