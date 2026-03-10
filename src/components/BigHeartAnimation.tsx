import { memo } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export const BigHeartAnimation = memo(function BigHeartAnimation() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ zIndex: 1 }}>
      <motion.div
        initial={{
          scale: 0.3,
          opacity: 0,
        }}
        animate={{
          scale: [0.3, 1.3, 1.0],
          opacity: [0, 1, 1],
        }}
        transition={{
          duration: 0.8,
          ease: [0.34, 1.56, 0.64, 1], // Custom ease for pop effect
          times: [0, 0.5, 1],
        }}
      >
        <Heart
          className="text-pink-500"
          fill="url(#bigHeartGradient)"
          size={120}
          strokeWidth={0}
          style={{
            filter: 'drop-shadow(0 8px 24px rgba(233, 30, 99, 0.4))',
          }}
        />
      </motion.div>

      {/* Define gradient for big heart */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="bigHeartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E91E63" />
            <stop offset="100%" stopColor="#F06292" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
});