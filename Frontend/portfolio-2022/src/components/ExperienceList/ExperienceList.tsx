import ProjectCard2 from "../ProjectCard2/ProjectCard2"
import { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import db from '../../api/clientApp'
import { Project } from "../../types/Project";
const ExperienceList = () => {
    const [experiences, setExperiences] = useState([])

    useEffect(() => {
        const getExperiences = async () => {
            // console.log(db)
            // console.log((doc(db, "/Project")))
            const projectsRef = collection(db, "experience");
            const querySnapshot = await getDocs(projectsRef);
            const temp = querySnapshot.docs.map(doc => doc.data())
            setExperiences(temp as [])
        }
        getExperiences()
    }, [])

    return(
        <div className="flex flex-col justify-center items-center">
            {experiences.map((experience:Project, i) => {
                return (
                    <ProjectCard2 key = {i} title={experience.title} subTitle={experience.subTitle} imageLink={experience.imageLink} imageAlt={experience.imageAlt} blurb={experience.blurb} extLink={experience.extLink}/>
                )
            })
            }
        </div>
    )

}

export default ExperienceList