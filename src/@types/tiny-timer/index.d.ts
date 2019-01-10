declare module 'tiny-timer' {
  type Event = 'tick' | 'done' | 'statusChanged';

  export default class Timer {
    start(duration: number): void;
    on(event: Event, cb: (currentTime: number) => void): void;
  }
}
