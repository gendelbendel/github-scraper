'use strict';

const config = require('config')

const debug = require('./../lib/debug');
const { github } = require('./../lib/setup');
const repos = require('./../lib/repo-data');
const watchers = require('./../lib/watchers');

github.orgs.get({
  org: config.org,
  per_page: 100
})
  .then(res => repos.requestAllOrgRepos(res.data.public_repos, github.repos.getForOrg))
  .then(allRepos => 
    // Have to do it this way
    // See https://developer.github.com/changes/2012-09-05-watcher-api/
    repos.requestAllRepos(repos.formatAllRepos(allRepos, repos.getReposFromResponse), github.repos.get))
  .then(allReposWithSubscribers => {
    const watcherRepos = repos.filterRepos(allReposWithSubscribers, repoRes => repos.filterForWatchers(repoRes.data));
    const highestWatcherRepos = watchers.calculateHighestWatchers(watcherRepos);
    console.log(JSON.stringify(highestWatcherRepos, null, '  '));
  })
