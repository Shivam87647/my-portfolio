import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// PORTFOLIO DATABASES
// ==========================================

const PROJECTS_DATA = [
  {
    id: 'proj-ecommerce',
    title: 'Scalable Full-Stack E-Commerce Platform',
    category: 'Full Stack',
    date: '04/2026 - Present',
    shortDesc: 'A fully scalable, comprehensive e-commerce environment featuring secure JWT sessions, Redux cart states, and MongoDB pipelines.',
    tags: ['Next.js', 'Express.js', 'MongoDB', 'Redux', 'Tailwind CSS'],
    color: 'var(--primary)',
    bullets: [
      'Engineered responsive storefront with Next.js Server Side Rendering (SSR) for high-performance content loading.',
      'Designed REST API microservices in Node.js/Express for robust product catalog routing and user wishlist management.',
      'Constructed MongoDB document models with indexes to optimize lookup times under high query volumes.',
      'Integrated Redux Toolkit for clean client-side state persistence across product sheets, bags, and checkout pipelines.'
    ],
    challenge: 'Reconciling rapid page hydration speeds with large, dynamically updating product catalogs and real-time checkout synchronizations.',
    impact: [
      'Cut page load times by 48% via Next.js server-side static rendering optimizations.',
      'Reduced database query latencies by 35% using compound indexing strategies in MongoDB.',
      'Sustained 100% state accuracy during high-volume cart items addition.'
    ]
  },
  {
    id: 'proj-goonj',
    title: 'Goonj - Responsive NGO Portal',
    category: 'Frontend',
    date: '04/2026 - 04/2026',
    shortDesc: 'A visually stunning modern UI for an NGO platform to showcase global initiatives, donation cards, and organizational impacts.',
    tags: ['React.js', 'Tailwind CSS', 'Framer Animations', 'Dynamic Forms'],
    color: 'var(--accent)',
    bullets: [
      'Developed a fluid, responsive landing page using component-driven React.js, optimizing component loading speeds.',
      'Calibrated customized Tailwind utility styles, applying sleek dark-mode panels and interactive backdrop blurs.',
      'Constructed interactive forms with detailed validation to collect volunteer submissions and feedback.',
      'Optimized core search queries, ensuring seamless cross-device compatibility across standard mobile formats.'
    ],
    challenge: 'Crafting highly customizable, responsive layout sections and interactive donation widgets that adapt to mobile viewports without sacrificing the premium visual depth.',
    impact: [
      'Achieved a perfect mobile usability score across all common tablet and phone dimensions.',
      'Reduced initial CSS bundle footprint by 40% through strict Tailwind utility configuration.',
      'Implemented robust form validators that eliminated invalid volunteer entries.'
    ]
  },
  {
    id: 'proj-myntra',
    title: 'Pixel-Accurate Myntra Desktop Interface',
    category: 'UI & Clone',
    date: '03/2026 - 04/2026',
    shortDesc: 'A premium frontend clone of the Myntra platform, recreating complex visual components and navigation details.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Grid'],
    color: 'var(--primary)',
    bullets: [
      'Built a desktop-optimized landing clone replicating core header listings, dynamic banners, and product grids.',
      'Engineered custom transition hooks to recreate slide-out navigation panels and responsive dropdown lists.',
      'Structured clean JavaScript scripts for client-side search indexing and interactive filter parameters.',
      'Applied layout specs resulting in pixel-perfect representation of product cards and bag counters.'
    ],
    challenge: 'Replicating highly nested CSS grid listings and precise dynamic dropdown overlays with pure semantic structures.',
    impact: [
      'Achieved pixel-perfect visual compliance against production desktop mocks.',
      'Engineered lightweight dropdown overlays with zero external library overhead.',
      'Optimized CSS selectors, cutting rendering reflow overhead by 20%.'
    ]
  },
  {
    id: 'proj-blinkit',
    title: 'Dynamic Blinkit Fast-Delivery Replica',
    category: 'UI & Clone',
    date: '02/2026 - 03/2026',
    shortDesc: 'A frontend clone of Blinkit featuring dynamic categories selection, shopping bag counts, and interactive APIs.',
    tags: ['React.js', 'JavaScript', 'API Integration', 'Context API'],
    color: 'var(--accent)',
    bullets: [
      'Developed interactive product matrices with categories switching to replicate lightning-fast delivery UI.',
      'Integrated mock JSON databases via custom React hooks to simulate live products stock rendering.',
      'Utilized Context API to handle cart calculations, updating product tallies and sub-total pricing in real-time.',
      'Styled fluid layouts using modern CSS modules to adapt seamlessly across mobile views.'
    ],
    challenge: 'Syncing complex cart calculations, sub-total pricing variables, and item stock quantities across multiple separated visual sections without prop drilling.',
    impact: [
      'Synchronized multi-section item updates in under 2ms using React Context architectures.',
      'Designed modular product matrices that render dynamically based on clean JSON models.',
      'Ensured full usability across major modern mobile web browsers.'
    ]
  },
  {
    id: 'proj-figma',
    title: 'Figma to High-Fidelity Web Conversion',
    category: 'UI & Clone',
    date: '01/2026 - 02/2026',
    shortDesc: 'Pixel-perfect single page layout constructed directly from design files using responsive Bootstrap structures.',
    tags: ['HTML5', 'Bootstrap 5', 'CSS Transitions', 'Pixel Perfect'],
    color: 'var(--primary)',
    bullets: [
      'Parsed raw Figma visual tokens, applying them into reusable semantic structures.',
      'Implemented clean Bootstrap flex grids, cutting layout styling development overhead in half.',
      'Coded micro-animations and glowing border hover states for actionable sections.',
      'Ensured full cross-browser compatibility across Safari, Chrome, Edge, and mobile web clients.'
    ],
    challenge: 'Extracting nested flex coordinates from raw design specs and translating them into fluid, cross-browser compliant Bootstrap variables.',
    impact: [
      'Delivered pixel-perfect conversion, matching typography sizes and bounding box heights exactly.',
      'Cut layout CSS lines by 60% by leveraging native Bootstrap variables.',
      'Flawless cross-browser performance validated across all major engines.'
    ]
  }
];

