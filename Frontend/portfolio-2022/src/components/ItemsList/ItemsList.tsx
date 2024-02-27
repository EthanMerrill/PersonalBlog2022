import ProjectCard2 from "../ProjectCard2/ProjectCard2"
import { useEffect, useState } from "react";
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import db from '../../api/clientApp'
import { Project } from "../../types/Project";

const ItemsList = (Projects:boolean) => {
    //This Component can be used to list either the experiences or the projects depending on the data that is passed to it
    const [items, setItems] = useState([])


    useEffect(() => {
        const getExperiences = async () => {
            const projectsRef = collection(db, Projects ? "experience" : "projects");
            const querySnapshot = await getDocs(projectsRef);
            const temp = querySnapshot.docs.map(doc => doc.data())
            // re-order the projects by the startDate field if it exists
            temp.sort((a: DocumentData, b: DocumentData) => {
                    return b.startDate.seconds - a.startDate.seconds;
            });
            setItems(temp as []);
        }
        getExperiences()
    }, [])

    return (
        <div className="flex flex-col justify-center items-center">
            {items.map((experience: Project, i) => {
                return (
                    <ProjectCard2 key={i} title={experience.title} subTitle={experience.subTitle} imageLink={experience.imageLink} imageAlt={experience.imageAlt} blurb={experience.blurb} extLink={experience.extLink} />
                )
            })
            }
        </div>
    )

}

export default ItemsList