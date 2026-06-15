import { useState, useEffect } from "react";

const COLORS = {
  bg: "#0f0e0c",
  surface: "#1a1815",
  card: "#211f1b",
  border: "#2e2b26",
  gold: "#c9a84c",
  goldLight: "#e2c47a",
  text: "#f0ece4",
  muted: "#8a8278",
  accent: "#b5470a",
};

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${COLORS.bg};
    color: ${COLORS.text};
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    min-height: 100vh;
  }

  :root {
    --gold: ${COLORS.gold};
    --gold-light: ${COLORS.goldLight};
    --bg: ${COLORS.bg};
    --surface: ${COLORS.surface};
    --card: ${COLORS.card};
    --border: ${COLORS.border};
    --text: ${COLORS.text};
    --muted: ${COLORS.muted};
    --accent: ${COLORS.accent};
  }

  a { color: inherit; text-decoration: none; }

  .serif { font-family: 'Playfair Display', serif; }

  /* NAV */
  nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(15,14,12,0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
    padding: 0 2rem;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-brand {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }
  .nav-brand .name {
    font-family: 'Playfair Display', serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--gold);
    letter-spacing: 0.01em;
  }
  .nav-brand .sub {
    font-size: 0.68rem;
    color: var(--muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
    list-style: none;
  }
  .nav-links a {
    font-size: 0.82rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    transition: color 0.2s;
    font-weight: 500;
  }
  .nav-links a:hover, .nav-links a.active { color: var(--text); }

  .nav-phone {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--gold);
    color: var(--bg);
    font-size: 0.82rem;
    font-weight: 600;
    padding: 0.5rem 1.1rem;
    border-radius: 2px;
    letter-spacing: 0.03em;
    transition: background 0.2s;
  }
  .nav-phone:hover { background: var(--gold-light); }

  /* HERO */
  .hero {
    position: relative;
    min-height: 88vh;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .hero-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.35) saturate(0.7);
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, rgba(15,14,12,0.85) 40%, rgba(15,14,12,0.3) 100%);
  }

  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 680px;
    padding: 4rem 2rem 4rem 5vw;
    animation: fadeUp 0.9s ease both;
  }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 500;
    margin-bottom: 1.4rem;
  }
  .hero-eyebrow::before {
    content: '';
    display: block;
    width: 28px;
    height: 1px;
    background: var(--gold);
  }

  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.4rem, 5vw, 3.8rem);
    font-weight: 700;
    line-height: 1.12;
    color: var(--text);
    margin-bottom: 1.4rem;
  }

  .hero p {
    font-size: 1.05rem;
    color: #b8b2a8;
    line-height: 1.7;
    margin-bottom: 2.4rem;
    max-width: 500px;
    font-weight: 300;
  }

  .hero-ctas {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .btn-primary {
    background: var(--gold);
    color: var(--bg);
    font-size: 0.84rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 0.85rem 1.8rem;
    border-radius: 2px;
    transition: background 0.2s, transform 0.15s;
    display: inline-block;
    border: none;
    cursor: pointer;
  }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-1px); }

  .btn-outline {
    background: transparent;
    color: var(--text);
    font-size: 0.84rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 0.85rem 1.8rem;
    border-radius: 2px;
    border: 1px solid var(--border);
    transition: border-color 0.2s, color 0.2s;
    display: inline-block;
    cursor: pointer;
  }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); }

  .hero-stats {
    position: absolute;
    bottom: 3rem;
    right: 5vw;
    z-index: 2;
    display: flex;
    gap: 2.5rem;
    animation: fadeUp 0.9s 0.3s ease both;
  }

  .stat {
    text-align: right;
  }
  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--gold);
    line-height: 1;
  }
  .stat-label {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    margin-top: 0.3rem;
  }

  /* SECTIONS */
  section { padding: 5rem 5vw; }

  .section-eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 500;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  .section-eyebrow::before {
    content: '';
    display: block;
    width: 22px;
    height: 1px;
    background: var(--gold);
  }

  h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 700;
    line-height: 1.18;
    margin-bottom: 1.2rem;
  }

  .about-intro {
    background: var(--surface);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .about-intro-inner {
    max-width: 720px;
  }

  .about-intro p {
    font-size: 1.1rem;
    color: #b8b2a8;
    line-height: 1.8;
    font-weight: 300;
  }

  /* SERVICES GRID */
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    margin-top: 3rem;
  }

  .service-card {
    background: var(--card);
    padding: 2.2rem 2rem;
    transition: background 0.2s;
    cursor: default;
  }
  .service-card:hover { background: #272420; }

  .service-num {
    font-family: 'Playfair Display', serif;
    font-size: 0.85rem;
    color: var(--gold);
    margin-bottom: 1rem;
    opacity: 0.7;
  }

  .service-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
  }

  .service-card p {
    font-size: 0.88rem;
    color: var(--muted);
    line-height: 1.65;
  }

  .service-card ul {
    list-style: none;
    margin-top: 1rem;
  }
  .service-card ul li {
    font-size: 0.82rem;
    color: var(--muted);
    padding: 0.3rem 0;
    border-top: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .service-card ul li::before {
    content: '—';
    color: var(--gold);
    font-size: 0.7rem;
  }

  /* CTA BAND */
  .cta-band {
    background: var(--gold);
    color: var(--bg);
    text-align: center;
    padding: 4rem 5vw;
  }
  .cta-band h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    color: var(--bg);
    margin-bottom: 0.8rem;
  }
  .cta-band p {
    font-size: 1rem;
    opacity: 0.75;
    margin-bottom: 2rem;
  }
  .btn-dark {
    background: var(--bg);
    color: var(--gold);
    font-size: 0.84rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 0.9rem 2rem;
    border-radius: 2px;
    display: inline-block;
    transition: opacity 0.2s;
    border: none;
    cursor: pointer;
  }
  .btn-dark:hover { opacity: 0.85; }

  /* FOOTER */
  footer {
    background: var(--surface);
    border-top: 1px solid var(--border);
    padding: 3.5rem 5vw 2rem;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
  }

  .footer-brand .name {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: var(--gold);
    margin-bottom: 0.6rem;
  }
  .footer-brand p {
    font-size: 0.85rem;
    color: var(--muted);
    line-height: 1.7;
    max-width: 280px;
  }

  .footer-col h4 {
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 1rem;
  }

  .footer-col ul { list-style: none; }
  .footer-col ul li {
    margin-bottom: 0.5rem;
  }
  .footer-col ul li a {
    font-size: 0.88rem;
    color: #8a8278;
    transition: color 0.2s;
  }
  .footer-col ul li a:hover { color: var(--text); }
  .footer-col ul li span {
    font-size: 0.88rem;
    color: #8a8278;
  }

  .footer-bottom {
    border-top: 1px solid var(--border);
    padding-top: 1.5rem;
    font-size: 0.78rem;
    color: var(--muted);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* ABOUT PAGE */
  .about-hero {
    padding: 5rem 5vw 3rem;
    border-bottom: 1px solid var(--border);
  }
  .about-hero .eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1rem;
  }

  .about-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    padding: 5rem 5vw;
    align-items: start;
  }

  .about-body img {
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
    filter: brightness(0.85) saturate(0.8);
    border: 1px solid var(--border);
  }

  .about-body p {
    font-size: 1rem;
    color: #b8b2a8;
    line-height: 1.8;
    font-weight: 300;
    margin-bottom: 1.4rem;
  }

  .about-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    margin-top: 2rem;
  }
  .about-stat {
    background: var(--card);
    padding: 1.8rem 1.5rem;
  }
  .about-stat .num {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    color: var(--gold);
    font-weight: 700;
  }
  .about-stat .label {
    font-size: 0.78rem;
    color: var(--muted);
    letter-spacing: 0.06em;
    margin-top: 0.3rem;
  }

  /* CONTACT PAGE */
  .contact-hero {
    padding: 5rem 5vw 3rem;
    border-bottom: 1px solid var(--border);
    max-width: 700px;
  }

  .contact-body {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 4rem;
    padding: 5rem 5vw;
    align-items: start;
  }

  .form-group {
    margin-bottom: 1.4rem;
  }
  .form-group label {
    display: block;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  .form-group input,
  .form-group textarea {
    width: 100%;
    background: var(--card);
    border: 1px solid var(--border);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    padding: 0.8rem 1rem;
    border-radius: 2px;
    outline: none;
    transition: border-color 0.2s;
  }
  .form-group input:focus,
  .form-group textarea:focus { border-color: var(--gold); }
  .form-group textarea { min-height: 120px; resize: vertical; }

  .contact-info h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
  }

  .contact-item {
    margin-bottom: 1.8rem;
  }
  .contact-item .ci-label {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.4rem;
    font-weight: 500;
  }
  .contact-item .ci-value {
    font-size: 0.95rem;
    color: var(--text);
  }
  .contact-item .ci-value a { color: var(--text); transition: color 0.2s; }
  .contact-item .ci-value a:hover { color: var(--gold); }

  .hours-table { margin-top: 1.5rem; }
  .hours-table h4 {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 0.8rem;
  }
  .hours-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border);
    color: #b8b2a8;
  }
  .hours-row .day { color: var(--muted); }

  /* SERVICES PAGE */
  .services-hero {
    padding: 5rem 5vw 3rem;
    border-bottom: 1px solid var(--border);
    max-width: 700px;
  }

  .services-list { padding: 5rem 5vw; }

  .service-row {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 2rem;
    padding: 2.5rem 0;
    border-bottom: 1px solid var(--border);
    align-items: start;
  }
  .service-row:first-child { border-top: 1px solid var(--border); }

  .service-row .num {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    color: var(--border);
    font-weight: 700;
    line-height: 1;
    padding-top: 0.2rem;
  }

  .service-row h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    margin-bottom: 0.7rem;
  }
  .service-row p {
    font-size: 0.92rem;
    color: var(--muted);
    margin-bottom: 1rem;
    line-height: 1.7;
  }
  .service-row ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .service-row ul li {
    font-size: 0.76rem;
    color: var(--muted);
    border: 1px solid var(--border);
    padding: 0.3rem 0.7rem;
    border-radius: 1px;
    letter-spacing: 0.04em;
  }

  /* MOBILE STICKY CTA */
  .mobile-cta {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background: var(--gold);
    color: var(--bg);
    text-align: center;
    padding: 1rem;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .hero-stats { display: none; }
    .hero-content { padding: 3rem 1.5rem; }
    .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
    .about-body { grid-template-columns: 1fr; }
    .contact-body { grid-template-columns: 1fr; }
    section { padding: 3rem 1.5rem; }
    .mobile-cta { display: block; }
    footer { padding-bottom: 5rem; }
  }
