import { range } from "@hiogawa/utils";

export function difference<T>(lhs: T[], rhs: T[]): T[] {
  const exlucde = new Set(rhs);
  return lhs.filter((x) => !exlucde.has(x));
}

export function zip<T1, T2>(ls1: T1[], ls2: T2[]): [T1, T2][] {
  return range(Math.min(ls1.length, ls2.length)).map((i) => [ls1[i], ls2[i]]);
}

export function inRange(n: number, l: number, r: number): boolean {
  return l <= n && n < r;
}

export function mapKeys<K, V, K2>(
  map: Map<K, V>,
  f: (v: V, k: K) => K2
): Map<K2, V> {
  return new Map([...map].map(([k, v]) => [f(v, k), v]));
}

export function mapValues<K, V, V2>(
  map: Map<K, V>,
  f: (v: V, k: K) => V2
): Map<K, V2> {
  return new Map([...map].map(([k, v]) => [k, f(v, k)]));
}
