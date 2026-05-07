import { Link, useRouterState } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { useCartTotals } from "@/lib/cart-store";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Catalog" },
  { to: "/spin", label: "Spin & Win" },
  { to: "/info", label: "Info" },
] as const;

export function SiteHeader() {
  const { itemCount } = useCartTotals();
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 paper-bg border-b-[3px] border-ink">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 hover-pop">
          <img src={logo} alt="RapMagnets logo" className="h-12 w-auto" width={120} height={120} />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((n) => {
            const active = path === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`font-display text-2xl transition-transform hover:-translate-y-0.5 hover:rotate-[-2deg] ${active ? "underline-squiggle" : ""}`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/checkout"
          className="doodle-border doodle-shadow-sm relative bg-paper px-4 py-2 font-display text-xl hover-pop"
        >
          Cart
          {itemCount > 0 && (
            <span className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-ink px-1.5 text-sm font-bold text-paper">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
      {/* Mobile nav */}
      <nav className="flex items-center justify-around gap-2 border-t-2 border-ink px-2 py-2 md:hidden">
        {NAV.map((n) => (
          <Link key={n.to} to={n.to} className="font-display text-lg">{n.label}</Link>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t-[3px] border-ink bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center">
        <p className="font-hand text-2xl">Stuck on your fridge. Stuck in your head.</p>
        <p className="mt-2 text-sm text-muted-foreground">© {new Date().getFullYear()} RapMagnets — Hand-doodled with love.</p>
      </div>
    </footer>
  );
}

// Tailwind needs a real class for ink color since it's a custom var
// We add a small helper class set