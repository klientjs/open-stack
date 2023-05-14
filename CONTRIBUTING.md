# Contributing to project

Thank you for your interest in contributing to this project! We appreciate any and all help, whether it's reporting bugs, submitting code changes, or improving documentation.

## Git Workflow

Our Git workflow follows the **fork and pull request** model. To contribute to the project, follow these steps:

1. Fork the project repository to your own GitHub account by clicking the "Fork" button.
2. Clone your forked repository to your local machine: `git clone git@github.com:your-username/project-name.git`
3. Create a new branch for your changes: `git checkout -b my-branch-name`
4. Make your changes
5. Prepare your files for commit : `npm run pre-commit` (this will run fixes of prettier, linter and tests)
6. Commit changes: `git add <files> && git commit`
5. Write your commit message following the Angular commit rules (see below).
6. Push your changes to your forked repository: `git push origin my-branch-name`
7. Create a pull request by visiting the original repository on GitHub and clicking the "New Pull Request" button.

Before creating a pull request, please make sure to:

- Update any relevant documentation.
- Rebase your branch on the latest upstream changes: `git fetch upstream && git rebase upstream/main`

## Angular Commit Rules

We follow the [Conventional commit rules](https://www.conventionalcommits.org/) for all code changes. Please make sure your commit messages adhere to this format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

- `<type>`: The type of change being made. Possible types are: `feat` (new feature), `fix` (bug fix), `docs` (documentation changes), `style` (formatting, missing semi colons, etc; no code change), `refactor` (refactoring production code), `test` (adding tests, refactoring test; no production code change), `chore` (updating build tasks etc; no production code change).
- `<scope>`: The scope of the change. This can be anything describing what area of the codebase is affected (e.g. "auth", "UI", "backend", etc.).
- `<subject>`: A short description of the change (maximum 50 characters).
- `<body>` (optional): A more detailed description of the change (maximum 72 characters per line).
- `<footer>` (optional): Any additional information such as breaking changes, issue numbers, or other notes.

For example:

```
feat(event): add jwt auth event

Dispatch a new event named jwt:auth to allow perform actions when user authenticate. 
This event will be dispatched when JwtService.login method is called with success.

Closes #1234
```

## Code Style & Testing

We use Prettier and TSLint to enforce code style, and Jest for unit testing. Before committing your changes, please make sure to run the following commands to format your code and run the tests:

```shell
# One by one
$ npm run prettier:fix
$ npm run lint:fix
$ npm run test

# Alternatively
$ npm run pre-commit
```

## Issue Tracker

If you encounter a bug or have a feature request, please submit an issue on the project's GitHub repository. Please include as much detail as possible, including steps to reproduce the issue and any relevant error messages.

Thank you for contributing to this project! We appreciate your help in making it better.
