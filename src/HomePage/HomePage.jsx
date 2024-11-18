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
          <ul>
            <li><a href="https://developer.mozilla.org/docs/Web/HTML" target="_blank" rel="noopener noreferrer">HTML5</a></li>
            <li><a href="https://developer.mozilla.org/docs/Web/CSS" target="_blank" rel="noopener noreferrer">CSS3</a></li>
            <li><a href="https://developer.mozilla.org/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer">JavaScript (ES6+)</a></li>
            <li><a href="https://react.dev/" target="_blank" rel="noopener noreferrer">React</a></li>
            <li><a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js</a></li>
            <li><a href="https://git-scm.com/doc" target="_blank" rel="noopener noreferrer">Git & GitHub</a></li>
            <li><a href="https://developer.mozilla.org/docs/Learn/CSS/CSS_layout/Responsive_Design" target="_blank" rel="noopener noreferrer">Responsive Design</a></li>
            <li><a href="https://learn.microsoft.com/dotnet/csharp/" target="_blank" rel="noopener noreferrer">C#</a></li>
            <li><a href="https://www.mysql.com/" target="_blank" rel="noopener noreferrer">Java</a></li>
            <li><a href="https://www.php.net/" target="_blank" rel="noopener noreferrer">PHP</a></li>
            <li><a href="https://www.w3schools.com/sql/" target="_blank" rel="noopener noreferrer">SQL</a></li>
            <li><a href="https://www.mongodb.com/docs/" target="_blank" rel="noopener noreferrer">MongoDB</a></li>
            <li><a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer">Express</a></li>
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
           {/*
            <div className="project-item">
              <h3>Interactive Task List</h3>
              <p>A simple task list that is full stack using MERN. (MongoDB, Express, React, Node.js) It uses 3 out of 4 of the standard CRUD functions (Create, Read & Delete) to add, view and delete tasks.</p>
              <p>It also uses a date dropdown to filter tasks by date.</p>
              <p>The API for the DateDropdown and TaskList are integrated to work together. The DateDropdown uses the API to fetch the dates and the TaskList uses the API to fetch the tasks for the selected date.</p>
              <Link to="/task" className="project-link">Interactive Task List</Link>
            </div> 
            
              This is commented out because I don't feel like hosting the back-end just for 1 project. The rest of them either use API calls or don't need a backend!
              If I wanted to actually display this on my portfolio I would need to host the backend using some sort of service, then connect all the API calls to the hosted backend.

            */}

              <div className="project-item">
              <h3>Netherlands Informational Website</h3>
              <p>A multi page informational website created for my Responsive Web Design Course.</p>
              <p>It uses Bootstrap, i18n (Internationalization), AOS (Animate On Scroll) and other modern web technologies.</p>
              <a href="https://jjardine98.github.io/NetherlandsWebsite/" target="_blank" rel="noopener noreferrer" className = "project-link">Netherlands Informational Website</a>
            </div>

            <div className="project-item">
              <h3>Retail System Mockup</h3>
              <p>A project done for my Systems Analysis and Design class where instead of making static wireframes, I created a website to show a "tech-demo" of a Retail System.</p>
              <a href="https://jjardine98.github.io/Wireframes/" target="_blank" rel="noopener noreferrer" className = "project-link">Retail System Mockup</a>
            </div>

            <div className="project-item">
              <h3>User Stories - Retail System</h3>
              <p>The user stories that accompanied my Retail System Mockup project.</p>
              <a href="https://jjardine98.github.io/UserStories/" target="_blank" rel="noopener noreferrer" className = "project-link">User Stories - Retail System</a>
            </div>

            <div className="project-item">
              <h3>Use Cases - Retail System</h3>
              <p>The use cases that accompanied my Retail System Mockup project.</p>
              <a href="https://jjardine98.github.io/UseCases/" target="_blank" rel="noopener noreferrer" className = "project-link">Use Cases - Retail System</a>
            </div>


            <div className="project-item">
              <h3>Quiz / Flashcard App</h3>
              <p>A simple Quiz and Flashcard app I created to help my girlfriend study for her Labratory Tech National Exam. It uses JSON files for the quizzes allowing any number of questions to be added.</p>
              <p>You can also view the grades of the quizzes you have taken (stored in local storage).</p>
              <a href="https://jjardine98.github.io/SuzannesStudyTools/" target="_blank" rel="noopener noreferrer" className= "project-link">Quiz / Flashcard App</a>
            </div>
            {/* Add more projects as needed */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
