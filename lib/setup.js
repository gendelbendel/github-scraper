'use strict';

const GitHubApi = require('github');
const Promise = require('bluebird');

const config = require('config');

const github = new GitHubApi({
  debug: config.debug || false,
  Promise,
  timeout: config.githubApiTimeoutMilliseconds,
});

if(process.env.AUTH_TOKEN) {
  console.log('Authenticating via OAuth')
  github.authenticate({
    type: 'oauth',
    token: process.env.AUTH_TOKEN
  });
}
else {
  console.log(
`
-------------------------------------------------------------------------------
WARNING: Not authenticated via OAuth; only 60 github api requests per hour.
         Please run this command with your AUTH_TOKEN set.
         See https://developer.github.com/v3/#rate-limiting for more details.
-------------------------------------------------------------------------------\n`);
}

module.exports = {github}
