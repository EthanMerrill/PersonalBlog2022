import './style/style.scss';
// import Projectcard from './components/Projectcard';
import Categorysection from './components/CategorySection/CategorySection';
import ProjectCardCorner from './components/ProjectCardCorner/ProjectCardCorner';
// https://bestofreactjs.com/repo/rafrex-react-router-hash-link--react-router
import AppHeader from './components/AppHeader/AppHeader';
import ProjectList from './components/ProjectList/ProjectList';
import ExperienceList from './components/ExperienceList/ExperienceList'

function App() {



  //get unique categories

  return (
    <div className="app z-10 relative">
      <AppHeader />
      <div>
        <div className="projects-container pt-30 z-10">
          <Categorysection sectionNumber={1} title={'About Me'}>
            <ProjectCardCorner>
              <p className="m-auto h-full px-10 leading-8 font-medium text-main-text-gray max-w-[800px]">Hi, I'm Ethan Merrill. I'm a frontend software engineer with technical leadership experience and an entrepreneurial spirit. I hold a Bachelor of Science in Engineering Management from Worcester Polytechnic Institute. Currently based in Washington, D.C. (remote), I have worked as a Senior Consultant at CapTech where I developed frontend applications for a variety of clients. I have also worked as a Web Design and Development Consultant, creating SEO sites for small business owners and non-profits.
              </p>
            </ProjectCardCorner>
          </Categorysection>
          <Categorysection sectionNumber={2} title={'Experience'}>
            <ExperienceList />
          </Categorysection>
          <Categorysection sectionNumber={3} title={'Projects'}>
            <ProjectList />
          </Categorysection>
          <Categorysection sectionNumber={4} title={'Contact'}>
            <div className='h-[70vh] contain-paint '>
            <div className='h-[70vh] contain-paint bg-navy w-full'>
              <div className='relative  bg-white right-[300px] top-[-50vh] h-[60vh] w-[200vw] rotate-[-15deg] drop-shadow-md'>
              </div>
              
            </div>
            <div className='sticky bottom-36 w-full '>
                <div className=' text-white mx-auto w-1/5 text-center'>
                  <h1>
                    Contact
                  </h1>
                  <a href="mailto:eth22mer@gmail.com"><div className='solid border-[1.5px] rounded border-white w-5/6 h-1/2 mx-auto my-3 text-white text-center p-2'>Drop me a line!</div></a>
                  <p>let's get in touch</p>
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
