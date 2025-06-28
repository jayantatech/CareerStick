// import { FontSettings } from "../types/resumeTypes";

import { FontSettings } from "./modernTemplate";

export const generateFontStyles = (fontSettings: FontSettings): string => `
  /* Base font settings */
  body {
    font-family: ${fontSettings.primary};
    font-size: ${fontSettings.bodySize || "14px"};
    line-height: ${fontSettings.lineHeight || "1.6"};
  }
  
  h1, h2, h3, h4 {
    font-family: ${fontSettings.secondary || fontSettings.primary};
    line-height: 1.2;
  }
  
  h1 {
    font-size: ${fontSettings.headerSize || "24px"};
  }
  
  h2 {
    font-size: calc(${fontSettings.headerSize || "24px"} * 0.8);
  }
`;
