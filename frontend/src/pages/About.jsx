import './About.css';

function About() {
  return (
    <div className="about">
      <div className="about-content">
        <h1>About BLRY</h1>
        <div className="about-section">
          <h2>Project Overview</h2>
          <p>
            BLRY is a full-stack web application that demonstrates modern
            development practices by combining React frontend with Django
            backend. This project showcases best practices in:
          </p>
          <ul>
            <li>Frontend development with React and Vite</li>
            <li>Backend API development with Django</li>
            <li>Code quality with ESLint, Prettier, and pre-commit hooks</li>
            <li>Testing with modern JavaScript testing frameworks</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <h3>Frontend</h3>
              <ul>
                <li>React 19</li>
                <li>Vite</li>
                <li>React Router</li>
                <li>CSS Modules</li>
              </ul>
            </div>
            <div className="tech-item">
              <h3>Backend (Coming Soon)</h3>
              <ul>
                <li>Django 5.2</li>
                <li>Django REST Framework</li>
                <li>SQLite Database</li>
                <li>Python 3.x</li>
              </ul>
            </div>
            <div className="tech-item">
              <h3>Development Tools</h3>
              <ul>
                <li>ESLint & Prettier</li>
                <li>Pre-commit Hooks</li>
                <li>Git Workflow</li>
                <li>Testing Framework</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
