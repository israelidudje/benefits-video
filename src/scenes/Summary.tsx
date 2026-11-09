import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { body, display } from "../fonts";
import { type Benefit, type Theme, formatValue } from "../schema";

// Dollar-value benefits as a bar chart; non-currency rows become chips
// underneath, since they don't share a scale with the bars.
export const Summary: React.FC<{
  benefits: Benefit[];
  currency: string;
  theme: Theme;
}> = ({ benefits, currency, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const money = benefits.filter((b) => b.format === "currency");
  const other = benefits.filter((b) => b.format !== "currency");
  const max = Math.max(1, ...money.map((b) => b.value));
  const totalMoney = money.reduce((s, b) => s + b.value, 0);

  const titleIn = spring({ frame, fps, config: { damping: 200 } });
  const total = interpolate(frame, [10, 60], [0, totalMoney], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{ backgroundColor: theme.ink, padding: 96, justifyContent: "center" }}
    >
      <div
        style={{
          fontFamily: body,
          fontSize: 34,
          color: theme.mid,
          opacity: titleIn,
        }}
      >
        Total value back this year
      </div>
      <div
        style={{
          fontFamily: display,
          fontWeight: 700,
          fontSize: 168,
          color: "#FFFFFF",
          fontVariantNumeric: "tabular-nums",
          marginBottom: 56,
        }}
      >
        {currency}
        {Math.round(total).toLocaleString("en-AU")}
      </div>

      {money.map((b, i) => {
        const grow = spring({
          frame: frame - 16 - i * 8,
          fps,
          config: { damping: 22, stiffness: 90 },
        });
        return (
          <div key={b.title} style={{ marginBottom: 32 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: body,
                fontSize: 30,
                color: theme.soft,
                marginBottom: 12,
              }}
            >
              <span>{b.title}</span>
              <span style={{ fontWeight: 600 }}>
                {formatValue(b, b.value * grow, currency)}
              </span>
            </div>
            <div
              style={{
                height: 28,
                borderRadius: 14,
                backgroundColor: "rgba(255,255,255,0.12)",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 14,
                  width: `${(b.value / max) * 100 * grow}%`,
                  backgroundColor: theme.mid,
                }}
              />
            </div>
          </div>
        );
      })}

      <div style={{ display: "flex", gap: 20, marginTop: 24, flexWrap: "wrap" }}>
        {other.map((b, i) => {
          const pop = spring({ frame: frame - 50 - i * 6, fps, config: { damping: 14 } });
          return (
            <div
              key={b.title}
              style={{
                fontFamily: body,
                fontSize: 28,
                color: theme.ink,
                backgroundColor: theme.soft,
                borderRadius: 40,
                padding: "16px 28px",
                transform: `scale(${pop})`,
              }}
            >
              <strong>{formatValue(b, b.value, currency)}</strong> {b.title.toLowerCase()}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
