const _ = require('lodash');

const watchersKey = 'subscribers_count';
const nameKey = 'name';

const getFirstRepoWatcherCount = repoList =>
  _.get(_.head(repoList), watchersKey);

const getFirstRepoName = repoList =>
  _.get(_.head(repoList), nameKey);

const nameEqualCheck = (repo, repoList) =>
  _.eq(_.get(repo, nameKey), getFirstRepoName(repoList));

const nameEqual = (repo, repoList) =>
  ([repo]);

const countGreaterCheck = (repo, repoList) =>
  _.gt(_.get(repo, watchersKey), getFirstRepoWatcherCount(repoList));

const countGreater = (repo, repoList) =>
  ([repo]);

const countEqualCheck = (repo, repoList) =>
  _.eq(_.get(repo, watchersKey), getFirstRepoWatcherCount(repoList));

const countEqual = (repo, repoList) =>
  _.concat(repoList, repo)

const watcherDefault = (repo, repoList) =>
  (repoList);

const compareRepoWatcherCount =
  _.rearg(
    _.cond([
      [nameEqualCheck, nameEqual],
      [countGreaterCheck, countGreater],
      [countEqualCheck, countEqual],
      [_.stubTrue, watcherDefault]
    ]),
    [1, 0]);

const calculateHighestWatchers = repoList =>
  _.reduce(
    repoList,
    compareRepoWatcherCount,
    [_.head(repoList)]);

module.exports = {calculateHighestWatchers}
