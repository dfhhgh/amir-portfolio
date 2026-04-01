import { useEffect, } from "react";

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
    <nav style={{
      padding: "20px 5%",
      display: "flex",
      justifyContent: "space-between",
      position: "fixed",
      width: "100%",
      top: 0,
      background: "#060609",
      zIndex: 100
    }}>
      <h3 className="gradient-text">Amir</h3>
      <div style={{ display: "flex", gap: 20 }}>
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
    <section style={{ padding: "120px 5%" }}>
      <h1 className="gradient-text">Frontend Developer</h1>
      <p>I build modern and responsive web apps</p>
    </section>
  );
}

/* ================= SKILLS ================= */
function Skills() {
  const skills = ["React", "JavaScript", "CSS", "HTML", "Git", ".NET"];

  return (
    <section id="skills" style={{ padding: "80px 5%" }}>
      <h2 className="gradient-text">Tools I wield with confidence</h2>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        marginTop: 20
      }}>
        {skills.map((skill, i) => (
          <span key={i} style={{
            padding: "10px 18px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.2)",
            cursor: "pointer"
          }}>
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ================= BOOK APP ================= */
function BookAppGallery() {
  const images = [
    "/images/bookapp/home.png",
    "/images/bookapp/search.png",
    "/images/bookapp/filter.png"
  ];

  return (
    <section style={{ padding: "80px 5%" }}>
      <h2 className="gradient-text">Book App Project</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
        gap: 20,
        marginTop: 30
      }}>
        {images.map((img, i) => (
          <div key={i} style={{
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)"
          }}>
            <img src={img} style={{ width: "100%" }} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= CERTIFICATIONS ================= */
function Certifications() {
  const certs = [
    { title: "SQL (Basic)", img: "/certs/sql-basic.png" },
    { title: "SQL (Intermediate)", img: "/certs/sql-intermediate.png" },
    { title: "SQL (Advanced)", img: "/certs/sql-advanced.png" }
  ];

  return (
    <section id="certifications" style={{ padding: "80px 5%" }}>
      <h2 className="gradient-text">Certifications</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
        gap: 20,
        marginTop: 30
      }}>
        {certs.map((cert, i) => (
          <div key={i} style={{
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#0a0a0f"
          }}>
            <img src={cert.img} style={{ width: "100%" }} />

            <div style={{ padding: 15 }}>
              <h3>{cert.title}</h3>
              <p style={{ color: "#94a3b8" }}>HackerRank</p>
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
    <section id="projects" style={{ padding: "80px 5%" }}>
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