import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';

interface NavigationProps {
  scrollY: number;
}

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation({ scrollY }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  const isScrolled = scrollY > 50;

  useEffect(() => {
    // Hide/show nav based on scroll direction
    const shouldHide = scrollY > lastScrollYRef.current && scrollY > 100;
    const shouldShow = scrollY <= lastScrollYRef.current || scrollY <= 100;

    if (shouldHide && isVisible) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(false);
    } else if (shouldShow && !isVisible) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
    }

    lastScrollYRef.current = scrollY;
  }, [scrollY, isVisible]);

  useEffect(() => {
    // Track active section
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.slice(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{
          y: isVisible ? 0 : -100,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'py-3'
          : 'py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300 ${isScrolled
              ? 'bg-white/80 backdrop-blur-xl shadow-soft'
              : 'bg-transparent'
              }`}
          >
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-orange-400 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white font-heading font-bold text-lg">AC</span>
              </motion.div>
              <span className={`font-heading font-semibold text-lg transition-colors ${isScrolled ? 'text-navy-500' : 'text-navy-500'
                }`}>
                Alex Chen
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${activeSection === link.href.slice(1)
                    ? 'text-sky-500'
                    : 'text-navy-400 hover:text-navy-500'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-sky-50 rounded-lg -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <motion.a
                href="/resume.pdf"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-orange-400 text-white text-sm font-medium rounded-xl shadow-glow-sky hover:shadow-glow-orange transition-shadow"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                Resume
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-navy-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-navy-500" />
              ) : (
                <Menu className="w-6 h-6 text-navy-500" />
              )}
            </motion.button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 md:hidden px-4"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-soft-lg p-4">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors ${activeSection === link.href.slice(1)
                      ? 'bg-sky-50 text-sky-500'
                      : 'text-navy-400 hover:bg-navy-50 hover:text-navy-500'
                      }`}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.a
                  href="/resume.pdf"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="flex items-center justify-center gap-2 px-4 py-3 mt-2 bg-gradient-to-r from-sky-500 to-orange-400 text-white text-sm font-medium rounded-xl"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
