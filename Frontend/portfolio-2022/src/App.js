import './style/style.scss';
import Categorysection from './components/CategorySection/CategorySection';
import ProjectCardCorner from './components/ProjectCardCorner/ProjectCardCorner';
// https://bestofreactjs.com/repo/rafrex-react-router-hash-link--react-router
import AppHeader from './components/AppHeader/AppHeader';
import React from 'react';
import ItemsList from './components/ItemsList/ItemsList';
import SocialLinks from './components/SocialLinks/SocialLinks';
import AboutMeSection from './components/AboutMeSection/AboutMeSection';

export default function App() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 700;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);


  return (
    <div className='main-body'>
      <div className='easter-egg absolute top-[-10px]'><p className=' z-10 relative text-white'>Hello again!</p></div>
      <div className="app z-10 relative">
        <AppHeader />
        <SocialLinks className='rotated-wrapper' />
        <div>
          <div className="projects-container pt-30 z-10">
            {/* <Categorysection sectionNumber={1} title={'About Me'}>
            <AboutMeSection width={width} breakpoint={breakpoint} />
            </Categorysection> */}
            <Categorysection sectionNumber={2} title={'Experience'}>
              <ItemsList Projects={true} />
            </Categorysection>
            <Categorysection sectionNumber={3} title={'Projects'}>
              <ItemsList Projects={false} />
            </Categorysection>
            <ProjectCardCorner title='Ideas List'>
              <div className='mt-8 mx-8 flex flex-col justify-center'>
                <div className='flex flex-wrap'>
                  <div className='basis-2/3 sm:basis-full py-3 text-main-text-gray'>
                    Everyone has ideas. The key is in the execution. To keep track and hold myself accountable, I keep a list of ideas for projects which I think would be interesting, fun, and maybe even profitable. Ideas are marked as <span className='inline rounded-full px-2 bg-notion-green'>Live</span>, <span className='inline rounded-full px-2 bg-notion-brown'>Abandoned</span>, or <span className='inline rounded-full px-2 bg-notion-gray'> Not Started</span>.
                    <br /> <br /> If you're interested in collaborating on any of these projects, please reach out!
                  </div>
                  <div className='basis-1/3 sm:basis-full my-auto'>
                    <a href="https://observant-book-583.notion.site/0013220bce5a49c08a1c8b49b9983c94?v=1b7fd37991bc4c63a0295d05c47c2d94"><div className='hover:bg-blue-accent hover:text-white solid border-[1.5px] rounded border-white w-40 mx-auto my-auto text-main-text-gray text-center p-2'>View Ideas List →</div></a>
                  </div>

                </div>
              </div>
            </ProjectCardCorner>
            <Categorysection sectionNumber={4} title={'Contact'}>
              <div className='h-[70vh] '>
                <div className='h-[70vh] contain-paint bg-navy w-full'>
                  <div className='relative  bg-white right-[300px] top-[-50vh] h-[70vh] w-[200vw] rotate-[-15deg] drop-shadow-md'>
                  </div>

                </div>
                <div className='sticky bottom-36 w-full '>
                  <div className=' text-white mx-auto w-4/5 text-center'>
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
    </div>
  );
}