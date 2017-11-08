'use strict';

const config = require('config');

const debug = require('./../lib/debug');
const { github } = require('./../lib/setup');
const repos = require('./../lib/repo-data');

github.orgs.get({
  org: config.org,
  per_page: 100
})
  .then(res => repos.requestAllOrgRepos(res.data.public_repos, github.repos.getForOrg))
  .then(allRepos => {
    const filteredRepos = repos.formatAllRepos(allRepos, repos.filtersForPushedDate);
    const ordered = repos.orderByPushedDate(filteredIssueRepos);
    console.log(JSON.stringify(ordered, null, '  '))
  })
