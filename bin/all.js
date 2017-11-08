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
  .then(allRepos => {
    debug(`Hi! You won't see this log message without DEBUG enabled.`);
    // Total issue count across org
    const filteredIssueRepos = repos.formatAllRepos(allRepos, repos.filtersForIssueCount);
    const totalIssues = repos.getOrgTotalIssues(filteredIssueRepos);
    console.log(`Total issue count across org:\n${JSON.stringify(totalIssues, null, '  ')}\n\n`);

    // Repos sorted by updated time, order descending
    const filteredUpdatedRepos = repos.formatAllRepos(allRepos, repos.filtersForPushedDate);
    const ordered = repos.orderByPushedDate(filteredUpdatedRepos);
    console.log(`Repos sorted by updated time, order descending:\n${JSON.stringify(ordered, null, '  ')}\n\n`);

    // Have to do it this way
    // See https://developer.github.com/changes/2012-09-05-watcher-api/
    return repos.requestAllRepos(repos.formatAllRepos(allRepos, repos.getReposFromResponse), github.repos.get);
  })
  .then(allReposWithSubscribers => {
    const watcherRepos = repos.filterRepos(allReposWithSubscribers, repoRes => repos.filterForWatchers(repoRes.data));
    const highestWatcherRepos = watchers.calculateHighestWatchers(watcherRepos);
    console.log(`Highest watcher count repo listing:\n${JSON.stringify(highestWatcherRepos, null, '  ')}\n\n`);
  })
