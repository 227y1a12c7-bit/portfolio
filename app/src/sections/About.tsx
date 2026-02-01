import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Code2, Briefcase, GitCommit, GraduationCap } from 'lucide-react';

const stats = [
  { icon: Code2, value: '15+', label: 'Projects Completed', color: 'sky' },
  { icon: Briefcase, value: '3', label: 'Internships', color: 'orange' },
  { icon: GitCommit, value: '500+', label: 'Commits', color: 'sage' },
  { icon: GraduationCap, value: '4.0', label: 'GPA', color: 'sky' },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sky-50/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-orange-100/30 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <motion.div 
            className="relative"
            style={{ y: imageY }}
          >
            <motion.div
              initial={{ opacity: 0, x: -100, scale: 1.1 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Decorative Frame */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-br from-sky-200 to-orange-200 rounded-3xl -z-10"
                initial={{ opacity: 0, rotate: -5 }}
                animate={isInView ? { opacity: 1, rotate: -3 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-soft-lg">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&crop=face"
                  alt="Alex Chen - Computer Science Student"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-500/20 to-transparent" />
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-soft-lg p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-orange-400 flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold text-navy-500">4th</p>
                    <p className="text-sm text-navy-300">Year Student</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <motion.div 
            className="lg:pl-8"
            style={{ y: contentY }}
          >
            {/* Section Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-0.5 bg-sky-500" />
              <span className="text-sm font-medium text-sky-500 uppercase tracking-wider">About Me</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl font-heading font-bold text-navy-500 mb-6"
            >
              Fourth-year student exploring the intersection of{' '}
              <span className="text-gradient">code</span> and{' '}
              <span className="text-gradient">creativity</span>
            </motion.h2>

            {/* Bio Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-4 mb-10"
            >
              <p className="text-navy-300 leading-relaxed">
                I'm a Computer Science student at IIT Delhi with a passion for building things that matter. 
                My journey started with a simple 'Hello World' and has evolved into creating full-stack 
                applications that solve real problems.
              </p>
              <p className="text-navy-300 leading-relaxed">
                When I'm not debugging, you'll find me exploring new technologies, contributing to open source, 
                or sketching UI designs in my notebook. I believe in the power of technology to create positive 
                change and meaningful connections.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 50, rotateZ: -5 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateZ: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.7 + index * 0.08,
                    ease: [0.68, -0.55, 0.265, 1.55]
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative p-5 bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-shadow cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-xl bg-${stat.color}-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
                  </div>
                  <motion.p
                    className="text-2xl font-heading font-bold text-navy-500"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-sm text-navy-300">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
