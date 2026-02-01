import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'CampusConnect',
    description: 'Social platform connecting students across campuses. Features real-time messaging, event management, and study group formation.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    color: 'sky',
    github: 'https://github.com',
    live: '#',
  },
  {
    id: 2,
    title: 'EcoTrack',
    description: 'Sustainability tracking app for daily habits. Uses ML to provide personalized eco-friendly recommendations.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop',
    tags: ['Flutter', 'Firebase', 'TensorFlow', 'Python'],
    color: 'sage',
    github: 'https://github.com',
    live: '#',
  },
  {
    id: 3,
    title: 'CodeCollab',
    description: 'Real-time collaborative coding environment with syntax highlighting, video chat, and version control integration.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
    tags: ['Next.js', 'Socket.io', 'Monaco', 'WebRTC'],
    color: 'orange',
    github: 'https://github.com',
    live: '#',
  },
  {
    id: 4,
    title: 'AI Study Buddy',
    description: 'Personalized learning assistant using GPT. Creates custom study plans and quizzes based on your learning style.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
    tags: ['Python', 'OpenAI', 'FastAPI', 'React'],
    color: 'sky',
    github: 'https://github.com',
    live: '#',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const colorClasses = {
    sky: 'from-sky-500 to-sky-600',
    orange: 'from-orange-400 to-orange-500',
    sage: 'from-sage-500 to-sage-600',
  };

  const tagColors = {
    sky: 'bg-sky-50 text-sky-600',
    orange: 'bg-orange-50 text-orange-600',
    sage: 'bg-sage-50 text-sage-600',
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.175, 0.885, 0.32, 1.275]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-shadow duration-300"
        animate={{
          rotateY: isHovered ? 5 : 0,
          rotateX: isHovered ? -5 : 0,
          z: isHovered ? 30 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-navy-500/80 via-navy-500/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Action Buttons */}
          <motion.div
            className="absolute bottom-4 right-4 flex gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-navy-500 hover:bg-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-navy-500 hover:bg-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-heading font-bold text-navy-500 mb-2 group-hover:text-sky-500 transition-colors">
            {project.title}
          </h3>
          <p className="text-navy-300 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 text-xs font-medium rounded-full ${tagColors[project.color as keyof typeof tagColors]}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Link */}
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${colorClasses[project.color as keyof typeof colorClasses]} bg-clip-text text-transparent`}
            whileHover={{ x: 5 }}
          >
            View Project
            <motion.span
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-orange-50/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-sky-50/50 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="w-8 h-0.5 bg-sky-500" />
            <span className="text-sm font-medium text-sky-500 uppercase tracking-wider">Portfolio</span>
            <div className="w-8 h-0.5 bg-sky-500" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-heading font-bold text-navy-500 mb-4"
          >
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-navy-300 max-w-2xl mx-auto"
          >
            A selection of work that defines my journey in software development
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-navy-200 text-navy-500 font-medium rounded-2xl hover:border-sky-500 hover:text-sky-500 transition-colors"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
            View All Projects
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
