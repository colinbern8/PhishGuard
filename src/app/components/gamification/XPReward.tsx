import { Zap, Star, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

interface XPRewardProps {
  xp: number;
  reason: string;
  showAnimation?: boolean;
}

export function XPReward({ xp, reason, showAnimation = true }: XPRewardProps) {
  if (!showAnimation) {
    return (
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1.5 rounded-full border border-yellow-300">
        <Star className="h-4 w-4 text-yellow-600 fill-yellow-600" />
        <span className="text-sm font-bold text-yellow-700">+{xp} XP</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 500,
        damping: 15
      }}
      className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-full border-2 border-yellow-400 shadow-lg"
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Star className="h-5 w-5 text-yellow-600 fill-yellow-600" />
      </motion.div>
      <div>
        <div className="text-lg font-bold text-yellow-700">+{xp} XP</div>
        <div className="text-xs text-yellow-600">{reason}</div>
      </div>
    </motion.div>
  );
}

interface XPFloatingAnimationProps {
  xp: number;
  position?: { x: number; y: number };
}

export function XPFloatingAnimation({ xp, position = { x: 0, y: 0 } }: XPFloatingAnimationProps) {
  return (
    <motion.div
      initial={{ 
        x: position.x, 
        y: position.y, 
        opacity: 1, 
        scale: 0.5 
      }}
      animate={{ 
        y: position.y - 100, 
        opacity: 0, 
        scale: 1.2 
      }}
      transition={{ 
        duration: 1.5,
        ease: "easeOut"
      }}
      className="absolute pointer-events-none z-50"
    >
      <div className="flex items-center gap-1 bg-yellow-400 text-white px-3 py-1.5 rounded-full font-bold text-lg shadow-lg">
        <Zap className="h-5 w-5 fill-white" />
        +{xp}
      </div>
    </motion.div>
  );
}
