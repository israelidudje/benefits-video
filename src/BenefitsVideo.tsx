import { AbsoluteFill, Sequence } from "remotion";
import { BenefitScene } from "./scenes/BenefitScene";
import { Intro } from "./scenes/Intro";
import { Outro } from "./scenes/Outro";
import { Summary } from "./scenes/Summary";
import { INTRO, OUTRO, PER_BENEFIT, SUMMARY, type VideoProps } from "./schema";

export const BenefitsVideo: React.FC<VideoProps> = (props) => {
  const { benefits, theme, currency } = props;
  const summaryFrom = INTRO + benefits.length * PER_BENEFIT;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.surface }}>
      <Sequence durationInFrames={INTRO} name="Intro">
        <Intro headline={props.headline} subhead={props.subhead} theme={theme} />
      </Sequence>

      {benefits.map((b, i) => (
        <Sequence
          key={b.title}
          from={INTRO + i * PER_BENEFIT}
          durationInFrames={PER_BENEFIT}
          name={b.title}
        >
          <BenefitScene
            benefit={b}
            index={i}
            total={benefits.length}
            currency={currency}
            theme={theme}
          />
        </Sequence>
      ))}

      <Sequence from={summaryFrom} durationInFrames={SUMMARY} name="Summary">
        <Summary benefits={benefits} currency={currency} theme={theme} />
      </Sequence>

      <Sequence from={summaryFrom + SUMMARY} durationInFrames={OUTRO} name="Outro">
        <Outro cta={props.cta} theme={theme} />
      </Sequence>
    </AbsoluteFill>
  );
};
