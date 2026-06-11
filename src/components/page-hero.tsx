"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  description: string;
  imageUrl: string;
}

export function PageHero({ title, description, imageUrl }: PageHeroProps) {
  return (
    <section className="relative py-40 text-white overflow-hidden bg-primary flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <img 
          src={imageUrl} 
          alt="Page Background" 
          className="w-full h-full object-cover" 
        />
        {/* Darker Neutral Overlay */}
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Interactive Floating Background Accents */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl z-0"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl z-0"
      />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter">
            {title}
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
