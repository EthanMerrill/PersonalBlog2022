import './style/style.scss';
import Projectcard from './components/Projectcard';
import Categorysection from './components/Categorysection';
import {supabase} from './supabaseClient';
import React, { useEffect, useState } from "react";

function App() {

  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);

  const getProjects = async () => {
    const resp = await supabase
    .from('Projects')
    .select()
    // .orderBy('created_at', 'desc')
    return resp
  }
  useEffect(() => {
    getProjects().then(data => { setProjects(data.data); console.log(data)});
  }, [])

  useEffect(()=>{
    console.log(projects)
    const categories = [...new Set(projects.map(e => e.P_Category))];
    setCategories(categories);
  },[projects])

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
          <h1 className="intro-title">Hi! I'm Ethan.<br></br>
            Here are some projects I've worked on</h1>
        </div>
      </header >

      
        {projects &&
          <Categorysection props={projects.filter(e =>  e.P_Category === categories[0])}></Categorysection>
        }
        {/* <h2 className='dynamicTitle dt1 sticky'><a href='web'>Web Development</a> </h2> */}
          <div id = 'web' className='all-cards-container'>
            <Projectcard></Projectcard>
            <Projectcard></Projectcard>
            <Projectcard></Projectcard>
          </div>
          <h2 className="dynamicTitle dt2 sticky-bottom dt2"> <a href='#design'> Mechanical Design</a> </h2>   
          {/* <h2 className="dynamicTitle dt2 sticky-bottom"> Mechanical Design </h2>             */}
          <div id='design' className='all-cards-container'>
            <Projectcard></Projectcard>
            <Projectcard></Projectcard>
            <Projectcard></Projectcard>
          </div>
        <h2 className="dynamicTitle dt2 sticky-bottom dt3"> <a href='#marine'> Marine Experience </a></h2>   
          <div id ='marine' className='all-cards-container'>
            <Projectcard></Projectcard>
            <Projectcard></Projectcard>
            <Projectcard></Projectcard>
          </div>
      
    </div >
  );
}

export default App;
