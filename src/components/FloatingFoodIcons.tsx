'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaApple, FaCarrot, FaBreadSlice, FaFish, FaLemon, FaPepperHot } from 'react-icons/fa';
import { GiGrapes, GiBanana, GiMeat, GiChickenLeg, GiBroccoli, GiTomato } from 'react-icons/gi';

// Define a type for the floating icon
interface FloatingIcon {
    id: number;
    Icon: React.ElementType;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    rotation: number;
}

const icons = [
    FaApple, FaCarrot, FaBreadSlice, FaFish, FaLemon, FaPepperHot,
    GiGrapes, GiBanana, GiMeat, GiChickenLeg, GiBroccoli, GiTomato
];

export default function FloatingFoodIcons() {
    const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);

    useEffect(() => {
        // Generate random icons on client-side to avoid hydration mismatch
        const newIcons = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            Icon: icons[Math.floor(Math.random() * icons.length)],
            x: Math.random() * 100, // percentage
            y: Math.random() * 100, // percentage
            size: 20 + Math.random() * 40, // px
            duration: 15 + Math.random() * 20, // seconds
            delay: Math.random() * 5, // seconds
            rotation: Math.random() * 360, // degrees
        }));
        setFloatingIcons(newIcons);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'hidden',
        }}>
            {floatingIcons.map((icon) => {
                const { Icon } = icon;
                return (
                    <motion.div
                        key={icon.id}
                        initial={{
                            x: `${icon.x}vw`,
                            y: `${icon.y}vh`,
                            opacity: 0,
                            rotate: icon.rotation
                        }}
                        animate={{
                            y: [
                                `${icon.y}vh`,
                                `${(icon.y + 10) % 100}vh`,
                                `${(icon.y - 10 + 100) % 100}vh`,
                                `${icon.y}vh`
                            ],
                            x: [
                                `${icon.x}vw`,
                                `${(icon.x + 5) % 100}vw`,
                                `${(icon.x - 5 + 100) % 100}vw`,
                                `${icon.x}vw`
                            ],
                            rotate: [icon.rotation, icon.rotation + 180, icon.rotation + 360],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{
                            duration: icon.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: icon.delay
                        }}
                        style={{
                            position: 'absolute',
                            color: '#e55e16', // Brand Orange (Matches Logo)
                            opacity: 1, // Fully visible
                        }}
                    >
                        <Icon size={icon.size} />
                    </motion.div>
                );
            })}
        </div>
    );
}
