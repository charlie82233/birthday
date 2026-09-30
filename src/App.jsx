import { useRef, useState } from 'react';
import { NICKNAME, GREETING, AGE, PHOTO } from './config.js';
import Fireworks from './components/Fireworks.jsx';
import Egg from './components/Egg.jsx';
import Cake from './components/Cake.jsx';
import PhotoFrame from './components/PhotoFrame.jsx';

// 狀態流程：idle（等你點）→ cracking（蛋在抖）→ opened（破殼、煙火、熊出場）
export default function App() {
  const [stage, setStage] = useState('idle');
  const stageRef = useRef(null);
  const eggRef = useRef(null);
  const fireworksRef = useRef(null);

  function openEgg() {
    if (stage !== 'idle') return;
    setStage('cracking');
    setTimeout(() => {
      setStage('opened');
      const r = eggRef.current.getBoundingClientRect();
      const s = stageRef.current.getBoundingClientRect();
      fireworksRef.current.start(r.left - s.left + r.width / 2, r.top - s.top + r.height * 0.4);
    }, 700);
  }

  function replay() {
    fireworksRef.current.stop();
    setStage('idle');
    eggRef.current.focus();
  }

  const className = ['stage', stage === 'cracking' && 'cracking', stage === 'opened' && 'opened']
    .filter(Boolean).join(' ');

  return (
    <div className={className} ref={stageRef}>
      <Fireworks ref={fireworksRef} containerRef={stageRef} />

      <h1 className="headline" aria-live="polite">
        <span className="who">{NICKNAME}</span>
        <PhotoFrame src={PHOTO} />
        <span className="hb">
          {[...GREETING].map((c, i) => (
            <span key={i} className="ch" style={{ animationDelay: `${i * 0.1}s` }}>{c}</span>
          ))}
        </span>
      </h1>

      <Egg ref={eggRef} onOpen={openEgg} />

      <div className="hint" aria-hidden="true">
        <svg viewBox="0 0 60 30">
          <path d="M58 15 H10 M22 3 L8 15 L22 27" stroke="var(--gold)" strokeWidth="5" fill="none"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>點一下！</span>
      </div>

      <Cake age={AGE} />

      <button className="replay" onClick={replay}>再看一次</button>
    </div>
  );
}
