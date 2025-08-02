'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useSiteReady } from '@/libs/site-ready-context';
import s from '@/components/home-page/home.module.scss';

const TitlesContainer = () => {
  const { animationsEnabled } = useSiteReady();
  const titleRef = useRef(null);
  const titleRef2 = useRef(null);
  const rezyRef = useRef(null);

  // Animaciones simplificadas y condicionales
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (!animationsEnabled) {
    return (
      <div className="w-full max-w-4xl mx-auto px-6 mt-32">
        {/* Header: Solo títulos */}
        <div className="flex flex-col gap-6 mb-16 text-center lg:text-left">
          <div className={`font-basement ${s.studioRezy}`} ref={rezyRef}>
            Shōgun
          </div>
          <div
            className={`font-aeonik text-5xl pb-2 ${s.titleText}`}
            ref={titleRef}
          >
            | AI-Powered DeFi Yield Optimization ++
          </div>
        </div>

        {/* Cards abajo - estilo original */}
        <div className="flex flex-col gap-4 w-4/12">
          <div
            className={`font-aeonik text-lg ${s.titleText2} relative`}
            ref={titleRef2}
          >
            <span className="relative z-10 text-black">
              Our AI automatically SLICES your crypto into the highest-yielding
              DeFi opportunities.
            </span>
            <div className="absolute inset-0 bg-basement-cyan rounded-base"></div>
          </div>

          <div className={`font-aeonik text-lg ${s.titleText2} relative`}>
            <span className="relative z-10 text-black">
              ice cold decision making. no fear. no FOMO.
            </span>
            <div className="absolute inset-0 bg-white rounded-base"></div>
          </div>

          <div className={`font-aeonik text-lg pt-20 ${s.titleText2}`}>
            propose strategies to the AI ronin council. STAKE YOUR HONOR.
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      viewport={{ once: true, amount: 0.25 }}
      className="w-11/12  mx-auto px-6 mt-32"
    >
      {/* Header: Solo títulos */}
      <div className="flex flex-col gap-6 mb-16 text-center lg:text-left">
        <motion.div
          variants={itemVariants}
          className={`font-basement ${s.studioRezy}`}
          ref={rezyRef}
        >
          Shōgun
        </motion.div>
        <motion.div
          variants={itemVariants}
          className={`font-aeonik text-5xl pb-2 ${s.titleText}`}
          ref={titleRef}
        >
          | AI-Powered DeFi Yield Optimization ++
        </motion.div>
      </div>

      {/* Cards abajo - estilo original */}
      <div className="flex flex-col gap-4 max-w-4xl">
        <motion.div
          variants={itemVariants}
          className={`font-aeonik text-lg ${s.titleText2} relative`}
          ref={titleRef2}
        >
          <span className="relative z-10 text-black">
            Our AI automatically SLICES your crypto into the highest-yielding
            DeFi opportunities.
          </span>
          <div className="absolute inset-0 bg-basement-cyan rounded-base"></div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={`font-aeonik text-lg ${s.titleText2} relative`}
        >
          <span className="relative z-10 text-black">
            ice cold decision making. no fear. no FOMO.
          </span>
          <div className="absolute inset-0 bg-white rounded-base"></div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={`font-aeonik text-lg pt-20 ${s.titleText2}`}
        >
          propose strategies to the AI ronin council. STAKE YOUR HONOR.
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TitlesContainer;
