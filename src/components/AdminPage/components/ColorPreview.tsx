import React from "react";

interface ColorPreviewProps {
  gradientColor1: string;
  gradientColor2: string;
  index?: number;
}

const ColorPreview: React.FC<ColorPreviewProps> = ({
  gradientColor1,
  gradientColor2,
  index = 0,
}) => {
  const alternatingBorderRadius =
    index % 2 === 0
      ? { borderTopRightRadius: "0px", borderTopLeftRadius: "15px" }
      : { borderTopLeftRadius: "0px", borderTopRightRadius: "15px" };

  return (
    <div
      className="w-[300px] h-32 rounded-3xl border shadow mt-5"
      style={{
        background: `linear-gradient(343deg, ${gradientColor1} 20%, ${gradientColor2} 92%)`,
        ...alternatingBorderRadius,
      }}
      title="Färgförhandsvisning"
    />
  );
};

export default ColorPreview;
