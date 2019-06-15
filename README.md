# @regru/[stylelint](https://stylelint.io/)-formatter-junit
> A junit formatter/reporter for [stylelint](https://stylelint.io/) that's display relative path instead of absolute and supports gitlab (classname field)

[![NPM Version](http://img.shields.io/npm/v/@regru/stylelint-formatter-junit.svg?style=flat)](https://npmjs.org/package/@regru/stylelint-formatter-junit)

## install

```bash
yarn add --dev @regru/stylelint-formatter-junit
```

## Usage

In the command line

```bash
# just make sure you pass the path to the module to the format option of stylelint
stylelint --custom-formatter './node_modules/@regru/stylelint-formatter-junit'
```
