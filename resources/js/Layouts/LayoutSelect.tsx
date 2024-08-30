import React, {PropsWithChildren, ReactNode} from 'react';
import {usePage} from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Guest from "@/Layouts/GuestLayout";
import {User} from "@/types";

interface Props {
    classNames?: string
}


interface ErrorsType {
    [key: string]: string[];
}

interface ErrorBag {
    [key: string]: string[];
}

interface AuthType {
    user: User
}

interface PageProp {
    errors: Error & ErrorBag;
    auth?:AuthType;
    [key:string]:any
}

const LayoutSelect: React.FC<PropsWithChildren<Props>> = ({children, classNames}) => {
    const {auth} = usePage<PageProp>().props
    if (auth?.user) {
        return <Authenticated classNames={classNames ?? ""} children={children} user={auth.user}/>
    } else {
        return <Guest classNames={classNames ?? ""} children={children}/>
    }
};

export default LayoutSelect;
