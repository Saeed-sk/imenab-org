import {Head} from '@inertiajs/react';
import {PageProps} from '@/types';
import LayoutSelect from "@/Layouts/LayoutSelect";

import Spinner from "@/Components/Spinner";

export default function Welcome({}: PageProps<{
    laravelVersion: string,
    phpVersion: string
}>) {
    return (
        <>
            <Head title="صفحه اصلی"/>
            <LayoutSelect classNames={"min-h-[85vh] w-full"}>
                <section dir={"ltr"} className={"flex flex-col items-center"}>
                </section>
            </LayoutSelect>
        </>
    );
}
