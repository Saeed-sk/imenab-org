import React from 'react';
import Spinner from "@/Components/Spinner";

const Loading = () => {
    return (
        <div className={"absolute top-0 left-0 right-0 bottom-24 flex items-center justify-center"}>
            <Spinner/>
        </div>
    );
};

export default Loading;
