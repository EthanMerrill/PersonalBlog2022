import './style/style.scss';
// import Projectcard from './components/Projectcard';
import Categorysection from './components/CategorySection/CategorySection';
import { supabase } from './api/supabaseClient';
import React, { useEffect, useState } from "react";
// https://bestofreactjs.com/repo/rafrex-react-router-hash-link--react-router
import AppHeader from './components/AppHeader/AppHeader';
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
    data.publicURL = data.publicURL.replace(filename,(folder+"/"+filename))
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
    <div className="app">
      <AppHeader/>
      <div>
        <div className="projects-container pt-30">
          <Categorysection sectionNumber = {1} title={'About Me'}>
                <p className='h-[100vh]'>testing</p>
              </Categorysection>
          <Categorysection sectionNumber = {2} title={'Experience'}>
            <p className='h-[100vh]'>testing</p>
          </Categorysection>
          <Categorysection sectionNumber = {3} title={'Projects'}>
            <p className='h-[100vh]'>testing</p>
          </Categorysection>
          <Categorysection sectionNumber = {4} title={'Contact'}>
            <p className='h-[100vh]'>testing</p>
          </Categorysection>
        </div>
      </div>
    </div >
  );
}

export default App;
