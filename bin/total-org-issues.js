'use strict';

const config = require('config')

const debug = require('./../lib/debug');
const { github } = require('./../lib/setup');
const repos = require('./../lib/repo-data');

github.orgs.get({
  org: config.org,
  per_page: 100
})
  .then(res => repos.requestAllOrgRepos(res.data.public_repos, github.repos.getForOrg))
  .then(allRepos => {
    const filteredRepos = repos.formatAllRepos(allRepos, repos.filtersForIssueCount);
    const total = repos.getOrgTotalIssues(filteredRepos);
    console.log(JSON.stringify(total, null, '  '))
  })
