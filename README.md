auto-upgrade-npm-version
==========

this tool will help auto upgrade your package version on npm. it's helpfull on ci runner like gitlab-ci travis-ci

## Install


Get auto-upgrade-npm-version from [npm](https://www.npmjs.com/package/auto-upgrade-npm-version)

```
$ npm install -g auto-upgrade-npm-version
$ npm install --save-dev auto-upgrade-npm-version
```

This will install the runner as `auto-upgrade-npm-version`.

## Usage (CLI)

The CLI provides the following options:

```
auto-upgrade-npm-version
```

## Usage (Npm Scrips)

add prepublish

package.json
```
"scripts": {
    "prepublish": "auto-upgrade-npm-version"
  }
```
