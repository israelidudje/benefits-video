import { Easing, interpolate, useCurrentFrame } from "remotion";
import type { Benefit } from "../schema";

// Single-line icons on a 48x48 grid. Each path is drawn on over time by
// animating stroke-dashoffset (pathLength=1 normalises every path).
const paths: Record<Benefit["icon"], string[]> = {
  shield: [
    "M24 5 L39 11 V23 C39 33 32 40 24 43 C16 40 9 33 9 23 V11 Z",
    "M17 24 L22 29 L31 19",
  ],
  gift: [
    "M8 19 H40 V26 H8 Z",
    "M11 26 V41 H37 V26",
    "M24 19 V41",
    "M24 19 C20 11 13 12 15 17 C16 19 21 19 24 19 C27 19 32 19 33 17 C35 12 28 11 24 19",
  ],
  heart: [
    "M24 40 C12 31 6 25 6 17 C6 11 11 7 16 7 C20 7 23 10 24 13 C25 10 28 7 32 7 C37 7 42 11 42 17 C42 25 36 31 24 40 Z",
    "M14 22 H19 L21 18 L25 27 L28 22 H34",
  ],
  clock: ["M24 6 A18 18 0 1 1 23.99 6", "M24 14 V24 L31 29"],
  paw: [
    "M24 26 C17 26 13 32 14 37 C15 41 20 41 24 39 C28 41 33 41 34 37 C35 32 31 26 24 26 Z",
    "M12 22 A4 5 0 1 1 12.01 22",
    "M36 22 A4 5 0 1 1 36.01 22",
    "M19 14 A4 5 0 1 1 19.01 14",
    "M29 14 A4 5 0 1 1 29.01 14",
  ],
};

export const LineIcon: React.FC<{
  name: Benefit["icon"];
  color: string;
  size: number;
  drawFrames?: number;
}> = ({ name, color, size, drawFrames = 30 }) => {
  const frame = useCurrentFrame();
  const segs = paths[name];
  const per = drawFrames / segs.length;

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {segs.map((d, i) => {
        const progress = interpolate(
          frame,
          [i * per, (i + 1) * per + 6],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.inOut(Easing.cubic),
          },
        );
        return (
          <path
            key={i}
            d={d}
            pathLength={1}
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={1 - progress}
          />
        );
      })}
    </svg>
  );
};
