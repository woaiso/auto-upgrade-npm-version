
var path = require('path'),
  semver = require('semver'),
  exec = require('child_process').execSync,
  fs = require('fs');

/**
 * Get the current version from the package.json
 * @method getPackageVersion
 * @return {String} MAJOR.MINOR version
 */
function getPackageVersion() {
  var packageJson = path.join(process.cwd(), 'package.json'),
    version;
  try {
    version = require(packageJson).version;
  } catch (unused) {
    throw new Error('Could not load package.json, please make sure it exists');
  }

  if (!semver.valid(version)) {
    throw new Error('Invalid version number found in package.json, please make sure it is valid');
  }

  return [ semver.major(version), semver.minor(version), semver.patch(version) ].join('.');
}

/**
 * Updates the package.json with the new version number
 * @method writePackageVersion
 * @param  {String} newVersion New version string MAJOR.MINOR.PATCH
 */
function writePackageVersion(newVersion) {
  var packageJson = path.join(process.cwd(), 'package.json'),
    raw = require(packageJson);

  raw.version = newVersion;

  fs.writeFileSync(packageJson, JSON.stringify(raw, null, 2));
}

module.exports = function() {
  var baseVersion = getPackageVersion();
  console.log(baseVersion);
  var newVersion = semver.inc(baseVersion, "patch");
  writePackageVersion(newVersion);
}
