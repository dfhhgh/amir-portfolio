import { useEffect, useRef, useState } from "react";
import "./index.css";

/* ================= IMAGES ================= */
import home from "./assets/home.png";
import search from "./assets/search.png";
import filter from "./assets/filter.png";

import basic from "./assets/sql-basic.png";
import inter from "./assets/sql-intermediate.png";
import adv from "./assets/sql-advanced.png";

/* ================= HOOK ================= */
function useInView() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

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
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      className={`section ${visible ? "show" : ""}`}
      style={{ paddingTop: "140px" }}  // 🔥 مهم عشان navbar
    >
      <h1 className="gradient-text">Frontend Developer</h1>
      <p>I build modern and responsive web apps</p>
    </section>
  );
}

/* ================= SKILLS ================= */
function Skills() {
  const [ref, visible] = useInView();
  const skills = ["React", "JavaScript", "CSS", "HTML", "Git", ".NET"];

  return (
    <section
      ref={ref}
      id="skills"
      className={`section ${visible ? "show" : ""}`}
    >
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
  const [ref, visible] = useInView();
  const images = [home, search, filter];

  return (
    <section ref={ref} className={`section ${visible ? "show" : ""}`}>
      <h2 className="gradient-text">Book App Project</h2>

      <div className="grid">
        {images.map((img, i) => (
          <div key={i} className="card-hover">
            <img src={img} alt="book app" className="book-img" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= CERTIFICATIONS ================= */
function Certifications() {
  const [ref, visible] = useInView();

  const certs = [
    { title: "SQL (Basic)", img: basic },
    { title: "SQL (Intermediate)", img: inter },
    { title: "SQL (Advanced)", img: adv }
  ];

  return (
    <section
      ref={ref}
      id="certifications"
      className={`section ${visible ? "show" : ""}`}
    >
      <h2 className="gradient-text">Certifications</h2>

      <div className="grid">
        {certs.map((cert, i) => (
          <div key={i} className="card-hover">
            <img src={cert.img} alt={cert.title} className="cert-img" />

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
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      id="projects"
      className={`section ${visible ? "show" : ""}`}
    >
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