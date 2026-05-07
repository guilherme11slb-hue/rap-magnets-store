import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Squiggle, MusicNote, Magnet } from "@/components/doodle-decor";

export const Route = createFileRoute("/info")({
  head: () => ({
    meta: [
      { title: "Info & Contact — RapMagnets" },
      { name: "description", content: "About RapMagnets, shipping, returns, and how to get in touch with our doodle crew." },
    ],
  }),
  component: Info,
});

const FAQS = [
  { q: "What are the magnets made of?", a: "Heavyweight matte cardstock printed with archival ink, mounted on a 1mm flexible neodymium magnet sheet. They hold up to 5 sheets of paper." },
  { q: "How long does shipping take?", a: "USA: 3–5 business days. International: 7–14 business days. Tracking is included on every order." },
  { q: "Can I return a magnet?", a: "Of course. Within 30 days, unopened, free returns in the US. Just email us." },
  { q: "Do you do custom doodles?", a: "Yes! Email us with the rapper you want immortalized — we drop new ones every month based on requests." },
];

function Info() {
  const [open, setOpen] = useState<number | null>(0);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <header className="relative mb-12">
        <span className="font-hand text-2xl -rotate-2 inline-block">the story →</span>
        <h1 className="font-display mt-1 text-5xl md:text-6xl">About RapMagnets</h1>
        <Squiggle className="mt-3 h-5 w-48 text-ink" />
      </header>

      <section className="grid gap-10 md:grid-cols-2">
        <div className="doodle-border doodle-shadow bg-paper p-6 relative">
          <MusicNote className="absolute -right-4 -top-4 h-12 w-12 animate-wiggle text-ink" />
          <h2 className="font-display text-3xl">Our story</h2>
          <p className="mt-3 leading-relaxed">
            RapMagnets started in a tiny apartment with a stack of sketchbooks, a Sharpie collection,
            and a fridge that needed personality. We doodle the rappers we love and stick them where
            we (and you) can see them every day.
          </p>
          <p className="mt-3 leading-relaxed">
            Every magnet is drawn by hand first — no AI portrait generators, no traced photos — then
            digitized, printed, and shipped from our studio.
          </p>
        </div>

        <div className="doodle-border doodle-shadow bg-ink text-paper p-6 relative">
          <Magnet className="absolute -right-4 -top-4 h-12 w-12 animate-wiggle text-paper" />
          <h2 className="font-display text-3xl">The fine print</h2>
          <ul className="mt-3 space-y-2 leading-relaxed">
            <li>📦 Free US shipping on orders over $25</li>
            <li>🌍 We ship worldwide</li>
            <li>🔄 30-day returns, no questions asked</li>
            <li>♻️ Recyclable paper-based packaging</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-16">
        <h2 className="font-display text-4xl">Frequently asked stuff</h2>
        <div className="mt-6 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="doodle-border-sm bg-paper">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display text-xl">{f.q}</span>
                  <span className={`font-display text-3xl transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                {isOpen && (
                  <div className="border-t-2 border-ink px-5 py-4 leading-relaxed animate-pop-in">{f.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact */}
      <section className="mt-16">
        <h2 className="font-display text-4xl">Holler at us</h2>
        <p className="mt-2 text-muted-foreground">Questions, custom requests, wholesale — we read every email.</p>

        <form onSubmit={handleSubmit} className="doodle-border doodle-shadow mt-6 grid gap-4 bg-paper p-6 md:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="font-hand text-lg">Your name</span>
            <input required maxLength={100} className="doodle-border-sm bg-paper px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-hand text-lg">Email</span>
            <input required type="email" maxLength={255} className="doodle-border-sm bg-paper px-3 py-2" />
          </label>
          <label className="md:col-span-2 flex flex-col gap-1">
            <span className="font-hand text-lg">Message</span>
            <textarea required maxLength={1000} rows={4} className="doodle-border-sm bg-paper px-3 py-2" />
          </label>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={sent}
              className="doodle-border-sm doodle-shadow-sm bg-ink px-6 py-2.5 font-display text-xl text-paper hover-pop disabled:opacity-60"
            >
              {sent ? "Sent! We'll reply soon ✓" : "Send message"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
