import React, { useEffect, useState } from "react";
import ProjectCard2 from "../ProjectCard2/ProjectCard2";
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import db from '../../api/clientApp';
import { Project } from "../../types/Project";

interface ItemsListProps {
    Projects: boolean;
}

const ItemsList: React.FC<ItemsListProps> = ({ Projects }) => {
    // This Component can be used to list either the experiences or the projects depending on the data that is passed to it
    const [items, setItems] = useState<Project[]>([]);

    useEffect(() => {
        const getExperiences = async () => {
            const projectsRef = collection(db, Projects ? "experience" : "projects");
            const querySnapshot = await getDocs(projectsRef);
            const temp = querySnapshot.docs.map(doc => doc.data() as Project);
            // re-order the projects by the startDate field if it exists
            // temp.sort((a, b) => {
            //     if (!a.startDate || !b.startDate) return 1;
            //     return b.startDate.getSeconds() - a.startDate?.getSeconds();
            // });
            setItems(temp);
        };
        getExperiences();
    }, [Projects]);

    return (
        <div className="flex flex-col justify-center items-center">
            {items.map((experience, i) => (
                <ProjectCard2
                    key={i}
                    title={experience.title}
                    subTitle={experience.subTitle}
                    imageLink={experience.imageLink}
                    imageAlt={experience.imageAlt}
                    blurb={experience.blurb}
                    extLink={experience.extLink}
                    startDate={experience.startDate}
                />
            ))}
        </div>
    );
};

export default ItemsList;