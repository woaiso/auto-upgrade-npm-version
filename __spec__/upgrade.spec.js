/**
 * 测试拉取版本与转换测试
 */

var semver = require('semver'),
  path = require('path'),
  fs = require('fs'),
  lib = require('./../lib');
console.log = () => { };

var packageJsonResource = null;
beforeEach(() => {
  packageJsonResource = fs.readFileSync(path.join(process.cwd(), 'package.json'));
});

it('package name is auto-upgrade-npm-version', () => {
  expect(lib.getPackageName()).toEqual('auto-upgrade-npm-version');
});

it('package version is semver', () => {
  var packageJson = path.join(process.cwd(), 'package.json');
  version = require(packageJson).version;
  expect(lib.getPackageVersion()).toEqual(version);
  expect(semver.valid(lib.getPackageVersion())).toEqual(version);
});

it('write package version to 1.0.7', () => {
  var packageJson = path.join(process.cwd(), 'package.json');
  lib.writePackageVersion('1.0.7');
  var newVersion = require(packageJson).version;
  expect(newVersion).toEqual('1.0.7');
});

it('get remote version', (done) => {
  lib.getRemoteVersion((version) => {
    expect(semver.valid(version)).toEqual(version)
    done();
  })
})

it('upgrade version code', (done) => {
  lib.autoUpgrade((version) => {
    expect(semver.valid(version)).toEqual(version);
    done();
  });
});

it('package.json not found', () => {
  jest.resetModules();
  jest.mock(path.join(process.cwd(), 'package.json'), () => {
    return null;
  }, { virtual: true });
  expect(() => lib.getPackageVersion()).toThrow();
  expect(() => lib.getPackageName()).toThrow();
})

it('version is not valid', () => {
  jest.resetModules();
  jest.mock(path.join(process.cwd(), 'package.json'), () => {
    return {
      name: "auto-upgrade-npm-version",
      version: "null"
    }
  }, { virtual: true });
  expect(() => lib.getPackageVersion()).toThrow();
})

afterAll(() => {
  fs.writePackageVersion(path.join(process.cwd(), 'package.json'), packageJsonResource)
});
