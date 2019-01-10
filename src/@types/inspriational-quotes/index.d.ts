declare module 'inspirational-quotes' {
  export interface IQuote {
    text: string;
    author: string;
  }

  export function getQuote(): IQuote;
}
