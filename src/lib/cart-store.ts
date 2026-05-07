import { useSyncExternalStore } from "react";
import { PRODUCTS, type Product } from "./products";

export type CartItem = { productId: string; qty: number };
export type CartState = {
  items: CartItem[];
  discountPct: number; // wheel discount
};

const STORAGE_KEY = "rapmagnets-cart-v1";

let state: CartState = load();
const listeners = new Set<() => void>();

function load(): CartState {
  if (typeof window === "undefined") return { items: [], discountPct: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as CartState;
  } catch {}
  return { items: [], discountPct: 0 };
}

function persist() {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

export const cartStore = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  getSnapshot(): CartState {
    return state;
  },
  getServerSnapshot(): CartState {
    return { items: [], discountPct: 0 };
  },
  add(productId: string) {
    const existing = state.items.find((i) => i.productId === productId);
    if (existing) {
      state = { ...state, items: state.items.map((i) => i.productId === productId ? { ...i, qty: i.qty + 1 } : i) };
    } else {
      state = { ...state, items: [...state.items, { productId, qty: 1 }] };
    }
    emit();
  },
  remove(productId: string) {
    state = { ...state, items: state.items.filter((i) => i.productId !== productId) };
    emit();
  },
  setQty(productId: string, qty: number) {
    if (qty <= 0) return cartStore.remove(productId);
    state = { ...state, items: state.items.map((i) => i.productId === productId ? { ...i, qty } : i) };
    emit();
  },
  clear() {
    state = { items: [], discountPct: 0 };
    emit();
  },
  setDiscount(pct: number) {
    state = { ...state, discountPct: pct };
    emit();
  },
};

export function useCart() {
  return useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);
}

export type CartLine = { product: Product; qty: number; lineTotal: number };

export function useCartTotals() {
  const cart = useCart();
  const lines: CartLine[] = cart.items
    .map((i) => {
      const product = PRODUCTS.find((p) => p.id === i.productId);
      if (!product) return null;
      return { product, qty: i.qty, lineTotal: product.price * i.qty };
    })
    .filter((x): x is CartLine => x !== null);

  const itemCount = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const bulkDiscountPct = itemCount > 2 ? 5 : 0;
  const wheelDiscountPct = cart.discountPct;
  const totalDiscountPct = bulkDiscountPct + wheelDiscountPct;
  const discountAmount = subtotal * (totalDiscountPct / 100);
  const total = Math.max(0, subtotal - discountAmount);

  return { lines, itemCount, subtotal, bulkDiscountPct, wheelDiscountPct, totalDiscountPct, discountAmount, total };
}