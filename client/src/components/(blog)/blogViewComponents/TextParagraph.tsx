import React from "react";

const TextParagraph = ({ contentText }: { contentText: string }) => {
  return (
    <p className="mt-4 text-lg text-muted-foreground font-blogText">
      {contentText}
    </p>
  );
};

export default TextParagraph;
