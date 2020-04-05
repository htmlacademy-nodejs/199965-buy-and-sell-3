'use strict';

const helpData = {
  '--version': `выводит номер версии`,
  '--help': `Список команд`,
  '--generate <count>': `формирует файл mocks.json`
};

module.exports = {
  name: `--help`,
  run() {
    console.log(`Команды`);
    Object.keys(helpData).forEach((command) => console.log(`${command}: ${helpData[command]}`));
  }
};
