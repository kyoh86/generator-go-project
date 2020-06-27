'use strict';

const Generator = require('../../lib/prompt_generator.js');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options, 'integration', ['name', 'author', 'description', 'type']);
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    this.fs.copy(
      this.templatePath('github/workflows/review.yml'),
      this.destinationPath('.github/workflows/review.yml')
    );
    this.fs.copy(
      this.templatePath('github/workflows/test.yml'),
      this.destinationPath('.github/workflows/test.yml')
    );
    this.fs.copy(
      this.templatePath('golangci.yml'),
      this.destinationPath('.golangci.yml')
    );
    if (this.props.type === 'CLI') {
      this.fs.copy(
        this.templatePath('github/workflows/release.yml'),
        this.destinationPath('.github/workflows/release.yml')
      );
      this.fs.copyTpl(
        this.templatePath('goreleaser.yml.ejs'),
        this.destinationPath('.goreleaser.yml'),
        this.props
      );
    }
  }
};
