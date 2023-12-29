# ts 一些关键字
## omit 作用: 从 T 中排除 K
```ts
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```
## keyof
```ts
type Point = { x: number; y: number };
type P = keyof Point; // "x" | "y"
```
## Partial 作用：将传入的属性变为可选
```ts
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```
## Pick 作用：从 T 中取出一系列 K 的属性
```ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```