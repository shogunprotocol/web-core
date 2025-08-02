"use client"

import { motion } from 'framer-motion';
import { useSiteReady } from '@/libs/site-ready-context';
import { GridPattern } from "@/components/lunar/GridPattern";
import OptimizedSpotlightCard from "./OptimizedSpotlightCard";

export default function Card1() {
    const { animationsEnabled } = useSiteReady();
    const gridBlocks = [
        [2, 5],
        [3, 1],
        [4, 3],
    ];

    const count = 16;

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    const CardContent = () => (
        <OptimizedSpotlightCard
            from="#1cd1c6"
            via="#407cff"
            size={300}
            className="relative mx-auto w-full max-w-5xl rounded-[--radius] bg-white/10 p-8 [--radius:theme(borderRadius.2xl)]">
            <div className="absolute inset-px rounded-[calc(var(--radius)-1px)] bg-zinc-800/90"></div>

            <GridPattern
                size={64}
                offsetX={0}
                offsetY={0}
                className="absolute -top-1/2 right-0 h-[200%] w-2/3 skew-y-12 stroke-white/10 stroke-[2] [mask-image:linear-gradient(-85deg,black,transparent)]">
                {gridBlocks.map(([row, column], index) => (
                    <GridPattern.Block
                        key={index}
                        row={row}
                        column={column}
                        className="fill-white/2.5 transition duration-300 hover:fill-white/5"
                    />
                ))}
            </GridPattern>

            <div className="relative flex flex-col w-full">
                <div className="font-display text-lg font-semibold text-white font-belgro md:text-2xl">
                    Current <br />
                    <span className="text-basement-cyan">APY</span>
                </div>

                <div className="text-7xl font-bold text-right font-basement text-basement-cyan">
                    {count}%
                </div>
            </div>
        </OptimizedSpotlightCard>
    );

    if (!animationsEnabled) {
        return (
            <div className="flex sm:col-start-1 sm:col-span-2 sm:row-start-3">
                <CardContent />
            </div>
        );
    }

    return (
        <motion.div
            variants={itemVariants}
            className="flex sm:col-start-1 sm:col-span-2 sm:row-start-3">
            <CardContent />
        </motion.div>
    );
}
