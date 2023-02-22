import ProjectCard2 from "../ProjectCard2/ProjectCard2"
import db from '../../api/clientApp'
import { collection, getDocs} from 'firebase/firestore';
import { useEffect, useState } from "react";

const ProjectList = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const getProjects = async () => {
            // console.log(db)
            // console.log((doc(db, "/Project")))
            const projectsRef = collection(db, "projects");
            const querySnapshot = await getDocs(projectsRef);
            const temp = querySnapshot.docs.map(doc => doc.data())
            setProjects(temp as [])
        }
        getProjects()
    }, [])

    return(
        <div className="flex flex-col justify-center items-center">
            {projects.map((project:any, i) => {
                return (
                    <ProjectCard2 key = {i} title={project.title} subTitle={project.subTitle} image={'project.image'} blurb={project.description} extLink={project.extLink}/>
                )
            })
            }
        </div>
    )

}

export default ProjectList