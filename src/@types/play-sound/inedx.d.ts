declare module 'play-sound' {
  export default function player(): IPlayer;

  type errorCallback = (err: string) => void;

  interface IPlayer {
    play: (filePath: string, option?: object | errorCallback) => void;
  }
}
