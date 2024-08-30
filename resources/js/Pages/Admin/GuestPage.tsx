import React from 'react';
import LayoutSelect from "@/Layouts/LayoutSelect";
import ErrorComp from "@/Components/ErrorComp";

const GuestPage = () => {
    return (
        <LayoutSelect classNames={"grid grid-cols-1 w-full h-full items-center justify-center"}>
            <div className={"text-center text-3xl"}>
                <ErrorComp text={"هیچ نقشی برای شما ثبت نشده با ادمین هماهنگ شوید"} />
            </div>
        </LayoutSelect>
    );
};

export default GuestPage;
