import { Questions } from 'inquirer';

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

export default questions;
