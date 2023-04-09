import React, { ReactNode } from 'react';

interface IProjectCardCorner{
    title?: string;
    children?: ReactNode;
}

export default function projectCardCorner(props:IProjectCardCorner) {
    return (<>
        <div className="relative overflow-clip bg-gray-100 mr-0 ml-auto w-full rounded-sm pt-10 pb-3 my-10 min-h-[300px] max-h-[500px] align-middle">
            <div className="absolute top-[-90px] left-[-20px] bg-white h-[100px] w-[300px] z-1 rotate-[-12deg]"></div>
            <div className='h-[100%] px-32 '>
            {props.title && <h3 className='mx-auto w-fit text-main-text-gray'>{props.title}</h3>}
            {props.children}
            </div>
        </div>
        </>
    )
}