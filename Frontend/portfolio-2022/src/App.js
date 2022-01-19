import './style/style.scss';
import Projectcard from './components/Projectcard';


function App() {


  return (
    <div className="app">
      <header className="App-header">
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;600;700&display=swap" rel="stylesheet"></link>
        <div class="wrapper">
          <div className="rotated-wrapper">
            <div class="base one"></div>
            <div class="base two"></div>
            <div class="base three"></div>
            <div class="base four"></div>
          </div>
        </div>
        <div className='title-container'>
          <h1 className="intro-title">Hi! I'm Ethan.<br></br>
            Here are some projects I've worked on</h1>
        </div>

      </header>
      <body>
        <section className="section1">
          <h2 className="dynamicTitle"> Web Development </h2>
          <div className='all-cards-container'>
            <Projectcard></Projectcard>
            <Projectcard></Projectcard>
            <Projectcard></Projectcard>
          </div>
        </section>
      </body>
    </div>
  );
}

export default App;
