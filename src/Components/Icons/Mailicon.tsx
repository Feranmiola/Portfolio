import React from "react";

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const Mailicon = ({ width = 34, height = 25, color = "white" }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 68 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M61.7615 0C63.799 0 65.6084 0.931992 66.7469 2.37355L33.6815 28.8338L0.910706 2.85405C2.00641 1.14245 3.98264 0 6.23853 0H61.7615ZM0 44.0476V7.54932L23.5139 26.1905L0.048472 44.7932C0.0164873 44.549 0 44.3001 0 44.0476ZM2.15049 48.544C3.24536 49.451 4.67475 50 6.23853 50H61.7615C63.1055 50 64.3504 49.5944 65.3688 48.9046L40.3825 28.9096L35.8892 32.5052C34.6185 33.5222 32.7672 33.5262 31.4915 32.5149L26.9306 28.8991L2.15049 48.544ZM43.7803 26.1905L67.8295 45.4356C67.941 44.9902 68 44.5255 68 44.0476V6.80894L43.7803 26.1905Z"
        fill={color}
      />
    </svg>
  );
};

export default Mailicon;
