import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Particles = ({ count = 20, color = '#3B82F6' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const particles = [];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 rounded-full';
      particle.style.backgroundColor = color;
      particles.push(particle);
      container.appendChild(particle);
    }

    particles.forEach((particle) => {
      const animation = particle.animate(
        [
          {
            transform: `translate(${Math.random() * 100 - 50}px, ${
              Math.random() * 100 - 50
            }px)`,
            opacity: 0,
          },
        ],
        {
          duration: 1000,
          easing: 'cubic-bezier(0, .9, .57, 1)',
          delay: Math.random() * 200,
        }
      );

      animation.onfinish = () => particle.remove();
    });

    return () => {
      particles.forEach((particle) => particle.remove());
    };
  }, [count, color]);

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  );
};

export default Particles;