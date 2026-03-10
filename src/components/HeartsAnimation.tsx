import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export function HeartsAnimation() {
  // 8 hearts total: 4 left side, 4 right side
  const hearts = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none" style={{ zIndex: 0 }}>
      <div className="relative w-24 h-24 flex items-center justify-center">
        {hearts.map((index) => {
          const delay = index * 0.08; // 0.08s stagger (reduced from 0.12s)
          
          // Position: 4 hearts on left, 4 on right
          const isLeftSide = index < 4;
          const sideIndex = index % 4;
          const horizontalOffset = isLeftSide 
            ? -60 - (sideIndex * 12) // Left side spread
            : 60 + (sideIndex * 12);  // Right side spread
          
          // Random rotation between 3° and 6°
          const rotationAmount = 3 + Math.random() * 3;
          const rotationDirection = Math.random() > 0.5 ? 1 : -1;
          
          // Speed increase: 15-20% faster (multiply y values by ~1.18)
          const speedMultiplier = 1.18;

          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
              }}
              initial={{
                scale: 0.6,
                opacity: 0,
                x: horizontalOffset,
                y: 10,
                rotate: 0,
              }}
              animate={{
                scale: [0.6, 1.4, 1.25, 1.25, 1.0], // +25% larger (was 1.15 max, now 1.4 → settling at 1.25)
                opacity: [0, 0.95, 0.95, 0.95, 0], // Peak at 0.95
                x: [horizontalOffset, horizontalOffset, horizontalOffset, horizontalOffset + 3, horizontalOffset + 6],
                y: [10, 0, -47 * speedMultiplier, -94 * speedMultiplier, -141 * speedMultiplier], // 15-20% faster
                rotate: [0, rotationDirection * rotationAmount * 0.5, rotationDirection * rotationAmount, rotationDirection * rotationAmount * 1.2, rotationDirection * rotationAmount * 1.5],
              }}
              transition={{
                duration: 0.76, // Faster to match speed increase (was 0.9s)
                delay: delay,
                repeat: Infinity,
                repeatDelay: 0, // No pauses - continuous loop
                ease: 'easeOut',
                times: [0, 0.15, 0.25, 0.7, 1],
              }}
            >
              <Heart
                className="text-pink-400"
                fill="url(#smallHeartGradient)"
                size={45} // +25% larger (was 36, now 45)
                strokeWidth={0}
                style={{
                  filter: 'drop-shadow(0 2px 8px rgba(233, 30, 99, 0.3))',
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Define gradient for small hearts */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="smallHeartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E91E63" />
            <stop offset="100%" stopColor="#F8BBD0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
