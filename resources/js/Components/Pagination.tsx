import React, {useEffect, useState} from 'react';
import {Link, PaginationLinks} from "@/types";


const Pagination: React.FC<PaginationLinks> = ({links, setParams}) => {
    if (!links) {
        return null;
    }
    let paramsTotal: number = links?.length - 2;
    const [paginates, setPaginates] = useState<number[]>([])
    useEffect(() => {
        for (let i = 1; i <= paramsTotal; i++) {
            setPaginates(prevState => [...prevState, i])
        }
    }, []);
    if (paginates) {
        return (
            <nav className={"w-full text-center"} aria-label="navigation">
                <ul className="inline-flex -space-x-px text-base h-10 rounded-lg overflow-hidden">
                    {links?.map((link: Link, index: number) => {
                        if (index !== 0 && index !== links?.length - 1) {
                            if (link.active) {
                                return (
                                    <li key={index} onClick={() => setParams(Number(link.label))}
                                        className={`cursor-pointer flex items-center justify-center px-4 h-10 leading-tight border border-gray-700 text-gray-400 bg-gray-600 hover:text-white`}>
                                        {link.label}
                                    </li>
                                );
                            } else {
                                return (
                                    <li key={index} onClick={() => setParams(Number(link.label))}
                                        className={`cursor-pointer flex items-center justify-center px-4 h-10 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white`}>
                                        {link.label}
                                    </li>
                                );
                            }
                        }
                    })}
                </ul>
            </nav>
        )
    }
};

export default Pagination;
