declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
declare type UnionToOvlds<U> = UnionToIntersection<U extends any ? (f: U) => void : never>;
declare type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;
export declare type UnionConcat<U extends string, Sep extends string> = PopUnion<U> extends infer SELF ? SELF extends string ? Exclude<U, SELF> extends never ? SELF : `${UnionConcat<Exclude<U, SELF>, Sep>}${Sep}${SELF}` | UnionConcat<Exclude<U, SELF>, Sep> | SELF : never : never;
export declare type PickByValue<T, V> = Pick<T, {
    [K in keyof T]: T[K] extends V ? K : never;
}[keyof T]>;
export declare type Entries<T> = {
    [K in keyof T]: [keyof PickByValue<T, T[K]>, T[K]];
}[keyof T][];
declare type PrependNextNum<A extends Array<unknown>> = A['length'] extends infer T ? ((t: T, ...a: A) => void) extends ((...x: infer X) => void) ? X : never : never;
declare type EnumerateInternal<A extends Array<unknown>, N extends number> = {
    0: A;
    1: EnumerateInternal<PrependNextNum<A>, N>;
}[N extends A['length'] ? 0 : 1];
export declare type Enumerate<N extends number> = EnumerateInternal<[], N> extends (infer E)[] ? E : never;
export declare type Range<FROM extends number, TO extends number> = Exclude<Enumerate<TO>, Enumerate<FROM>>;
export {};
