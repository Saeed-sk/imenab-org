import React from 'react';
import {useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import ImageUpload from "@/Components/ImageUpload";
import {DepartmentsPropType, EmployeePropType, PositionPropType} from "@/types";
import Select from "react-select";


interface EmployeeEditProps {
    departments: Array<DepartmentsPropType>;
    departments_id: number;
    change: boolean;
    editData?: EmployeePropType;
    show: boolean;
    setShow: (value: boolean) => void;
    setChange: (value: boolean) => void;
    positions: PositionPropType[];
}

interface OptionType {
    value: number;
    label: string;
}



const EmployeeEdit: React.FC<EmployeeEditProps> = ({
                                                       departments,
                                                       positions,
                                                       departments_id,
                                                       change,
                                                       setChange,
                                                       editData,
                                                       setShow,
                                                   }) => {
    const {data, setData, reset, post, errors, progress} = useForm<any>({
        created_at: "", updated_at: "",
        employee_id: editData?.employee_id ?? undefined,
        first_name: editData?.first_name ?? "",
        last_name: editData?.last_name ?? "",
        national_id: editData?.national_id ?? "",
        gender: editData?.gender ?? "Male",
        phone_number: editData?.phone_number ?? "",
        email: editData?.email ?? "",
        password: editData?.password ?? "",
        date_of_brith: editData?.date_of_brith ?? "",
        address: editData?.address ?? "",
        hire_date: editData?.hire_date ?? "",
        marital_status: editData?.marital_status ?? "Single",
        status: editData?.status ?? "Active",
        positions_id: editData?.positions_id ?? "",
        departments_id: departments_id,
        children_count: editData?.children_count ?? "",
        image: editData?.image ?? null
    });
    let url: string = route('admin.employees.create');
    if (editData?.employee_id !== undefined) {
        url = route('admin.employees.update');
    }
    let options = positions? positions.map(position => {
        return {
            value: position.id,
            label: position.title + "-" + position.job_title,
        };
    }):[
        {
            value: 0,
            label: 'هیچ سمتی ثبت نشده است',
        }
    ];
    let departmentOptions = departments?.map(department => {
        return {
            value: department.department_id,
            label: department.name,
        };
    });

    const handleChange = (selectedOption: OptionType | null) => {
        setData("positions_id", selectedOption ? selectedOption.value : "");
    };
    const handleChangeDepartment = (selectedOption: OptionType | null) => {
        setData("departments_id", selectedOption ? selectedOption.value : departments_id);
    };

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        post(url, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setChange(!change);
                setShow(false);
            },
            onError: () => {
                setShow(true);
            },
        });
    };

    return (
        <div
            onClick={() => setShow(false)}
            className={"w-full h-full fixed z-[9999] bg-gray-600 bg-opacity-50 flex items-center justify-center left-0 top-0"}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={"w-[90%] mx-auto  z-[9999] bg-white rounded-lg p-10"}
            >
                <form
                    className={"flex flex-col p-10 gap-2 items-center justify-center w-full h-full"}
                    onSubmit={submit}
                >
                    <div className={"flex w-full gap-4"}>
                        <div className={"w-full"}>
                            <ImageUpload
                                source={data.image ?? undefined}
                                onImageUpload={(file: any) => setData("image", file)}
                            />
                            {errors.image && <InputError message={errors.image}/>}
                        </div>
                        <div className={"flex flex-col w-full"}>
                            <div className={"w-full"}>
                                <InputLabel className={"mr-2"} htmlFor={"employee_id"} value="کد پرسنلی"/>
                                <TextInput
                                    defaultValue={data.employee_id}
                                    id={"employee_id"}
                                    className={"w-full"}
                                    name={"employee_id"}
                                    onChange={(e) => setData("employee_id", e.target.value)}
                                />
                                {errors.employee_id && <InputError message={errors.employee_id}/>}
                            </div>

                            <div className={"w-full"}>
                                <InputLabel className={"mr-2"} htmlFor={"first_name"} value="نام"/>
                                <TextInput
                                    defaultValue={data.first_name}
                                    id={"first_name"}
                                    className={"w-full"}
                                    name={"first_name"}
                                    onChange={(e) => setData("first_name", e.target.value)}
                                />
                                {errors.first_name && <InputError message={errors.first_name}/>}
                            </div>
                            <div className={"w-full"}>
                                <InputLabel className={"mr-2"} htmlFor={"last_name"} value="نام خانواندگی"/>
                                <TextInput
                                    defaultValue={data.last_name}
                                    className={"w-full"}
                                    id={"last_name"}
                                    name={"last_name"}
                                    onChange={(e) => setData("last_name", e.target.value)}
                                />
                                {errors.last_name && <InputError message={errors.last_name}/>}
                            </div>
                        </div>

                        <div className={"flex flex-col w-full"}>
                            <div className={"w-full"}>
                                <InputLabel className={"mr-2"} htmlFor={"national_id"} value="کد ملی"/>
                                <TextInput
                                    className={"w-full"}
                                    defaultValue={data.national_id}
                                    id={"national_id"}
                                    name={"national_id"}
                                    onChange={(e) => setData("national_id", e.target.value)}
                                />
                                {errors.national_id && <InputError message={errors.national_id}/>}
                            </div>
                            <div className={"w-full"}>
                                <InputLabel className={"mr-2"} htmlFor={"children_count"} value="تعداد فرزندان"/>
                                <TextInput
                                    className={"w-full"}
                                    defaultValue={data.children_count}
                                    id={"children_count"}
                                    name={"children_count"}
                                    onChange={(e) => setData("children_count", e.target.value)}
                                />
                                {errors.children_count && <InputError message={errors.children_count}/>}
                            </div>
                            <div className="w-full">
                                <InputLabel className={"mr-2"} htmlFor={"email"} value="ایمیل"/>
                                <TextInput
                                    className={"text-right w-full"}
                                    dir={"ltr"}
                                    type={"email"}
                                    defaultValue={data.email}
                                    id={"email"}
                                    name={"email"}
                                    onChange={(e) => setData("email", e.target.value)}
                                />
                                {errors.email && <InputError message={errors.email}/>}
                            </div>
                        </div>
                    </div>

                    <div className={"flex gap-5 w-full"}>
                        <div className={"w-full"}>
                            <InputLabel className={"mr-2"} htmlFor={"departments_id"} value="دپارتمان"/>
                            <Select
                                id={"departments_id"}
                                name={"departments_id"}
                                classNamePrefix={"selectInputSearch"}
                                options={departmentOptions}
                                defaultValue={data.departments_id ? departmentOptions?.find(option => Number(option.value) === Number(data.departments_id)) : null}
                                onChange={handleChangeDepartment}
                                placeholder="سمت مورد نظر را وارد کنید"
                                isClearable={true}
                            />
                            {errors.departments_id && <InputError message={errors.departments_id}/>}
                        </div>

                        <div className={"w-full"}>
                            <InputLabel className={"mr-2"} htmlFor={"positions_id"} value="سمت"/>
                            <Select
                                id={"positions_id"}
                                name={"positions_id"}
                                classNamePrefix={"selectInputSearch"}
                                options={options}
                                defaultValue={data.positions_id ? options.find(option => option.value === data.positions_id) : null}
                                onChange={handleChange}
                                placeholder="سمت مورد نظر را وارد کنید"
                                isClearable={true}
                            />
                            {errors.positions_id && <InputError message={errors.positions_id}/>}
                        </div>

                        <div className={"w-full"}>
                            <InputLabel className={"mr-2"} htmlFor={"last_name"} value="رمز عبور"/>
                            <TextInput
                                defaultValue={data.password}
                                className={"w-full"}
                                id={"password"}
                                name={"password"}
                                onChange={(e) => setData("password", e.target.value)}
                            />
                            {errors.password && <InputError message={errors.password}/>}
                        </div>
                        <div className={"w-full"}>
                            <InputLabel className={"mr-2"} htmlFor={"phone_number"} value="شماره تماس"/>
                            <TextInput
                                className={"w-full text-right"}
                                dir={"ltr"}
                                type={"text"}
                                defaultValue={data.phone_number}
                                id={"phone_number"}
                                name={"phone_number"}
                                onChange={(e) => setData("phone_number", e.target.value)}
                            />
                            {errors.phone_number && <InputError message={errors.phone_number}/>}
                        </div>
                    </div>

                    <div className={"flex w-full gap-5"}>
                        <div className={"w-full"}>
                            <InputLabel className={"mr-2"} htmlFor={"date_of_brith"} value="تاریخ تولد"/>
                            <DatePicker
                                containerClassName={"w-full datepickerInput"}
                                inputClass={"w-full"}
                                value={data.date_of_brith}
                                onChange={(date) => setData("date_of_brith", date?.toString() ?? "")}
                                format={"YYYY-MM-DD"}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition={"bottom-right"}
                                inputMode={"none"}
                            />
                            {errors.date_of_brith && <InputError message={errors.date_of_brith}/>}
                        </div>

                        <div className={"w-full"}>
                            <InputLabel className={"mr-2"} htmlFor={"hire_date"} value="تاریخ استخدام"/>
                            <DatePicker
                                containerClassName={"w-full datepickerInput"}
                                inputClass={"w-full"}
                                value={data.hire_date}
                                onChange={(date) => setData("hire_date", date?.toString() ?? "")}
                                format={"YYYY-MM-DD"}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition={"bottom-right"}
                                inputMode={"none"}
                            />
                            {errors.hire_date && <InputError message={errors.hire_date}/>}
                        </div>
                        <div className={"w-full"}>
                            <InputLabel className={"mr-2"} htmlFor={"address"} value="آدرس"/>
                            <TextInput
                                defaultValue={data.address}
                                className={"w-full"}
                                id={"address"}
                                name={"address"}
                                onChange={(e) => setData("address", e.target.value)}
                            />
                            {errors.address && <InputError message={errors.address}/>}
                        </div>
                    </div>

                    <div className={"flex gap-5 w-full items-center"}>
                        <div className={"flex flex-col w-full"}>
                            <InputLabel className={"mr-2"} htmlFor={"gender"} value="جنسیت"/>
                            <select
                                className={"rounded-lg border-gray-300 focus:ring-0 w-full h-[38px] text-sm"}
                                value={data.gender}
                                onChange={(e) => setData("gender", e.target.value)}
                            >
                                <option value="Male">مرد</option>
                                <option value="Female">زن</option>
                            </select>
                            {errors.gender && <InputError message={errors.gender}/>}
                        </div>
                        <div className={"flex flex-col w-full"}>
                            <InputLabel className={"mr-2"} htmlFor={"marital_status"} value="وضعیت تاهل"/>
                            <select
                                className={"rounded-lg border-gray-300 focus:ring-0 w-full h-[38px] text-sm"}
                                value={data.marital_status}
                                onChange={(e) => setData("marital_status", e.target.value)}
                            >
                                <option value="Single">مجرد</option>
                                <option value="Married">متاهل</option>
                            </select>
                            {errors.marital_status && <InputError message={errors.marital_status}/>}
                        </div>
                        <div className={"flex flex-col w-full"}>
                            <InputLabel className={"mr-2"} htmlFor={"status"} value="وضعیت"/>
                            <select
                                className={"rounded-lg border-gray-300 focus:ring-0 w-full h-[38px] text-sm"}
                                value={data.status}
                                onChange={(e) => setData("status", e.target.value)}
                            >
                                <option value="Active">فعال</option>
                                <option value="Inactive">غیرفعال</option>
                            </select>
                            {errors.status && <InputError message={errors.status}/>}
                        </div>
                    </div>

                    <div className={"flex gap-5 w-full mt-5"}>
                        <PrimaryButton type="submit" className="px-10 py-4 w-full items-center justify-center">
                            ثبت
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeEdit;
