import { forwardRef } from 'react';

const ZIGZAG = 'M8 112 L22 100 L36 114 L50 98 L64 114 L78 98 L92 114 L106 98 L120 114 L134 100 L143 110';

// 彩蛋：上下兩半，打開時 CSS 讓上半飛走、下半淡出
const Egg = forwardRef(function Egg({ onOpen }, ref) {
  return (
    <button className="egg-wrap" ref={ref} aria-label="點一下打開蛋" onClick={onOpen}>
      <svg viewBox="0 0 150 200" aria-hidden="true">
        <g className="egg-idle">
          <ellipse className="egg-shadow" cx="75" cy="192" rx="48" ry="7" fill="#000" opacity=".25" />

          <g className="shell-bottom">
            <path d={`${ZIGZAG} C 146 160 116 190 75 190 C 34 190 5 160 8 112 Z`} fill="var(--shell)" />
            <path d="M20 150 C 30 178 55 188 75 188 C 60 182 34 170 20 150 Z" fill="var(--shell-shade)" />
            <circle cx="40" cy="150" r="7" fill="var(--pink)" opacity=".8" />
            <circle cx="100" cy="165" r="5" fill="var(--gold)" />
            <circle cx="112" cy="138" r="8" fill="#8fd3ff" opacity=".85" />
          </g>

          <g className="shell-top">
            <path d={`${ZIGZAG} C 142 50 112 6 75 6 C 38 6 9 50 8 112 Z`} fill="var(--shell)" />
            <ellipse cx="52" cy="40" rx="10" ry="18" fill="#fff" opacity=".7" transform="rotate(25 52 40)" />
            <circle cx="98" cy="60" r="8" fill="var(--pink)" opacity=".8" />
            <circle cx="45" cy="82" r="5" fill="#8fd3ff" opacity=".85" />
            <circle cx="112" cy="92" r="4" fill="var(--gold)" />
          </g>
        </g>
      </svg>
    </button>
  );
});

export default Egg;
