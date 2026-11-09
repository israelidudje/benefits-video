import { CalculateMetadataFunction, Composition } from "remotion";
import { BenefitsVideo } from "./BenefitsVideo";
import data from "./data/benefits.json";
import { FPS, totalFrames, videoSchema, type VideoProps } from "./schema";

// Duration follows the data: more benefits -> longer video.
const calculateMetadata: CalculateMetadataFunction<VideoProps> = ({ props }) => ({
  durationInFrames: totalFrames(props.benefits.length),
});

const defaults = videoSchema.parse(data);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BenefitsSquare"
        component={BenefitsVideo}
        schema={videoSchema}
        defaultProps={defaults}
        calculateMetadata={calculateMetadata}
        durationInFrames={totalFrames(defaults.benefits.length)}
        fps={FPS}
        width={1080}
        height={1080}
      />
      <Composition
        id="BenefitsStory"
        component={BenefitsVideo}
        schema={videoSchema}
        defaultProps={defaults}
        calculateMetadata={calculateMetadata}
        durationInFrames={totalFrames(defaults.benefits.length)}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
