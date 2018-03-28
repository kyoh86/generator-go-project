'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const optionalPrompt = require('../lib/optional.js');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
    const requires = ['project_name', 'author'];
    this.asks = [];
    requires.forEach(n => {
      const Ask = require('../lib/ask/' + n + '.js');
      this.asks.push(new Ask(this));
    });
  }

  prompting() {
    // Have Yeoman greet the user.
    if (!this.options.silent) {
      let name = chalk.red('generator-go-project/circleci');
      this.log(yosay(`Welcome to the funkadelic ${name} generator!`));
    }
    return optionalPrompt(this).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('circleci/circleci.yml.ejs'),
      this.destinationPath('.circleci/config.yml'),
      this.props
    );
  }
};
