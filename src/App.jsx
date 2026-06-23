import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import { PROJECTS_DATA, SKILLS_DATA, CREDENTIALS_DATA, ROLES_POOL, TERMINAL_INITIAL_HISTORY, CONTACT_LINKS } from './data/portfolioData';
import useCardHover from './hooks/useCardHover';
import useTypingCarousel from './hooks/useTypingCarousel';
import SectionHeader from './components/SectionHeader';
import ContactBadge from './components/ContactBadge';
import FormField from './components/FormField';
import SkillIcon from './components/SkillIcon';
import ProjectVisual from './components/ProjectVisual';
import ArchitectureDiagram from './components/ArchitectureDiagram';

// ==========================================
// MASTERPIECE APPLICATION COMPONENT
// ==========================================

export default function App() {
  // Navigation and dynamic states
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSkillId, setActiveSkillId] = useState('react');
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Pure React Scroll & Sliding Active Indicator states
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Elite Operational Terminal States
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([...TERMINAL_INITIAL_HISTORY]);
  const [autocompleteHint, setAutocompleteHint] = useState('');
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  // Form bindings
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const canvasRef = useRef(null);
  const visualPanelRef = useRef(null);
  
  // Custom interactive refs
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const terminalInputRef = useRef(null);
  const terminalBodyRef = useRef(null);
  const matrixCanvasRef = useRef(null);
  const navbarRef = useRef(null);
  const navLinksRef = useRef(null);

  // Shared hooks
  const { cardHoverProps } = useCardHover();
  const typingRole = useTypingCarousel(ROLES_POOL);

  // Disable body scroll when case study drawer or terminal overlay is active
  useEffect(() => {
    const isLocked = selectedProject || isTerminalOpen;
    if (isLocked) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '8px';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [selectedProject, isTerminalOpen]);

  // Pure React Header, Scrollspy, & Navigation Pill Interactions
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      
      setIsScrolled(scrollTop > 40);

      const winHeight = window.innerHeight;
      const navSectionIds = ['about', 'skills', 'projects', 'credentials', 'contact'];
      let currentSectionId;

      if (scrollTop < 80) {
        currentSectionId = 'about';
      } else {
        let maxVisibleHeight = -1;
        let bestSectionId = '';

        navSectionIds.forEach(id => {
          const sec = document.getElementById(id);
          if (!sec) return;
          const rect = sec.getBoundingClientRect();
          
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(winHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            bestSectionId = id;
          }
        });

        currentSectionId = bestSectionId || 'about';
      }

      if (currentSectionId) {
        setActiveSection(currentSectionId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const triggerTimeout = setTimeout(handleScroll, 100);

    return () => {
      clearTimeout(triggerTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Slide sliding capsule pill & update scroll progress bar
  useEffect(() => {
    let activeId = activeSection;
    let rId;

    const updatePill = () => {
      if (window.scrollY < 100) {
        setPillStyle(prev => ({ ...prev, opacity: 0 }));
        setScrollProgress(0);
        return;
      }

      if (activeId === 'contact') {
        setPillStyle(prev => ({ ...prev, opacity: 0 }));
        setScrollProgress(100);
        return;
      }

      const activeLink = document.querySelector(`.nav-links a[href="#${activeId}"]`);
      const navbar = navbarRef.current;
      
      if (activeLink && navbar) {
        setPillStyle({
          left: activeLink.offsetLeft,
          width: activeLink.offsetWidth,
          opacity: 1
        });

        const linkRect = activeLink.getBoundingClientRect();
        const navRect = navbar.getBoundingClientRect();
        const rightEdge = linkRect.right - navRect.left;
        const progressPercent = Math.min(100, Math.max(0, (rightEdge / navRect.width) * 100));
        setScrollProgress(progressPercent);
      }
    };

    const handleResizeOrScroll = () => {
      cancelAnimationFrame(rId);
      rId = requestAnimationFrame(updatePill);
    };

    rId = requestAnimationFrame(updatePill);

    window.addEventListener('resize', handleResizeOrScroll, { passive: true });
    window.addEventListener('scroll', handleResizeOrScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rId);
      window.removeEventListener('resize', handleResizeOrScroll);
      window.removeEventListener('scroll', handleResizeOrScroll);
    };
  }, [activeSection]);

  const handleNavLinkMouseEnter = (e) => {
    const link = e.currentTarget;
    setPillStyle({
      left: link.offsetLeft,
      width: link.offsetWidth,
      opacity: 1
    });
  };

  const handleNavLinkMouseLeave = () => {
    if (activeSection === 'contact') {
      setPillStyle(prev => ({ ...prev, opacity: 0 }));
      return;
    }
    const activeLink = document.querySelector(`.nav-links a[href="#${activeSection}"]`);
    if (activeLink) {
      setPillStyle({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
        opacity: 1
      });
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('about');
    window.history.pushState(null, null, ' ');
  };

  // GSAP Cinematic Reveal Animations
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.4 } });

    gsap.set('.navbar-wrapper', { y: -60, opacity: 0 });
    gsap.set('.hero-tagline', { y: 25, opacity: 0 });
    gsap.set('.hero-main-title', { y: 35, opacity: 0 });
    gsap.set('.hero-role-carousel', { y: 20, opacity: 0 });
    gsap.set('.hero-desc', { y: 25, opacity: 0 });
    gsap.set('.hero-ctas > *', { y: 25, opacity: 0 });
    gsap.set('.visual-profile-card', { scale: 0.92, opacity: 0, rotationY: -8 });

    tl.to('.navbar-wrapper', {
      y: 0,
      opacity: 1,
      duration: 1.2
    })
    .to('.hero-tagline', {
      y: 0,
      opacity: 1,
      duration: 0.95
    }, '-=0.8')
    .to('.hero-main-title', {
      y: 0,
      opacity: 1,
      duration: 1.15
    }, '-=0.85')
    .to('.hero-role-carousel', {
      y: 0,
      opacity: 1,
      duration: 0.95
    }, '-=0.95')
    .to('.hero-desc', {
      y: 0,
      opacity: 1,
      duration: 1.05
    }, '-=0.85')
    .to('.hero-ctas > *', {
      y: 0,
      opacity: 1,
      stagger: 0.12,
      duration: 0.95
    }, '-=0.9')
    .to('.visual-profile-card', {
      scale: 1,
      opacity: 1,
      rotationY: 0,
      duration: 1.6,
      ease: 'elastic.out(1, 0.85)'
    }, '-=1.2');

    // Scroll-triggered animations
    const observerOptions = {
      root: null,
      threshold: 0.02,
      rootMargin: '0px 0px -20px 0px'
    };

    const sections = document.querySelectorAll('section.section');

    sections.forEach(sec => {
      if (sec.classList.contains('hero-section')) return;
      
      const subtitle = sec.querySelector('.section-subtitle');
      const title = sec.querySelector('.section-title');
      const cards = sec.querySelectorAll('.bento-card, .glass-panel, .project-card-wrap, .credentials-grid > *, .contact-bento-layout > *');

      if (subtitle) {
        gsap.set(subtitle, { y: 25, opacity: 0 });
      }
      if (title) {
        gsap.set(title, { y: 35, opacity: 0 });
      }
      if (cards.length) {
        cards.forEach((card, idx) => {
          const sideOffset = idx % 2 === 0 ? -60 : 60;
          gsap.set(card, { x: sideOffset, opacity: 0, scale: 0.97 });
        });
      }
    });

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          const subtitle = section.querySelector('.section-subtitle');
          const title = section.querySelector('.section-title');
          const cards = section.querySelectorAll('.bento-card, .glass-panel, .project-card-wrap, .credentials-grid > *, .contact-bento-layout > *');

          if (subtitle) {
            gsap.to(subtitle, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' });
          }
          if (title) {
            gsap.to(title, { y: 0, opacity: 1, duration: 1.25, delay: 0.04, ease: 'power3.out' });
          }
          
          if (cards.length) {
            gsap.to(cards, {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 1.25,
              stagger: 0.12,
              delay: 0.08,
              ease: 'power3.out',
              clearProps: 'transform,opacity'
            });
          }

          sectionObserver.unobserve(section);
        }
      });
    }, observerOptions);

    sections.forEach(sec => {
      sectionObserver.observe(sec);
    });

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  // Custom Toast helper
  const triggerToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // Contact info clipboard pipeline
  const handleCopyEmail = (e) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText('shekhawatshivamsingh3@gmail.com');
    triggerToast('\u2726 Core email copied to clipboard registry!');
  };

  // Contact form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      triggerToast('Please complete all required contact details.');
      return;
    }
    setIsSubmitting(true);
    triggerToast('\u2726 Initiating secure quantum connection handshake...');
    
    setTimeout(() => {
      triggerToast(`[TRANSMISSION VERIFIED] Thanks ${form.name}! Shivam will initiate connection shortly.`);
      setForm({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1800);
  };

  // Premium 3D Holographic Orbiting Canvas Sphere
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const panel = visualPanelRef.current;

    let width = (canvas.width = canvas.clientWidth);
    let height = (canvas.height = canvas.clientHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const points = [];
    const pointCount = 92;
    const sphereRadius = Math.min(width, height) * 0.48;
    
    for (let i = 0; i < pointCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      points.push({
        x: sphereRadius * Math.sin(phi) * Math.cos(theta),
        y: sphereRadius * Math.sin(phi) * Math.sin(theta),
        z: sphereRadius * Math.cos(phi),
        color: i % 3 === 0 ? 'rgba(99, 102, 241, 0.72)' : 
               i % 3 === 1 ? 'rgba(168, 85, 247, 0.72)' : 'rgba(236, 72, 153, 0.65)'
      });
    }

    let targetRotX = 0.003;
    let targetRotY = 0.005;

    const handleMouseMove = (e) => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      targetRotY = x * 0.00003;
      targetRotX = -y * 0.00003;
    };

    panel.addEventListener('mousemove', handleMouseMove, { passive: true });

    let angleX = 0;
    let angleY = 0;
    let animId;
    let isIntersecting = true;

    const fov = 320;
    const centerX = width / 2;
    const centerY = height / 2;

    const render = () => {
      if (!isIntersecting) return;
      ctx.clearRect(0, 0, width, height);

      angleX += (targetRotX - angleX) * 0.07;
      angleY += (targetRotY - angleY) * 0.07;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projectedPoints = [];

      points.forEach((p) => {
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.x * sinY + p.z * cosY;

        let y2 = p.y * cosX - z1 * sinX;
        let z2 = p.y * sinX + z1 * cosX;

        const scale = fov / (fov + z2);
        const screenX = centerX + x1 * scale;
        const screenY = centerY + y2 * scale;

        projectedPoints.push({
          x: screenX,
          y: screenY,
          z: z2,
          radius: Math.max(0.8, (sphereRadius * 0.016) * scale),
          color: p.color
        });

        p.x = x1;
        p.y = y2;
        p.z = z2;
      });

      for (let i = 0; i < projectedPoints.length; i++) {
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p1 = projectedPoints[i];
          const p2 = projectedPoints[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 58) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / 58) * 0.07 * (fov / (fov + (p1.z + p2.z)/2));
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      projectedPoints.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        if (p.z < 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace('0.72', '0.12').replace('0.65', '0.1');
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          cancelAnimationFrame(animId);
          animId = requestAnimationFrame(render);
        }
      });
    }, { threshold: 0 });

    if (panel) {
      observer.observe(panel);
    }

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      panel.removeEventListener('mousemove', handleMouseMove);
      if (panel) {
        observer.unobserve(panel);
      }
      cancelAnimationFrame(animId);
    };
  }, []);

  // Elite Custom Trailing Magnetic Cursors
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const grid = document.querySelector('.cyber-grid-overlay');

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let isMagnetic = false;
    let activeMagnet = null;
    let activeMagnetRect = null;
    let magnetPageX = 0;
    let magnetPageY = 0;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      if (grid) {
        const tiltX = (e.clientX - window.innerWidth / 2) * 0.012;
        const tiltY = (e.clientY - window.innerHeight / 2) * -0.012;
        grid.style.transform = `perspective(1000px) rotateX(${60 + tiltY}deg) rotateY(${tiltX}deg) translate3d(0, 0, 0)`;
      }
    };

    const handleMouseDown = () => follower.classList.add('clicking');
    const handleMouseUp = () => follower.classList.remove('clicking');

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    const tick = () => {
      if (isMagnetic && activeMagnet && activeMagnetRect) {
        const magnetCenterX = magnetPageX - window.scrollX + activeMagnetRect.width / 2;
        const magnetCenterY = magnetPageY - window.scrollY + activeMagnetRect.height / 2;

        followerX += (magnetCenterX - followerX) * 0.28;
        followerY += (magnetCenterY - followerY) * 0.28;
        
        const pullX = (mouseX - magnetCenterX) * 0.22;
        const pullY = (mouseY - magnetCenterY) * 0.22;
        activeMagnet.style.transform = `translate3d(${pullX}px, ${pullY}px, 0) scale(1.03)`;
        activeMagnet.style.transition = 'none';
      } else {
        followerX += (mouseX - followerX) * 0.22;
        followerY += (mouseY - followerY) * 0.22;
      }

      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      requestAnimationFrame(tick);
    };
    const animId = requestAnimationFrame(tick);

    const handleMouseOver = (e) => {
      const el = e.target.closest('a, button, .btn-cta-primary, .btn-cta-secondary, .projects-filter-btn, .nav-link-btn, .floating-terminal-badge, .btn-nav-cta, .nav-logo, .skill-bento-card, .project-bento-card');
      if (!el) return;
      
      if (e.relatedTarget && el.contains(e.relatedTarget)) return;

      follower.classList.add('hovering');
      
      let tip = 'VIEW';
      if (el.tagName === 'BUTTON' || 
          el.classList.contains('btn-cta-primary') || 
          el.classList.contains('btn-cta-secondary') || 
          el.classList.contains('btn-form-submit') || 
          el.classList.contains('skill-bento-card') || 
          el.classList.contains('project-bento-card')) {
        tip = 'CLICK';
      }
      if (el.classList.contains('projects-filter-btn')) tip = 'SORT';
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') tip = 'TYPE';
      if (el.classList.contains('floating-terminal-badge')) tip = 'EXEC';
      
      follower.setAttribute('data-tip', tip);

      if (el.classList.contains('btn-cta-primary') || 
          el.classList.contains('btn-cta-secondary') || 
          el.classList.contains('btn-nav-cta') || 
          el.classList.contains('projects-filter-btn') || 
          el.classList.contains('floating-terminal-badge') || 
          el.classList.contains('nav-logo') || 
          el.classList.contains('nav-link-btn')) {
        isMagnetic = true;
        activeMagnet = el;
        const rect = el.getBoundingClientRect();
        activeMagnetRect = rect;
        magnetPageX = rect.left + window.scrollX;
        magnetPageY = rect.top + window.scrollY;
        follower.classList.add('magnetic');
        
        if (el.classList.contains('floating-terminal-badge') || el.classList.contains('nav-logo-box')) {
          follower.style.borderRadius = '50%';
        } else {
          follower.style.borderRadius = '8px';
        }
      }
    };

    const handleMouseOut = (e) => {
      const el = e.target.closest('a, button, .btn-cta-primary, .btn-cta-secondary, .projects-filter-btn, .nav-link-btn, .floating-terminal-badge, .btn-nav-cta, .nav-logo, .skill-bento-card, .project-bento-card');
      if (!el) return;
      
      if (e.relatedTarget && el.contains(e.relatedTarget)) return;

      follower.classList.remove('hovering');
      follower.classList.remove('magnetic');
      follower.removeAttribute('data-tip');
      follower.style.borderRadius = '';

      if (activeMagnet) {
        activeMagnet.style.transform = '';
        activeMagnet.style.transition = 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      }
      isMagnetic = false;
      activeMagnet = null;
      activeMagnetRect = null;
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Elastic spring transitions for active skill details selector bento
  useEffect(() => {
    gsap.fromTo('.skills-details-wrapper > *', 
      { y: 12, opacity: 0, scale: 0.99 },
      { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.04, ease: 'power4.out' }
    );
  }, [activeSkillId]);

  // Command Center Shortcuts (Cmd+K or Ctrl+K & Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsTerminalOpen(false);
        setIsMatrixActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isTerminalOpen) {
      if (terminalHistory.length === 0) {
        setTimeout(() => {
          setTerminalHistory([...TERMINAL_INITIAL_HISTORY]);
        }, 0);
      }
      setTimeout(() => {
        if (terminalInputRef.current) {
          terminalInputRef.current.focus();
        }
      }, 50);
    }
  }, [isTerminalOpen, terminalHistory.length]);

  // Terminal Autocomplete & Submit Handlers
  const handleTerminalKeyDown = (e) => {
    if ((e.key === 'Tab' || e.key === 'ArrowRight') && autocompleteHint) {
      e.preventDefault();
      setTerminalInput(autocompleteHint);
      setAutocompleteHint('');
    }
  };

  const handleTerminalInputChange = (e) => {
    const value = e.target.value;
    setTerminalInput(value);

    if (!value) {
      setAutocompleteHint('');
      return;
    }

    const commands = ['help', 'about', 'skills', 'projects', 'contact', 'matrix', 'clear', 'exit', 'gui', 'logs', 'status'];
    const match = commands.find(c => c.startsWith(value.toLowerCase()));
    
    if (match && match !== value.toLowerCase()) {
      setAutocompleteHint(match);
    } else {
      setAutocompleteHint('');
    }
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const rawInput = terminalInput.trim();
    if (!rawInput) return;

    const lowerInput = rawInput.toLowerCase();
    const parts = lowerInput.split(' ');
    const cmd = parts[0];
    const arg = parts.slice(1).join(' ');

    const newHistory = [...terminalHistory, { text: `$ ${rawInput}`, type: 'command-echo' }];
    setTerminalInput('');
    setAutocompleteHint('');

    const addHistoryLine = (text, type = 'output-system') => {
      newHistory.push({ text, type });
    };

    switch (cmd) {
      case 'help':
        addHistoryLine('\u2726 AVAILABLE OPERATIONAL COMMANDS:', 'output-header');
        addHistoryLine('  about         - Display Shivam\'s personal and VGU scholar specs', 'output-system');
        addHistoryLine('  skills        - Render interactive core skills competency matrix', 'output-system');
        addHistoryLine('  projects      - Showcase verified portfolio case study matrix', 'output-system');
        addHistoryLine('  contact       - Launch interactive email communication ingest', 'output-system');
        addHistoryLine('  status / logs - Display real-time e-commerce server & database logs', 'output-system');
        addHistoryLine('  matrix        - Initiate full-screen green code digital rain screensaver', 'output-system');
        addHistoryLine('  clear         - Purge current secure shell logging registry', 'output-system');
        addHistoryLine('  gui / exit    - Return to regular graphical portfolio layout', 'output-system');
        break;

      case 'clear':
        setTerminalHistory([]);
        return;

      case 'matrix':
        setIsMatrixActive(true);
        setIsTerminalOpen(false);
        return;

      case 'exit':
      case 'gui':
        setIsTerminalOpen(false);
        return;

      case 'about':
        addHistoryLine('\u2726 SHIVAM SINGH SHEKHAWAT - CORE METRICS:', 'output-header');
        addHistoryLine('  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', 'output-system');
        addHistoryLine('  Role: Full Stack Web Developer & AI Web Craftsman', 'output-system');
        addHistoryLine('  Degree: BCA Student @ Vivekananda Global University, Jaipur', 'output-system');
        addHistoryLine('  Focus: High-Performance MERN Stack & Next.js Systems', 'output-system');
        addHistoryLine('  Status: Available for 2026 contract requests', 'output-success');
        addHistoryLine('  Email: shekhawatshivamsingh3@gmail.com', 'output-system');
        addHistoryLine('  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', 'output-system');
        break;

      case 'skills':
        addHistoryLine('\u2726 CORE COMPETENCY MATRIX:', 'output-header');
        addHistoryLine('  React/Next.js [\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591] 90% - Advanced Master', 'output-success');
        addHistoryLine('  Tailwind CSS  [\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591] 92% - Advanced Master', 'output-success');
        addHistoryLine('  HTML5/CSS3    [\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588] 95% - Expert Craftsman', 'output-success');
        addHistoryLine('  JavaScript    [\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591] 88% - Advanced Core', 'output-success');
        addHistoryLine('  Git & GitHub  [\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591] 86% - Advanced Core', 'output-system');
        addHistoryLine('  Bootstrap 5   [\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591] 85% - Advanced Core', 'output-system');
        addHistoryLine('  Express/Node  [\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591] 82% - Intermediate Specialist', 'output-system');
        addHistoryLine('  MongoDB       [\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591] 80% - Intermediate Specialist', 'output-system');
        break;

      case 'projects':
        addHistoryLine('\u2726 FEATURED CASE STUDY MATRIX:', 'output-header');
        PROJECTS_DATA.forEach((p, idx) => {
          addHistoryLine(`  [${idx + 1}] ${p.title} (${p.category})`, 'output-system');
          addHistoryLine(`      Specs: ${p.shortDesc}`, 'output-warning');
        });
        addHistoryLine('  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', 'output-system');
        addHistoryLine('  Type "project <number>" (e.g. "project 1") to load specs.', 'output-success');
        break;

      case 'project': {
        const index = parseInt(arg) - 1;
        if (index >= 0 && index < PROJECTS_DATA.length) {
          const selectedProj = PROJECTS_DATA[index];
          setSelectedProject(selectedProj);
          setIsTerminalOpen(false);
          triggerToast(`\u2726 Loaded Case Study Specs: ${selectedProj.title}`);
          return;
        } else {
          addHistoryLine(`[ERROR] Project specification index "${arg}" is not active.`, 'output-error');
        }
        break;
      }

      case 'contact':
        addHistoryLine('\u2726 SECURE COLLABORATION CONNECTION INITIALIZED', 'output-header');
        addHistoryLine('  This console will capture inquiry parameters directly.', 'output-system');
        addHistoryLine('  Please use the graphical form in the footer or reach out:', 'output-warning');
        addHistoryLine('  Email: shekhawatshivamsingh3@gmail.com', 'output-system');
        addHistoryLine('  Direct Line: 8764719910', 'output-system');
        addHistoryLine('  LinkedIn: linkedin.com/in/shivam-singh-shekhawat-14826638a/', 'output-system');
        break;

      case 'status':
      case 'logs': {
        addHistoryLine('\u2726 ESTABLISHING SECURE CONNECTION TO E-COMMERCE SERVER NODE:', 'output-header');
        addHistoryLine('  Port: 5000 | MongoDB: Connected (latency: 14ms) | APIs: Synchronized', 'output-system');
        addHistoryLine('  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', 'output-system');
        addHistoryLine('  [MAPPED CRUD API STATUS]:', 'output-header');
        addHistoryLine('  - Brand controller endpoints: Mapped 6/6 successfully.', 'output-success');
        addHistoryLine('  - Color controller endpoints: Mapped 6/6 successfully.', 'output-success');
        addHistoryLine('  - Category controller endpoints: Typo patched successfully.', 'output-success');
        addHistoryLine('  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', 'output-system');
        addHistoryLine('  [REAL-TIME TRANSACTION READOUT]:', 'output-header');
        
        const endpoints = [
          'GET /api/products?page=1 - 200 OK (38ms)',
          'POST /api/users/login - 200 OK (84ms) - JWT Generated',
          'GET /api/color - 200 OK (22ms) - 6 items rendered',
          'GET /api/brand - 200 OK (18ms) - 5 items rendered',
          'POST /api/products - 201 Created (112ms) - Indexing Atlas',
          'PUT /api/color/col-neon - 200 OK (45ms) - Cache invalidated'
        ];
        
        endpoints.forEach(ep => {
          addHistoryLine(`  [TRAFFIC] ${ep}`, 'output-warning');
        });
        
        addHistoryLine('  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', 'output-system');
        addHistoryLine('  All backend operational APIs verified stable.', 'output-success');
        break;
      }

      default:
        addHistoryLine(`[SHELL EXCEPTION] Command "${cmd}" is not recognized.`, 'output-error');
        addHistoryLine('Type "help" to display active parameters.', 'output-system');
    }

    setTerminalHistory(newHistory);
    
    setTimeout(() => {
      if (terminalBodyRef.current) {
        terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
      }
    }, 30);
  };

  // Dynamic Hacker Matrix Digital Rain screensaver
  useEffect(() => {
    if (!isMatrixActive) return;
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const cols = Math.floor(width / 16);
    const ypos = Array(cols).fill(0);

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@&%+*<>[]{}';
    
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#10b981';
      ctx.font = '14px monospace';

      for (let i = 0; i < cols; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 16;
        const y = ypos[i];

        ctx.fillText(char, x, y);

        if (y > 100 + Math.random() * 10000) {
          ypos[i] = 0;
        } else {
          ypos[i] = y + 16;
        }
      }
    };

    const interval = setInterval(drawMatrix, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMatrixActive]);

  // Vercel-style GSAP FLIP Shuffle Grid transition for projects filtering
  useEffect(() => {
    const cards = document.querySelectorAll('.project-card-wrap');
    if (!cards.length) return;

    const positions = new Map();
    cards.forEach(card => {
      positions.set(card, card.getBoundingClientRect());
    });

    requestAnimationFrame(() => {
      cards.forEach(card => {
        const oldRect = positions.get(card);
        if (!oldRect) return;
        const newRect = card.getBoundingClientRect();

        const dx = oldRect.left - newRect.left;
        const dy = oldRect.top - newRect.top;

        if (dx !== 0 || dy !== 0) {
          gsap.fromTo(card, 
            { x: dx, y: dy, scale: 0.97 },
            { x: 0, y: 0, scale: 1, duration: 0.75, ease: 'power3.out', clearProps: 'transform' }
          );
        } else {
          gsap.fromTo(card,
            { scale: 0.92, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.65, ease: 'power3.out', clearProps: 'transform' }
          );
        }
      });
    });
  }, [activeFilter]);

  const activeSkill = SKILLS_DATA.find(s => s.id === activeSkillId) || SKILLS_DATA[0];

  return (
    <div>
      
      {/* 3D Parallax Cyber Grid Overlay backdrop */}
      <div className="cyber-grid-overlay"></div>

      {/* Dynamic Toast Alerts */}
      {toast && (
        <div className="toast-msg">
          <span style={{color: 'var(--accent)'}}>&#10022;</span>
          <span>{toast}</span>
        </div>
      )}

      {/* ==========================================
          CAPSULE FLOAT NAVBAR
          ========================================== */}
      <div className="navbar-wrapper">
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-active' : ''}`} ref={navbarRef}>
          <div className="navbar-progress-track">
            <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
          </div>
          
          <div className="nav-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <div className="nav-logo-box">SS</div>
            <span>Shivam Singh</span>
          </div>
          
          <ul className="nav-links" ref={navLinksRef}>
            <div className="nav-active-pill" style={pillStyle}></div>
            <li><a href="#about" className="nav-link-btn" onMouseEnter={handleNavLinkMouseEnter} onMouseLeave={handleNavLinkMouseLeave} onClick={() => setIsMobileMenuOpen(false)}>About</a></li>
            <li><a href="#skills" className="nav-link-btn" onMouseEnter={handleNavLinkMouseEnter} onMouseLeave={handleNavLinkMouseLeave} onClick={() => setIsMobileMenuOpen(false)}>Skills</a></li>
            <li><a href="#projects" className="nav-link-btn" onMouseEnter={handleNavLinkMouseEnter} onMouseLeave={handleNavLinkMouseLeave} onClick={() => setIsMobileMenuOpen(false)}>Projects</a></li>
            <li><a href="#credentials" className="nav-link-btn" onMouseEnter={handleNavLinkMouseEnter} onMouseLeave={handleNavLinkMouseLeave} onClick={() => setIsMobileMenuOpen(false)}>Certifications</a></li>
          </ul>

          <a href="#contact" className="btn-nav-cta" style={{textDecoration: 'none'}} onClick={() => setIsMobileMenuOpen(false)}>Hire Shivam</a>

          <button className={`nav-mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
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
            Computer Applications (BCA) student at <strong>Vivekananda Global University</strong>, specializing in robust MERN stack applications and responsive interfaces optimized with modern Generative AI acceleration.
          </p>

          <div className="hero-ctas">
            <a href="#projects" className="btn-cta-primary">
              <span>View Case Studies</span>
              <span>&rarr;</span>
            </a>
            <a 
              href="/full_stack_resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-cta-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Download Resume</span>
              <span style={{ fontSize: '1.05rem', lineHeight: 1 }}>&#11123;</span>
            </a>
            <a href="#contact" className="btn-cta-secondary" style={{ background: 'transparent', border: 'none', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>Get In Touch</a>
          </div>

        </div>

        {/* Fluid Canvas Panel */}
        <div className="hero-visual-panel" ref={visualPanelRef}>
          <canvas className="particles-canvas" ref={canvasRef} />
          
          <div 
            className="visual-profile-card"
            {...cardHoverProps}
          >
            <div className="visual-avatar-container">
              <img src="/shivam.jpeg" alt="Shivam Singh Shekhawat" className="visual-avatar-img" />
              <div className="avatar-glowing-pulse"></div>
            </div>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
              <h3 style={{fontSize: '1.25rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em'}}>Shivam Singh</h3>
              <p style={{fontSize: '0.8rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontWeight: '600'}}>Full-Stack Developer</p>
            </div>
            
            <div className="stats-badge-row">
              <span className="stats-badge">&#10022; 5+ Projects</span>
              <span className="stats-badge">&#128205; Jaipur, IN</span>
            </div>
            
            <p style={{fontSize: '0.75rem', color: '#cbd5e1', lineHeight: '1.4'}}>Engineering high-performance MERN & Next.js systems.</p>
          </div>

        </div>

      </section>

      {/* ==========================================
          APPLE STYLE BENTO GRID WORKSPACE
          ========================================== */}
      <section className="section" id="about">
        
        <SectionHeader subtitle="Biography & Journey" title="Academic &" titleHighlight="Personal Profile" />

        <div className="bento-grid">
          
          {/* Bento Card 1: Bio */}
          <div 
            className="bento-card bento-span-2 bento-bio-card"
            {...cardHoverProps}
          >
            <h3 className="bento-card-title" style={{color: 'var(--primary)'}}>The Developer & Scholar</h3>
            <p>
              Currently pursuing a <strong>Bachelor of Computer Applications (BCA)</strong> at <em>Vivekananda Global University, Jaipur</em>, my engineering journey is centered around mastering robust, full-stack systems that load cleanly and scale effortlessly.
            </p>
            <p>
              I specialize in bridging visual aesthetics with structured server logistics. By applying MERN parameters combined with Gen AI optimization steps, I build applications with high reliability.
            </p>
          </div>

          {/* Bento Card 2: Metrics */}
          <div 
            className="bento-card"
            {...cardHoverProps}
          >
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
          <div 
            className="bento-card bento-span-2"
            {...cardHoverProps}
          >
            <h3 className="bento-card-title">Academic Timeline</h3>
            <div className="bento-timeline">
              <div className="bento-timeline-node">
                <span className="bento-timeline-date">2024 - 2027</span>
                <span className="bento-timeline-title">BCA, VGU Jaipur</span>
                <span className="bento-timeline-subtitle">Bachelor of Computer Applications</span>
              </div>
              <div className="bento-timeline-node">
                <span className="bento-timeline-date">2025 - Present</span>
                <span className="bento-timeline-title">Full-Stack Development</span>
                <span className="bento-timeline-subtitle">MERN Stack & Gen AI-enhanced builds</span>
              </div>
            </div>
          </div>

          {/* Bento Card 4: Interests */}
          <div 
            className="bento-card"
            {...cardHoverProps}
          >
            <h3 className="bento-card-title" style={{color: 'var(--accent)'}}>Focus Domains</h3>
            <p className="bento-card-desc">Core areas of interest and hands-on focus in the modern web development pipeline.</p>
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
        
        <SectionHeader subtitle="Core Competencies" title="Interactive" titleHighlight="Skills Matrix" />

        <div className="glass-panel skills-bento-grid" style={{padding: '2.25rem', borderRadius: 'var(--radius-lg)'}}>
          
          {/* Left: Skill Selectors */}
          <div className="skills-left-selector">
            {SKILLS_DATA.map((skill) => (
              <div 
                key={skill.id}
                className={`glass-card skill-bento-card ${activeSkillId === skill.id ? 'active' : ''}`}
                onClick={() => setActiveSkillId(skill.id)}
                {...cardHoverProps}
              >
                <div className="skill-icon-placeholder">
                  <SkillIcon id={skill.id} />
                </div>
                <span style={{fontSize: '0.85rem', fontWeight: 600, color: 'white'}}>{skill.label.split(' ')[0]}</span>
              </div>
            ))}
          </div>

          {/* Right: Analytics details Panel */}
          <div 
            className="glass-card skills-right-details"
            {...cardHoverProps}
          >
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
        
        <SectionHeader subtitle="Case Studies" title="Featured" titleHighlight="Project Matrix" />

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
                {...cardHoverProps}
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

                <div className="project-svg-visualizer">
                  <ProjectVisual id={project.id} />
                </div>

                <div style={{marginTop: '1.25rem', fontSize: '0.85rem', color: project.color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <span>Analyze Case Study</span>
                  <span>&rarr;</span>
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
        
        <SectionHeader subtitle="Certificates & Achievements" title="Verified" titleHighlight="Credentials" />

        <div className="credentials-grid">
          {CREDENTIALS_DATA.map((cert, index) => (
            <div 
              className="bento-card cert-bento-card" 
              key={index}
              {...cardHoverProps}
            >
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
        
        <SectionHeader subtitle="Secure Connection Ingestion" title="Initiate" titleHighlight="Collaboration" />

        <div className="contact-bento-layout">
          
          <div className="contact-left-info">
            <p className="contact-text">
              Have an enterprise project, complex backend specifications, or a full-stack job opportunity? Get in touch, and let&apos;s engineer a solution.
            </p>

            <div className="contact-bento-badges">
              {CONTACT_LINKS.map((item, idx) => (
                <ContactBadge
                  key={idx}
                  item={item}
                  onCopyEmail={handleCopyEmail}
                  cardHoverProps={cardHoverProps}
                />
              ))}
            </div>
          </div>

          {/* Form Side */}
          <form 
            className="bento-card contact-bento-form" 
            onSubmit={handleSubmit}
            {...cardHoverProps}
          >
            <FormField label="Display Name *" placeholder="Alex Mercer" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
            <FormField label="Email Node *" type="email" placeholder="alex@enterprise.com" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required />
            <FormField label="Subject Specification" placeholder="Next.js Contract Node integration" value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} />
            <FormField label="Inquiry Core Details *" placeholder="Provide parameters of required task scope..." value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} required isTextarea />

            <button type="submit" className="btn-form-submit" disabled={isSubmitting}>
              <span>{isSubmitting ? 'Ingesting Secure Connection...' : 'Transmit Message Node'}</span>
              <span className={isSubmitting ? 'pulse-spinner' : ''}>&#9889;</span>
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
          &copy; {new Date().getFullYear()} Shivam Singh Shekhawat. Structured with pixel-accuracy. All rights reserved.
        </p>
      </footer>

      {/* ==========================================
          FULL-SCREEN CASE STUDY DRAWER SLIDER
          ========================================== */}
      {selectedProject && (
        <>
          <div className="case-study-overlay-backdrop" onClick={() => setSelectedProject(null)}></div>
          
          <div className={`case-study-drawer ${selectedProject ? 'open' : ''}`}>
            
            <div className="case-study-header">
              <div className="nav-logo">
                <div className="nav-logo-box">SS</div>
                <span className="case-study-title">Case Study Specs</span>
              </div>
              <button className="btn-close-case-study" onClick={() => setSelectedProject(null)}>&#10005;</button>
            </div>

            <div className="case-study-content">
              
              <div className="case-study-section">
                <h3 style={{fontFamily: 'var(--font-display)', fontSize: '1.65rem', color: 'white', fontWeight: 700}}>{selectedProject.title}</h3>
                <div style={{display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap', alignItems: 'center'}}>
                  <span className="project-tag" style={{borderColor: selectedProject.color, color: 'white', background: 'rgba(255,255,255,0.01)'}}>{selectedProject.category}</span>
                  <span className="project-tag">{selectedProject.date}</span>
                </div>
                
                <div style={{display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap'}}>
                  <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-cta-primary" style={{padding: '0.55rem 1.1rem', fontSize: '0.75rem', borderRadius: '4px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px'}}>
                    <span>Explore Source Registry</span>
                    <span>&#8599;</span>
                  </a>
                </div>
              </div>

              <div className="case-study-section">
                <span className="case-study-section-title">1. Operational Challenge</span>
                <p className="case-study-desc">{selectedProject.challenge}</p>
              </div>

              <div className="case-study-section">
                <span className="case-study-section-title">2. System Architecture Flow</span>
                <div className="architecture-diagram-svg">
                  <ArchitectureDiagram projectId={selectedProject.id} />
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

      {/* Floating command center badge */}
      <div className="floating-terminal-badge" onClick={() => setIsTerminalOpen(true)}>&#8984;</div>

      {/* Interactive Cursors */}
      <div className="custom-cursor" ref={cursorRef} aria-hidden="true"></div>
      <div className="custom-cursor-follower" ref={followerRef} aria-hidden="true"></div>

      {/* Command Center Overlay Terminal Modal */}
      {isTerminalOpen && (
        <div className="terminal-overlay" onClick={() => setIsTerminalOpen(false)}>
          <div className="terminal-modal" onClick={(e) => e.stopPropagation()}>
            <div className="terminal-titlebar">
              <div className="terminal-window-buttons">
                <button className="terminal-dot-btn red" onClick={() => setIsTerminalOpen(false)}></button>
                <button className="terminal-dot-btn yellow"></button>
                <button className="terminal-dot-btn green"></button>
              </div>
              <span className="terminal-title-text">shivam@cyber-shell:~</span>
              <button className="terminal-close-btn" onClick={() => setIsTerminalOpen(false)}>&#10005;</button>
            </div>
            <div className="terminal-body" ref={terminalBodyRef}>
              <div className="terminal-history">
                {terminalHistory.map((line, idx) => (
                  <div key={idx} className={`terminal-line ${line.type}`}>{line.text}</div>
                ))}
              </div>
              <form onSubmit={handleTerminalSubmit} className="terminal-input-row">
                <span className="terminal-prompt">~ $</span>
                <div className="terminal-input-wrapper">
                  <input 
                    type="text" 
                    className="terminal-input"
                    ref={terminalInputRef}
                    value={terminalInput}
                    onChange={handleTerminalInputChange}
                    onKeyDown={handleTerminalKeyDown}
                    autoFocus
                  />
                  {autocompleteHint && (
                    <span className="terminal-autocomplete-hint">
                      {terminalInput}{autocompleteHint.substring(terminalInput.length)}
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Hacker Matrix Digital Rain Screensaver */}
      {isMatrixActive && (
        <>
          <canvas className="matrix-overlay-canvas" ref={matrixCanvasRef}></canvas>
          <button className="matrix-exit-badge" onClick={() => setIsMatrixActive(false)}>EXIT MATRIX SCREEN [ESC]</button>
        </>
      )}

    </div>
  );
}
