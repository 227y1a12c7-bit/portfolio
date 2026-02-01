import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-navy-500 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="footer-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-600/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-orange-400 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white font-heading font-bold text-xl">AC</span>
              </motion.div>
              <span className="font-heading font-bold text-xl">Alex Chen</span>
            </motion.div>
            <p className="text-navy-200 text-sm leading-relaxed mb-6">
              Crafting digital experiences that breathe freedom and creativity. 
              Computer Science student passionate about building meaningful solutions.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.2 + index * 0.1,
                    ease: [0.68, -0.55, 0.265, 1.55]
                  }}
                  className="w-10 h-10 rounded-xl bg-navy-400/50 flex items-center justify-center text-navy-200 hover:bg-sky-500 hover:text-white transition-all"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                >
                  <motion.a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-navy-200 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-0 h-0.5 bg-sky-500 group-hover:w-4 transition-all" />
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-heading font-semibold text-lg mb-4">Get in Touch</h4>
            <div className="space-y-3 text-navy-200">
              <p>
                <span className="text-navy-300">Email:</span>{' '}
                <a href="mailto:hello@alexchen.dev" className="hover:text-sky-400 transition-colors">
                  hello@alexchen.dev
                </a>
              </p>
              <p>
                <span className="text-navy-300">Phone:</span>{' '}
                <a href="tel:+919876543210" className="hover:text-sky-400 transition-colors">
                  +91 98765 43210
                </a>
              </p>
              <p>
                <span className="text-navy-300">Location:</span> Delhi, India
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-navy-400/30" />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-navy-300 text-sm text-center md:text-left"
          >
            © 2025 Alex Chen. All rights reserved.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-1 text-navy-300 text-sm"
          >
            Crafted with{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            </motion.span>{' '}
            and pixels
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
