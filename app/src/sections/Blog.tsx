import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Building My First Full-Stack App: Lessons Learned',
    excerpt: 'From idea to deployment, here\'s what I learned building a complete web application as a student developer.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
    date: 'Jan 15, 2025',
    readTime: '5 min',
    category: 'Development',
    color: 'sky',
  },
  {
    id: 2,
    title: 'Why I Chose Computer Science',
    excerpt: 'My journey from curiosity to passion, and how programming became more than just a career choice.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    date: 'Jan 10, 2025',
    readTime: '3 min',
    category: 'Personal',
    color: 'orange',
  },
  {
    id: 3,
    title: 'Getting Started with Open Source',
    excerpt: 'A beginner\'s guide to contributing to open source projects and making your first pull request.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
    date: 'Jan 5, 2025',
    readTime: '7 min',
    category: 'Tutorial',
    color: 'sage',
  },
];

const categoryColors = {
  sky: 'bg-sky-50 text-sky-600',
  orange: 'bg-orange-50 text-orange-600',
  sage: 'bg-sage-50 text-sage-600',
};

function BlogCard({ post, index }: { post: typeof blogPosts[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1,
        ease: [0.175, 0.885, 0.32, 1.275]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
      style={{ perspective: '800px' }}
    >
      <motion.div
        className="relative bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-shadow duration-300 h-full"
        animate={{
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? -3 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Image */}
        <div className="relative aspect-[3/2] overflow-hidden">
          <motion.img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
          
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-navy-500/60 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${categoryColors[post.color as keyof typeof categoryColors]}`}>
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta */}
          <div className="flex items-center gap-4 mb-3 text-sm text-navy-300">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-heading font-bold text-navy-500 mb-3 group-hover:text-sky-500 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-navy-300 text-sm mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Read More Link */}
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-sky-500"
            whileHover={{ x: 5 }}
          >
            Read More
            <motion.span
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </motion.a>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function Blog() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="blog" 
      ref={containerRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-1/2 h-1/2 bg-gradient-to-l from-sage-50/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-sky-100/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-0.5 bg-sky-500" />
              <span className="text-sm font-medium text-sky-500 uppercase tracking-wider">Blog</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-heading font-bold text-navy-500 mb-4"
            >
              Latest <span className="text-gradient">Thoughts</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-navy-300 max-w-xl"
            >
              Explorations in code, design, and student life
            </motion.p>
          </div>

          <motion.a
            href="#"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 px-6 py-3 border-2 border-navy-200 text-navy-500 font-medium rounded-xl hover:border-sky-500 hover:text-sky-500 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpen className="w-4 h-4" />
            View All Posts
          </motion.a>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 p-8 md:p-12 bg-gradient-to-br from-sky-500 to-orange-400 rounded-3xl text-center text-white"
        >
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3">
            Subscribe to My Newsletter
          </h3>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Get the latest articles, tutorials, and insights delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white transition-colors"
            />
            <motion.button
              type="submit"
              className="px-6 py-3 bg-white text-sky-500 font-medium rounded-xl hover:bg-white/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
