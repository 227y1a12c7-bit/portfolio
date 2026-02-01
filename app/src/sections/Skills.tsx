import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const skillCategories = [
  {
    name: 'Frontend',
    color: 'sky',
    skills: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Framer Motion', level: 80 },
    ],
  },
  {
    name: 'Backend',
    color: 'orange',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 82 },
      { name: 'Express', level: 88 },
      { name: 'FastAPI', level: 75 },
    ],
  },
  {
    name: 'Database',
    color: 'sage',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'Redis', level: 70 },
      { name: 'Firebase', level: 78 },
    ],
  },
  {
    name: 'Tools',
    color: 'sky',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'Figma', level: 85 },
      { name: 'VS Code', level: 95 },
    ],
  },
];

const colorClasses = {
  sky: {
    bg: 'bg-sky-50',
    text: 'text-sky-600',
    bar: 'bg-sky-500',
    glow: 'shadow-sky-200',
    border: 'border-sky-200',
  },
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    bar: 'bg-orange-400',
    glow: 'shadow-orange-200',
    border: 'border-orange-200',
  },
  sage: {
    bg: 'bg-sage-50',
    text: 'text-sage-600',
    bar: 'bg-sage-500',
    glow: 'shadow-sage-200',
    border: 'border-sage-200',
  },
};

function SkillBar({ skill, color, index }: { skill: { name: string; level: number }; color: string; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = colorClasses[color as keyof typeof colorClasses];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-navy-500 group-hover:text-sky-500 transition-colors">
          {skill.name}
        </span>
        <motion.span
          className={`text-sm font-bold ${colors.text}`}
          animate={{ scale: isHovered ? 1.2 : 1 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="h-2 bg-navy-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${colors.bar} rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
}

function SkillCategory({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = colorClasses[category.color as keyof typeof colorClasses];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-6 bg-white rounded-3xl shadow-soft hover:shadow-soft-lg transition-all duration-300 ${isHovered ? 'scale-[1.02]' : ''}`}
    >
      {/* Category Header */}
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}
          animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className={`text-lg font-heading font-bold ${colors.text}`}>
            {category.name[0]}
          </span>
        </motion.div>
        <h3 className="text-xl font-heading font-bold text-navy-500">
          {category.name}
        </h3>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        {category.skills.map((skill, skillIndex) => (
          <SkillBar 
            key={skill.name} 
            skill={skill} 
            color={category.color}
            index={skillIndex}
          />
        ))}
      </div>

      {/* Decorative Corner */}
      <motion.div
        className={`absolute top-0 right-0 w-20 h-20 ${colors.bg} rounded-bl-[40px] -z-10`}
        animate={{ 
          scale: isHovered ? 1.1 : 1,
          opacity: isHovered ? 0.5 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-sky-100/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-orange-100/20 blur-3xl" />
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
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
            <span className="text-sm font-medium text-sky-500 uppercase tracking-wider">Expertise</span>
            <div className="w-8 h-0.5 bg-sky-500" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-heading font-bold text-navy-500 mb-4"
          >
            Skills & <span className="text-gradient">Technologies</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-navy-300 max-w-2xl mx-auto"
          >
            Tools I use to bring ideas to life and create meaningful digital experiences
          </motion.p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category, index) => (
            <SkillCategory key={category.name} category={category} index={index} />
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-8"
        >
          {[
            { label: 'Years Experience', value: '3+' },
            { label: 'Technologies', value: '20+' },
            { label: 'Frameworks', value: '10+' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-3xl font-heading font-bold text-gradient">{stat.value}</p>
              <p className="text-sm text-navy-300">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
