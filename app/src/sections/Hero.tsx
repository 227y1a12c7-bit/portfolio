import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

// Particle component for background
function Particle({ delay, duration, x, y }: { delay: number; duration: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-sky-400/30"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, -15, 0],
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Floating shape component
function FloatingShape({
  className,
  delay = 0,
  duration = 10,
}: {
  className: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -40, 0],
        rotate: [0, 10, -10, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate random particles
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: `${Math.floor(Math.random() * 100)}%`,
      y: `${Math.floor(Math.random() * 100)}%`,
      delay: Math.floor(Math.random() * 5 * 10) / 10,
      duration: 8 + Math.floor(Math.random() * 7 * 10) / 10,
    }))
  );

  const nameChars = "Alex Chen".split('');

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-transparent to-orange-50/30" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            x={particle.x}
            y={particle.y}
            delay={particle.delay}
            duration={particle.duration}
          />
        ))}
      </div>

      {/* Floating Shapes */}
      <FloatingShape
        className="absolute top-20 left-[10%] w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-200/40 to-sky-300/20 backdrop-blur-sm"
        delay={0}
        duration={12}
      />
      <FloatingShape
        className="absolute top-40 right-[15%] w-16 h-16 rounded-full bg-gradient-to-br from-orange-200/40 to-orange-300/20 backdrop-blur-sm"
        delay={2}
        duration={15}
      />
      <FloatingShape
        className="absolute bottom-32 left-[20%] w-24 h-24 rounded-3xl bg-gradient-to-br from-sage-200/30 to-sage-300/15 backdrop-blur-sm"
        delay={1}
        duration={10}
      />
      <FloatingShape
        className="absolute bottom-20 right-[10%] w-14 h-14 rounded-xl bg-gradient-to-br from-sky-300/30 to-orange-200/20 backdrop-blur-sm rotate-45"
        delay={3}
        duration={14}
      />

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-sky-400/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-orange-400/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ opacity, y, scale }}
      >
        {/* Greeting Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/80 backdrop-blur-sm shadow-soft border border-sky-100"
        >
          <Sparkles className="w-4 h-4 text-sky-500" />
          <span className="text-sm font-medium text-navy-500">Hello, I'm</span>
        </motion.div>

        {/* Name with 3D Character Animation */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-navy-500 mb-6 perspective-1000"
          style={{
            transform: `rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
          }}
        >
          <span className="inline-flex flex-wrap justify-center">
            {nameChars.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + index * 0.08,
                  ease: [0.175, 0.885, 0.32, 1.275],
                }}
                className={`inline-block ${char === ' ' ? 'w-4' : ''} ${index >= 5 ? 'text-gradient' : ''
                  }`}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Title with Typewriter Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-3 text-xl sm:text-2xl md:text-3xl font-heading font-medium text-navy-400">
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 'auto' }}
              transition={{ duration: 1.2, delay: 1, ease: "linear" }}
              className="overflow-hidden whitespace-nowrap"
            >
              B.Tech Computer Science '25
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-0.5 h-8 bg-sky-500"
            />
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(20px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="text-lg sm:text-xl text-navy-300 max-w-2xl mx-auto mb-10"
        >
          Crafting digital experiences that breathe{' '}
          <span className="text-sky-500 font-medium">freedom</span> and{' '}
          <span className="text-orange-400 font-medium">creativity</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 1.5,
            ease: [0.68, -0.55, 0.265, 1.55]
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#projects"
            className="group relative px-8 py-4 bg-gradient-to-r from-sky-500 to-orange-400 text-white font-medium rounded-2xl shadow-glow-sky overflow-hidden"
            whileHover={{
              scale: 1.05,
              y: -4,
              boxShadow: '0 20px 40px rgba(74, 144, 226, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore My Work
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="w-4 h-4" />
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-400 to-sky-500"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.a
            href="#contact"
            className="px-8 py-4 border-2 border-navy-200 text-navy-500 font-medium rounded-2xl hover:border-sky-500 hover:text-sky-500 transition-colors"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-navy-300 font-medium">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-navy-200 flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-sky-500"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
