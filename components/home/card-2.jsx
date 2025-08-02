"use client"
import { motion } from 'framer-motion';
import { useSiteReady } from '@/libs/site-ready-context';
import OptimizedSpotlightCard from "./OptimizedSpotlightCard";

export default function Card2() {
    const { animationsEnabled } = useSiteReady();

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.3, delay: 0.1 }
        }
    };

    const CardContent = () => (
        <OptimizedSpotlightCard
            from="#0000ff"
            via="#407cff"
            size={300}
            className="relative mx-auto w-full max-w-sm rounded-[--radius] p-8 [--radius:theme(borderRadius.2xl)]">

            <div className="absolute inset-px rounded-[calc(var(--radius)-1px)] bg-zinc-800/90 glassmorphism"></div>

            {/* Simplified layout */}
            <div className="relative flex items-center justify-start">
                <div className="font-display text-[6px] font-semibold text-white sm:text-[8px] lg:text-[10px] font-belgro ml-4">
                    Built using CoreDao, HummiingBot, LayerZero, Next.js, RainbowKit, Wagmi, TailwindCSS.
                </div>
            </div>
        </OptimizedSpotlightCard>
    );

    if (!animationsEnabled) {
        return (
            <div className="relative sm:col-start-3 sm:row-start-2 lg:row-start-3 items-center gap-2">
                <CardContent />
            </div>
        );
    }

    return (
        <motion.div
            variants={itemVariants}
            className="relative sm:col-start-3 sm:row-start-2 lg:row-start-3 items-center gap-2">
            <CardContent />
        </motion.div>
    );
}


