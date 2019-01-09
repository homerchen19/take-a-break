import inquirer, { Questions } from 'inquirer';

const questions: Questions = [
  {
    name: 'time',
    message: 'How long?',
    type: 'list',
    choices: ['5 mins', '10 mins', '15 mins', '20 mins', '30 mins', 'other'],
  },
  {
    name: 'other',
    message: 'How many minutes?',
    type: 'input',
    when: answers => answers.time === 'other',
    validate: input => {
      if (Number(input)) {
        return true;
      }

      return 'Please provide a number';
    },
  },
];
(async function() {
  const answers = await inquirer.prompt(questions);
  console.log(answers);
})().catch(() => console.error('oops, something wrong'));
