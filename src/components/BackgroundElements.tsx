import React from "react";
import { motion } from "motion/react";
import {
  GeometricRing,
  GeometricSquare,
  GeometricArc,
  GeometricLines,
  GeometricCrossCluster,
  SoftDepthGradient,
} from "./GeometricShapes";

export function BackgroundElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Soft depth gradient orbs emerging in soft blue along the viewport edges */}
      <SoftDepthGradient
        size={540}
        color="blue"
        className="absolute -top-28 -left-36 opacity-75"
      />
      <SoftDepthGradient
        size={580}
        color="blue"
        className="absolute top-1/4 -right-44 opacity-70"
      />
      <SoftDepthGradient
        size={540}
        color="blue"
        className="absolute top-1/2 -left-40 opacity-70"
      />
      <SoftDepthGradient
        size={580}
        color="blue"
        className="absolute top-3/4 -right-44 opacity-70"
      />
      <SoftDepthGradient
        size={540}
        color="blue"
        className="absolute bottom-12 -left-36 opacity-65"
      />

      {/* Far outer-gutter subtle geometric accents - visible on wider screens to prevent cluttering content */}
      <div className="hidden xl:block">
        {/* Top-Right outer margin accent */}
        <div className="absolute top-24 right-10">
          <GeometricRing size={110} />
        </div>

        {/* Mid-Left outer margin accent */}
        <div className="absolute top-[42%] left-8">
          <GeometricSquare size={84} rounded={16} rotation={22} />
        </div>

        {/* Lower-Right outer margin accent */}
        <div className="absolute top-[72%] right-12">
          <GeometricArc size={96} />
        </div>

        {/* Lower-Left subtle lines */}
        <div className="absolute bottom-28 left-12">
          <GeometricLines width={120} height={50} />
        </div>

        {/* Floating cross cluster in corner */}
        <div className="absolute top-1/2 right-6">
          <GeometricCrossCluster />
        </div>
      </div>
    </div>
  );
}
