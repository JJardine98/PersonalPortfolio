import React, { useContext } from 'react';
import '../CSS/MainStyle.css';
import { SocialIcon } from 'react-social-icons';
import 'react-social-icons/github';
import 'react-social-icons/linkedin';
import 'react-social-icons/email';
import {ThemeContext} from '../ThemeProvider';
import profilePic from '../profile.jpg'
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };


  return (
    <div className={`home ${theme}`}>
      <section className="hero">
        <div className="container">
          <h2>Hello, I'm Jarod Jardine</h2>
          <img src={profilePic} alt="Profile" className="profile-picture" />
          <p>Full Stack Developer</p>
        </div>
        <div className="container">
          <p>
            Programmer Analyst - New Brunswick Community College - Saint John Campus 2023-2025 - Graduating Date: June 2025
          </p>
        </div>
        <div className="container">
          <p>
            I specialize in MERN (MongoDB, Express, React, Node.js) stack development. Passionate about creative user-friendly, responsive and visually appealing web applications, I am always looking for ways to expand my skills as a web/software developer.
          </p>
        </div>
        
        <div className="social-icons">
          <SocialIcon url="https://www.github.com/JJardine98" />
          <SocialIcon url="https://www.linkedin.com/in/jarod-jardine-40b7b12b3/" />
          <SocialIcon url="mailto:jjardine07@mynbcc.ca" />
        </div>
        <p>Connect With Me</p>

        {/* Theme selector dropdown */}
        <div className="theme-selector">
          <label htmlFor="theme">Choose Theme: </label>
          <select value={theme} onChange={handleThemeChange}>
          <option value="light">Crimson</option>
          <option value="dark">Dark</option>
          {/* Add more themes as needed */}
      </select>
        </div>
      </section>

      <section className="skills">
  <div className="container">
    <h2>Skills & Technologies</h2>

    <h3>Programming Languages</h3>
    <ul>
      <li><a href="https://developer.mozilla.org/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer">JavaScript (ES6+)</a></li>
      <li><a href="https://learn.microsoft.com/dotnet/csharp/" target="_blank" rel="noopener noreferrer">C#</a></li>
      <li><a href="https://www.mysql.com/" target="_blank" rel="noopener noreferrer">Java</a></li>
      <li><a href="https://www.php.net/" target="_blank" rel="noopener noreferrer">PHP</a></li>
      <li><a href="https://www.w3schools.com/sql/" target="_blank" rel="noopener noreferrer">SQL</a></li>
    </ul>

    <h3>Web Technologies</h3>
    <ul>
      <li><a href="https://developer.mozilla.org/docs/Web/HTML" target="_blank" rel="noopener noreferrer">HTML5</a></li>
      <li><a href="https://developer.mozilla.org/docs/Web/CSS" target="_blank" rel="noopener noreferrer">CSS3</a></li>
      <li><a href="https://developer.mozilla.org/docs/Learn/CSS/CSS_layout/Responsive_Design" target="_blank" rel="noopener noreferrer">Responsive Design</a></li>
    </ul>

    <h3>Frameworks & Libraries</h3>
    <ul>
      <li><a href="https://react.dev/" target="_blank" rel="noopener noreferrer">React</a></li>
      <li><a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer">Express</a></li>
      <li><a href="https://www.tailwindcss.com/" target="_blank" rel="noopener noreferrer">Tailwind CSS</a></li>
      <li><a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">Bootstrap</a></li>
    </ul>

    <h3>Backend & Databases</h3>
    <ul>
      <li><a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js</a></li>
      <li><a href="https://www.mongodb.com/docs/" target="_blank" rel="noopener noreferrer">MongoDB</a></li>
    </ul>

    <h3>Version Control & Tools</h3>
    <ul>
      <li><a href="https://git-scm.com/doc" target="_blank" rel="noopener noreferrer">Git & GitHub</a></li>
    </ul>
  </div>
</section>


          
      
          


      <section className="projects" id="projects">
        <div className="container">
          <h2>Projects</h2>
          <div className="project-list">
            <div className="project-item">
              <h3>Weather Widget</h3>
              <p>A Weather Widget type application that uses 3rd party API to fetch current weather and forecast data for a given city.</p>
              <p>The API also allows the use of Geolocation!</p>
              <Link to="/weather" className="project-link">Weather Widget</Link>
            </div>
            <div className="project-item">
              <h3>Youtube Video Player</h3>
              <p>This Youtube Player uses a combination of React Youtube, React Routes and REGEX to take a user inputted Youtube link and extract the video ID</p>
              <p>It then uses that ID to play the video using the YoutubePlayer component.</p>
              <Link to="/video" className="project-link">Youtube Video Player</Link>
            </div>
           

              <div className="project-item">
              <h3>Netherlands Informational Website</h3>
              <p>A multi page informational website created for my Responsive Web Design Course.</p>
              <p>It uses Bootstrap, i18n (Internationalization), AOS (Animate On Scroll) and other modern web technologies.</p>
              <a href="https://jjardine98.github.io/NetherlandsWebsite/" target="_blank" rel="noopener noreferrer" className = "project-link">Netherlands Informational Website</a>
            </div>

            <div className="project-item">
              <h3>Retail System Mockup</h3>
              <p>A project done for my Systems Analysis and Design class where instead of making static wireframes, I created a website to show a "tech-demo" of a Retail System.</p>
              <p>It covers all the User Stories and Use Cases listed below.</p>
              <a href="https://jjardine98.github.io/Wireframes/" target="_blank" rel="noopener noreferrer" className = "project-link">Retail System Mockup</a>
            </div>

            <div className="project-item">
              <h3>User Stories - Retail System</h3>
              <p>The user stories that accompanied my Retail System Mockup project.</p>
              <p>User Stories are an important part of the development process as they help to define the requirements and goals of the project.</p>
              <a href="https://jjardine98.github.io/UserStories/" target="_blank" rel="noopener noreferrer" className = "project-link">User Stories - Retail System</a>
            </div>

            <div className="project-item">
              <h3>Use Cases - Retail System</h3>
              <p>The use cases that accompanied my Retail System Mockup project.</p>
              <p>Use Cases are a way to describe the interactions between the system and the users.</p>
              <a href="https://jjardine98.github.io/UseCases/" target="_blank" rel="noopener noreferrer" className = "project-link">Use Cases - Retail System</a>
            </div>


            <div className = "project-item">
              <h3>Blue Fox Forge Website</h3>
              <p>A website for a local blacksmithing business here in Saint John. It is owned by my Father Craig Jardine.</p>
              <p>It uses React, TailwindCSS, Netlify (for hosting and updating via github) and allows customers to view a gallery of projects, find out about the business and contact the owner.</p>
              <a href="https://bluefoxforge.netlify.app/" target="_blank" rel="noopener noreferrer" className = "project-link">Blue Fox Forge Website</a>
            </div>
            {/* Add more projects as needed */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
