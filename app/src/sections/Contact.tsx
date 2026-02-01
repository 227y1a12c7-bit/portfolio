import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Dribbble } from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@alexchen.dev', href: 'mailto:hello@alexchen.dev' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: MapPin, label: 'Location', value: 'Delhi, India', href: '#' },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com', color: 'hover:text-gray-800' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: 'hover:text-blue-600' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com', color: 'hover:text-sky-500' },
  { icon: Dribbble, label: 'Dribbble', href: 'https://dribbble.com', color: 'hover:text-pink-500' },
];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
    alert('Message sent successfully!');
  };

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-sky-50/30 to-orange-50/20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-sky-200/20 blur-3xl" />
        <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-orange-200/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="w-8 h-0.5 bg-sky-500" />
            <span className="text-sm font-medium text-sky-500 uppercase tracking-wider">Contact</span>
            <div className="w-8 h-0.5 bg-sky-500" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-heading font-bold text-navy-500 mb-4"
          >
            Let's Work <span className="text-gradient">Together</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-navy-300 max-w-2xl mx-auto"
          >
            Have a project in mind? Let's create something amazing together.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-heading font-bold text-navy-500 mb-6">
              Get in Touch
            </h3>
            <p className="text-navy-300 mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            {/* Contact Details */}
            <div className="space-y-4 mb-10">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-shadow group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center group-hover:bg-sky-500 transition-colors">
                    <item.icon className="w-5 h-5 text-sky-500 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-navy-300">{item.label}</p>
                    <p className="font-medium text-navy-500">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-navy-300 mb-4">Follow me on</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.7 + index * 0.1,
                      ease: [0.68, -0.55, 0.265, 1.55]
                    }}
                    className={`w-12 h-12 rounded-xl bg-white shadow-soft flex items-center justify-center text-navy-400 ${social.color} hover:shadow-soft-lg transition-all`}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-soft-lg p-8">
              <h3 className="text-xl font-heading font-bold text-navy-500 mb-6">
                Send a Message
              </h3>

              <div className="space-y-5">
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-navy-500 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="John Doe"
                      className={`w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 outline-none ${
                        focusedField === 'name'
                          ? 'border-sky-500 shadow-glow-sky'
                          : 'border-navy-100 hover:border-navy-200'
                      }`}
                      required
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-sky-500 to-orange-400"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'name' ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-navy-500 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="your@email.com"
                      className={`w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 outline-none ${
                        focusedField === 'email'
                          ? 'border-sky-500 shadow-glow-sky'
                          : 'border-navy-100 hover:border-navy-200'
                      }`}
                      required
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-sky-500 to-orange-400"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'email' ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <label className="block text-sm font-medium text-navy-500 mb-2">
                    Your Message
                  </label>
                  <div className="relative">
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell me about your project..."
                      rows={4}
                      className={`w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 outline-none resize-none ${
                        focusedField === 'message'
                          ? 'border-sky-500 shadow-glow-sky'
                          : 'border-navy-100 hover:border-navy-200'
                      }`}
                      required
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-sky-500 to-orange-400"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'message' ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-orange-400 text-white font-medium rounded-xl shadow-glow-sky disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
