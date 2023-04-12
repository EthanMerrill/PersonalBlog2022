import './style/style.scss';
// import Projectcard from './components/Projectcard';
import Categorysection from './components/CategorySection/CategorySection';
import ProjectCardCorner from './components/ProjectCardCorner/ProjectCardCorner';
// https://bestofreactjs.com/repo/rafrex-react-router-hash-link--react-router
import AppHeader from './components/AppHeader/AppHeader';
import ProjectList from './components/ProjectList/ProjectList';
import ExperienceList from './components/ExperienceList/ExperienceList'
import { TypeAnimation } from 'react-type-animation';

export default function App() {

  return (
    <body>
      <div className='easter-egg absolute top-[-10px]'><p className=' z-10 relative text-white'>Hello again!</p></div>
      <div className="app z-10 relative">
        <AppHeader />
        <div>
          <div className="projects-container pt-30 z-10">
            <Categorysection sectionNumber={1} title={'About Me'}>
              <ProjectCardCorner>
                <TypeAnimation
                  className="m-auto h-full px-10 leading-8 font-medium text-main-text-gray max-w-[800px]"
                  sequence={[
                    `Hi, I'm Ethan Merrill. I'm a frontend software engineer. I hold a Bachelor of Science in Engineering Management from Worcester Polytechnic Institute.`, // Deletes 'One' and types 'Two'
                    1000, // Waits 2s
                    `Hi, I'm Ethan Merrill. I'm a frontend software engineer. I hold a Bachelor of Science in Engineering Management from Worcester Polytechnic Institute. Currently based in Washington, D.C. (remote), I have worked as a Senior Consultant at CapTech where I developed frontend applications for a variety of clients.`, // Types 'Three' without deleting 'Two'
                    1000, // 
                    `Hi, I'm Ethan Merrill. I'm a frontend software engineer. I hold a Bachelor of Science in Engineering Management from Worcester Polytechnic Institute. Currently based in Washington, D.C. (remote), I have worked as a Senior Consultant at CapTech where I developed frontend applications for a variety of clients. I have also worked as a Web Design and Development Consultant, creating SEO sites for small business owners and non-profits.`,
                    () => {
                      console.log('Sequence completed'); // Place optional callbacks anywhere in the array
                    }
                  ]}
                  wrapper="p"
                  cursor={true}
                  repeat={0}
                  speed={75}
                // style={{ fontSize: '2em', display: 'inline-block' }}
                />
              </ProjectCardCorner>
            </Categorysection>
            <Categorysection sectionNumber={2} title={'Experience'}>
              <ExperienceList />
            </Categorysection>
            <Categorysection sectionNumber={3} title={'Projects'}>
              <ProjectList />
            </Categorysection>
            <ProjectCardCorner title='Ideas List'>
              <div  className='mt-8 flex flex-col justify-center'>
                <div className='flex'>
                  <div className='basis-2/3 py-3 text-main-text-gray'>
                    Everyone has ideas. The key is in the execution. To keep track and hold myself accountable, I keep a list of ideas for projects which I think would be interesting, fun, and maybe even profitable. Ideas are marked as <span className='inline rounded-full px-2 bg-notion-green'>Live</span>, <span className='inline rounded-full px-2 bg-notion-brown'>Abandoned</span>, or <span className='inline rounded-full px-2 bg-notion-gray'> Not Started</span>. 
                    <br/> <br/> If you're interested in collaborating on any of these projects, please reach out!
                  </div>
                  <div className='basis-1/3 my-auto'>
                    <a href="https://observant-book-583.notion.site/0013220bce5a49c08a1c8b49b9983c94?v=1b7fd37991bc4c63a0295d05c47c2d94"><div className='hover:bg-blue-accent hover:text-white solid border-[1.5px] rounded border-white w-40 mx-auto my-auto text-main-text-gray text-center p-2'>View Ideas List →</div></a>
                  </div>

                </div>
              </div>
            </ProjectCardCorner>
            <Categorysection sectionNumber={4} title={'Contact'}>
              <div className='h-[70vh] '>
                <div className='h-[70vh] contain-paint bg-navy w-full'>
                  <div className='relative  bg-white right-[300px] top-[-50vh] h-[60vh] w-[200vw] rotate-[-15deg] drop-shadow-md'>
                  </div>

                </div>
                <div className='sticky bottom-36 w-full '>
                  <div className=' text-white mx-auto w-1/5 text-center'>
                    <h1 className='text-xl'>
                      Contact
                    </h1>
                    <a href="mailto:eth22mer@gmail.com"><div className='hover:bg-white hover:text-navy solid border-[1.5px] rounded border-white w-40 h-1/2 mx-auto my-3 text-white text-center p-2'>Drop me a line!</div></a>
                    <p>let's get in touch</p>
                  </div>
                </div>
              </div>
            </Categorysection>
          </div>
        </div>
      </div >
    </body>
  );
}