`;

// ── Nav ──────────────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  return (
    <nav>
      <div className="nav-brand" onClick={() => setPage("home")} style={{ cursor: "pointer" }}>
        <span className="name">Salaises Remodeling HD</span>
        <span className="sub">Hickory Hills, IL · 25 Years Experience</span>
      </div>
      <ul className="nav-links">
        {["home", "services", "about", "contact"].map((p) => (
          <li key={p}>
            <a
              className={page === p ? "active" : ""}
              onClick={() => setPage(p)}
              style={{ cursor: "pointer" }}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </a>
          </li>
        ))}
      </ul>
      <a href="tel:7737325940" className="nav-phone">
        📞 773-732-5940
      </a>
    </nav>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="name">Salaises Remodeling HD</div>
          <p>25 years of honest, quality home improvement work in Hickory Hills and the greater Chicagoland area.</p>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            {["Interior Remodeling","Drywall","Interior Painting","Faucet & Fixture Work","Handyman Work"].map(s => (
              <li key={s}><a onClick={() => setPage("services")} style={{ cursor: "pointer" }}>{s}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><span><a href="tel:7737325940">773-732-5940</a></span></li>
            <li><span>9040 Meadowview Dr,<br />Hickory Hills, IL</span></li>
            <li><span><a href="mailto:salaisesremodelinghd@gmail.com">salaisesremodelinghd@gmail.com</a></span></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Salaises Remodeling HD. All rights reserved.</span>
        <span style={{ fontSize: "0.72rem", color: "var(--border)" }}>Hickory Hills, IL</span>
      </div>
    </footer>
  );
}

// ── HOME ─────────────────────────────────────────────────────────────────
function Home({ setPage }) {
  return (
    <>
      <div className="hero">
        <img
          className="hero-img"
          src="https://salaisesremodeling.lovable.app/assets/hero-B3P4u5ZD.jpg"
          alt="Contractor at work inside a home"
          onError={e => { e.target.src = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80"; }}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-eyebrow">Family-Owned · Hickory Hills, IL</div>
          <h1 className="serif">25 Years of Quality Work, Right in Your Neighborhood.</h1>
          <p>Interior remodeling, drywall, painting, and handyman work done honest and done right — by a local team you can trust.</p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => setPage("contact")}>Schedule a Consultation</button>
            <a href="tel:7737325940" className="btn-outline">Call 773-732-5940</a>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">25+</div>
            <div className="stat-label">Years in Business</div>
          </div>
          <div className="stat">
            <div className="stat-num">5</div>
            <div className="stat-label">Trades Under One Roof</div>
          </div>
          <div className="stat">
            <div className="stat-num">Local</div>
            <div className="stat-label">Chicagoland & Insured</div>
          </div>
        </div>
      </div>

      <section className="about-intro">
        <div className="about-intro-inner">
          <div className="section-eyebrow">Honest Work. Fair Prices. Built to Last.</div>
          <h2 className="serif">Quietly raising the standard with 25 years of experience.</h2>
          <p>Salaises Remodeling HD has spent 25 years raising the standard of home improvement in Hickory Hills and the surrounding suburbs. Whether it's a full kitchen remodel or a leaky faucet, we treat every job with the same care — because your home deserves it.</p>
        </div>
      </section>

      <section>
        <div className="section-eyebrow">What We Do</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <h2 className="serif">Services Overview</h2>
          <button className="btn-outline" onClick={() => setPage("services")} style={{ marginBottom: "0.5rem" }}>View All</button>
        </div>
        <div className="services-grid">
          {[
            { title: "Interior Remodeling", desc: "Full kitchen, bathroom, and basement remodels — from layout to finish carpentry. Built to last, built to your taste." },
            { title: "Drywall", desc: "Hanging, taping, mudding, and texture matching. Clean seamless walls and ceilings ready for paint." },
            { title: "Interior Painting", desc: "Interior walls, ceilings, and trim with proper prep work. Crisp lines, even coats, and a finish that holds up." },
            { title: "Minor Faucet & Fixture Work", desc: "Small water-related fixes — swapping a faucet, replacing a shower head, hooking up a vanity. Quick, clean, and done right." },
            { title: "General Handyman Work", desc: "Small repairs, installs, and odd jobs around the house. One trusted call for the punch-list nobody else wants." },
          ].map((s, i) => (
            <div className="service-card" key={s.title}>
              <div className="service-num">0{i + 1}</div>
              <h3 className="serif">{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="cta-band">
        <h2 className="serif">Ready to start your project?</h2>
        <p>Let's hop on a quick call and talk through what you need.</p>
        <button className="btn-dark" onClick={() => setPage("contact")}>Schedule a Consultation</button>
      </div>
    </>
  );
}

// ── SERVICES ─────────────────────────────────────────────────────────────
function Services({ setPage }) {
  const services = [
    {
      num: "01", title: "Interior Remodeling",
      desc: "Full kitchen, bathroom, and basement remodels — from layout to finish carpentry. Built to last, built to your taste.",
      items: ["Kitchens, bathrooms, basements", "Cabinets, countertops, tile", "Trim and finish carpentry"],
    },
    {
      num: "02", title: "Drywall",
      desc: "Hanging, taping, mudding, and texture matching. Clean seamless walls and ceilings ready for paint.",
      items: ["Hanging and finishing", "Patch and repair work", "Texture matching"],
    },
    {
      num: "03", title: "Interior Painting",
      desc: "Interior walls, ceilings, and trim with proper prep work. Crisp lines, even coats, and a finish that holds up.",
      items: ["Walls, ceilings, and trim", "Surface prep and priming", "Clean lines and even coats"],
    },
    {
      num: "04", title: "Minor Faucet & Fixture Work",
      desc: "Small water-related fixes — swapping a faucet, replacing a shower head, hooking up a vanity. Quick, clean, and done right.",
      items: ["Faucet and shower head swaps", "Vanity and sink hookups", "Small fixture replacements"],
    },
    {
      num: "05", title: "General Handyman Work",
      desc: "Small repairs, installs, and odd jobs around the house. One trusted call for the punch-list nobody else wants.",
      items: ["Doors, locks, and hardware", "Mounting and installation", "Small repairs and punch lists"],
    },
  ];

  return (
    <>
      <div className="services-hero">
        <div className="eyebrow" style={{ fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
          Our Services
        </div>
        <h2 className="serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem" }}>Five Trades. One Trusted Crew.</h2>
        <p style={{ color: "#b8b2a8", fontSize: "1rem", lineHeight: "1.7", fontWeight: 300 }}>
          From a single repair to a full remodel, we bring 25 years of hands-on experience to every project in Hickory Hills and the greater Chicago suburbs.
        </p>
      </div>

      <div className="services-list">
        {services.map((s) => (
          <div className="service-row" key={s.title}>
            <div className="num">{s.num}</div>
            <div>
              <h3 className="serif">{s.title}</h3>
              <p>{s.desc}</p>
              <ul>{s.items.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        ))}
      </div>

      <div className="cta-band">
        <h2 className="serif">Not sure what you need? Just ask.</h2>
        <p>Every project is different. Let's hop on a quick call and figure out the best way to get it done.</p>
        <button className="btn-dark" onClick={() => setPage("contact")}>Schedule a Consultation</button>
      </div>
    </>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────
function About({ setPage }) {
  return (
    <>
      <div className="about-hero">
        <div className="eyebrow" style={{ fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>About Us</div>
        <h2 className="serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem" }}>A Quarter-Century of Doing It Right.</h2>
        <p style={{ color: "#b8b2a8", fontSize: "1rem", lineHeight: "1.7", fontWeight: 300, maxWidth: 580 }}>
          Salaises Remodeling HD is a family-owned, owner-operated home improvement business rooted right here in Hickory Hills, Illinois.
        </p>
      </div>

      <div className="about-body">
        <div>
          <div className="section-eyebrow">Our Story</div>
          <h2 className="serif" style={{ marginBottom: "1.4rem" }}>Built on Reputation, Not Advertising.</h2>
          <p>
            For 25 years we've been the call neighbors make when something needs fixed, finished, or built. What started as a one-truck operation has grown into a trusted local crew — but the standard hasn't changed: show up on time, do honest work, and leave the place better than we found it.
          </p>
          <p>
            We live here. Our kids go to school here. When you hire us, you're not getting a faceless contractor — you're getting a neighbor who's going to see you at the grocery store next week. That keeps us honest, and that's how we like it.
          </p>
          <div className="about-stats">
            {[
              { num: "25+", label: "Years of hands-on experience" },
              { num: "5", label: "Trades in-house" },
              { num: "Local", label: "Hickory Hills · Proudly local" },
              { num: "F/O", label: "Family-Owned · Owner-operated" },
            ].map(s => (
              <div className="about-stat" key={s.label}>
                <div className="num">{s.num}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <img
            src="https://salaisesremodeling.lovable.app/assets/team-BV3KwXFb.jpg"
            alt="Salaises Remodeling team"
            onError={e => { e.target.src = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"; }}
          />
          <div style={{ marginTop: "2rem", padding: "2rem", background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="section-eyebrow" style={{ marginBottom: "0.8rem" }}>How We Work</div>
            <p style={{ color: "#b8b2a8", fontSize: "0.92rem", lineHeight: "1.75", fontWeight: 300, marginBottom: "1.4rem" }}>
              We start with a real conversation — no high-pressure pitch. We walk the job, listen to what you actually want, and quote it fair. Then we get to work and keep you in the loop until the last nail is set.
            </p>
            <button className="btn-primary" onClick={() => setPage("contact")}>Start a Conversation</button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", project: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.phone) setSubmitted(true);
  };

  return (
    <>
      <div className="contact-hero" style={{ padding: "5rem 5vw 3rem" }}>
        <div style={{ fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>Contact</div>
        <h2 className="serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem" }}>Schedule a Consultation</h2>
        <p style={{ color: "#b8b2a8", fontSize: "1rem", lineHeight: "1.7", fontWeight: 300 }}>
          Every project is different, so quotes happen on the phone — not in a form. Send us a quick message about what you're thinking and we'll call you back to talk it through.
        </p>
      </div>

      <div className="contact-body">
        <div>
          <div className="section-eyebrow" style={{ marginBottom: "1.5rem" }}>Request a Call</div>
          {submitted ? (
            <div style={{ background: "var(--card)", border: "1px solid var(--gold)", padding: "2rem", borderRadius: "2px" }}>
              <div style={{ color: "var(--gold)", fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", marginBottom: "0.5rem" }}>Message Received</div>
              <p style={{ color: "#b8b2a8", fontSize: "0.92rem" }}>Thanks {form.name} — we'll call you back shortly to talk through your project.</p>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label>Name</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="Best number to reach you" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label>Project Description</label>
                <textarea value={form.project} onChange={e => setForm({...form, project: e.target.value})} placeholder="Tell us a bit about what you need..." />
              </div>
              <button className="btn-primary" onClick={handleSubmit} style={{ width: "100%" }}>Request a Consultation</button>
            </>
          )}
        </div>

        <div>
          <h3 className="serif">Reach Us Directly</h3>
          {[
            { label: "Phone", value: <a href="tel:7737325940">773-732-5940</a> },
            { label: "Address", value: <>9040 Meadowview Dr<br />Hickory Hills, IL</> },
            { label: "Email", value: <a href="mailto:salaisesremodelinghd@gmail.com">salaisesremodelinghd@gmail.com</a> },
          ].map(ci => (
            <div className="contact-item" key={ci.label}>
              <div className="ci-label">{ci.label}</div>
              <div className="ci-value">{ci.value}</div>
            </div>
          ))}

          <div className="hours-table">
            <h4>Hours</h4>
            {[
              { day: "Mon – Fri", time: "7:00 AM – 6:00 PM" },
              { day: "Saturday", time: "8:00 AM – 4:00 PM" },
              { day: "Sunday", time: "By appointment" },
            ].map(h => (
              <div className="hours-row" key={h.day}>
                <span className="day">{h.day}</span>
                <span>{h.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  return (
    <>
      <style>{style}</style>
      <Nav page={page} setPage={setPage} />
      {page === "home" && <Home setPage={setPage} />}
      {page === "services" && <Services setPage={setPage} />}
      {page === "about" && <About setPage={setPage} />}
      {page === "contact" && <Contact />}
      <Footer setPage={setPage} />
      <a href="tel:7737325940" className="mobile-cta">📞 Call Now — 773-732-5940</a>
    </>
  );
}
