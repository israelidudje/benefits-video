import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { LineIcon } from "../components/LineIcon";
import { body, display } from "../fonts";
import { type Benefit, type Theme, formatValue, PER_BENEFIT } from "../schema";

export const BenefitScene: React.FC<{
  benefit: Benefit;
  index: number;
  total: number;
  currency: string;
  theme: Theme;
}> = ({ benefit, index, total, currency, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 18, mass: 0.8 } });
  const exit = interpolate(frame, [PER_BENEFIT - 12, PER_BENEFIT], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  // The headline number counts up from 0 to the data value.
  const counted = interpolate(frame, [8, 44], [0, benefit.value], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const captionOpacity = interpolate(frame, [30, 46], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{ backgroundColor: theme.surface, padding: 80, justifyContent: "center" }}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 48,
          padding: 72,
          border: `2px solid ${theme.mid}`,
          transform: `translateX(${interpolate(enter, [0, 1], [160, 0]) - exit * 160}px)`,
          opacity: enter * (1 - exit),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 56,
          }}
        >
          <div
            style={{
              width: 128,
              height: 128,
              borderRadius: 64,
              backgroundColor: theme.soft,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LineIcon name={benefit.icon} color={theme.accent} size={80} />
          </div>
          <span
            style={{
              fontFamily: body,
              fontWeight: 600,
              fontSize: 28,
              color: theme.accent,
              letterSpacing: 2,
            }}
          >
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
        <div
          style={{
            fontFamily: body,
            fontWeight: 600,
            fontSize: 40,
            color: theme.ink,
            opacity: 0.8,
          }}
        >
          {benefit.title}
        </div>
        <div
          style={{
            fontFamily: display,
            fontWeight: 700,
            fontSize: 176,
            lineHeight: 1.1,
            color: theme.ink,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatValue(benefit, counted, currency)}
        </div>
        <div
          style={{
            fontFamily: body,
            fontSize: 34,
            lineHeight: 1.4,
            color: theme.ink,
            opacity: captionOpacity * 0.7,
            marginTop: 16,
          }}
        >
          {benefit.caption}
        </div>
      </div>
    </AbsoluteFill>
  );
};
