import './style/style.scss';
import Categorysection from './components/Categorysection';
import { supabase } from './supabaseClient';
import React, { useEffect, useState } from "react";

function App() {

  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [folders, setFolders] = useState(null);

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

  const getImageUrls = async (path) => {
    const { data, error } = await supabase
      .storage
      .from('project-photos')
      .getPublicUrl(path)

    return (data)
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
              project.Images = data.map(e => e.name)
              // for each image, get the url
              project.Images.map(e => {
                getImageUrls(e).then(data => {
                  project.Images = data
                })
              })
            })
          }
        }
      })
    })

    // get Image folders
    // look for image folders that match the image column contents of the projects

    // getImageFolders().then((data) => {
    //   var projectsWithImages = folders.map(e => {
    //     var matchingProject = projects.filter(project => project.Images = e.name)
    //     if (matchingProject.length > 0) {
    //         var images = getImageFolderFiles(e.name)
    //           .then((data) => {
    //             var images = []
    //             data.forEach(i => {
    //               getImageUrls(i.name+data)
    //                 .then((data) => {
    //                   images.push(data)
    //                   console.log(data)
    //                 })
    //             })
    //             console.log(images)
    //             return images

    //           })
    //     }
    // //     // console.log(matchingProject)
    // //     matchingProject[0].Images = images
    // //     return (matchingProject)
    //   })
    //   console.log(projectsWithImages)
    // })

    // if match, store the image folder name in the project object
  }, [projects])

  useEffect(() => {
    const categories = [...new Set(projects.map(e => e.P_Category))];
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
            Here are some of my projects</h1>
        </div>
      </header >
      <div>
        <div className="projects-container">
          {projects &&
            categories.map((category, i) => {
              var filteredArticles = projects.filter(e => e.P_Category === category)

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
