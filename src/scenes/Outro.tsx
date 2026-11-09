import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { LineIcon } from "../components/LineIcon";
import { body } from "../fonts";
import type { Theme } from "../schema";

export const Outro: React.FC<{ cta: string; theme: Theme }> = ({ cta, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({ frame: frame - 8, fps, config: { damping: 12 } });
  // A gentle press at ~1.5s, like a tap on the button.
  const press = interpolate(frame, [44, 48, 54], [1, 0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.surface,
        alignItems: "center",
        justifyContent: "center",
        gap: 56,
      }}
    >
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 90,
          backgroundColor: theme.soft,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LineIcon name="paw" color={theme.accent} size={110} drawFrames={24} />
      </div>
      <div
        style={{
          fontFamily: body,
          fontWeight: 600,
          fontSize: 44,
          color: "#FFFFFF",
          backgroundColor: theme.cta,
          borderRadius: 999,
          padding: "32px 72px",
          transform: `scale(${pop * press})`,
        }}
      >
        {cta}
      </div>
    </AbsoluteFill>
  );
};
