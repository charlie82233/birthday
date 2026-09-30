import { useState } from 'react';
import { PeekHead, PeekPaw, useBearImage } from './PeekBear.jsx';

// 金色畫框 + 從後面探頭的小熊；找不到照片時顯示提示
export default function PhotoFrame({ src }) {
  const [ok, setOk] = useState(true);
  const url = import.meta.env.BASE_URL + src;
  const bear = useBearImage();

  return (
    <span className="frame-wrap">
      <PeekHead bear={bear} />
      <span className="photo">
        <span className="mat">
          {ok ? (
            <img src={url} alt="壽星照片" onError={() => setOk(false)} />
          ) : (
            <span className="ph">把照片存成<br />{src}<br />放進 public 資料夾</span>
          )}
        </span>
      </span>
      <PeekPaw bear={bear} />
    </span>
  );
}