import './style/style.scss';
// import Projectcard from './components/Projectcard';
import Categorysection from './components/Categorysection';
import { supabase } from './supabaseClient';
import React, { useEffect, useState } from "react";
// https://bestofreactjs.com/repo/rafrex-react-router-hash-link--react-router

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
              console.log(project.ImagesNames)
              // for each image, get the url
              project.ImagesNames.map(e => {
                getImageUrls(project.Images, e).then(data => {
                  project.ImageURLs.push(data)
                  
                })
                return project
                // console.log(image.name, data)
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

      <header className="App-header">
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;600;700&display=swap" rel="stylesheet"></link>
        <div className="wrapper">
          <div className="rotated-wrapper">
            <div className="base one"></div>
            <div className="base two"></div>
            <div className="base three"></div>
            <div className="base four"></div>
          </div>
        </div>
        <div className='title-container'>
          <h1 className="intro-title">Hi! I'm Ethan<br></br>
            This is what I<br></br> do </h1>
        </div>
      </header >
      <div>
        <div className="projects-container">
          {projects &&
            categories.map((category, i) => {
              const filteredArticles = projects.filter(e => e.Category === category)

              return <Categorysection key={i} props={[filteredArticles, i]}></Categorysection>
            })
          }
          {/* <h2 className='dynamicTitle dt1 sticky'><a href='web'>Web Development</a> </h2> */}
        </div>
      </div>
    </div >
  );
}

export default App;
