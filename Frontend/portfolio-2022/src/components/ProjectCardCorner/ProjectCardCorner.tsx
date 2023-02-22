import React, { ReactNode } from 'react';

interface IProjectCardCorner{
    title?: string;
    children?: ReactNode;
}

export default function projectCardCorner(props:IProjectCardCorner) {
    return (
        <div className="relative overflow-clip bg-light-gray mr-0 ml-auto w-full rounded-sm pt-10 pb-3 my-10">
            <div className="absolute top-[-90px] left-[-20px] bg-white h-[100px] w-[300px] z-1 rotate-[-15deg]"></div>
            <h3>{props.title}</h3>
            <div className='flex justify-center align-middle content-center h-full'>
            {props.children}
            </div>
        </div>
    )
}