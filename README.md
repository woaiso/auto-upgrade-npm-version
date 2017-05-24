auto-upgrade-npm-version
==========

[![Greenkeeper badge](https://badges.greenkeeper.io/woaiso/auto-upgrade-npm-version.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/woaiso/auto-upgrade-npm-version.svg?branch=master)](https://travis-ci.org/woaiso/auto-upgrade-npm-version) [![codecov](https://codecov.io/gh/woaiso/auto-upgrade-npm-version/branch/master/graph/badge.svg)](https://codecov.io/gh/woaiso/auto-upgrade-npm-version) [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![npm](https://img.shields.io/npm/v/auto-upgrade-npm-version.svg)]() ![](https://david-dm.org/woaiso/auto-upgrade-npm-version.svg)

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
