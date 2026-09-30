const CANDLE_COLORS = ['#8fd3ff', 'var(--gold)', 'var(--pink)'];

// 數字蠟燭：age 有幾位數就排幾根，置中在蛋糕上
function Candles({ age }) {
  const digits = String(age).split('');
  return digits.map((d, i) => {
    const x = 120 + (i - (digits.length - 1) / 2) * 33;
    return (
      <g key={i}>
        <text x={x} y="166" fontFamily="Arial Black, Noto Sans TC, sans-serif" fontWeight="900" fontSize="46"
              textAnchor="middle" stroke="#fff" strokeWidth="2" paintOrder="stroke"
              fill={CANDLE_COLORS[i % CANDLE_COLORS.length]}>{d}</text>
        <path d={`M${x} 132 V127`} stroke="#3b2415" strokeWidth="2" />
        <path className="flame" fill="#ffb13b"
              d={`M${x} 110 C ${x - 6.5} 120 ${x - 4.5} 128 ${x} 128 C ${x + 4.5} 128 ${x + 6.5} 120 ${x} 110 Z`} />
      </g>
    );
  });
}

// 從蛋裡冒出來的蛋糕
export default function Cake({ age }) {
  return (
    <div className="cake" aria-hidden="true">
      <svg viewBox="56 104 128 118">
        <ellipse cx="120" cy="216" rx="62" ry="6" fill="#000" opacity=".3" />
        <rect x="72" y="158" width="96" height="46" rx="6" fill="#fff0f4" />
        <path d="M72 172 Q84 184 96 172 Q108 184 120 172 Q132 184 144 172 Q156 184 168 172 V164 H72 Z" fill="var(--pink)" />
        <rect x="62" y="200" width="116" height="11" rx="5.5" fill="#e7dcef" />
        <circle cx="90" cy="190" r="4" fill="#e04a6a" />
        <circle cx="120" cy="192" r="4" fill="#e04a6a" />
        <circle cx="150" cy="190" r="4" fill="#e04a6a" />
        <Candles age={age} />
      </svg>
    </div>
  );
}
