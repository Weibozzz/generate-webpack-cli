#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const path=require('path');
const {copyDir} = require('../utils/generate')
const {spinner} = require('../utils/spinner')

program
  .version(require('../package').version, '-V, --version')


program.on('--help', function() {
  console.log('')
  console.log('Please specify the project directory:')
  console.log('', chalk.blue('g-webpack-cli'), chalk.green('<project-directory>'))
  console.log('')
  console.log('For examples:');
  console.log('', chalk.blue('g-webpack-cli'), chalk.green('my-webpack-project'))
});

program.parse(process.argv);

/**
 * Help
 */
(function help () {
  if (program.args.length < 1) return program.help();
})()


spinner.start('Generating, please wait......');
const projectName = program.args[0]
const targetPath = path.resolve(__dirname, '../template/example')
copyDir(targetPath, projectName)
