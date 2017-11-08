'use strict';

const _ = require('lodash');
const config = require('config');
const Promise = require('bluebird');

const createOrgRequestData = page => ({
    org: config.org,
    per_page: 100,
    page: page+1
  });

const generateOrgRequestsData = totalRepos =>
  _.times(_.divide(_.ceil(totalRepos, -2), 100), createOrgRequestData);

const requestAll = (list, githubCall) =>
  Promise.map(
    list,
    data => githubCall(data),
    {concurrency: config.concurrentCalls});

const requestAllOrgRepos = (amount, githubCall) =>
  requestAll(generateOrgRequestsData(amount), githubCall);

const requestAllRepos = (repoList, githubCall) =>
  requestAll(repoList, githubCall);

const getRepoRequestData = repo => ({
    owner: config.org,
    repo: repo.name
  });

const getReposFromResponse = res =>
  _.map(res.data, repo => getRepoRequestData(repo));

const formatAllRepos = (res, filter) =>
  _.flatten(_.map(res, filter));

const filtersForPushedDate = res =>
  _.map(res.data, filterForPushedDate);

const filtersForIssueCount = res =>
  _.map(res.data, filterForIssueCount)

const filterRepos = (repoList, repoFilter) =>
  _.map(repoList, repoFilter)

const filterForWatchers = repo => ({
    name: repo.name,
    subscribers_count: repo.subscribers_count,
    url: repo.html_url
  });

const filterForPushedDate = repo => ({
    name: repo.name,
    pushed_at: repo.pushed_at,
    url: repo.html_url
  });

const filterForIssueCount = repo => ({
    name: repo.name,
    open_issues_count: repo.open_issues_count,
    url: repo.html_url
  });

const orderByPushedDate = repoList =>
  _.orderBy(repoList, ['pushed_at'], 'desc' );

const getOrgTotalIssues = repoList =>
  _.reduce(repoList, sumTotalOpenIssues, { total_open_issues: 0 });

const sumTotalOpenIssues = (sum, repo) =>
  _.set(sum, 'total_open_issues', sum.total_open_issues + repo.open_issues_count)

module.exports = {
  requestAll,
  requestAllOrgRepos,
  requestAllRepos,
  getRepoRequestData,
  getReposFromResponse,
  formatAllRepos,
  filtersForPushedDate,
  filtersForIssueCount,
  filterRepos,
  filterForWatchers,
  filterForPushedDate,
  filterForIssueCount,
  orderByPushedDate,
  getOrgTotalIssues
}
