
var path = require('path'),
  semver = require('semver'),
  exec = require('child_process').execSync,
  fs = require('fs'),
  packageJson = require('package-json');

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

function getPackageName() {
  var packageJson = path.join(process.cwd(), 'package.json'),
    name;
  try {
    name = require(packageJson).name;
  } catch (unused) {
    throw new Error('Could not load package.json, please make sure it exists');
  }
  return name;
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
  packageJson(getPackageName().toLowerCase(), { allVersions: true }).then(function(data) {
    console.log(data);
    var tags = data[ 'dist-tags' ];
    //get max versions
    var values = [];
    for (var key in tags) {
      values.push(tags[ key ]);
    }
    var remoteVersion = values.sort(semver.lt)[ 0 ];
    console.log('remote version：' + remoteVersion);
    var newVersion = semver.inc(remoteVersion, "patch");
    writePackageVersion(newVersion);
    console.log('new version：' + newVersion);
  })
}
