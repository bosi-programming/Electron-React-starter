/**
 * Script for Adding Custom Environment Variables from `config` submodule
 * https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables#adding-development-environment-variables-in-env
 */
var config = require('config');
var fs = require('fs');
var pick = require('lodash/pick');
var revision = require('child_process');

// NOTE: Using tmpconfig.json instead of NODE_ENV to don't interfere on react-scripts
var defaultConfig = config.util.parseFile('config/default.json');
var envConfig = config.util.parseFile('tmpconfig.json');
var configObj = config.util.extendDeep(defaultConfig, envConfig);

// Pick the fields from config files the app needs to have access to
configObj = pick(configObj, [
  'api.patient',
  'api.base',
  'api.graphql',
  'api.embedded',
  'api.socket',
  'site.patient',
  'site.widgets',
  'site.next',
  'files.accept',
  'web.passwordMinimumLength',
  'broadcast.invalidTerms',
  'broadcast.offensiveWords',
  'googl.key_maps',
  'recaptcha.id',
  'podName',
  'looker.url',
  'logger.baseUrl',
  'logger.basicAuth.username',
  'logger.basicAuth.password',
]);
configObj.commitHash = revision
  .execSync('git rev-parse HEAD')
  .toString()
  .trim();

var prefix = 'REACT_APP';

function isCamelCase(str) {
  return !!str.match(/^[a-z]+[A-Z]/);
}

function camelToSnakeCase(str) {
  if (isCamelCase(str)) {
    return str.replace(/[A-Z]/g, '_$&');
  }
  return str;
}

function build(obj, key, stream) {
  var prefix = key ? key.toUpperCase() + '_' : '';
  if (typeof obj == 'string') {
    var exportString = prefix + camelToSnakeCase(key).toUpperCase() + '=' + obj + '\n';
    stream.write(exportString);
  } else if (Array.isArray(obj)) {
    var exportString = camelToSnakeCase(key).toUpperCase() + '=' + obj.join(',') + '\n';
    stream.write(exportString);
  } else {
    for (var k in obj) {
      if (typeof obj[k] == 'object') {
        build(obj[k], prefix + k, stream);
      } else {
        var exportString = prefix + camelToSnakeCase(k).toUpperCase() + '=' + obj[k] + '\n';
        stream.write(exportString);
      }
    }
  }
}

function configToEnv() {
  var stream = fs.createWriteStream('.env.local');
  build(configObj, prefix, stream);
}

module.exports = configToEnv();
