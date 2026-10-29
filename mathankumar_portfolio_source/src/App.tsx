import { useState } from "react";
import { Github, Linkedin, Mail, Menu, ArrowUpRight, Download } from "lucide-react";

const nav = [
  ["Home", "/"], ["About", "/about"], ["Skills", "/skills"],
  ["Learning & Certifications", "/learning-and-certifications"],
  ["Resume", "/resume"], ["Contact", "/contact"]
] as const;

function currentPage() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return nav.find(([, href]) => href === path)?.[0] ?? "Home";
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const page = currentPage();

  const title: Record<string, string> = {
    Home: "Turning data into meaningful insights.",
    About: "About me",
    Skills: "Skills & technologies",
    "Learning & Certifications": "Learning & certifications",
    Resume: "Resume",
    Contact: "Let's connect"
  };

  return <div className="site-shell">
    <header className="topbar">
      <a className="brand" href="/">MK<span>.</span></a>
      <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}><Menu /></button>
      <nav className={menuOpen ? "nav open" : "nav"}>
        {nav.map(([label, href]) => <a key={href} className={page === label ? "active" : ""} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
    </header>

    <main>
      {page === "Home" && <section className="hero">
        <p className="eyebrow">B.TECH · ARTIFICIAL INTELLIGENCE & DATA SCIENCE</p>
        <h1>Hi, I'm <span>Mathankumar.</span><br />{title.Home}</h1>
        <p className="lead">I enjoy learning how data, programming, and AI can be used to understand problems and build practical solutions.</p>
        <div className="actions"><a className="button primary" href="/contact">Contact me <ArrowUpRight size={17}/></a><a className="button secondary" href="/resume"><Download size={17}/> View resume</a></div>
        <div className="socials"><a href="https://github.com/mathan2206" target="_blank" rel="noreferrer"><Github size={18}/> GitHub</a><a href="https://www.linkedin.com/in/mathankumar-karuppasamy-87861530b" target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn</a></div>
      </section>}

      {page === "About" && <section className="content"><p className="eyebrow">A LITTLE ABOUT ME</p><h1>{title[page]}</h1><p className="lead">I am an Artificial Intelligence and Data Science student interested in using technology to solve real-world problems. I am building my foundation in programming, data analysis, and AI while continuing to learn through hands-on practice.</p><div className="panel"><h2>What I'm focused on</h2><p>Strengthening programming fundamentals, improving problem-solving skills, and developing practical projects that demonstrate what I learn.</p></div></section>}

      {page === "Skills" && <section className="content"><p className="eyebrow">MY TOOLKIT</p><h1>{title[page]}</h1><div className="card-grid">{[["Programming","Python · Java (learning)"],["Data","SQL · Data analysis fundamentals"],["Web","HTML · CSS · JavaScript fundamentals"],["Tools","Git · GitHub · VS Code"]].map(([h,t])=><article className="panel" key={h}><h2>{h}</h2><p>{t}</p></article>)}</div><p className="hint">Edit these lists in <code>src/App.tsx</code> to reflect your current skills accurately.</p></section>}

      {page === "Learning & Certifications" && <section className="content"><p className="eyebrow">CONTINUOUS LEARNING</p><h1>{title[page]}</h1><div className="panel"><h2>Courses and certificates</h2><p>Add the exact course title, provider, completion date, and certificate link for each credential you have completed.</p></div></section>}

      {page === "Resume" && <section className="content"><p className="eyebrow">EXPERIENCE & EDUCATION</p><h1>{title[page]}</h1><p className="lead">Add your latest resume PDF to the <code>public</code> folder and name it <code>resume.pdf</code>.</p><a className="button primary" href="/resume.pdf" target="_blank" rel="noreferrer"><Download size={17}/> Open resume PDF</a><p className="hint">The link works once you add <code>public/resume.pdf</code>.</p></section>}

      {page === "Contact" && <Contact />}

    </main>
    <footer><span>© {new Date().getFullYear()} Mathankumar</span><span>Built with React & TypeScript</span></footer>
  </div>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    // Replace this address with your preferred public contact email.
    window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return <section className="content">
    <p className="eyebrow">GET IN TOUCH</p><h1>Let's connect<span>.</span></h1>
    <p className="lead">Have a question or opportunity? Send me a message.</p>
    <div className="contact-layout">
      <div className="panel contact-info"><h2>Contact links</h2><a href="mailto:your-email@example.com"><Mail size={18}/> your-email@example.com</a><a href="https://github.com/mathan2206" target="_blank" rel="noreferrer"><Github size={18}/> GitHub</a><a href="https://www.linkedin.com/in/mathankumar-karuppasamy-87861530b" target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn</a><p className="hint">Replace the example email address in this file before publishing.</p></div>
      <form className="panel contact-form" onSubmit={submit}>
        <label>Name<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/></label>
        <label>Email<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label>
        <label>Message<textarea required rows={5} value={message} onChange={e=>setMessage(e.target.value)} placeholder="Write your message..."/></label>
        <button className="button primary" type="submit">Send message <ArrowUpRight size={17}/></button>
        {sent && <p className="hint">Your email app should open. For a website-hosted form, connect a form service or backend.</p>}
      </form>
    </div>
  </section>;
}