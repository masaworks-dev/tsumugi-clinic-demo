'use client';

import { useEffect, useRef, useState } from 'react';
import { isAccepting } from '@/lib/hours';
import { FALLBACK_NEWS, fetchNews, type NewsItem } from '@/lib/microcms';
import { useClinic } from './ClinicProvider';
import { OpenButton } from './chrome';

/* ---------- 順番受付の待ち人数（デモ表示） ---------- */
export function WaitCard() {
  const { wait, status, reduceMotion } = useClinic();
  const open = isAccepting(status);
  const num = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const n = num.current;
    if (!n || reduceMotion) return;
    n.classList.remove('bump');
    void n.offsetWidth;
    n.classList.add('bump');
  }, [wait, reduceMotion]);

  return (
    <div className="wait reveal">
      <div>
        <span className="num" ref={num}>
          {open ? wait : '–'}
        </span>
        <span className="lbl">人待ち</span>
      </div>
      <div className="meta">
        <b>{open ? `いま ${wait}人 がお待ちです` : '順番受付は診療時間内に行えます'}</b>
        <span className="tag-demo">デモ表示</span>
        <br />
        <span className="lbl">{open ? `いま並ぶと、呼び出しの目安は約${wait * 6 + 4}分後です。` : status.sub}</span>
      </div>
      <OpenButton overlay={{ kind: 'book', mode: 'queue' }} className="btn y">
        順番受付をする
      </OpenButton>
    </div>
  );
}

/* ---------- 院内のようす ---------- */
type Photo = { k: 'exterior' | 'reception' | 'wait' | 'exam'; name: string; alt: string; cap: string };

const PHOTOS: readonly Photo[] = [
  { k: 'exterior', name: '外観', alt: '外観の写真', cap: 'つむぎビルの1階、木の扉が目印です。ベビーカーや車いすのまま入れます。' },
  { k: 'reception', name: '受付', alt: '受付の写真', cap: '受付にはマイナ保険証の読み取り機があります。発熱の方は、別の入口からご案内します。' },
  { k: 'wait', name: '待合室', alt: '待合室の写真', cap: '窓の大きな明るい待合室です。奥にキッズスペースと絵本の棚があります。' },
  { k: 'exam', name: '診察室', alt: '診察室の写真', cap: 'お子さんが緊張しないよう、壁には動物の絵を飾っています。' },
];

export function Gallery() {
  const { reduceMotion } = useClinic();
  const [shown, setShown] = useState<Photo>(PHOTOS[0]!);
  const [fading, setFading] = useState(false);

  const pick = (p: Photo) => {
    if (p.k === shown.k) return;
    if (reduceMotion) return setShown(p);
    setFading(true);
    setTimeout(() => {
      setShown(p);
      setFading(false);
    }, 200);
  };

  return (
    <div className="gal reveal">
      <figure className="gmain">
        <img
          className={fading ? 'fade' : undefined}
          src={`/${shown.k}-1280.webp`}
          srcSet={`/${shown.k}-640.webp 640w, /${shown.k}-1280.webp 1280w`}
          sizes="(max-width:860px) 92vw, 780px"
          width={1280}
          height={720}
          alt={shown.alt}
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          <b>{shown.name}</b>
          {shown.cap}
        </figcaption>
      </figure>
      <div className="gthumbs" aria-label="写真を選ぶ">
        {PHOTOS.map((p) => (
          <button key={p.k} type="button" aria-pressed={p.k === shown.k} onClick={() => pick(p)}>
            <img src={`/${p.k}-640.webp`} width={640} height={360} alt="" loading="lazy" decoding="async" />
            <span>{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- お知らせ（microCMS。つながらないときは固定の内容） ---------- */
export function NewsList() {
  const [items, setItems] = useState<NewsItem[]>(FALLBACK_NEWS);
  const [source, setSource] = useState<'static' | 'microcms'>('static');

  useEffect(() => {
    const ac = new AbortController();
    fetchNews(5, ac.signal)
      .then((list) => {
        if (list.length) {
          setItems(list);
          setSource('microcms');
        }
      })
      .catch(() => {
        /* 固定の内容のまま */
      });
    return () => ac.abort();
  }, []);

  return (
    <ul className="news reveal" data-source={source}>
      {items.map((it) => (
        <li key={it.id}>
          <time dateTime={it.dateTime}>{it.date}</time>
          <span className={`cat${it.category === '休診' ? ' k' : ''}`}>{it.category}</span>
          <span>{it.body ? `${it.title}　${it.body}` : it.title}</span>
        </li>
      ))}
    </ul>
  );
}
