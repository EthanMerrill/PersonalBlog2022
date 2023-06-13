import React, { ReactNode } from 'react';

interface IProjectCardCorner{
    title?: string;
    children?: ReactNode;
}

export default function projectCardCorner(props:IProjectCardCorner) {
    return (<>
        <div className="relative overflow-clip bg-gray-100 mr-0 ml-auto w-full rounded-sm pt-10 pb-3 max-h-[500px] align-middle">
            <div className="absolute top-[-90px] left-[-20px] bg-white h-[100px] w-[300px] z-1 rotate-[-12deg]"></div>
            <div className=' px-32 sm:px-0 h-max'>
            {props.title && <h3 className='mx-auto w-fit text-main-text-gray'>{props.title}</h3>}
            {props.children}
            </div>
        </div>
        </>
    )
}