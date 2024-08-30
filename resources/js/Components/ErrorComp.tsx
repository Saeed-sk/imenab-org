import React from 'react';

interface Props {
    className?: string
    text: string
}

const ErrorComp: React.FC<Props> = ({className, text}) => {
    return (
        <h1 className={`text-red-800 text-2xl pb-24 w-full h-full font-semibold flex justify-center items-center animate-pulse ${className}`}>{text}</h1>
    );
};

export default ErrorComp;
