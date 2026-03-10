import { memo, useMemo } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface FloatingHeartsProps {
  count?: number;
}

export const FloatingHearts = memo(function FloatingHearts({ count = 12 }: FloatingHeartsProps) {
  // Memoize heart configuration to prevent recalculation on re-renders
  const hearts = useMemo(() => {
    return Array.from({ length: count }).map((_, index) => {
      const delay = index * 0.4;
      const duration = 0.8 + Math.random() * 0.4;
      const startX = 20 + Math.random() * 60;
      const endX = startX + (Math.random() * 20 - 10);
      
      return {
        id: index,
        delay,
        duration,
        startX,
        endX,
      };
    });
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.startX}%`,
            bottom: '-5%',
          }}
          initial={{
            opacity: 0,
            scale: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 0.8],
            y: [0, -400, -600, -800],
            x: [`0%`, `${heart.endX - heart.startX}%`, `${(heart.endX - heart.startX) * 1.5}%`],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            repeatDelay: (count - 1) * 0.4 - heart.duration,
            ease: 'easeOut',
            times: [0, 0.2, 0.6, 1],
          }}
        >
          <Heart
            className="text-pink-400"
            fill="currentColor"
            size={16}
            strokeWidth={1.5}
          />
        </motion.div>
      ))}
    </div>
  );
});