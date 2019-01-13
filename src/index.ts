import path from 'path';
import inquirer from 'inquirer';
import Timer from 'tiny-timer';
import ora from 'ora';
import chalk from 'chalk';
import prettyMs from 'pretty-ms';
import Player from 'play-sound';
import stayAwake from 'stay-awake';

import questions from './questions';
import turnOffScreen from './turnOffScreen';

const player = Player();
const alarmFilePath: string = path.resolve(
  __dirname,
  './media/analog-watch.mp3'
);

const main = async () => {
  const timer = new Timer();
  const { time, other, turnOff } = await inquirer.prompt(questions);
  const minutes = time === -99 && other ? other : time;

  stayAwake.prevent(err => {
    if (err) {
      console.error(err);
    }
  });

  if (turnOff) {
    turnOffScreen();
  }

  console.log();
  console.log(chalk.bold.green('Time remaining: '));

  const duration: number = minutes * 60 * 1000;
  const spinner = ora({
    text: prettyMs(duration, { secDecimalDigits: 0 }),
    spinner: 'clock',
    interval: 80,
  }).start();

  timer.start(duration);

  timer.on('tick', currentTime => {
    spinner.text = prettyMs(currentTime, {
      secDecimalDigits: 0,
    });
  });

  timer.on(
    'done',
    (): void => {
      spinner.succeed(chalk.bold("Time's up"));
      console.log();

      player.play(alarmFilePath, err => {
        if (err) console.error(`Could not play sound: ${err}`);
      });

      stayAwake.allow(err => {
        if (err) {
          console.error(err);
        }
      });
    }
  );
};

export default main;
