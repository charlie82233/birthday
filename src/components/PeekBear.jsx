import { useState } from 'react';
import { BEAR_IMAGE } from '../config.js';

// 先試著載入 public/ 裡的熊照片，載入失敗就用原創小熊
export function useBearImage() {
  const [ok, setOk] = useState(true);
  return { url: import.meta.env.BASE_URL + BEAR_IMAGE, ok, onError: () => setOk(false) };
}

// 從畫框右側探出頭的小熊：頭在畫框「後面」，一隻手搭在畫框「前面」
export function PeekHead({ bear }) {
  if (bear.ok) {
    return (
      <div className="peek-head peek-photo" aria-hidden="true">
        <img className="nod" src={bear.url} alt="" onError={bear.onError} />
      </div>
    );
  }
  return (
    <div className="peek-head" aria-hidden="true">
      <svg viewBox="0 0 140 150">
        <g className="nod">
          {/* 耳朵 */}
          <circle cx="36" cy="40" r="17" fill="var(--fur)" />
          <circle cx="36" cy="40" r="9" fill="var(--pink)" opacity=".7" />
          <circle cx="104" cy="40" r="17" fill="var(--fur)" />
          <circle cx="104" cy="40" r="9" fill="var(--pink)" opacity=".7" />
          {/* 頭 */}
          <circle cx="70" cy="84" r="52" fill="var(--fur)" />
          <ellipse cx="80" cy="102" rx="23" ry="18" fill="var(--fur-light)" />
          <ellipse cx="80" cy="94" rx="8.5" ry="6" fill="#3b2415" />
          <path d="M80 100 V107 M72 109 Q80 115 88 109" stroke="#3b2415" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          {/* 眼睛往畫框（左邊）看 */}
          <circle cx="60" cy="76" r="6" fill="#2a1a10" /><circle cx="59" cy="73.5" r="2" fill="#fff" />
          <circle cx="98" cy="76" r="6" fill="#2a1a10" /><circle cx="97" cy="73.5" r="2" fill="#fff" />
          <ellipse cx="50" cy="96" rx="8" ry="5" fill="var(--pink)" opacity=".6" />
          <ellipse cx="110" cy="96" rx="8" ry="5" fill="var(--pink)" opacity=".6" />
          {/* 派對帽 */}
          <path d="M54 36 L72 -2 L88 38 Z" fill="var(--pink)" />
          <path d="M59 25 L85 26 M64 14 L80 15" stroke="var(--gold)" strokeWidth="3.5" />
          <circle cx="72" cy="-4" r="6" fill="var(--gold)" />
        </g>
      </svg>
    </div>
  );
}

export function PeekPaw({ bear }) {
  if (bear.ok) return null; // 用照片時不畫手
  return (
    <div className="peek-paw" aria-hidden="true">
      <svg viewBox="0 0 40 44">
        <ellipse cx="20" cy="22" rx="16" ry="19" fill="var(--fur)" />
        <ellipse cx="20" cy="27" rx="8" ry="7" fill="var(--fur-light)" />
        <circle cx="11" cy="13" r="3.2" fill="var(--fur-light)" />
        <circle cx="20" cy="10" r="3.2" fill="var(--fur-light)" />
        <circle cx="29" cy="13" r="3.2" fill="var(--fur-light)" />
      </svg>
    </div>
  );
}