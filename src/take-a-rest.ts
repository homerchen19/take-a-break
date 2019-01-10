import path from 'path';
import inquirer, { Questions } from 'inquirer';
import turnOffDisplay from 'turn-off-display';
import Timer from 'tiny-timer';
import ora from 'ora';
import chalk from 'chalk';
import prettyMs from 'pretty-ms';
import { getQuote } from 'inspirational-quotes';
import Player from 'play-sound';

import quoteTable from './quoteTable';

const player = Player();
const alarmFilePath = path.resolve(__dirname, './media/analog-watch.mp3');

interface Answers {
  time: number;
  other: number;
  device: string;
}

const questions: Questions<Answers> = [
  {
    name: 'time',
    message: 'How long?',
    type: 'list',
    default: 2,
    choices: [
      { name: '5 mins', value: 5 },
      { name: '10 mins', value: 10 },
      { name: '15 mins', value: 15 },
      { name: '20 mins', value: 20 },
      { name: '30 mins', value: 30 },
      { name: 'other', value: -99 },
    ],
  },
  {
    name: 'other',
    message: 'How many minutes?',
    type: 'input',
    when: (answers: Answers): boolean => answers.time === -99,
    validate: (input: string): boolean | string => {
      if (Number(input) && Number(input) > 0) {
        return true;
      }

      return 'Please provide a positive number';
    },
    filter: (input: string): number => {
      return Number(input);
    },
  },
  {
    name: 'device',
    message: 'Turn off the screen or put your device on sleep mode?',
    type: 'list',
    choices: [
      { name: 'Turn off the screen', value: 'off' },
      { name: 'Sleep mode', value: 'sleep' },
      { name: 'No thanks', value: 'no' },
    ],
  },
];
(async function() {
  const timer = new Timer();
  const { time, other, device } = await inquirer.prompt(questions);
  const minutes = time === -99 && other ? other : time;

  switch (device) {
    case 'off': {
      turnOffDisplay();
      break;
    }
    case 'sleep': {
      break;
    }
    default:
    case 'no': {
      break;
    }
  }

  const duration = minutes * 60 * 1000;

  console.log();

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
  });
})().catch(() => console.error('oops, something wrong'));
