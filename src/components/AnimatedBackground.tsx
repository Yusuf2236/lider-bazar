'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AnimatedBackground() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -2,
            overflow: 'hidden',
            backgroundColor: '#ffffff', // Assuming white background for the image
        }}>
            <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1.05 }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                }}
            >
                <Image
                    src="/images/bg-premium.png"
                    alt="Background"
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                    unoptimized
                />
            </motion.div>

            {/* Overlay to ensure readability */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'var(--background)',
                opacity: 0.85, // Adjust based on preference. High opacity needed for readability.
                backdropFilter: 'blur(30px)', // Strong blur for glassmorphism
            }} />
        </div>
    );
}
