'use client';

import { motion } from 'framer-motion';
import SketchfabViewer from './SketchfabViewer';

export default function AnimatedViewer() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full"
      style={{ background: 'transparent' }}
    >
      <SketchfabViewer />
    </motion.div>
  );
}
