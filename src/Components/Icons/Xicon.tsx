import React from "react";

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const Xicon = ({ width = 34, height = 31, color = "white" }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 44 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M34.6526 0.8078H41.3995L26.6594 17.6548L44 40.5797H30.4225L19.7881 26.6759L7.61989 40.5797H0.868864L16.6349 22.56L0 0.8078H13.9222L23.5348 13.5165L34.6526 0.8078ZM32.2846 36.5414H36.0232L11.8908 4.63406H7.87892L32.2846 36.5414Z"
        fill={color}
      />
    </svg>
  );
};

export default Xicon;
