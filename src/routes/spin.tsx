import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { cartStore, useCart } from "@/lib/cart-store";
import { ScatterDecor, Star } from "@/components/doodle-decor";

export const Route = createFileRoute("/spin")({
  head: () => ({
    meta: [
      { title: "Spin & Win — RapMagnets" },
      { name: "description", content: "Give the wheel a spin and win between 5% and 15% off your RapMagnets order." },
    ],
  }),
  component: Spin,
});

const SLICES = [
  { pct: 5, label: "5% OFF" },
  { pct: 10, label: "10% OFF" },
  { pct: 7, label: "7% OFF" },
  { pct: 15, label: "15% OFF" },
  { pct: 8, label: "8% OFF" },
  { pct: 12, label: "12% OFF" },
  { pct: 6, label: "6% OFF" },
  { pct: 9, label: "9% OFF" },
];

function Spin() {
  const cart = useCart();
  const alreadyHas = cart.discountPct > 0;
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<number | null>(alreadyHas ? cart.discountPct : null);
  const wheelRef = useRef<HTMLDivElement>(null);

  function spin() {
    if (spinning || alreadyHas) return;
    const idx = Math.floor(Math.random() * SLICES.length);
    const slice = SLICES[idx];
    const sliceAngle = 360 / SLICES.length;
    // pointer at top (0deg). Final angle should land slice center under pointer.
    const target = 360 * 6 + (360 - (idx * sliceAngle + sliceAngle / 2));
    setSpinning(true);
    setRotation(target);
    setTimeout(() => {
      setSpinning(false);
      setResult(slice.pct);
      cartStore.setDiscount(slice.pct);
    }, 4200);
  }

  return (
    <div className="relative mx-auto max-w-4xl px-4 py-16">
      <ScatterDecor />
      <div className="relative text-center">
        <span className="font-hand text-2xl -rotate-2 inline-block">your lucky day</span>
        <h1 className="font-display mt-1 text-5xl md:text-7xl">Spin the wheel</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          One free spin per visitor. Win between <strong>5%</strong> and <strong>15%</strong> off your order.
        </p>
      </div>

      <div className="relative mx-auto mt-12 flex w-full max-w-md flex-col items-center">
        {/* Pointer */}
        <div className="z-10 -mb-3">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="black" stroke="white" strokeWidth="1.5">
            <path d="M12 22 L4 6 H20 Z" />
          </svg>
        </div>

        <div className="doodle-border doodle-shadow-lg relative aspect-square w-full overflow-hidden rounded-full bg-paper">
          <div
            ref={wheelRef}
            className="relative h-full w-full"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.21, 1)" : "none",
            }}
          >
            <svg viewBox="-100 -100 200 200" className="h-full w-full">
              {SLICES.map((s, i) => {
                const a = 360 / SLICES.length;
                const start = i * a - 90;
                const end = start + a;
                const startRad = (start * Math.PI) / 180;
                const endRad = (end * Math.PI) / 180;
                const x1 = 100 * Math.cos(startRad);
                const y1 = 100 * Math.sin(startRad);
                const x2 = 100 * Math.cos(endRad);
                const y2 = 100 * Math.sin(endRad);
                const fill = i % 2 === 0 ? "black" : "white";
                const text = i % 2 === 0 ? "white" : "black";
                const midRad = ((start + end) / 2) * (Math.PI / 180);
                const tx = 60 * Math.cos(midRad);
                const ty = 60 * Math.sin(midRad);
                return (
                  <g key={i}>
                    <path
                      d={`M0 0 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`}
                      fill={fill}
                      stroke="black"
                      strokeWidth="2"
                    />
                    <text
                      x={tx}
                      y={ty}
                      fill={text}
                      fontFamily="Archivo Black, Inter, sans-serif"
                      fontWeight="900"
                      fontSize="20"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${(start + end) / 2 + 90}, ${tx}, ${ty})`}
                    >
                      {s.pct}%
                    </text>
                  </g>
                );
              })}
              <circle cx="0" cy="0" r="12" fill="white" stroke="black" strokeWidth="2.5" />
            </svg>
          </div>
        </div>

        <button
          onClick={spin}
          disabled={spinning || alreadyHas}
          className="doodle-border doodle-shadow mt-8 bg-ink px-8 py-3 font-display text-2xl text-paper hover-pop disabled:opacity-60 disabled:hover:translate-x-0 disabled:hover:translate-y-0"
        >
          {spinning ? "Spinning..." : alreadyHas ? `You already won ${cart.discountPct}%` : "SPIN!"}
        </button>

        {result !== null && !spinning && (
          <div className="doodle-border doodle-shadow-sm mt-8 w-full bg-paper p-6 text-center animate-pop-in">
            <div className="flex items-center justify-center gap-2">
              <Star className="h-6 w-6 fill-ink animate-wiggle" />
              <h2 className="font-display text-3xl">You won {result}% off!</h2>
              <Star className="h-6 w-6 fill-ink animate-wiggle" />
            </div>
            <p className="mt-2 text-muted-foreground">Discount applied automatically at checkout.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link to="/catalog" className="doodle-border-sm bg-paper px-5 py-2 font-display text-lg hover-pop">Keep shopping</Link>
              <Link to="/checkout" className="doodle-border-sm bg-ink px-5 py-2 font-display text-lg text-paper hover-pop">Go to checkout</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
