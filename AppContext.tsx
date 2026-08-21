import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { CARS } from '@/data';
import type { Car } from '@/types';

const WISHLIST_KEY = 'autoempire_wishlist';
const COMPARE_KEY = 'autoempire_compare';
const ADMIN_KEY = 'autoempire_admin';

interface AppContextValue {
  cars: Car[];
  setCars: (cars: Car[]) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  compareList: string[];
  toggleCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  isAdmin: boolean;
  loginAdmin: (email: string, password: string) => boolean;
  logoutAdmin: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function readStorage(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [cars, setCarsState] = useState<Car[]>(CARS);
  const [wishlist, setWishlist] = useState<string[]>(() => readStorage(WISHLIST_KEY));
  const [compareList, setCompareList] = useState<string[]>(() => readStorage(COMPARE_KEY));
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch {
      /* ignore */
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(COMPARE_KEY, JSON.stringify(compareList));
    } catch {
      /* ignore */
    }
  }, [compareList]);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const isWishlisted = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const toggleCompare = useCallback((id: string) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  }, []);

  const isInCompare = useCallback((id: string) => compareList.includes(id), [compareList]);

  const setCars = useCallback((next: Car[]) => setCarsState(next), []);

  const loginAdmin = useCallback((email: string, password: string) => {
    if (email === 'admin@autoempire.com' && password === 'Admin@123') {
      setIsAdmin(true);
      try {
        localStorage.setItem(ADMIN_KEY, 'true');
      } catch {
        /* ignore */
      }
      return true;
    }
    return false;
  }, []);

  const logoutAdmin = useCallback(() => {
    setIsAdmin(false);
    try {
      localStorage.removeItem(ADMIN_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      cars,
      setCars,
      wishlist,
      toggleWishlist,
      isWishlisted,
      compareList,
      toggleCompare,
      isInCompare,
      isAdmin,
      loginAdmin,
      logoutAdmin,
    }),
    [cars, setCars, wishlist, toggleWishlist, isWishlisted, compareList, toggleCompare, isInCompare, isAdmin, loginAdmin, logoutAdmin]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
