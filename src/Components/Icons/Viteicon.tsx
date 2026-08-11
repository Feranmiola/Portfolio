import React, { useId } from "react";

/**
 * Vite logo badge.
 *
 * The badge used to be a PNG inlined as a base64 data URI; this is the same
 * artwork as vector geometry, which is a fraction of the bytes and stays sharp
 * at any size.
 */
interface IconProps {
  width?: number;
  height?: number;
  className?: string;
}

const Viteicon = ({ width = 40, height = 40, className }: IconProps) => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={`vite-clip-${uid}`}>
          <circle cx="20" cy="20" r="20" />
        </clipPath>
        <linearGradient
          id={`vite-mark-${uid}`}
          gradientUnits="userSpaceOnUse"
          x1="6"
          y1="33"
          x2="235"
          y2="344"
        >
          <stop stopColor="#41D1FF" />
          <stop offset="1" stopColor="#BD34FE" />
        </linearGradient>
        <linearGradient
          id={`vite-bolt-${uid}`}
          gradientUnits="userSpaceOnUse"
          x1="194.651"
          y1="8.818"
          x2="236.076"
          y2="292.989"
        >
          <stop stopColor="#FFEA83" />
          <stop offset="0.083" stopColor="#FFDD35" />
          <stop offset="1" stopColor="#FFA800" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#vite-clip-${uid})`}>
        <circle cx="20" cy="20" r="20" fill="#FFFFFF" />
        {/* Logo artwork lives in its own 410x404 space, fitted to the badge. */}
        <g transform="scale(0.102121 0.101817) translate(-9.2438 -0.804)">
          <path
            d="M399.641 59.5246L215.643 388.545C211.844 395.338 202.084 395.378 198.228 388.618L10.5817 59.5563C6.38087 52.1896 12.6802 43.3601 21.0281 44.8517L205.223 77.5308C206.398 77.7392 207.601 77.7365 208.776 77.523L389.119 44.8583C397.439 43.3514 403.768 52.1258 399.641 59.5246Z"
            fill={`url(#vite-mark-${uid})`}
          />
          <path
            d="M292.965 1.5744L156.801 28.2552C154.563 28.6937 152.906 30.5903 152.771 32.8664L144.395 174.33C144.198 177.662 147.258 180.248 150.51 179.498L188.42 170.749C191.967 169.931 195.172 173.055 194.443 176.622L183.18 231.775C182.422 235.487 185.907 238.661 189.532 237.56L212.947 230.446C216.577 229.344 220.065 232.527 219.297 236.242L201.398 322.875C200.278 328.294 207.486 331.249 210.492 326.612L212.5 323.51L323.454 102.036C325.312 98.3283 322.108 94.0004 318.003 94.7937L279.005 102.328C275.298 103.044 272.143 99.5985 273.174 95.9635L298.63 6.31307C299.663 2.67145 296.503 -0.777268 292.965 1.5744Z"
            fill={`url(#vite-bolt-${uid})`}
          />
        </g>
      </g>
    </svg>
  );
};

export default Viteicon;
