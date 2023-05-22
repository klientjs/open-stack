# Klient OpenStack

![badge-coverage](.github/badges/coverage.svg)

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
  * [Stack](#stack)
  * [Contributions](#contributions)
    + [Issues and PR](#issues-and-pr)
    + [Git hooks](#git-hooks)
    + [Guides](#guides)
- [Maintainability](#maintainability)
  * [Stack](#stack-1)
  * [Github actions](#github-actions)
    + [Code analysis](#code-analysis)
    + [Create a new tag and Github release](#create-a-new-tag-and-github-release)
    + [Publish a tag to NPM registry](#publish-a-tag-to-npm-registry)
    + [Dangerously unpublish a tag from NPM registry](#dangerously-unpublish-a-tag-from-npm-registry)
    + [Update package dependencies](#update-package-dependencies)
    + [Update OpenStack template files](#update-openstack-template-files)
    + [Auto cleanup PR caches](#auto-cleanup-pr-caches)
- [Common questions](#common-questions)
  * [How to change default node version used by Github actions](#how-to-change-default-node-version-used-by-github-actions)
  * [How to change default registry url used by Github actions](#how-to-change-default-registry-url-used-by-github-actions)
  * [How to enable dependencies caching in Github actions](#how-to-enable-dependencies-caching-in-github-actions)
  * [How to install react for making web app](#how-to-install-react-for-making-web-app)

## Introduction

This repository is a Typescript template designed for creating JS open source projects hosted on Github, including all the necessary tools for development, maintenance, and publishing a package to an NPM registry. With pre-configured Github actions, issue/PR templates, you can easily manage the entire workflow of your project using the best practices known to date.

**Features**
 - Start with an open-source repository containing an MIT license, a [code of conduct](./CODE_OF_CONDUCT.md), a [contribution guide](./CONTRIBUTING.md), based on good practices.
 - Produce clean code with [Typescript (es6)](https://www.typescriptlang.org/), [Prettier](https://prettier.io/), [ESLint](https://eslint.org/) ([Airbnb rules](https://www.npmjs.com/package/eslint-config-airbnb)), and [Jest](https://jestjs.io/). All pre-configured.
 - Maintain a clean commit history by using [Coventional commit naming rules](https://www.conventionalcommits.org/).
 - Use git hooks for checking added files and lint commit message before commit with [husky](https://github.com/typicode/husky)
 - Make your package compatible with CommonJS and ES modules.
 - Begin with complete CI tests applied to every commit, runnable on all Node versions.
 - Create any release+tag using [Release-It](https://github.com/release-it/release-it) with an automatically generated changelog, directly from the [Github Actions](https://github.com/features/actions) interface (with pre-release support : alpha, beta, RC).
 - Publish/unpublish a package version to NPM Registry, directly from the [Github Actions](https://github.com/features/actions) interface.
 - Update your dependencies with [npm-check-updates](https://github.com/raineorshine/npm-check-updates), directly from the [Github Actions](https://github.com/features/actions) interface.
 - Upgrade to next open-stack version by using open-stack cli, directly from the [Github Actions](https://github.com/features/actions) interface.
 - Fast Github actions with dependencies cache management.
 - Take advantage of included [issue templates](#issues) & [PR template](#pull-request) adapted for JS projects.
 - Display a code coverage badge (no Gist or Github page required).
 - Adjust the repository defaults to suit your needs.
 - Use all features with [Github Free](https://github.com/pricing).

## Installation

1. **Duplicate repository**

    This repository is a repository template, which means that you can duplicate it from the Github interface. This will copy the files and the structure, creating only one commit (the initial commit). ([see documentation](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)). Alternatively, you can directly [use open-stack-cli for create new project](https://github.com/klientjs/open-stack-cli#create). The create command will configure your project as described on 2.b, that means you can directly go to 3. if you create project with cli.
    &nbsp;

2. **Update stack files**

    a) Clone project or open a codespace on main branch.
    
    b) run `npm install` and then `npm run configure`

    c) Commit your changes (with commit message like `chore(stack): configure`)
    &nbsp;

3. **Configure Github repository for [creating release and tag](#create-a-new-tag-and-github-release)**

    Go to your repository Settings > Actions > General > Workflow permissions > Enable `GITHUB_TOKEN` read and write permissions. ([see documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#setting-the-permissions-of-the-github_token-for-your-repository)). We strongly recommand you to configure also a personnal access token and set it in repository Settings > Secrets and variables > Actions > Secrets > New repository secret, and define the secret `PAT` (containing the generated PAT) ([see documentation](https://docs.github.com/en/authentication/.keeping-your-account-and-data-secure/creating-a-personal-access-token)).
    &nbsp;

4. **Configure Github repository for [publishing package](#publish-a-tag-to-npm-registry)**

    a) Go to your NPM registry and create a token with authorized publish action. ([See documentation](https://docs.npmjs.com/creating-and-viewing-access-tokens))

    b) Go to your repository Settings > Secrets and variables > Actions > Secrets > New repository secret, and define the secret `NPM_TOKEN` with the token you have configured. ([see documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets))

All is configured to start development, validate code in CI, create Github release and tag, and then publish versions of your package just with Github actions !

## Usage

```shell
#
# <--- CREATE NEW PROJECT WITH CLI --->
#

# Install open-stack-cli globally
$ npm install -g @klient/open-stack-cli

# Create new project based on open-stack template
$ npx open-stack create my-project




#
# <--- CREATE NEW PROJECT WITH CLONE --->
#

# Clone open-stack repository
$ git clone https://github.com/klientjs/open-stack.git my-project && cd my-project

# Reset git history and create initial commit
$ rm -rf .git && git init && git add . && git commit -m "initial commit"

# Install project dependencies (including open-stack cli)
$ npm install

# Remove open-stack content and initialize files for your project (this is using cli)
# It will ask you few questions for initializing files. This script will be removed automatically.
$ npm run configure

# Commit changes, it will run commit checks (see git hooks below)
$ git add . && git commit -m "chore(stack): configure"




#
# <--- OPTIONALLY INSTALL AND CONFIGURE EXTERNAL LIBS (experimental) --->
#

# Initialize a web application project based on React library (using react-scripts)
# (Should be run in a fresh blank project, after npm run configure, see open-stack-cli doc)
$ npx open-stack setup react-app

# Commit changes related to react-app setup step
$ git add . && git commit -m "chore(stack): setup react-app"

# Then, work with commands provided by react-scripts
$ npm run start
$ npm run build
$ npm run test
$ npm run eject




#
# <--- INCLUDED SCRIPTS --->
#

# [ANALYZE CODE]
#
# These commands are used to validate code in CI and in git hooks
#
$ npm run prettier
$ npm run lint
$ npm test
#
# Alternatively
# npm run check


# [FIX CODE]
#
# Fix your files as much as possible with prettier and eslint
# (Following commands MUST be lunched before every git commit !)
#
$ npm run prettier:fix
$ npm run lint:fix
$ npm test
#
# Alternatively
# npm run pre-commit


# [BUILD CODE]
#
# Build dist files with tsc (with targets CommonJS & ESModule)
# It will create final typescript and javacript content in separated files.
#
$ npm run dist:cjs
$ npm run dist:esm
#
# Alternatively
# npm run dist


# [RELEASE CODE]
#
# Release a new version of your project using Release-it, this will :
#   - run project test suites
#   - update coverage badge using npm run coverage:badge
#   - build the dist folder using npm run dist
#   - update package.json according to version type specified
#   - create or update a changelog file
#   - commit changes
#   - create a new tag on previous commit
#   - push and then create Github release
# (Can be used directly from Gihub actions)
#
$ npm run release -- --increment=minor


# [UPDATE DEPENDENCIES]
#
# Update project dependencies using npm-check-updates
# The following command will attempts to update 
# each dependencies and check validity by running tests before and after update.
# (Can be used directly from Gihub actions, changes are submitted in a PR)
#
$ npm run update:dependencies -- --target=minor --doctor --upgrade


# [UPDATE OPEN-STACK FILES]
#
# Update open-stack files by sync changes with specified version (updated by cli)
# (Can be used directly from Gihub actions, changes are submitted in a PR)
#
$ npm run update:open-stack -- --to=1.5.0 --verbose --report update_report.md


# [OPEN TEST COVERAGE REPORT]
#
# Open html coverage report in a browser using "open" binary (must be locally available)
#
$ npm run coverage:open
#
# Alternatively, you can expose http port using http-server for consulting html report
# It's useful if you are using distant environment such as codespace
#
$ npm run coverage:serve -- --port 8888


# [CREATE COVERAGE BADGE]
#
# Create the coverage badge based on report generated on last npm test (generated by cli)
# (Mainly used for release process)
$ npm run coverage:badge
```

## Development

### Stack

- [Typescript (es6)](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/) (based on [Airbnb rules](https://www.npmjs.com/package/eslint-config-airbnb))
- [Jest](https://jestjs.io/)

### Contributions

To take full advantage of all the features offered by this repository, you must follow the conventions adopted by it. This mainly happens during development, using commit messages based on [Angular commit naming rules](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits). With this specific formatting, automatic management of a beautiful changelog is made possible. We recommend that you use these rules as much as possible, to make the most complete changelog for each release.

#### Issues and PR

This repository includes 4 predefined issue templates (inspired from [axios](https://github.com/axios/axios) repository), allowing the community to help you in the development of your package :

 - [Bug report](./.github/ISSUE_TEMPLATE/1_Bug_report.yaml)
 - [Feature request](./.github/ISSUE_TEMPLATE/2_Feature_request.yaml)
 - [Documentation clarification request](./.github/ISSUE_TEMPLATE/3_Documentation.yaml)
 - [Help request](./.github/ISSUE_TEMPLATE/4_Help.yaml)

All of these templates are defined with fields that are useful for JavaScript projects (such as the version of the used browser, for example).

This repository also contains a [simple PR template](./.github/PULL_REQUEST_TEMPLATE.md) useful to get dev context related to a PR.

You are free to add, modify or delete these templates as you need (see [github](./.github) folder).

#### Git hooks

By default, 2 git hooks are setup by Husky package when "npm install" is launched : one for testing code changes, and another for lint commit message. It can be disabled on need. See [husky](https://github.com/typicode/husky) documentation for more informations.

```shell
# Clone a project based on open-stack template
$ git clone https://github.com/klientjs/example.git && cd example

# Just install, it will initialize git hooks with Husky
$ npm install

# ... Make changes in your IDE ...
#
# Commit your changes. By using git hooks, this will :
#   - check files with eslint, prettier and Jest
#   - check commit message using @commitlint/config-conventional
#
$ git add . && git commit -m "feat: change the world just with code"
```

#### Guides

- [Contribution guide](./CONTRIBUTING.md)
- [Code of conduct](./CODE_OF_CONDUCT.md)

## Maintainability

This repository comes with a pre-defined Github config based on current best practices for node package management. You can quickly start developing a project while following efficient workflows to produce the best possible code. The Github actions included in this template will allow you to manage the whole lifecycle of your project as below :

```
Stable version  >  Development  >  Testing  >  Release  >  Publication
```

All of these steps are managed by Github actions, which means that you will only have to click a few buttons to trigger the creation of a new release, as well as its publication.

### Stack

- [husky](https://github.com/typicode/husky)
- [release-it](https://github.com/release-it/release-it)
- [npm-check-updates](https://github.com/raineorshine/npm-check-updates)
- [open-stack-cli](https://github.com/klientjs/open-stack-cli.git)

### Github actions

The Github actions mentioned below will allow you to manage your package's entire workflow, from development to publication. They should be naturally launched in the order in which they are defined below :

1. PR are submitted and [automatically tested in CI jobs](#code-analysis) (all commits).
2. Your main branch is ahead by several commits and you want to [release a new version of your code](#create-a-new-github-tag-and-release).
3. You [publish your new revision](#publish-a-tag-to-npm-registry) (created in the previous step) to NPM registry.

*You can find following actions in "Actions" tab of your repository.*

&nbsp;
&nbsp;

#### Code analysis
---

This action is launched on every commit to validate if pushed code is valid regardless of project standard :

- *npm run lint* : Run check with ESLint
- *npm run prettier* : Run check with Prettier
- *npm run test* : Run tests with Jest
- *npm run dist* : Try to compile dist files

Note that `npm audit` is run but the process will continue even if audit is not satisfying.

**Events**
  - `push`
  - `pull_request` (reopened)
  - `workflow_dispatch` (manual run)

**Available options**
  - Node version

&nbsp;

#### Create a new tag and Github release
---

This action should be launched when you have decided to release a new version of your code. It will have the following effects :

- Test the code one last time
- Modify the version of your package in the package.json file, according to specified release type.
- Automatically create or update a CHANGELOG file based on your commit history.
- Compile the src files to the dist folder.
- Update the code coverage badge.
- Push all modifications on selected branch with a commit specifically designed for previous updates.
- Create a tag on the last previously created commit.
- Create a Github release containing the same information added to the changelog file for the previously created tag.

**Events**
  - `workflow_dispatch` (manual run)

**Available options**
  - Release type : patch | minor | major *[required]*
  - Pre release : alpha | beta | rc
  - Npm audit : y/n
  - Dry mode : y/n
  - Node version

&nbsp;

#### Publish a tag to NPM registry
---

This action should be launched when you want to publish a release on the NPM registry. You do not need to specify the version to publish as it will be extracted from the package.json of the selected branch. Therefore, we recommend always selecting a tag rather than a branch to launch this action. The publication takes place in several steps:

- Publication using "npm publish"
- Attempting to install the published version in a blank project.

**Events**
  - `workflow_dispatch` (manual run)

**Available options**
  - NPM tag : latest | alpha | beta | rc *[required]*
  - Dry mode : y/n
  - Node version

&nbsp;

#### Dangerously unpublish a tag from NPM registry
---

If you launch this action, your package will be unpublished from the NPM registry. Be careful because the unpublished version will probably **never be able to be republished**. Therefore, use this action only in cases of extreme necessity.

**Events**
  - `workflow_dispatch` (manual run)

**Available options**
  - The target version *[required]*
  - Dry mode : y/n
  - Node version

&nbsp;

#### Update package dependencies
---

This action allows you to manage updates of your project's dependencies using [npm-check-updates](https://github.com/raineorshine/npm-check-updates). The changes made on package.json will be committed to a branch named `actions/dependencies-update` with an uniq pull request, updated if already exists. 

The "dry" mode allows you to simulate multiple version update scenarios. When you are satisfied, relaunch the action with same options but with dry mode disabled. Then, you can check the PR and merge it.

If doctor mode is enabled, tests are run before and after the update to ensure that everything has gone smoothly. If not, npm-check-updates will attempt to update each dependency to identify which ones are problematic. It will still submit a PR with the dependencies that are updatable. The packages in failure state are listed in the job output.

*You can make this process auto by configuring `schedule` event in [workflow file](./.github/workflows/dependencies.yml#L5).*

**Events**
  - `workflow_dispatch` (manual run)

**Available options**
  - Target versions (--target) *[required]*
  - Dependencies section (--dep) 
  - Filter package pattern (--filter) 
  - Reject package pattern (--reject)
  - Doctor mode (--doctor)
  - Npm audit : y/n
  - Dry mode : y/n (do not commit and open PR)
  - Node version

See [npm-check-update options documentation](https://github.com/raineorshine/npm-check-updates#options)

&nbsp;

#### Update OpenStack template files
---

This action will allow you to update your repository files with open-stack template, specifying a version to upgrade. This will be useful for updating included tools to support future best practices. This action consists of several steps:

1. Verify the stability of the provided branch: The branch must be clean and pass tests.
2. Clone the latest known version of the template you used: The version number will be retrieved from the [package.json](./.github/package.json#L14) file.
3. Clone the next version of the template you want to use.
4. Update your package.json: The `scripts`, `devDependencies`, keys will attempt to be synchronized by comparing the state of your file with the previous and new versions.
5. Update the files that need to be synchronized: The list of files will be retrieved from the [open-stack.json](./.github/open-stack.json#L3) file.
6. Update the code syntax: Prettier and ESLint will be run.
7. A complete report will be generated with any conflicts that may arise.
8. A Pull Request will be opened containing the modifications and the report.

Unfortunately, this action is not **magic** and has its **limitations**. Your project may have evolved and you may have modified the same file as a file in the future version that needs to be synchronized. In this particular case, the file cannot be updated automatically. You will need to review the various conflicts in the update report and compare different file versions to make the necessary modifications manually. Note that code analysis is not run after the update. This must be done automatically on the Pull Request if you have configured a PAT; otherwise, you will need to run the tests manually.

*You can make this process auto by configuring `schedule` event in [workflow file](./.github/workflows/template.yml#L5).*

**Events**
  - `workflow_dispatch` (manual run)

**Available options**
  - Target version *[required]*
  - Dry mode : y/n (do not commit and open PR)
  - Node version

&nbsp;

#### Auto cleanup PR caches
---

This action is launched after a PR is closed to cleanup caches related to target branch.

**Events**
  - `pull_request` (closed)

&nbsp;

## Common questions

### How to change default node version used by Github actions

By default, all Github jobs run with Node version 16.x. You can modify the default Node version by defining the `NODE_VERSION` variable in repository Settings > Secrets and variables > Actions > Variables > New repository variables. (For example NODE_VERSION=14.x)

*Note: The Node version to use can also be defined individually when launching a Github action manually.*

---

### How to change default registry url used by Github actions

The default registry url used is https://registry.npmjs.org. You can modify it by defining the `REGISTRY_URL` variable in repository Settings > Secrets and variables > Actions > Variables > New repository variables.

---

### How to enable dependencies caching in Github actions

You can enable cache usage it by defining the `CACHE_DEPENDENCIES` variable with `1` value in repository Settings > Secrets and variables > Actions > Variables > New repository variables.

---

### How to install react for making web app

You can use the **experimental** command ["setup"](https://github.com/klientjs/open-stack-cli#setup) to add react (and react-scripts) in a fresh blank open-stack project (after run npm run configure), as create-react-app does.

**Caution : It will update config files like jest.config.ts, .eslintrc, tsconfig.json, package.json... These files can be potentially in conflict if you want to upgrade your open-stack files later.**

```
$ cd path/to/your/project
$ npx open-stack setup react-app
```
