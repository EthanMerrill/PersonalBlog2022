import clsx from 'clsx';

interface projectCardProps {
    title: string;
    subTitle: string;
    image: string;
    blurb?: string;
    extLink?: string;
}


const ProjectCard2 = (props:projectCardProps) => {
    const {title, subTitle, image, blurb, extLink} = props
    return (
        <a href={extLink ? extLink : ''} className='w-3/5 mr-36 sm:mr-auto my-10 mx-auto'>
        <div className="rounded-sm p-5 bg-gray-100 drop-shadow-lg m-0 hover:shadow-lg animate-fade">
            <div className="flex flex-row  justify-start sm:flex-wrap sm:justify-center sm:pb-5 gap-5">
                
                    {/* <img src={image} alt={'name'} className="h-32 w-32 rounded-md" /> */}
              
                <div className="flex flex-col text-sm flex-shrink">
                    <div className="flex flex-row text-lg gap-1 sm:text-sm sm:mx-auto">
                        <h4 className="opacity-90 sm:text-sm">{title}</h4>
                        <h4 className="text-blue-accent sm:text-sm">|</h4>
                        <p className="opacity-50 sm:text-sm">{subTitle}</p>
                    </div>
                    <div className={clsx("text-sm opacity-50 mt-2 text-left", extLink && "pb-8")}>{blurb}</div>
                </div>
                {extLink && 
                    <a href={extLink}>
                        <h3 className="text-sm absolute bottom-3 right-5 cursor-pointer">Read More →</h3>
                    </a>
                }
            </div>
        </div>
        </a>

    )
}

export default ProjectCard2