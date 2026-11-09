import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { LineIcon } from "../components/LineIcon";
import { body, display } from "../fonts";
import type { Theme } from "../schema";

export const Intro: React.FC<{
  headline: string;
  subhead: string;
  theme: Theme;
}> = ({ headline, subhead, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = headline.split(" ");

  const subOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.surface,
        padding: 96,
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: theme.soft,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 48,
        }}
      >
        <LineIcon name="paw" color={theme.accent} size={72} drawFrames={28} />
      </div>
      <h1
        style={{
          fontFamily: display,
          fontWeight: 700,
          fontSize: 92,
          lineHeight: 1.05,
          color: theme.ink,
          margin: 0,
          display: "flex",
          flexWrap: "wrap",
          columnGap: 24,
        }}
      >
        {words.map((w, i) => {
          const s = spring({
            frame: frame - 6 - i * 3,
            fps,
            config: { damping: 200 },
          });
          return (
            <span
              key={i}
              style={{
                opacity: s,
                transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
              }}
            >
              {w}
            </span>
          );
        })}
      </h1>
      <p
        style={{
          fontFamily: body,
          fontSize: 36,
          color: theme.ink,
          opacity: subOpacity * 0.75,
          marginTop: 32,
        }}
      >
        {subhead}
      </p>
    </AbsoluteFill>
  );
};
