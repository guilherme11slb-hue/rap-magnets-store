import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PRODUCTS } from "@/lib/products";
import { cartStore } from "@/lib/cart-store";
import { Star } from "@/components/doodle-decor";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Catalog — RapMagnets" },
      { name: "description", content: "Browse hand-doodled magnets of legendary American rappers. Add to cart and check out fast." },
    ],
  }),
  component: Catalog,
});

const ERAS = ["All", "West Coast", "New York", "Atlanta", "Detroit", "Florida", "Houston", "SoundCloud", "Old School"];

function Catalog() {
  const [era, setEra] = useState<string>("All");
  const [added, setAdded] = useState<string | null>(null);

  const items = era === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.era === era);

  function handleAdd(id: string) {
    cartStore.add(id);
    setAdded(id);
    setTimeout(() => setAdded((cur) => (cur === id ? null : cur)), 1200);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10">
        <span className="font-hand text-2xl -rotate-1 inline-block">the lineup</span>
        <h1 className="font-display mt-1 text-5xl md:text-6xl">The whole crew</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Each magnet is hand-drawn, printed on heavyweight stock, and backed with a strong neodymium magnet.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {ERAS.map((e) => {
          const active = era === e;
          return (
            <button
              key={e}
              onClick={() => setEra(e)}
              className={`doodle-border-sm px-4 py-1.5 font-hand text-lg transition-all ${active ? "bg-ink text-paper doodle-shadow-sm" : "bg-paper hover:-translate-y-0.5"}`}
            >
              {e}
            </button>
          );
        })}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <article
            key={p.id}
            className="doodle-border doodle-shadow bg-paper p-4 animate-pop-in hover-pop"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="aspect-square overflow-hidden border-2 border-ink">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover" loading="lazy" width={1024} height={1024} />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h2 className="font-display text-3xl">{p.name}</h2>
              <span className="font-hand text-2xl">${p.price}</span>
            </div>
            <p className="font-hand text-lg text-muted-foreground">{p.tagline} · {p.era}</p>
            <button
              onClick={() => handleAdd(p.id)}
              className="doodle-border-sm doodle-shadow-sm mt-4 flex w-full items-center justify-center gap-2 bg-ink py-2.5 font-display text-xl text-paper transition-transform hover:-translate-y-0.5"
            >
              {added === p.id ? (<><Star className="h-4 w-4" /> Added!</>) : "Add to cart"}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