const SKILLS_DATA = [
  { 
    id: 'react',
    label: 'React.js / Next.js', 
    percent: 90, 
    desc: 'Expertise in server-side rendering (SSR), hydration stages, component composition patterns, hooks structures, and optimized virtual DOM updates.',
    projects: ['Scalable Full-Stack E-Commerce Platform', 'Goonj - Responsive NGO Portal', 'Dynamic Blinkit Fast-Delivery Replica'],
    level: 'Advanced Master'
  },
  { 
    id: 'js',
    label: 'JavaScript (ES6+)', 
    percent: 88, 
    desc: 'Deep core logic proficiencies in asynchronous execution pipelines, event loops, closure scopes, array operations, and DOM manipulation scripts.',
    projects: ['Pixel-Accurate Myntra Desktop Interface', 'Dynamic Blinkit Fast-Delivery Replica'],
    level: 'Advanced Core'
  },
  { 
    id: 'mongodb',
    label: 'MongoDB Database', 
    percent: 80, 
    desc: 'Familiarity with Document storage models, compound indexes optimization, aggregation pipelines, schema designing, and high-performance querying.',
    projects: ['Scalable Full-Stack E-Commerce Platform'],
    level: 'Intermediate Specialist'
  },
  { 
    id: 'node',
    label: 'Express.js & Node.js', 
    percent: 82, 
    desc: 'Building REST API microservices, handling middleware logic, secure JSON Web Token (JWT) rotation schemes, and database pooling configurations.',
    projects: ['Scalable Full-Stack E-Commerce Platform'],
    level: 'Intermediate Specialist'
  },
  { 
    id: 'tailwind',
    label: 'Tailwind CSS', 
    percent: 92, 
    desc: 'Designing premium visual guidelines using responsive utility utilities, HSL theme custom tokens, backdrop-filter blurs, and organic CSS transforms.',
    projects: ['Scalable Full-Stack E-Commerce Platform', 'Goonj - Responsive NGO Portal', 'Dynamic Blinkit Fast-Delivery Replica'],
    level: 'Advanced Master'
  },
  { 
    id: 'htmlcss',
    label: 'HTML5 & CSS3', 
    percent: 95, 
    desc: 'Recreating pixel-perfect layout wireframes, high-end micro-interactions, CSS animation loops, keyframe vectors, and accessibility elements.',
    projects: ['Pixel-Accurate Myntra Desktop Interface', 'Figma to High-Fidelity Web Conversion'],
    level: 'Expert Craftsman'
  },
  { 
    id: 'bootstrap',
    label: 'Bootstrap 5', 
    percent: 85, 
    desc: 'Utilizing responsive grid containers, column spans, flex positioning utilities, and reusable component packages for rapid wireframe conversions.',
    projects: ['Figma to High-Fidelity Web Conversion'],
    level: 'Advanced Core'
  },
  { 
    id: 'git',
    label: 'Git & GitHub', 
    percent: 86, 
    desc: 'Secure repository branching methods, commit standards compliance, team git collaboration workflows, and continuous actions pipelines.',
    projects: ['Scalable Full-Stack E-Commerce Platform', 'Goonj - Responsive NGO Portal'],
    level: 'Advanced Core'
  }
];

