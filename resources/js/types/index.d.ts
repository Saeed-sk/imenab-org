import {Dispatch, SetStateAction} from "react";


export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface PositionPropType {
    id: number;
    title: string;
    description: string;
    min_salary: string;
    max_salary: string;
    parent_id: number | null;
    departments_id: number;
    created_at: string;
    updated_at: string;
    parent: PositionPropType;
    employee?: EmployeePropType
    job_title: string
}

export interface Employee {
    employee_id: number;
    image: string;
    first_name: string;
    last_name: string;
    national_id: string;
    gender: string;
    phone_number: string;
    email: string;
    date_of_brith: string;
    address: string;
    hire_date: string;
    marital_status: string;
    status: string;
    positions_id: number | null;
    departments_id: number;
    children_count: number;
    created_at: string;
    updated_at: string;
    password: string,
    position?: PositionPropType
}

export interface DepartmentsPropType {
    department_id: number;
    name: string;
    department_head: number;
    created_at: string;
    updated_at: string;
}

export interface EmployeePropType {
    employee_id: number;
    image: string;
    first_name: string;
    last_name: string;
    national_id: string;
    gender: string;
    phone_number: string;
    email: string;
    date_of_brith: string;
    address: string;
    hire_date: string;
    marital_status: string;
    status: string;
    positions_id: number | null;
    departments_id: number;
    children_count: number;
    created_at: string;
    updated_at: string;
    password: string,
    position?: PositionPropType,
    department?: DepartmentsPropType
}
export interface PaginatedEmployees {
    current_page: number;
    data: EmployeePropType[];
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


export interface Link {
    url: string | null;
    label: string;
    active: boolean;
}


export interface PaginationLinks {
    links?: Link[];
    params: number;
    setParams: Dispatch<SetStateAction<number>>
}


export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    departments: Array<DepartmentsPropType>;
};
