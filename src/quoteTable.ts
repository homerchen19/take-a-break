import Table, { HorizontalTable } from 'cli-table3';

export default new Table({
  rowHeights: [2],
  style: { 'padding-left': 5, 'padding-right': 5 },
  chars: {
    'left-mid': '│',
    mid: ' ',
    'mid-mid': ' ',
    'right-mid': '│',
    middle: ' ',
  },
}) as HorizontalTable;