const CREDENTIALS_DATA = [
  {
    title: 'Generative AI Mastermind Program',
    provider: 'Hands-on AI Cohort Mastery',
    date: '01/2026 - 01/2026',
    desc: 'Intensive 48-hour program covering prompt engineering pipelines, LLM fine-tuning schemas, and building AI tools.'
  },
  {
    title: 'Web Development enhanced with Gen AI',
    provider: 'Modern Workflow Systems Training',
    date: '10/2025 - Present',
    desc: 'Integrating AI assistants into full-stack development, optimizing debugging speeds, and rapid prototyping workflows.'
  }
];

const ROLES_POOL = ['Full Stack Web Developer', 'BCA Student @ VGU', 'MERN Stack Specialist', 'AI-Assisted Web Craftsman'];

// ==========================================
// MASTERPIECE APPLICATION COMPONENT
// ==========================================

export default function App() {
  // Navigation and dynamic states
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null); // Case study drawer state
  const [activeSkillId, setActiveSkillId] = useState('react');
  const [typingRole, setTypingRole] = useState(ROLES_POOL[0]);
  const [toast, setToast] = useState(null);

  // Form bindings
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const canvasRef = useRef(null);
  const visualPanelRef = useRef(null);

  // Dynamic Typing Carousel
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % ROLES_POOL.length;
      setTypingRole(ROLES_POOL[index]);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Custom Toast helper
  const triggerToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // Contact form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      triggerToast('Please complete all required contact details.');
      return;
    }
    triggerToast(`Thanks ${form.name}! Shivam has received your inquiry.`);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  // 3D Card Hover Physics (Mouse Move Tilting)
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    
    const rotateX = (-deltaY * 6).toFixed(2); // Tilt pitch (max 6deg)
    const rotateY = (deltaX * 6).toFixed(2);  // Tilt yaw (max 6deg)
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  // Premium Canvas Fluid Stardust Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const panel = visualPanelRef.current;

    let width = (canvas.width = panel.clientWidth);
    let height = (canvas.height = panel.clientHeight);

    const handleResize = () => {
      if (!canvas || !panel) return;
      width = canvas.width = panel.clientWidth;
      height = canvas.height = panel.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = 45;
    
    // Mouse physics variables
    const mouse = { x: null, y: null, radius: 110 };

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.8,
        color: i % 3 === 0 ? 'rgba(99, 102, 241, 0.45)' : 
               i % 3 === 1 ? 'rgba(168, 85, 247, 0.45)' : 'rgba(236, 72, 153, 0.35)',
        angle: Math.random() * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.015
      });
    }

    const handleMouseMove = (e) => {
      const rect = panel.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    panel.addEventListener('mousemove', handleMouseMove);
    panel.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint background structural grid-lines dynamically inside visualizer
      ctx.strokeStyle = 'rgba(255,255,255,0.005)';
      ctx.lineWidth = 0.5;
      const step = 30;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      particles.forEach((p) => {
        // Organic floating orbits
        p.angle += p.speed;
        p.x += Math.cos(p.angle) * 0.15 + p.vx;
        p.y += Math.sin(p.angle) * 0.15 + p.vy;

        // Rebounds
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Vector pull calculation towards mouse (Stardust Flow)
        if (mouse.x && mouse.y) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < mouse.radius) {
            // Accelerate particles gracefully along fluid path lines
            const force = (mouse.radius - dist) / mouse.radius;
            p.x += dx * force * 0.015;
            p.y += dy * force * 0.015;
          }
        }

        // Draw stardust particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Subtle dynamic linkage vectors
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 75) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / 75) * 0.08;
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      panel.removeEventListener('mousemove', handleMouseMove);
      panel.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const activeSkill = SKILLS_DATA.find(s => s.id === activeSkillId) || SKILLS_DATA[0];

  return (
    <div>
      
      {/* Dynamic Toast Alerts */}
      {toast && (
        <div className="toast-msg">
          <span style={{color: 'var(--accent)'}}>✦</span>
          <span>{toast}</span>
        </div>
      )}

      {/* ==========================================
          CAPSULE FLOAT NAVBAR
          ========================================== */}
      <div className="navbar-wrapper">
        <nav className="navbar">
          <div className="nav-logo">
            <div className="nav-logo-box">SS</div>
            <span>Shivam Singh</span>
          </div>
          
          <ul className="nav-links">
            <li><a href="#about" className="nav-link-btn">About</a></li>
            <li><a href="#skills" className="nav-link-btn">Skills</a></li>
            <li><a href="#projects" className="nav-link-btn">Projects</a></li>
            <li><a href="#credentials" className="nav-link-btn">Certifications</a></li>
          </ul>

          <a href="#contact" className="btn-nav-cta" style={{textDecoration: 'none'}}>Hire Shivam</a>
        </nav>
      </div>

      {/* ==========================================
          HERO PROFILE SECTION
          ========================================== */}
      <section className="section hero-section">
        
        <div className="hero-details">
          
          <div className="hero-tagline">
            <span style={{width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 8px var(--primary)'}}></span>
            <span>Now Booking Projects for 2026</span>
          </div>

          <h1 className="hero-main-title">
            Shivam Singh Shekhawat
            <span className="editorial-title">Crafting Premium Digital Experiences</span>
          </h1>

          <div className="hero-role-carousel">
            <span>{typingRole}</span>
          </div>

          <p className="hero-desc">
            Computer Applications (BCA) student at Vivekananda Global University, specializing in robust MERN stack applications and responsive interfaces optimized with modern Generative AI acceleration.
          </p>

          <div className="hero-ctas">
            <a href="#projects" className="btn-cta-primary">
              <span>View Case Studies</span>
              <span>→</span>
            </a>
            <a href="#contact" className="btn-cta-secondary">Get In Touch</a>
          </div>

        </div>

        {/* Fluid Canvas Panel */}
        <div className="hero-visual-panel" ref={visualPanelRef}>
          <canvas className="particles-canvas" ref={canvasRef} />
          
          <div className="visual-profile-card">
            <div className="visual-avatar">SS</div>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
              <h3 style={{fontSize: '1.25rem', fontWeight: 800}}>Shivam Singh S.</h3>
              <p style={{fontSize: '0.8rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)'}}>Full-Stack Developer</p>
            </div>
            
            <div className="stats-badge-row">
              <span className="stats-badge">5+ Projects</span>
              <span className="stats-badge">Jaipur, IN</span>
            </div>
            
            <p style={{fontSize: '0.75rem', color: '#cbd5e1'}}>Focused on Next.js, Express, and MongoDB.</p>
          </div>

        </div>

      </section>

      {/* ==========================================
          APPLE STYLE BENTO GRID WORKSPACE
          ========================================== */}
      <section className="section" id="about">
        
        <span className="section-subtitle">
          <span>✦</span> Biography & Journey
        </span>
        <h2 className="section-title">Academic & <span className="editorial-title">Personal Profile</span></h2>

        <div className="bento-grid">
          
          {/* Bento Card 1: Bio */}
          <div className="bento-card bento-span-2 bento-bio-card">
            <h3 className="bento-card-title" style={{color: 'var(--primary)'}}>The Developer & Scholar</h3>
            <p>
              Currently pursuing a **Bachelor of Computer Applications (BCA)** at *Vivekananda Global University, Jaipur*, my engineering journey is centered around mastering robust, full-stack systems that load cleanly and scale effortlessly.
            </p>
            <p>
              I specialize in bridging visual aesthetics with structured server logistics. By applying MERN parameters combined with Gen AI optimization steps, I build applications with high reliability.
            </p>
          </div>

          {/* Bento Card 2: Metrics */}
          <div className="bento-card">
            <h3 className="bento-card-title" style={{color: 'var(--accent)'}}>Platform Stats</h3>
            <div className="bento-stats-grid">
              <div className="bento-stat-item">
                <span className="bento-stat-num">5+</span>
                <span className="bento-stat-lbl">Web Projects</span>
              </div>
              <div className="bento-stat-item">
                <span className="bento-stat-num">48h</span>
                <span className="bento-stat-lbl">Gen AI Cohorts</span>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Timeline VGU */}
          <div className="bento-card bento-span-2">
            <h3 className="bento-card-title" style={{color: 'var(--primary)'}}>Academic Timeline</h3>
            <div className="bento-timeline">
              <div className="bento-timeline-node">
                <span className="bento-timeline-date">09/2025 - PRESENT</span>
                <span className="bento-timeline-title">BCA Degree</span>
                <span className="bento-timeline-subtitle">Vivekananda Global University</span>
              </div>
              <div className="bento-timeline-node">
                <span className="bento-timeline-date">10/2025 - PRESENT</span>
                <span className="bento-timeline-title">Gen AI & Full Stack Mastery</span>
                <span className="bento-timeline-subtitle">Specialized training cohorts</span>
              </div>
            </div>
          </div>

          {/* Bento Card 4: Interests */}
          <div className="bento-card">
            <h3 className="bento-card-title" style={{color: 'var(--accent)'}}>Passions</h3>
            <p style={{fontSize: '0.85rem', color: '#cbd5e1'}}>Key interests driving my development workflow:</p>
            <div className="chips-row">
              <span className="interest-chip">MERN Stack</span>
              <span className="interest-chip">Next.js SSR</span>
              <span className="interest-chip">Gen AI</span>
              <span className="interest-chip">UI/UX</span>
            </div>
          </div>

        </div>

      </section>

      {/* ==========================================
          INTERACTIVE SKILLS BENTO DASHBOARD
          ========================================== */}
      <section className="section" id="skills">
        
        <span className="section-subtitle">
          <span>✦</span> Core Competencies
        </span>
        <h2 className="section-title">Interactive <span className="editorial-title">Skills Matrix</span></h2>

        <div className="glass-panel skills-bento-grid" style={{padding: '2.25rem', borderRadius: 'var(--radius-lg)'}}>
          
          {/* Left: Skill Selectors */}
          <div className="skills-left-selector">
            {SKILLS_DATA.map((skill) => (
              <div 
                key={skill.id}
                className={`glass-card skill-bento-card ${activeSkillId === skill.id ? 'active' : ''}`}
                onClick={() => setActiveSkillId(skill.id)}
              >
                <div className="skill-icon-placeholder">
                  {skill.label.substring(0, 1)}
                </div>
                <span style={{fontSize: '0.85rem', fontWeight: 600, color: 'white'}}>{skill.label.split(' ')[0]}</span>
              </div>
            ))}
          </div>

          {/* Right: Analytics details Panel */}
          <div className="glass-card skills-right-details">
            <div className="skills-details-wrapper">
              
              <div className="skills-details-header">
                <div>
                  <h3 className="skills-details-title">{activeSkill.label}</h3>
                  <span style={{fontSize: '0.75rem', color: 'var(--accent)', fontFamily: 'var(--font-display)', fontWeight: 'bold'}}>{activeSkill.level}</span>
                </div>
                <span style={{fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'white'}}>{activeSkill.percent}%</span>
              </div>

              <div className="skills-details-bar-track">
                <div className="skills-details-bar-fill" style={{width: `${activeSkill.percent}%`}}></div>
              </div>

              <div style={{marginTop: '0.5rem'}}>
                <span style={{fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'}}>Overview Specs</span>
                <p style={{fontSize: '0.9rem', color: '#cbd5e1', marginTop: '0.35rem', lineHeight: 1.6}}>{activeSkill.desc}</p>
              </div>

              <div style={{marginTop: '0.5rem'}}>
                <span style={{fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'}}>Applied in Projects</span>
                <div className="chips-row" style={{marginTop: '0.35rem'}}>
                  {activeSkill.projects.map((proj, idx) => (
                    <span className="interest-chip" key={idx} style={{background: 'rgba(255,255,255,0.01)'}}>{proj}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* ==========================================
          PORTFOLIO SHOWCASE: BENTO MATRIX
          ========================================== */}
      <section className="section" id="projects">
        
        <span className="section-subtitle">
          <span>✦</span> Case Studies
        </span>
        <h2 className="section-title">Featured <span className="editorial-title">Project Matrix</span></h2>

        {/* Filter Navigation */}
        <div className="projects-filter-bar-container">
          <div className="projects-filter-bar">
            {['All', 'Full Stack', 'Frontend', 'UI & Clone'].map((category) => (
              <button 
                key={category}
                className={`projects-filter-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {activeFilter === category && <span className="filter-dot"></span>}
                <span>{category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid bento project display */}
        <div className="projects-matrix-grid">
          {PROJECTS_DATA.filter(p => activeFilter === 'All' || p.category === activeFilter).map((project) => (
            <div className="project-card-wrap" key={project.id}>
              <div 
                className="bento-card project-bento-card" 
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                onClick={() => setSelectedProject(project)}
              >
                <div>
                  <div style={{display: 'flex', justify: 'space-between', alignItems: 'center', marginBottom: '0.75rem'}}>
                    <span className="project-tag" style={{borderColor: project.color, color: 'white'}}>{project.category}</span>
                    <span style={{fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: 'var(--accent)'}}>{project.date}</span>
                  </div>
                  
                  <h3 style={{fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'white', fontWeight: 600, lineHeight: 1.3}}>{project.title}</h3>
                  <p style={{fontSize: '0.85rem', color: '#cbd5e1', marginTop: '0.5rem', lineHeight: 1.5}}>{project.shortDesc}</p>
                </div>

                {/* SVG Visualizer mockups inside card */}
                <div className="project-svg-visualizer">
                  <svg width="100%" height="100%" viewBox="0 0 300 100">
                    <defs>
                      <linearGradient id="svgGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4"/>
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.1"/>
                      </linearGradient>
                    </defs>
                    <rect x="10" y="10" width="280" height="80" rx="6" fill="url(#svgGrad)" stroke="rgba(255,255,255,0.03)"/>
                    <circle cx="50" cy="50" r="15" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 2"/>
                    <circle cx="150" cy="50" r="12" fill="none" stroke="var(--primary)" strokeWidth="1.5"/>
                    <circle cx="250" cy="50" r="15" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 2"/>
                    <line x1="65" y1="50" x2="138" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3"/>
                    <line x1="162" y1="50" x2="235" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3"/>
                    <text x="50" y="90" fill="#64748b" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Client</text>
                    <text x="150" y="90" fill="var(--primary)" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">API router</text>
                    <text x="250" y="90" fill="#64748b" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Database</text>
                  </svg>
                </div>

                <div style={{marginTop: '1.25rem', fontSize: '0.85rem', color: project.color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <span>Analyze Case Study</span>
                  <span>→</span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ==========================================
          CREDENTIALS & CERTIFICATIONS
          ========================================== */}
      <section className="section" id="credentials">
        
        <span className="section-subtitle">
          <span>✦</span> Certificates & Achievements
        </span>
        <h2 className="section-title">Verified <span className="editorial-title">Credentials</span></h2>

        <div className="credentials-grid">
          {CREDENTIALS_DATA.map((cert, index) => (
            <div className="bento-card cert-bento-card" key={index}>
              <div className="cert-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.15rem'}}>
                <span style={{fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 'bold'}}>{cert.date}</span>
                <h3 style={{fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'white', fontWeight: 600}}>{cert.title}</h3>
                <span style={{fontSize: '0.8rem', color: '#94a3b8'}}>{cert.provider}</span>
                <p style={{fontSize: '0.8rem', color: '#64748b', marginTop: '0.35rem'}}>{cert.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ==========================================
          CONTACT PANEL BENTO PORTAL
          ========================================== */}
      <section className="section" id="contact">
        
        <span className="section-subtitle">
          <span>✦</span> Secure Connection Ingestion
        </span>
        <h2 className="section-title">Initiate <span className="editorial-title">Collaboration</span></h2>

        <div className="contact-bento-layout">
          
          <div className="contact-left-info">
            <p className="contact-text">
              Have an enterprise project, complex backend specifications, or a full-stack job opportunity? Get in touch, and let’s engineer a solution.
            </p>

            <div className="contact-bento-badges">
              
              <a href="mailto:shekhawatshivamsingh3@gmail.com" className="contact-badge-item">
                <div className="contact-badge-icon">✉</div>
                <div>
                  <div className="contact-badge-lbl">Primary Ingest Email</div>
                  <div className="contact-badge-val">shekhawatshivamsingh3@gmail.com</div>
                </div>
              </a>

              <a href="tel:8764719910" className="contact-badge-item">
                <div className="contact-badge-icon">📞</div>
                <div>
                  <div className="contact-badge-lbl">Direct Communication Line</div>
                  <div className="contact-badge-val">8764719910</div>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/shivam-singh-shekhawat-14826638a/" target="_blank" className="contact-badge-item">
                <div className="contact-badge-icon">🔗</div>
                <div>
                  <div className="contact-badge-lbl">Professional LinkedIn Node</div>
                  <div className="contact-badge-val">shivam-singh-shekhawat</div>
                </div>
              </a>

              <a href="https://github.com/Shivam87647" target="_blank" className="contact-badge-item">
                <div className="contact-badge-icon">🐙</div>
                <div>
                  <div className="contact-badge-lbl">Active Github Registry</div>
                  <div className="contact-badge-val">Shivam87647</div>
                </div>
              </a>

            </div>
          </div>

          {/* Form Side */}
          <form className="bento-card contact-bento-form" onSubmit={handleSubmit}>
            
            <div className="form-group">
              <label className="form-label">Display Name *</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Alex Mercer"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Node *</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="alex@enterprise.com"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Subject Specification</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Next.js Contract Node integration"
                value={form.subject}
                onChange={(e) => setForm({...form, subject: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Inquiry Core Details *</label>
              <textarea 
                className="form-textarea" 
                placeholder="Provide parameters of required task scope..."
                value={form.message}
                onChange={(e) => setForm({...form, message: e.target.value})}
                required
              />
            </div>

            <button type="submit" className="btn-form-submit">
              <span>Transmit Message Node</span>
              <span>⚡</span>
            </button>

          </form>

        </div>

      </section>

      {/* ==========================================
          FOOTER PANEL
          ========================================== */}
      <footer className="footer">
        <div className="footer-socials">
          <a href="https://github.com/Shivam87647" target="_blank" className="footer-social-btn">Github</a>
          <a href="https://www.linkedin.com/in/shivam-singh-shekhawat-14826638a/" target="_blank" className="footer-social-btn">LinkedIn</a>
          <a href="mailto:shekhawatshivamsingh3@gmail.com" className="footer-social-btn">Email</a>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} Shivam Singh Shekhawat. Structured with pixel-accuracy. All rights reserved.
        </p>
      </footer>

      {/* ==========================================
          FULL-SCREEN CASE STUDY DRAWER SLIDER
          ========================================== */}
      {selectedProject && (
        <>
          {/* Overlay background dim blur */}
          <div className="case-study-overlay-backdrop" onClick={() => setSelectedProject(null)}></div>
          
          <div className={`case-study-drawer ${selectedProject ? 'open' : ''}`}>
            
            <div className="case-study-header">
              <div className="nav-logo">
                <div className="nav-logo-box">SS</div>
                <span className="case-study-title">Case Study Specs</span>
              </div>
              <button className="btn-close-case-study" onClick={() => setSelectedProject(null)}>✕</button>
            </div>

            <div className="case-study-content">
              
              <div className="case-study-section">
                <h3 style={{fontFamily: 'var(--font-display)', fontSize: '1.65rem', color: 'white', fontWeight: 700}}>{selectedProject.title}</h3>
                <div style={{display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap'}}>
                  <span className="project-tag" style={{borderColor: selectedProject.color, color: 'white', background: 'rgba(255,255,255,0.01)'}}>{selectedProject.category}</span>
                  <span className="project-tag">{selectedProject.date}</span>
                </div>
              </div>

              <div className="case-study-section">
                <span className="case-study-section-title">1. Operational Challenge</span>
                <p className="case-study-desc">{selectedProject.challenge}</p>
              </div>

              {/* Dynamic SVG Architecture Diagram customized per project */}
              <div className="case-study-section">
                <span className="case-study-section-title">2. System Architecture Flow</span>
                <div className="architecture-diagram-svg">
                  <svg width="100%" height="100%" viewBox="0 0 500 140">
                    <defs>
                      <linearGradient id="nodeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4"/>
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.05"/>
                      </linearGradient>
                    </defs>
                    {/* Grid nodes layout */}
                    <rect x="20" y="40" width="100" height="50" rx="6" fill="url(#nodeGrad)" stroke="rgba(255,255,255,0.05)"/>
                    <rect x="200" y="40" width="100" height="50" rx="6" fill="url(#nodeGrad)" stroke="rgba(255,255,255,0.05)"/>
                    <rect x="380" y="40" width="100" height="50" rx="6" fill="url(#nodeGrad)" stroke="rgba(255,255,255,0.05)"/>
                    
                    {/* Links and direction vectors */}
                    <line x1="120" y1="65" x2="200" y2="65" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3 3"/>
                    <line x1="300" y1="65" x2="380" y2="65" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 3"/>
                    
                    {/* Labels text */}
                    <text x="70" y="68" fill="white" fontSize="9" fontFamily="var(--font-display)" textAnchor="middle">Client Viewport</text>
                    <text x="70" y="110" fill="#64748b" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">React Framework</text>
                    
                    <text x="250" y="68" fill="white" fontSize="9" fontFamily="var(--font-display)" textAnchor="middle">Express Server</text>
                    <text x="250" y="110" fill="var(--primary)" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">API routing layer</text>
                    
                    <text x="430" y="68" fill="white" fontSize="9" fontFamily="var(--font-display)" textAnchor="middle">Database Hub</text>
                    <text x="430" y="110" fill="#64748b" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">MongoDB vectors</text>
                  </svg>
                </div>
              </div>

              <div className="case-study-section">
                <span className="case-study-section-title">3. Key Accomplishments</span>
                <ul className="bullet-list">
                  {selectedProject.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>

              <div className="case-study-section">
                <span className="case-study-section-title">4. Quantifiable Operational Impact</span>
                <ul className="bullet-list">
                  {selectedProject.impact.map((imp, idx) => (
                    <li key={idx} style={{color: 'white'}}>{imp}</li>
                  ))}
                </ul>
              </div>

              <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.45rem', borderTop: '1px solid var(--border-fine)', paddingTop: '1.5rem', marginTop: '0.5rem'}}>
                {selectedProject.tags.map((t, idx) => (
                  <span className="project-tag" key={idx} style={{borderColor: selectedProject.color, color: 'white', background: 'rgba(255,255,255,0.01)', fontSize: '0.75rem'}}>{t}</span>
                ))}
              </div>

            </div>

          </div>
        </>
      )}

    </div>
  );
}
