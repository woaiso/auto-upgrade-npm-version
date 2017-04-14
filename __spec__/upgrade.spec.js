/**
 * 测试拉取版本与转换测试
 */

var semver = require('semver'),
  path = require('path'),
  lib = require('./../lib');
console.log = () => { };

it('package name is auto-upgrade-npm-version', () => {
  expect(lib.getPackageName()).toEqual('auto-upgrade-npm-version');
});

it('package version is semver', () => {
  var packageJson = path.join(process.cwd(), 'package.json');
  version = require(packageJson).version;
  expect(lib.getPackageVersion()).toEqual(version);
  expect(semver.valid(lib.getPackageVersion())).toEqual(version)
})

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
