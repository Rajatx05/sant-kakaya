import { memo, useMemo } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export const SideHeartsOnce = memo(function SideHeartsOnce() {
  // Memoize heart configuration
  const hearts = useMemo(() => [
    // Left side hearts
    { id: 0, side: 'left', size: 32, x: -80, duration: 1.2, yTravel: -140, drift: -10, rotation: 8, delay: 0 },
    { id: 1, side: 'left', size: 42, x: -110, duration: 1.4, yTravel: -160, drift: -12, rotation: -10, delay: 0.1 },
    { id: 2, side: 'left', size: 52, x: -140, duration: 1.6, yTravel: -180, drift: -14, rotation: 12, delay: 0.2 },
    
    // Right side hearts
    { id: 3, side: 'right', size: 32, x: 80, duration: 1.2, yTravel: -140, drift: 10, rotation: -8, delay: 0 },
    { id: 4, side: 'right', size: 42, x: 110, duration: 1.4, yTravel: -160, drift: 12, rotation: 10, delay: 0.1 },
    { id: 5, side: 'right', size: 52, x: 140, duration: 1.6, yTravel: -180, drift: 14, rotation: -12, delay: 0.2 },
  ], []);

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ zIndex: 0 }}>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: 0,
            top: 0,
          }}
          initial={{
            scale: 0.6,
            opacity: 0,
            x: heart.x,
            y: 0,
            rotate: 0,
          }}
          animate={{
            scale: [0.6, 1.0, 0.9],
            opacity: [0, 1, 0.95, 0],
            x: [heart.x, heart.x, heart.x + heart.drift * 0.5, heart.x + heart.drift],
            y: [0, heart.yTravel * 0.3, heart.yTravel * 0.7, heart.yTravel],
            rotate: [0, heart.rotation * 0.5, heart.rotation * 0.8, heart.rotation],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: 'easeOut',
            times: [0, 0.2, 0.7, 1],
          }}
        >
          <Heart
            className="text-pink-400"
            fill="url(#sideHeartGradient)"
            size={heart.size}
            strokeWidth={0}
            style={{
              filter: 'drop-shadow(0 2px 8px rgba(233, 30, 99, 0.25))',
            }}
          />
        </motion.div>
      ))}

      {/* Define gradient for side hearts */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="sideHeartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E91E63" />
            <stop offset="100%" stopColor="#F8BBD0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
});