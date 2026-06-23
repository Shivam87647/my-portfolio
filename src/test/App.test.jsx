import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act, within } from '@testing-library/react';
import App from '../App';

// Mock GSAP
vi.mock('gsap', () => ({
  gsap: {
    timeline: () => ({
      to: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      fromTo: vi.fn().mockReturnThis(),
    }),
    set: vi.fn(),
    to: vi.fn(),
    from: vi.fn(),
    fromTo: vi.fn(),
  },
}));

// Mock canvas getContext
HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
  fillRect: vi.fn(),
  fillText: vi.fn(),
}));

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = MockIntersectionObserver;

// Mock clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
});

// Mock requestAnimationFrame
window.requestAnimationFrame = vi.fn((cb) => {
  cb();
  return 1;
});
window.cancelAnimationFrame = vi.fn();

// Mock scrollTo
window.scrollTo = vi.fn();

// Helper to get the terminal input element
const getTerminalInput = (container) => container.querySelector('.terminal-input');

describe('App Component', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the navbar with logo and links', () => {
      render(<App />);
      const navbar = document.querySelector('.navbar');
      expect(within(navbar).getByText('Shivam Singh')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Skills')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('Certifications')).toBeInTheDocument();
    });

    it('renders the hero section content', () => {
      render(<App />);
      expect(screen.getByText('Shivam Singh Shekhawat')).toBeInTheDocument();
      expect(screen.getByText('Crafting Premium Digital Experiences')).toBeInTheDocument();
      expect(screen.getByText('Now Booking Projects for 2026')).toBeInTheDocument();
      expect(screen.getByText('View Case Studies')).toBeInTheDocument();
      expect(screen.getByText('Download Resume')).toBeInTheDocument();
    });

    it('renders the about section with bento cards', () => {
      render(<App />);
      expect(screen.getByText('The Developer & Scholar')).toBeInTheDocument();
      expect(screen.getByText('Platform Stats')).toBeInTheDocument();
      expect(screen.getByText('Academic Timeline')).toBeInTheDocument();
      expect(screen.getByText('Passions')).toBeInTheDocument();
    });

    it('renders all skills in the skills section', () => {
      render(<App />);
      expect(screen.getByText('React.js / Next.js')).toBeInTheDocument();
      expect(screen.getByText('90%')).toBeInTheDocument();
    });

    it('renders the contact section with email', () => {
      render(<App />);
      expect(screen.getAllByText('shekhawatshivamsingh3@gmail.com').length).toBeGreaterThan(0);
      expect(screen.getByText('Transmit Message Node')).toBeInTheDocument();
    });

    it('renders the footer with social links', () => {
      render(<App />);
      const footer = document.querySelector('.footer');
      expect(within(footer).getByText('Github')).toBeInTheDocument();
      expect(within(footer).getByText('LinkedIn')).toBeInTheDocument();
    });

    it('renders the floating terminal badge', () => {
      render(<App />);
      expect(screen.getByText('⌘')).toBeInTheDocument();
    });

    it('renders Hire Shivam CTA button', () => {
      render(<App />);
      expect(screen.getByText('Hire Shivam')).toBeInTheDocument();
    });
  });

  describe('Skills Section Interaction', () => {
    it('shows React skill details by default', () => {
      render(<App />);
      expect(screen.getByText('React.js / Next.js')).toBeInTheDocument();
      const skillDetails = document.querySelector('.skills-right-details');
      expect(within(skillDetails).getByText('Advanced Master')).toBeInTheDocument();
      expect(within(skillDetails).getByText('90%')).toBeInTheDocument();
    });

    it('switches skill details when a skill card is clicked', async () => {
      render(<App />);
      const skillCards = document.querySelectorAll('.skill-bento-card');
      // JavaScript is the second skill card
      fireEvent.click(skillCards[1]);

      await waitFor(() => {
        const skillDetails = document.querySelector('.skills-right-details');
        expect(within(skillDetails).getByText('JavaScript (ES6+)')).toBeInTheDocument();
        expect(within(skillDetails).getByText('88%')).toBeInTheDocument();
      });
    });

    it('shows MongoDB skill details when clicked', async () => {
      render(<App />);
      const skillCards = document.querySelectorAll('.skill-bento-card');
      // MongoDB is the third skill card
      fireEvent.click(skillCards[2]);

      await waitFor(() => {
        const skillDetails = document.querySelector('.skills-right-details');
        expect(within(skillDetails).getByText('MongoDB Database')).toBeInTheDocument();
        expect(within(skillDetails).getByText('80%')).toBeInTheDocument();
      });
    });
  });

  describe('Project Filtering', () => {
    it('shows all projects by default', () => {
      render(<App />);
      const projectCards = document.querySelectorAll('.project-card-wrap');
      expect(projectCards.length).toBe(5);
    });

    it('filters projects by Full Stack category', () => {
      render(<App />);
      const filterBtns = document.querySelectorAll('.projects-filter-btn');
      fireEvent.click(filterBtns[1]); // Full Stack

      const projectCards = document.querySelectorAll('.project-card-wrap');
      expect(projectCards.length).toBe(1);
    });

    it('filters projects by Frontend category', () => {
      render(<App />);
      const filterBtns = document.querySelectorAll('.projects-filter-btn');
      fireEvent.click(filterBtns[2]); // Frontend

      const projectCards = document.querySelectorAll('.project-card-wrap');
      expect(projectCards.length).toBe(1);
    });

    it('filters projects by UI & Clone category', () => {
      render(<App />);
      const filterBtns = document.querySelectorAll('.projects-filter-btn');
      fireEvent.click(filterBtns[3]); // UI & Clone

      const projectCards = document.querySelectorAll('.project-card-wrap');
      expect(projectCards.length).toBe(3);
    });

    it('returns to All projects when All filter clicked', () => {
      render(<App />);
      const filterBtns = document.querySelectorAll('.projects-filter-btn');

      fireEvent.click(filterBtns[2]); // Frontend
      expect(document.querySelectorAll('.project-card-wrap').length).toBe(1);

      fireEvent.click(filterBtns[0]); // All
      expect(document.querySelectorAll('.project-card-wrap').length).toBe(5);
    });
  });

  describe('Contact Form', () => {
    it('renders all form fields', () => {
      render(<App />);
      expect(screen.getByPlaceholderText('Alex Mercer')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('alex@enterprise.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Next.js Contract Node integration')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Provide parameters of required task scope...')).toBeInTheDocument();
    });

    it('shows validation toast when required fields are empty', () => {
      render(<App />);
      const form = document.querySelector('.contact-bento-form');
      fireEvent.submit(form);

      expect(screen.getByText('Please complete all required contact details.')).toBeInTheDocument();
    });

    it('submits form successfully with valid data', async () => {
      render(<App />);

      fireEvent.change(screen.getByPlaceholderText('Alex Mercer'), {
        target: { value: 'John Doe' },
      });
      fireEvent.change(screen.getByPlaceholderText('alex@enterprise.com'), {
        target: { value: 'john@test.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('Provide parameters of required task scope...'), {
        target: { value: 'I need a website.' },
      });

      const form = document.querySelector('.contact-bento-form');
      const submitBtn = within(form).getByRole('button');
      fireEvent.click(submitBtn);

      expect(screen.getByText(/Initiating secure quantum connection handshake/)).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(1800);
      });

      await waitFor(() => {
        expect(screen.getByText(/TRANSMISSION VERIFIED/)).toBeInTheDocument();
      });
    });

    it('clears form fields after successful submission', async () => {
      render(<App />);

      const nameInput = screen.getByPlaceholderText('Alex Mercer');
      const emailInput = screen.getByPlaceholderText('alex@enterprise.com');
      const messageInput = screen.getByPlaceholderText('Provide parameters of required task scope...');

      fireEvent.change(nameInput, { target: { value: 'Jane' } });
      fireEvent.change(emailInput, { target: { value: 'jane@test.com' } });
      fireEvent.change(messageInput, { target: { value: 'Hello' } });

      const form = document.querySelector('.contact-bento-form');
      fireEvent.click(within(form).getByRole('button'));

      act(() => {
        vi.advanceTimersByTime(1800);
      });

      await waitFor(() => {
        expect(nameInput.value).toBe('');
        expect(emailInput.value).toBe('');
        expect(messageInput.value).toBe('');
      });
    });

    it('disables submit button during submission', () => {
      render(<App />);

      fireEvent.change(screen.getByPlaceholderText('Alex Mercer'), {
        target: { value: 'Test' },
      });
      fireEvent.change(screen.getByPlaceholderText('alex@enterprise.com'), {
        target: { value: 'test@test.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('Provide parameters of required task scope...'), {
        target: { value: 'Message' },
      });

      const form = document.querySelector('.contact-bento-form');
      fireEvent.click(within(form).getByRole('button'));

      expect(screen.getByText('Ingesting Secure Connection...')).toBeInTheDocument();
    });
  });

  describe('Copy Email', () => {
    it('copies email to clipboard when clicked', () => {
      render(<App />);
      const emailBadge = screen.getByRole('button', { name: /Copy primary email to clipboard/i });
      fireEvent.click(emailBadge);

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('shekhawatshivamsingh3@gmail.com');
    });

    it('shows toast after copying email', () => {
      render(<App />);
      const emailBadge = screen.getByRole('button', { name: /Copy primary email to clipboard/i });
      fireEvent.click(emailBadge);

      expect(screen.getByText(/Core email copied to clipboard registry/)).toBeInTheDocument();
    });
  });

  describe('Terminal', () => {
    it('opens terminal when floating badge is clicked', () => {
      render(<App />);
      fireEvent.click(screen.getByText('⌘'));

      expect(screen.getByText('shivam@cyber-shell:~')).toBeInTheDocument();
    });

    it('shows initial terminal messages', () => {
      render(<App />);
      fireEvent.click(screen.getByText('⌘'));

      expect(screen.getByText(/SHIVAM SECURE SHELL SYSTEM/)).toBeInTheDocument();
    });

    it('processes help command', () => {
      render(<App />);
      fireEvent.click(screen.getByText('⌘'));

      const input = getTerminalInput(document);
      fireEvent.change(input, { target: { value: 'help' } });
      fireEvent.submit(input.closest('form'));

      expect(screen.getByText(/AVAILABLE OPERATIONAL COMMANDS/)).toBeInTheDocument();
    });

    it('processes about command', () => {
      render(<App />);
      fireEvent.click(screen.getByText('⌘'));

      const input = getTerminalInput(document);
      fireEvent.change(input, { target: { value: 'about' } });
      fireEvent.submit(input.closest('form'));

      expect(screen.getByText(/SHIVAM SINGH SHEKHAWAT - CORE METRICS/)).toBeInTheDocument();
    });

    it('processes skills command', () => {
      render(<App />);
      fireEvent.click(screen.getByText('⌘'));

      const input = getTerminalInput(document);
      fireEvent.change(input, { target: { value: 'skills' } });
      fireEvent.submit(input.closest('form'));

      expect(screen.getByText(/CORE COMPETENCY MATRIX/)).toBeInTheDocument();
    });

    it('processes projects command', () => {
      render(<App />);
      fireEvent.click(screen.getByText('⌘'));

      const input = getTerminalInput(document);
      fireEvent.change(input, { target: { value: 'projects' } });
      fireEvent.submit(input.closest('form'));

      expect(screen.getByText(/FEATURED CASE STUDY MATRIX/)).toBeInTheDocument();
    });

    it('processes contact command', () => {
      render(<App />);
      fireEvent.click(screen.getByText('⌘'));

      const input = getTerminalInput(document);
      fireEvent.change(input, { target: { value: 'contact' } });
      fireEvent.submit(input.closest('form'));

      expect(screen.getByText(/SECURE COLLABORATION CONNECTION INITIALIZED/)).toBeInTheDocument();
    });

    it('processes status/logs command', () => {
      render(<App />);
      fireEvent.click(screen.getByText('⌘'));

      const input = getTerminalInput(document);
      fireEvent.change(input, { target: { value: 'status' } });
      fireEvent.submit(input.closest('form'));

      expect(screen.getByText(/ESTABLISHING SECURE CONNECTION TO E-COMMERCE SERVER NODE/)).toBeInTheDocument();
    });

    it('shows error for unrecognized commands', () => {
      render(<App />);
      fireEvent.click(screen.getByText('⌘'));

      const input = getTerminalInput(document);
      fireEvent.change(input, { target: { value: 'invalid' } });
      fireEvent.submit(input.closest('form'));

      expect(screen.getByText(/Command "invalid" is not recognized/)).toBeInTheDocument();
    });

    it('clears terminal with clear command', () => {
      render(<App />);
      fireEvent.click(screen.getByText('⌘'));

      const input = getTerminalInput(document);
      fireEvent.change(input, { target: { value: 'clear' } });
      fireEvent.submit(input.closest('form'));

      expect(screen.queryByText(/SHIVAM SECURE SHELL SYSTEM/)).not.toBeInTheDocument();
    });

    it('closes terminal with exit command', () => {
      render(<App />);
      fireEvent.click(screen.getByText('⌘'));
      expect(screen.getByText('shivam@cyber-shell:~')).toBeInTheDocument();

      const input = getTerminalInput(document);
      fireEvent.change(input, { target: { value: 'exit' } });
      fireEvent.submit(input.closest('form'));

      expect(screen.queryByText('shivam@cyber-shell:~')).not.toBeInTheDocument();
    });

    it('closes terminal with gui command', () => {
      render(<App />);
      fireEvent.click(screen.getByText('⌘'));

      const input = getTerminalInput(document);
      fireEvent.change(input, { target: { value: 'gui' } });
      fireEvent.submit(input.closest('form'));

      expect(screen.queryByText('shivam@cyber-shell:~')).not.toBeInTheDocument();
    });

    it('shows autocomplete hint for partial commands', () => {
      render(<App />);
      fireEvent.click(screen.getByText('⌘'));

      const input = getTerminalInput(document);
      fireEvent.change(input, { target: { value: 'hel' } });

      const hint = document.querySelector('.terminal-autocomplete-hint');
      expect(hint).toBeInTheDocument();
      expect(hint.textContent).toContain('help');
    });

    it('does not submit empty commands', () => {
      render(<App />);
      fireEvent.click(screen.getByText('⌘'));

      const historyCount = document.querySelectorAll('.terminal-line').length;
      const input = getTerminalInput(document);
      fireEvent.submit(input.closest('form'));

      expect(document.querySelectorAll('.terminal-line').length).toBe(historyCount);
    });

    it('processes project command with valid index', () => {
      render(<App />);
      fireEvent.click(screen.getByText('⌘'));

      const input = getTerminalInput(document);
      fireEvent.change(input, { target: { value: 'project 1' } });
      fireEvent.submit(input.closest('form'));

      // Terminal closes and case study drawer opens
      expect(screen.queryByText('shivam@cyber-shell:~')).not.toBeInTheDocument();
      expect(screen.getByText('Case Study Specs')).toBeInTheDocument();
    });

    it('shows error for project command with invalid index', () => {
      render(<App />);
      fireEvent.click(screen.getByText('⌘'));

      const input = getTerminalInput(document);
      fireEvent.change(input, { target: { value: 'project 99' } });
      fireEvent.submit(input.closest('form'));

      expect(screen.getByText(/not active/)).toBeInTheDocument();
    });

    it('closes terminal on close button click', () => {
      render(<App />);
      fireEvent.click(screen.getByText('⌘'));

      const terminalModal = document.querySelector('.terminal-modal');
      const closeBtn = within(terminalModal).getByText('✕');
      fireEvent.click(closeBtn);

      expect(screen.queryByText('shivam@cyber-shell:~')).not.toBeInTheDocument();
    });

    it('accepts Tab key to complete autocomplete', () => {
      render(<App />);
      fireEvent.click(screen.getByText('⌘'));

      const input = getTerminalInput(document);
      fireEvent.change(input, { target: { value: 'hel' } });
      fireEvent.keyDown(input, { key: 'Tab' });

      expect(input.value).toBe('help');
    });
  });

  describe('Case Study Drawer', () => {
    it('opens case study drawer when project card is clicked', () => {
      render(<App />);
      const projectCard = document.querySelector('.project-bento-card');
      fireEvent.click(projectCard);

      expect(screen.getByText('Case Study Specs')).toBeInTheDocument();
      expect(screen.getByText('1. Operational Challenge')).toBeInTheDocument();
    });

    it('shows project bullets in case study', () => {
      render(<App />);
      const projectCard = document.querySelector('.project-bento-card');
      fireEvent.click(projectCard);

      expect(screen.getByText(/Engineered responsive storefront/)).toBeInTheDocument();
    });

    it('shows project impact in case study', () => {
      render(<App />);
      const projectCard = document.querySelector('.project-bento-card');
      fireEvent.click(projectCard);

      expect(screen.getByText(/Cut page load times by 48%/)).toBeInTheDocument();
    });

    it('shows project tags in case study', () => {
      render(<App />);
      const projectCard = document.querySelector('.project-bento-card');
      fireEvent.click(projectCard);

      const drawer = document.querySelector('.case-study-drawer');
      expect(within(drawer).getByText('Next.js')).toBeInTheDocument();
      expect(within(drawer).getByText('Express.js')).toBeInTheDocument();
      expect(within(drawer).getByText('Redux')).toBeInTheDocument();
    });

    it('closes case study drawer on close button click', () => {
      render(<App />);
      const projectCard = document.querySelector('.project-bento-card');
      fireEvent.click(projectCard);

      expect(screen.getByText('Case Study Specs')).toBeInTheDocument();

      const closeBtn = document.querySelector('.btn-close-case-study');
      fireEvent.click(closeBtn);

      expect(screen.queryByText('Case Study Specs')).not.toBeInTheDocument();
    });

    it('closes case study drawer on backdrop click', () => {
      render(<App />);
      const projectCard = document.querySelector('.project-bento-card');
      fireEvent.click(projectCard);

      const backdrop = document.querySelector('.case-study-overlay-backdrop');
      fireEvent.click(backdrop);

      expect(screen.queryByText('Case Study Specs')).not.toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('scrolls to top when logo is clicked', () => {
      render(<App />);
      const logo = document.querySelector('.nav-logo');
      fireEvent.click(logo);

      expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('adds scrolled class to navbar on scroll', () => {
      render(<App />);
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      fireEvent.scroll(window);

      const navbar = document.querySelector('.navbar');
      expect(navbar.classList.contains('scrolled')).toBe(true);
    });

    it('toggles mobile menu', () => {
      render(<App />);
      const toggleBtn = document.querySelector('.nav-mobile-toggle');
      fireEvent.click(toggleBtn);

      const navbar = document.querySelector('.navbar');
      expect(navbar.classList.contains('mobile-active')).toBe(true);
    });
  });

  describe('Credentials Section', () => {
    it('renders all credentials', () => {
      render(<App />);
      expect(screen.getByText('Generative AI Mastermind Program')).toBeInTheDocument();
      expect(screen.getByText('Web Development enhanced with Gen AI')).toBeInTheDocument();
    });

    it('renders credential providers', () => {
      render(<App />);
      expect(screen.getByText('Hands-on AI Cohort Mastery')).toBeInTheDocument();
      expect(screen.getByText('Modern Workflow Systems Training')).toBeInTheDocument();
    });
  });

  describe('Toast Notifications', () => {
    it('toast disappears after timeout', async () => {
      render(<App />);
      const emailBadge = screen.getByRole('button', { name: /Copy primary email to clipboard/i });
      fireEvent.click(emailBadge);

      expect(screen.getByText(/Core email copied to clipboard registry/)).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      await waitFor(() => {
        expect(screen.queryByText(/Core email copied to clipboard registry/)).not.toBeInTheDocument();
      });
    });
  });

  describe('Keyboard Shortcuts', () => {
    it('opens terminal with Ctrl+K', () => {
      render(<App />);
      fireEvent.keyDown(window, { key: 'k', ctrlKey: true });

      expect(screen.getByText('shivam@cyber-shell:~')).toBeInTheDocument();
    });

    it('closes terminal with Escape', () => {
      render(<App />);

      fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
      expect(screen.getByText('shivam@cyber-shell:~')).toBeInTheDocument();

      fireEvent.keyDown(window, { key: 'Escape' });
      expect(screen.queryByText('shivam@cyber-shell:~')).not.toBeInTheDocument();
    });

    it('toggles terminal with Ctrl+K', () => {
      render(<App />);

      fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
      expect(screen.getByText('shivam@cyber-shell:~')).toBeInTheDocument();

      fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
      expect(screen.queryByText('shivam@cyber-shell:~')).not.toBeInTheDocument();
    });
  });

  describe('Matrix Easter Egg', () => {
    it('activates matrix mode via terminal command', () => {
      render(<App />);
      fireEvent.click(screen.getByText('⌘'));

      const input = getTerminalInput(document);
      fireEvent.change(input, { target: { value: 'matrix' } });
      fireEvent.submit(input.closest('form'));

      expect(document.querySelector('.matrix-overlay-canvas')).toBeInTheDocument();
    });

    it('exits matrix mode on button click', () => {
      render(<App />);
      fireEvent.click(screen.getByText('⌘'));

      const input = getTerminalInput(document);
      fireEvent.change(input, { target: { value: 'matrix' } });
      fireEvent.submit(input.closest('form'));

      const exitBtn = screen.getByText(/EXIT MATRIX SCREEN/);
      fireEvent.click(exitBtn);

      expect(document.querySelector('.matrix-overlay-canvas')).not.toBeInTheDocument();
    });
  });

  describe('3D Card Hover', () => {
    it('applies transform on mouse move over card', () => {
      render(<App />);
      const card = document.querySelector('.visual-profile-card');

      const rect = { left: 0, top: 0, width: 260, height: 350 };
      card.getBoundingClientRect = () => rect;

      fireEvent.mouseMove(card, { clientX: 200, clientY: 200 });

      expect(card.style.transform).toContain('rotateX');
      expect(card.style.transform).toContain('rotateY');
    });

    it('resets transform on mouse leave', () => {
      render(<App />);
      const card = document.querySelector('.visual-profile-card');

      const rect = { left: 0, top: 0, width: 260, height: 350 };
      card.getBoundingClientRect = () => rect;

      fireEvent.mouseMove(card, { clientX: 200, clientY: 200 });
      fireEvent.mouseLeave(card);

      expect(card.style.transform).toBe('rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    });
  });

  describe('Data Integrity', () => {
    it('renders correct number of projects (5)', () => {
      render(<App />);
      const projectCards = document.querySelectorAll('.project-card-wrap');
      expect(projectCards.length).toBe(5);
    });

    it('renders correct number of skill cards (8)', () => {
      render(<App />);
      const skillCards = document.querySelectorAll('.skill-bento-card');
      expect(skillCards.length).toBe(8);
    });

    it('renders correct number of credentials (2)', () => {
      render(<App />);
      const credCards = document.querySelectorAll('.cert-bento-card');
      expect(credCards.length).toBe(2);
    });

    it('has correct footer copyright year', () => {
      render(<App />);
      const currentYear = new Date().getFullYear().toString();
      const footer = document.querySelector('.footer');
      expect(footer.textContent).toContain(`© ${currentYear}`);
    });
  });
});
