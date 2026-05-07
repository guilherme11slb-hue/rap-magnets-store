import { createFileRoute, Link } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/products";
import { ScatterDecor, Squiggle, Star, Magnet } from "@/components/doodle-decor";
import doodlePattern from "@/assets/doodle-pattern.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RapMagnets — Hand-doodled rapper magnets for your fridge" },
      { name: "description", content: "Collect your favorite American rappers as hand-drawn magnets. Free spin for up to 15% off." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = PRODUCTS.slice(0, 4);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <ScatterDecor />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div className="relative z-10">
            <span className="font-hand inline-block -rotate-2 text-3xl">yo, check this out →</span>
            <h1 className="font-display mt-3 text-6xl leading-[0.95] md:text-8xl">
              Rap legends.<br />
              <span className="underline-squiggle">On your fridge.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Hand-doodled magnets of your favorite American rappers. Sketchy lines, sticky backs,
              endless flex.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/catalog"
                className="doodle-border doodle-shadow bg-ink px-6 py-3 font-display text-2xl text-paper hover-pop"
              >
                Shop the lineup
              </Link>
              <Link
                to="/spin"
                className="doodle-border doodle-shadow bg-paper px-6 py-3 font-display text-2xl hover-pop animate-wiggle"
              >
                Spin for 5–15% off
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-2 font-hand text-xl">
              <Star className="h-5 w-5 fill-ink" /> Buy 3+ → auto 5% off
            </div>
          </div>

          <div className="relative">
            <div className="doodle-border doodle-shadow-lg relative mx-auto aspect-square w-full max-w-md overflow-hidden bg-paper animate-pop-in">
              <img
                src={featured[0].image}
                alt={featured[0].name}
                className="h-full w-full object-cover"
                width={1024}
                height={1024}
              />
            </div>
            <Squiggle className="absolute -bottom-6 left-1/2 h-6 w-40 -translate-x-1/2 text-ink" />
            <Magnet className="absolute -right-4 -top-4 h-16 w-16 animate-wiggle text-ink" />
          </div>
        </div>
      </section>

      {/* DOODLE BAND */}
      <section
        aria-hidden
        className="border-y-[3px] border-ink"
        style={{
          backgroundImage: `url(${doodlePattern})`,
          backgroundSize: "200px",
          backgroundRepeat: "repeat",
          height: "80px",
        }}
      />

      {/* FEATURED */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl md:text-5xl">Fresh off the sketchpad</h2>
          <Link to="/catalog" className="font-hand text-xl hover-pop">See all →</Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Link
              key={p.id}
              to="/catalog"
              className="group block animate-pop-in"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="doodle-border doodle-shadow bg-paper p-3 transition-transform group-hover:-translate-y-1 group-hover:rotate-[-1deg]">
                <div className="aspect-square overflow-hidden border-2 border-ink bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900">
                  <img src={p.image} alt={p.name} className="h-full w-full object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-105" loading="lazy" width={1024} height={1024} />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <h3 className="font-display text-2xl">{p.name}</h3>
                  <span className="font-hand text-2xl">${p.price}</span>
                </div>
                <p className="font-hand text-lg text-muted-foreground">{p.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative bg-ink py-20 text-paper">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-center text-4xl md:text-5xl">How it goes down</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { n: "01", t: "Pick your icons", d: "Browse the doodle gallery and stack your favorite rappers." },
              { n: "02", t: "Spin or stack", d: "Spin the wheel for 5–15% off, or grab 3+ for an auto 5% discount." },
              { n: "03", t: "Stick & flex", d: "Strong magnets, hand-drawn vibes. Fridge, locker, toolbox — go nuts." },
            ].map((s, i) => (
              <div key={s.n} className="relative" style={{ transform: `rotate(${i % 2 ? 1 : -1}deg)` }}>
                <div className="doodle-border bg-paper p-6 text-ink">
                  <div className="font-display text-5xl text-muted-foreground">{s.n}</div>
                  <h3 className="font-display mt-2 text-2xl">{s.t}</h3>
                  <p className="mt-2 text-muted-foreground">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
