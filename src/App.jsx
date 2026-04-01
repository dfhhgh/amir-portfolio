import { useEffect } from "react";
import "./index.css";

/* ================= IMAGES ================= */
import home from "./assets/home.png";
import search from "./assets/search.png";
import filter from "./assets/filter.png";

import basic from "./assets/sql-basic.png";
import inter from "./assets/sql-intermediate.png";
import adv from "./assets/sql-advanced.png";

/* ================= FONT ================= */
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@400;700&family=Outfit:wght@300;400;600&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
};

/* ================= NAVBAR ================= */
function Navbar() {
  return (
    <nav className="navbar">
      <h3 className="gradient-text">Amir</h3>
      <div className="nav-links">
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#certifications">Certifications</a>
      </div>
    </nav>
  );
}

/* ================= HERO ================= */
function Hero() {
  return (
    <section className="section">
      <h1 className="gradient-text">Frontend Developer</h1>
      <p>I build modern and responsive web apps</p>
    </section>
  );
}

/* ================= SKILLS ================= */
function Skills() {
  const skills = ["React", "JavaScript", "CSS", "HTML", "Git", ".NET"];

  return (
    <section id="skills" className="section">
      <h2 className="gradient-text">Tools I wield with confidence</h2>

      <div className="skills">
        {skills.map((skill, i) => (
          <span key={i} className="skill">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ================= BOOK APP ================= */
function BookAppGallery() {
  const images = [home, search, filter];

  return (
    <section className="section">
      <h2 className="gradient-text">Book App Project</h2>

      <div className="gallery">
        {images.map((img, i) => (
          <div key={i} className="card">
            <img src={img} alt="book app" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= CERTIFICATIONS ================= */
function Certifications() {
  const certs = [
    { title: "SQL (Basic)", img: basic },
    { title: "SQL (Intermediate)", img: inter },
    { title: "SQL (Advanced)", img: adv }
  ];

  return (
    <section id="certifications" className="section">
      <h2 className="gradient-text">Certifications</h2>

      <div className="gallery">
        {certs.map((cert, i) => (
          <div key={i} className="card">
            <img src={cert.img} alt={cert.title} />
            <div className="card-body">
              <h3>{cert.title}</h3>
              <p>HackerRank</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= PROJECTS ================= */
function Projects() {
  return (
    <section id="projects" className="section">
      <h2 className="gradient-text">Projects</h2>
      <p>More projects coming soon...</p>
    </section>
  );
}

/* ================= APP ================= */
export default function App() {
  return (
    <>
      <FontLoader />
      <Navbar />
      <Hero />
      <Skills />
      <BookAppGallery />
      <Certifications />
      <Projects />
    </>
  );
}