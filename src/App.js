import React, { useState, useEffect } from 'react';
import { SocialIcon } from 'react-social-icons';
import profilePic from './profile.jpg'; // Make sure this path is correct

// Main App component with built-in theme context
const App = () => {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className={`app ${theme}`}>
      <Header theme={theme} handleThemeChange={handleThemeChange} />
      <HomePage theme={theme} />
      <Footer theme={theme} />
    </div>
  );
};

// Header component
const Header = ({ theme, handleThemeChange }) => {
  return (
    <header className={`header ${theme}`}>
      <div className="container">
        <nav>
          <div className="logo">JJ</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="theme-selector">
            <select value={theme} onChange={handleThemeChange}>
              <option value="light">Crimson</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </nav>
      </div>
    </header>
  );
};

// HomePage component
const HomePage = ({ theme }) => {
  return (
    <div className={`home ${theme}`}>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Hello, I'm <span className="highlight">Jarod Jardine</span></h1>
              <h2>Full Stack Developer</h2>
              <p>
                Programmer Analyst - New Brunswick Community College - Saint John Campus 2023-2025
                <br />
                Graduating Date: June 2025
              </p>
              <p>
                I specialize in MERN (MongoDB, Express, React, Node.js) stack development. 
                Passionate about creating user-friendly, responsive and visually appealing 
                web applications, I am always looking for ways to expand my skills as a 
                web/software developer.
              </p>
              <div className="social-links">
                <SocialIcon url="https://www.github.com/JJardine98" className="social-icon" />
                <SocialIcon url="https://www.linkedin.com/in/jarod-jardine-40b7b12b3/" className="social-icon" />
                <SocialIcon url="mailto:jjardine07@mynbcc.ca" className="social-icon" />
              </div>
            </div>
            <div className="hero-image">
              <img src={profilePic} alt="Jarod Jardine" className="profile-picture" />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills" id="skills">
        <div className="container">
          <h2>Skills & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Programming Languages</h3>
              <ul>
                <li>JavaScript (ES6+)</li>
                <li>C#</li>
                <li>Java</li>
                <li>PHP</li>
                <li>SQL</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Web Technologies</h3>
              <ul>
                <li>HTML5</li>
                <li>CSS3</li>
                <li>Responsive Design</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Frameworks & Libraries</h3>
              <ul>
                <li>React</li>
                <li>Express</li>
                <li>Tailwind CSS</li>
                <li>Bootstrap</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Backend & Databases</h3>
              <ul>
                <li>Node.js</li>
                <li>MongoDB</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Version Control & Tools</h3>
              <ul>
                <li>Git & GitHub</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects" id="projects">
        <div className="container">
          <h2>Projects</h2>
          <div className="projects-grid">
            <ProjectCard 
              title="Netherlands Informational Website"
              description="A multi page informational website created for my Responsive Web Design Course. It uses Bootstrap, i18n (Internationalization), AOS (Animate On Scroll) and other modern web technologies."
              link="https://jjardine98.github.io/NetherlandsWebsite/"
            />
            <ProjectCard 
              title="Blue Fox Forge Website"
              description="A website for a local blacksmithing business in Saint John owned by my Father Craig Jardine. It uses React, TailwindCSS, Netlify (for hosting and updating via github) and allows customers to view a gallery of projects, find out about the business and contact the owner."
              link="https://bluefoxforge.netlify.app/"
            />
            <ProjectCard 
              title="Retail System Mockup"
              description="A project done for my Systems Analysis and Design class where instead of making static wireframes, I created a website to show a 'tech-demo' of a Retail System. It covers all the User Stories and Use Cases listed below."
              link="https://jjardine98.github.io/Wireframes/"
            />
            <ProjectCard 
              title="User Stories - Retail System"
              description="The user stories that accompanied my Retail System Mockup project. User Stories are an important part of the development process as they help to define the requirements and goals of the project."
              link="https://jjardine98.github.io/UserStories/"
            />
            <ProjectCard 
              title="Use Cases - Retail System"
              description="The use cases that accompanied my Retail System Mockup project. Use Cases are a way to describe the interactions between the system and the users."
              link="https://jjardine98.github.io/UseCases/"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <h2>Contact Me</h2>
          <p>Feel free to reach out if you'd like to collaborate on a project or have any questions.</p>
          <div className="contact-info">
            <div className="contact-item">
              <h3>Email</h3>
              <p><a href="mailto:jjardine07@mynbcc.ca">jjardine07@mynbcc.ca</a></p>
            </div>
            <div className="contact-item">
              <h3>LinkedIn</h3>
              <p><a href="https://www.linkedin.com/in/jarod-jardine-40b7b12b3/" target="_blank" rel="noopener noreferrer">Jarod Jardine</a></p>
            </div>
            <div className="contact-item">
              <h3>GitHub</h3>
              <p><a href="https://www.github.com/JJardine98" target="_blank" rel="noopener noreferrer">JJardine98</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Project Card Component - simplified without React Router
const ProjectCard = ({ title, description, link }) => {
  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="project-link">View Project</a>
    </div>
  );
};

// Footer Component
const Footer = ({ theme }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`footer ${theme}`}>
      <div className="container">
        <p>&copy; {currentYear} Jarod Jardine. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default App;