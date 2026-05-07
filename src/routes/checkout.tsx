import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { cartStore, useCartTotals } from "@/lib/cart-store";
import { Star, Squiggle } from "@/components/doodle-decor";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — RapMagnets" },
      { name: "description", content: "Review your cart and check out securely with card or PayPal." },
    ],
  }),
  component: Checkout,
});

type PayMethod = "card" | "paypal";

function Checkout() {
  const { lines, itemCount, subtotal, bulkDiscountPct, wheelDiscountPct, totalDiscountPct, discountAmount, total } = useCartTotals();
  const [method, setMethod] = useState<PayMethod>("card");
  const [placed, setPlaced] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPlaced(true);
    setTimeout(() => cartStore.clear(), 200);
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="doodle-border doodle-shadow-lg bg-paper p-10 animate-pop-in">
          <div className="flex justify-center"><Star className="h-16 w-16 animate-wiggle fill-ink" /></div>
          <h1 className="font-display mt-4 text-5xl">Order placed!</h1>
          <p className="mt-3 text-lg">Your magnets are heading to the print queue. Confirmation on its way.</p>
          <Link to="/catalog" className="doodle-border-sm doodle-shadow-sm mt-8 inline-block bg-ink px-6 py-3 font-display text-xl text-paper hover-pop">
            Keep collecting →
          </Link>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-5xl">Your cart is empty</h1>
        <p className="mt-3 font-hand text-2xl text-muted-foreground">A naked fridge is a sad fridge.</p>
        <Link to="/catalog" className="doodle-border-sm doodle-shadow-sm mt-8 inline-block bg-ink px-6 py-3 font-display text-xl text-paper hover-pop">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-10">
        <span className="font-hand text-2xl -rotate-1 inline-block">final step</span>
        <h1 className="font-display mt-1 text-5xl md:text-6xl">Checkout</h1>
        <Squiggle className="mt-2 h-5 w-40 text-ink" />
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
        {/* LEFT: form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="doodle-border doodle-shadow bg-paper p-6">
            <h2 className="font-display text-3xl">Shipping</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Full name" name="name" required maxLength={100} />
              <Field label="Email" name="email" type="email" required maxLength={255} />
              <Field label="Address" name="address" required maxLength={200} className="md:col-span-2" />
              <Field label="City" name="city" required maxLength={100} />
              <Field label="ZIP / Postal code" name="zip" required maxLength={20} />
            </div>
          </section>

          <section className="doodle-border doodle-shadow bg-paper p-6">
            <h2 className="font-display text-3xl">Payment</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <PayOption active={method === "card"} onClick={() => setMethod("card")} label="Credit / Debit card" emoji="💳" />
              <PayOption active={method === "paypal"} onClick={() => setMethod("paypal")} label="PayPal" emoji="🅿️" />
            </div>

            {method === "card" && (
              <div className="mt-6 grid gap-4 animate-pop-in">
                <Field label="Card number" name="card" required maxLength={19} placeholder="1234 5678 9012 3456" inputMode="numeric" />
                <Field label="Name on card" name="cardName" required maxLength={100} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry (MM/YY)" name="exp" required maxLength={5} placeholder="12/27" />
                  <Field label="CVC" name="cvc" required maxLength={4} placeholder="123" inputMode="numeric" />
                </div>
              </div>
            )}

            {method === "paypal" && (
              <div className="mt-6 doodle-border-sm bg-paper p-5 text-center animate-pop-in">
                <p className="font-hand text-xl">You'll be redirected to PayPal to complete payment securely.</p>
              </div>
            )}
          </section>

          <button
            type="submit"
            className="doodle-border doodle-shadow w-full bg-ink py-4 font-display text-3xl text-paper hover-pop"
          >
            Place order — ${total.toFixed(2)}
          </button>
        </form>

        {/* RIGHT: summary */}
        <aside className="doodle-border doodle-shadow h-fit bg-paper p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-3xl">Your cart</h2>
          <ul className="mt-4 space-y-4">
            {lines.map((l) => (
              <li key={l.product.id} className="flex gap-3">
                <div className="h-16 w-16 shrink-0 overflow-hidden border-2 border-ink">
                  <img src={l.product.image} alt={l.product.name} className="h-full w-full object-cover" loading="lazy" width={1024} height={1024} />
                </div>
                <div className="flex-1">
                  <div className="font-display text-xl leading-tight">{l.product.name}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <button onClick={() => cartStore.setQty(l.product.id, l.qty - 1)} className="doodle-border-sm h-7 w-7 font-bold leading-none">−</button>
                    <span className="font-hand text-lg">{l.qty}</span>
                    <button onClick={() => cartStore.setQty(l.product.id, l.qty + 1)} className="doodle-border-sm h-7 w-7 font-bold leading-none">+</button>
                    <button onClick={() => cartStore.remove(l.product.id)} className="ml-auto text-sm text-muted-foreground underline">remove</button>
                  </div>
                </div>
                <div className="font-hand text-lg">${l.lineTotal.toFixed(2)}</div>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-2 border-t-2 border-dashed border-ink pt-4 text-base">
            <Row label={`Subtotal (${itemCount} item${itemCount === 1 ? "" : "s"})`} value={`$${subtotal.toFixed(2)}`} />
            {bulkDiscountPct > 0 && <Row label="Bulk discount (3+) −5%" value={`−$${(subtotal * 0.05).toFixed(2)}`} />}
            {wheelDiscountPct > 0 && <Row label={`Wheel discount −${wheelDiscountPct}%`} value={`−$${(subtotal * wheelDiscountPct / 100).toFixed(2)}`} />}
            <Row label="Shipping" value="Free" />
          </div>

          <div className="mt-4 flex items-baseline justify-between border-t-2 border-ink pt-3">
            <span className="font-display text-2xl">Total</span>
            <span className="font-display text-3xl">${total.toFixed(2)}</span>
          </div>

          {totalDiscountPct > 0 && (
            <div className="mt-3 doodle-border-sm bg-ink p-3 text-center text-paper">
              <span className="font-hand text-lg">You're saving {totalDiscountPct}% (${discountAmount.toFixed(2)})</span>
            </div>
          )}

          {wheelDiscountPct === 0 && (
            <Link to="/spin" className="mt-4 block text-center font-hand text-lg underline">
              Haven't spun the wheel? →
            </Link>
          )}
        </aside>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", required, maxLength, placeholder, inputMode, className = "" }: {
  label: string; name: string; type?: string; required?: boolean; maxLength?: number; placeholder?: string;
  inputMode?: "numeric" | "text" | "email"; className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="font-hand text-lg">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        inputMode={inputMode}
        className="doodle-border-sm bg-paper px-3 py-2 outline-none focus:doodle-shadow-sm"
      />
    </label>
  );
}

function PayOption({ active, onClick, label, emoji }: { active: boolean; onClick: () => void; label: string; emoji: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`doodle-border-sm flex items-center gap-3 px-4 py-3 text-left font-display text-xl transition-all ${active ? "bg-ink text-paper doodle-shadow-sm" : "bg-paper hover:-translate-y-0.5"}`}
    >
      <span className="text-2xl">{emoji}</span> {label}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
