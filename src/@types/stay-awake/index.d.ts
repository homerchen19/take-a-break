declare module 'stay-awake' {
  export function prevent(cb: (err: string, data: any) => void): void;
  export function allow(cb: (err: string, data: any) => void): void;
}
