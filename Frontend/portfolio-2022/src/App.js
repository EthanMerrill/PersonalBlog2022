import './style/style.scss';
// import Projectcard from './components/Projectcard';
import Categorysection from './components/CategorySection/CategorySection';
import { supabase } from './api/supabaseClient';
import React, { useEffect, useState } from "react";
import ProjectCardCorner from './components/ProjectCardCorner/ProjectCardCorner';
// https://bestofreactjs.com/repo/rafrex-react-router-hash-link--react-router
import AppHeader from './components/AppHeader/AppHeader';
import ProjectList from './components/ProjectList/ProjectList';
import ExperienceList from './components/ExperienceList/ExperienceList'

function App() {

  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const getProjects = async () => {
    const resp = await supabase
      .from('Projects')
      .select()
    // .orderBy('EndDate', 'desc')
    return resp
  }

  const getImages = async () => {
    const { data, error } = await supabase
      .storage
      // .listBuckets()
      .from('project-photos')
      .list()
    if (error) {
      console.log(error)
    }
    return (data)
  }

  const getImageFolderFiles = async (folder) => {
    const { data, error } = await supabase
      .storage
      .from('project-photos')
      .list(folder)
    return (data)
  }

  const getImageUrls = async (folder, filename) => {
    const { data, error } = await supabase
      .storage
      .from('project-photos')
      .getPublicUrl(filename)
    data.publicURL = data.publicURL.replace(filename, (folder + "/" + filename))
    return (data.publicURL)
  }

  useEffect(() => {
    getProjects().then(data => { setProjects(data.data); });
  }, [])

  // Description
  useEffect(() => {
    getImages().then(data => {
      projects.map(project => {
        // if the projects row has a value for images, let the hunting begin
        if (project.Images) {
          // look for a matching value in the images storage array
          const image = data.find(e => project.Images === e.name)
          // if the imagefolder is found, get the filenames from the folder
          if (image) {
            getImageFolderFiles(image.name).then(data => {
              project.ImageURLs = []
              project.ImagesNames = data.filter(e => e.name !== ".emptyFolderPlaceholder").map(e => e.name)
              // for each image, get the url
              project.ImagesNames.map(e => {
                getImageUrls(project.Images, e).then(data => {
                  project.ImageURLs.push(data)
                })
                return project
              })
            })
          }
        }
        return project
      })
    })
  }, [projects])

  useEffect(() => {
    const categories = [...new Set(projects.map(e => e.Category))];
    setCategories(categories);
  }, [projects])

  //get unique categories

  return (
    <div className="app z-10 relative">
      <AppHeader />
      <div>
        <div className="projects-container pt-30 z-10">
          <Categorysection sectionNumber={1} title={'About Me'}>
            <ProjectCardCorner>
                <p className="m-auto px-10 leading-8 font-medium text-main-text-gray">I’ve always been a maker. Both in physical and virtual world. I started in mechanical design with 3d printing and computer aided design in college, then transitioned to building applications in the virtual space. I have a passion for making beautiful online experiences. Right now I’m building web applications for fortune 500 clients with the consulting firm CapTech.
                </p>
            </ProjectCardCorner>
          </Categorysection>
          <Categorysection sectionNumber={2} title={'Experience'}>
            <ExperienceList/>
          </Categorysection>
          <Categorysection sectionNumber={3} title={'Projects'}>
            <ProjectList/>
          </Categorysection>
          <Categorysection sectionNumber={4} title={'Contact'}>
            <div className='relative overflow-hidden bg-navy h-[100vh] w-[100vw]'>
              <div className='relative  bg-white right-[300px] top-[-50vh] h-[70vh] w-[200vw] rotate-[-15deg] drop-shadow-sm'>
              </div>
              <div className='sticky top-0'>
              <div className='text-green w-full h-[20vh] flex justify-center'>
                  <div className=''>
                  <h1>
                    Contact
                  </h1>
                  <p>let's get in touch</p>
                  </div>
                </div>
                </div>
              </div>
          </Categorysection>
        </div>
      </div>
    </div >
  );
}

export default App;
