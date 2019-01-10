import path from 'path';
import inquirer from 'inquirer';
import Timer from 'tiny-timer';
import ora from 'ora';
import chalk from 'chalk';
import prettyMs from 'pretty-ms';
import { getQuote } from 'inspirational-quotes';
import Player from 'play-sound';
import stayAwake from 'stay-awake';

import questions from './questions';
import turnOffScreen from './turnOffScreen';
import quoteTable from './quoteTable';

const player = Player();
const alarmFilePath = path.resolve(__dirname, './media/analog-watch.mp3');
(async function() {
  const timer = new Timer();
  const { time, other, device } = await inquirer.prompt(questions);
  const minutes = time === -99 && other ? other : time;

  stayAwake.prevent(err => {
    if (err) {
      console.error(err);
    }
  });

  switch (device) {
    case 'off': {
      turnOffScreen();

      break;
    }
    default:
    case 'no': {
      break;
    }
  }

  console.log();

  const duration = minutes * 10 * 1000;
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

  timer.on('done', () => {
    spinner.succeed(chalk.bold("Time's up"));

    player.play(alarmFilePath, err => {
      if (err) console.error(`Could not play sound: ${err}`);
    });

    const { text, author } = getQuote();

    quoteTable.push(
      [
        {
          content: `” ${text} ”`,
          hAlign: 'center',
          vAlign: 'center',
        },
      ],
      [
        {
          content: `- ${chalk.bold.italic(author)}`,
          hAlign: 'right',
        },
      ]
    );

    console.log();
    console.log(quoteTable.toString());
    console.log();
    console.log();

    stayAwake.allow(err => {
      if (err) {
        console.error(err);
      }
    });
  });
})().catch(() => console.error('oops, something wrong'));
