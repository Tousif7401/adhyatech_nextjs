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
  const [glowPos, setGlowPos] = useState({ x: 250, y: 75 });

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

    setGlowPos({ x: svgP.x, y: svgP.y });
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 500 150"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={cn("w-full h-full select-none uppercase cursor-pointer", className)}
      style={{ overflow: 'visible' }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Red glow gradient */}
        <radialGradient id="glowGradient">
          <stop offset="0%" stopColor="rgba(208, 0, 0, 1)" />
          <stop offset="40%" stopColor="rgba(208, 0, 0, 0.7)" />
          <stop offset="100%" stopColor="rgba(208, 0, 0, 0.1)" />
        </radialGradient>

        {/* Blur filter for soft glow */}
        <filter id="glowBlur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
        </filter>

        {/* Clip path to constrain glow within text */}
        <clipPath id="textClip">
          <text
            x="250"
            y="75"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="'Bricolage Grotesque', system-ui, sans-serif"
            fontSize="200"
            fontWeight="600"
            strokeWidth="8"
            stroke="rgba(245, 242, 234, 0.3)"
          >
            {text}
          </text>
        </clipPath>
      </defs>

      <g>
        {/* Cursor glow effect - follows mouse (clipped within text) */}
        {hovered && (
          <circle
            cx={glowPos.x}
            cy={glowPos.y}
            r="60"
            fill="url(#glowGradient)"
            filter="url(#glowBlur)"
            opacity="1"
            clipPath="url(#textClip)"
            style={{ transition: 'opacity 0.2s' }}
          />
        )}

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
            fontSize="200"
            fontWeight="600"
            initial={{ strokeDashoffset: 2000, strokeDasharray: 2000 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 4, ease: "easeInOut" }}
          >
            {text}
          </motion.text>
        )}
      </g>
    </svg>
  );
};
