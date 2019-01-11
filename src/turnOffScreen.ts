import Timer from 'tiny-timer';
import chalk from 'chalk';
import turnOffDisplay from 'turn-off-display';

const turnOffTimer = new Timer();
const turnOffDuration: number = 5000;

const turnOffScreen = (): void => {
  console.log();
  console.log(
    chalk.bgYellow.bold('The screens will be turn off in 5 seconds.')
  );
  console.log();

  turnOffTimer.start(turnOffDuration);

  turnOffTimer.on('done', () => {
    turnOffDisplay();
  });
};

export default turnOffScreen;
