import ProjectCard2 from "../ProjectCard2/ProjectCard2"

const ProjectList = () => {

    return(
        <div className="flex flex-col justify-center items-center">
            <ProjectCard2 name="name" title="title" image="image" blurb="blurb"/>
            <ProjectCard2 name="name" title="title" image="image" blurb="blurb"/>
            <ProjectCard2 name="name" title="title" image="image" blurb="blurb"/>
        </div>
    )

}

export default ProjectList