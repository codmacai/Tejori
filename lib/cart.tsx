"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "./products";

export type CartLine = { productId: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  savings: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "tejori.bag.v2";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        setLines(parsed.filter((l) => getProduct(l.productId) && l.qty > 0));
      }
    } catch {
      /* storage unavailable — start empty */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, hydrated]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const add = useCallback((productId: string, qty = 1) => {
    setLines((prev) =>
      prev.some((l) => l.productId === productId)
        ? prev.map((l) => (l.productId === productId ? { ...l, qty: l.qty + qty } : l))
        : [...prev, { productId, qty }],
    );
    setIsOpen(true);
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.productId !== productId)
        : prev.map((l) => (l.productId === productId ? { ...l, qty } : l)),
    );
  }, []);

  const value = useMemo<CartContextValue>(() => {
    let subtotal = 0;
    let savings = 0;
    for (const l of lines) {
      const p = getProduct(l.productId)!;
      subtotal += p.price * l.qty;
      if (p.compareAt) savings += (p.compareAt - p.price) * l.qty;
    }
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal,
      savings,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      setQty,
    };
  }, [lines, isOpen, add, setQty]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
