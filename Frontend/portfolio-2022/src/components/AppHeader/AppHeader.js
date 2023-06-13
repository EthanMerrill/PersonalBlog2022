import SocialLinks from "../SocialLinks/SocialLinks";

const AppHeader = () => {
    // JSX return
    return(
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
            <SocialLinks className='rotated-wrapper'/>
        </div>
        <div className='title-container'>
          <h1 className="intro-title">Hi! I'm Ethan<br></br>
            This is what I do </h1>
        </div>
         
      </header >
    )
}

export default AppHeader