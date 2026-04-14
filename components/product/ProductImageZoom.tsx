"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
};

export function ProductImageZoom({ src, alt }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const bgPos = useMemo(() => `${pos.x}% ${pos.y}%`, [pos.x, pos.y]);

  function onMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  }

  return (
    <div
      ref={ref}
      className="relative aspect-square w-full bg-[#F5F5F5]"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseMove={onMove}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-contain p-6"
      />

      <div
        className={
          "pointer-events-none absolute inset-0 transition-opacity duration-150 " +
          (active ? "opacity-100" : "opacity-0")
        }
        style={{
          backgroundImage: `url(${src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: bgPos,
          backgroundSize: "220%",
        }}
      />

      <div
        className={
          "pointer-events-none absolute left-0 top-0 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/60 bg-white/10 shadow-sm backdrop-blur-[2px] transition-opacity duration-150 " +
          (active ? "opacity-100" : "opacity-0")
        }
        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      />

      <div
        className={
          "pointer-events-none absolute inset-0 ring-1 ring-black/5 transition-opacity duration-150 " +
          (active ? "opacity-100" : "opacity-0")
        }
      />
    </div>
  );
}
