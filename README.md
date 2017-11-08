# Github Scraper

Aggregating data from repos of organizations. Makes good use of the [github](https://github.com/octokit/node-github) package.

## Features

* OAuth Authentication, to allow for increased limits to the GitHub API
* Support for organizations with higher than 100 repositories
* Support for repositories with higher than 100 watchers

## Setup

You will need at least Node v6 installed. I recommend [nvm](https://github.com/creationix/nvm#install-script) for the ease of installation and node version switching.

Once installed, you can simply:

```
npm i
```

## Usage

Find total of all open issues across an organization's public repositories.
```
AUTH_TOKEN=... ORG=adobe npm run start:issues
```

Find all public repositories belonging to an organization and order them by recently updated (descending)
```
AUTH_TOKEN=... ORG=adobe npm run start:update
```

Find the public repo with the most watchers in an organization. If multiple repos tie for the max count, all will be returned.
```
AUTH_TOKEN=... ORG=adobe npm run start:watchers
```

Or, run all of the above scripts.
```
AUTH_TOKEN=... ORG=adobe npm run start
```

## Environment Variables

 | Environment Variable | Description | Options |
 | -------------------- | ----------- | ------- |
 | `NODE_ENV` | Chooses which config file to load | `prod` would load file `config/prod.json` |
 | `ORG` | GitHub organization to query from | * |
 | `AUTH_TOKEN` | OAuth token for your GitHub account. Currently only needs `repo.public_repo` scope permission. See [this](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) for more info on that setup. | |
 | `DEBUG` | Enables debug logging. Any `debug(...)` calls now function. | `true` or `false` |
