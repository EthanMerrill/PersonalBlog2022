import clsx from 'clsx';
interface projectCardProps {
    title: string;
    subTitle: string;
    blurb?: string;
    extLink?: string;
    imageLink?: string;
    imageAlt?: string;
}


const ProjectCard2 = (props:projectCardProps) => {
    const {title, subTitle, imageAlt, imageLink, blurb, extLink} = props
    return (
        <>
        <a href={extLink ? extLink : ''} className='w-3/5 mr-36 sm:mr-auto my-6 mx-auto'>
        <div className="rounded-sm bg-gray-100 drop-shadow-lg m-0 hover:shadow-lg transition-shadow animate-fade flex flex-row md:flex-wrap ">
            {(imageLink && imageAlt) &&
                    <img src={imageLink} alt={imageAlt} className="object-cover w-52 md:w-full md:h-32 md:rounded-t-sm rounded-l-sm flex-shrink-0" />
                }
            <div className="flex flex-row p-5 justify-start sm:flex-wrap sm:justify-center sm:pb-5 gap-5 flex-shrink">
                <div className="flex flex-col text-sm flex-shrink">
                    <div className="flex flex-row flex-wrap text-lg gap-1 sm:text-sm sm:mx-auto md:pb-4">
                        <h4 className="opacity-90 sm:text-sm text-main-text-gray">{title}</h4>
                        <h4 className="text-blue-accent md:hidden">|</h4>
                        <p className="opacity-80 sm:text-sm text-main-text-gray">{subTitle}</p>
                    </div>
                    <div className={clsx("text-sm text-main-text-gray opacity-80 mt-2 text-left", extLink && "pb-8")}>{blurb}</div>
                </div>
                {extLink && 
                    <a href={extLink}>
                        <h3 className="text-sm absolute bottom-3 right-5 cursor-pointer">Read More →</h3>
                    </a>
                }
            </div>
        </div>
        </a>
        </>

    )
}

export default ProjectCard2