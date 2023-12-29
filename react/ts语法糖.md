# ts 一些关键字
## omit
```ts
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```
## keyof
```ts
type Point = { x: number; y: number };
type P = keyof Point; // "x" | "y"
```
## Partial
```ts
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```
## Pick
```ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```