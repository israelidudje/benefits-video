import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";

// Outfit stands in for the brand's licensed headline face so the repo can
// stay public without shipping font files.
export const { fontFamily: body } = loadInter("normal", {
  weights: ["400", "600"],
  subsets: ["latin"],
});
export const { fontFamily: display } = loadOutfit("normal", {
  weights: ["500", "700"],
  subsets: ["latin"],
});
