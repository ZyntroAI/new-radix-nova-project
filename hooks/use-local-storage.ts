'use client';

// hooks/use-local-storage.ts — เก็บค่าใน localStorage ให้คงอยู่ข้ามรีเฟรช (v2.0.0)

import { useCallback, useEffect, useRef, useState } from 'react';

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initialValue;
    } catch (err) {
      console.warn(`[useLocalStorage] อ่านค่า "${key}" ไม่สำเร็จ`, err);
      return initialValue;
    }
  }, [key, initialValue]);

  const [stored, setStored] = useState<T>(readValue);
  const keyRef = useRef(key);
  keyRef.current = key;

  const setValue = useCallback<SetValue<T>>((value) => {
    setStored((prev) => {
      const next = typeof value === 'function' ? (value as (p: T) => T)(prev) : value;
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(keyRef.current, JSON.stringify(next));
        }
      } catch (err) {
        console.warn(`[useLocalStorage] เขียนค่า "${keyRef.current}" ไม่สำเร็จ`, err);
      }
      return next;
    });
  }, []);

  // sync เมื่อ key เปลี่ยน
  useEffect(() => {
    setStored(readValue());
  }, [readValue]);

  return [stored, setValue];
}
