
/* UNION INTERSECTION ------------------------- */

declare type UnionToIntersection<U> = (
  U extends any
    ? (k: U) => void
    : never
) extends (k: infer I) => void ? I : never;

/* UNION OVERLOAD ----------------------------- */

declare type UnionToOvlds<U> = UnionToIntersection<U extends any? (f: U) => void : never>;

/* POP UNION ---------------------------------- */

declare type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;

/* UNION CONCAT ------------------------------- */

export type UnionConcat<U extends string, Sep extends string> = PopUnion<U> extends infer SELF
  ? SELF extends string
    ? Exclude<U, SELF> extends never
      ? SELF
      : | `${UnionConcat<Exclude<U, SELF>, Sep>}${Sep}${SELF}`
      | UnionConcat<Exclude<U, SELF>, Sep>
      | SELF
    : never
  : never;

/* COMPLETE VARIATION ------------------------- */

export type PickByValue<T, V> = Pick<T, {
  [K in keyof T]: T[K] extends V ? K : never }[keyof T]
>;

/* ENTRIES ------------------------------------ */

export type Entries<T> = {
  [K in keyof T]: [keyof PickByValue<T, T[K]>, T[K]];
}[keyof T][];

/* ENUM VALUES -------------------------------- */

type PrependNextNum<A extends Array<unknown>> = A['length'] extends infer T
  ? ((t: T, ...a: A) => void) extends (
    (...x: infer X) => void)
    ? X : never : never;

type EnumerateInternal<A extends Array<unknown>, N extends number> = {
  0: A, 1:
  EnumerateInternal<PrependNextNum<A>, N>
}[N extends A['length'] ? 0 : 1];

export type Enumerate<N extends number> = EnumerateInternal<[], N> extends (infer E)[]
  ? E
  : never;

export type Range<
  FROM extends number, TO extends number
> = Exclude<Enumerate<TO>, Enumerate<FROM>>;
