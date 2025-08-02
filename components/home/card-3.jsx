"use client"

import { motion } from 'framer-motion';
import { useSiteReady } from '@/libs/site-ready-context';
import { GridPattern } from "@/components/lunar/GridPattern";
import OptimizedSpotlightCard from "./OptimizedSpotlightCard";

export default function Card3() {
    const { animationsEnabled } = useSiteReady();
    const totalTVL = "1.2M";

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.3, delay: 0.2 }
        }
    };

    const CardContent = () => (
        <OptimizedSpotlightCard
            from="#1cd1c6"
            via="#407cff"
            size={300}
            className="relative mx-auto w-full max-w-2xl rounded-[--radius] bg-white/10 p-8 [--radius:theme(borderRadius.2xl)]">
            <div className="absolute inset-px rounded-[calc(var(--radius)-1px)] bg-zinc-800/90"></div>

            <GridPattern
                offsetX={0}
                offsetY={0}
                size={64}
                className="absolute -inset-px h-full w-full stroke-white/10 stroke-[4] [mask-image:radial-gradient(white,transparent_70%)] [stroke-dasharray:5_6] [stroke-dashoffset:10]">
            </GridPattern>

            <div className="relative flex items-center justify-between w-full">
                <div className="font-display text-lg font-semibold text-white font-belgro">
                    Total Value <br />
                    <span className="text-basement-cyan">Locked (TVL)</span>
                </div>
                <div className="font-display text-lg font-semibold text-basement-cyan font-belgro">
                    ${totalTVL}
                </div>
            </div>
        </OptimizedSpotlightCard>
    );

    if (!animationsEnabled) {
        return (
            <div className="flex sm:col-start-4 sm:row-start-2 sm:row-span-1 items-center">
                <CardContent />
            </div>
        );
    }

    return (
        <motion.div
            variants={itemVariants}
            className="flex sm:col-start-4 sm:row-start-2 sm:row-span-1 items-center">
            <CardContent />
        </motion.div>
    );
}
