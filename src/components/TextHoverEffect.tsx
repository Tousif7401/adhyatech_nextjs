"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextHoverEffect = ({
  text,
  className,
  triggerAnimation,
}: {
  text: string;
  className?: string;
  triggerAnimation?: boolean;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 250, y: 75 });

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();

    // Get the point in SVG coordinate space
    const pt = svgRef.current.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;

    // Transform using the inverse of the screen CTM
    const ctm = svgRef.current.getScreenCTM();
    if (!ctm) return;
    const svgP = pt.matrixTransform(ctm.inverse());

    setCursorPos({ x: svgP.x, y: svgP.y });
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 500 150"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className={cn("w-full h-full select-none uppercase cursor-pointer", className)}
      style={{ overflow: 'visible' }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Red gradient for fill - matching project brand colors */}
        <radialGradient id="redSpotlight">
          <stop offset="0%" stopColor="#D00000" />
          <stop offset="50%" stopColor="#A80000" />
          <stop offset="100%" stopColor="#FF1A1A" />
        </radialGradient>

        {/* Blur filter for soft edges */}
        <filter id="blurFilter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
        </filter>

        {/* Spotlight mask - using exact cursor coordinates from SVG CTM */}
        <mask id="spotlightMask">
          <rect x="0" y="0" width="500" height="150" fill="black" />
          <motion.circle
            cx={cursorPos.x}
            cy={cursorPos.y}
            r="80"
            fill="white"
            filter="url(#blurFilter)"
            transition={{ duration: 0.02 }}
          />
        </mask>
      </defs>

      <g>
        {/* Animated writing stroke - gray outline */}
        {triggerAnimation && (
          <motion.text
            x="250"
            y="75"
            textAnchor="middle"
            dominantBaseline="middle"
            strokeWidth="1"
            stroke="rgba(245, 242, 234, 0.3)"
            fill="none"
            fontFamily="'Bricolage Grotesque', system-ui, sans-serif"
            fontSize="160"
            fontWeight="600"
            initial={{ strokeDashoffset: 2000, strokeDasharray: 2000 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 4, ease: "easeInOut" }}
          >
            {text}
          </motion.text>
        )}

        {/* Red fill hover effect - revealed by cursor */}
        {triggerAnimation && (
          <text
            x="250"
            y="75"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="url(#redSpotlight)"
            stroke="none"
            mask="url(#spotlightMask)"
            opacity={hovered ? 1 : 0}
            style={{ transition: 'opacity 0.2s' }}
            fontFamily="'Bricolage Grotesque', system-ui, sans-serif"
            fontSize="160"
            fontWeight="600"
          >
            {text}
          </text>
        )}
      </g>
    </svg>
  );
};
