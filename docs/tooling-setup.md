# Development Tooling Setup

This guide covers the development tooling and code quality setup for the BLRY project. This includes linting, formatting, and pre-commit hooks that ensure consistent code quality across the entire codebase.

## Prerequisites

- **Python 3.11+** (for Python tooling)
- **Node.js 16+** (for JavaScript tooling)
- **Poetry** (Python package manager)
- **npm** (JavaScript package manager)

## Quick Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd blry
```

### 2. Install Root-Level Tooling Dependencies

```bash
# Install Python development tools (Black, Flake8, isort, pre-commit)
poetry install

# Install JavaScript development tools (ESLint, Prettier)
npm install
```

### 3. Install Pre-commit Hooks

```bash
# Install pre-commit hooks for automatic code quality checks
poetry run pre-commit install
```

## Development Tooling Overview

### Python Tools

- **Black**: Code formatter that enforces consistent Python code style
- **Flake8**: Linter that checks for code quality issues and PEP 8 compliance
- **isort**: Import sorter that organizes Python imports consistently
- **pre-commit**: Framework that runs all tools automatically on git commits

### JavaScript Tools

- **ESLint**: Linter that identifies and fixes JavaScript code quality issues
- **Prettier**: Code formatter that enforces consistent JavaScript/JSON/CSS style

### Configuration Files

- `.pre-commit-config.yaml`: Defines which tools run on commit
- `pyproject.toml`: Python tool configurations and dependencies
- `package.json`: JavaScript tool dependencies and scripts
- `eslint.config.js`: ESLint rules and settings
- `.prettierrc`: Prettier formatting rules
- `.flake8`: Flake8 linting rules

## Development Commands

### Python Tooling Commands

```bash
# Format Python code
poetry run black .

# Check code quality and style
poetry run flake8 .

# Sort Python imports
poetry run isort .

# Run all Python tools on specific files
poetry run pre-commit run --files "backend/*.py"
```

### JavaScript Tooling Commands

```bash
# Check JavaScript code quality
npm run lint

# Fix auto-fixable JavaScript issues
npm run lint:fix

# Format JavaScript/JSON/CSS files
npm run format

# Check if files are properly formatted
npm run format:check
```

### Pre-commit Hooks

Pre-commit hooks run automatically on every commit and include:

- **Python**: Black (formatting), Flake8 (linting), isort (import sorting)
- **JavaScript**: ESLint (linting), Prettier (formatting)
- **General**: Trailing whitespace, end-of-file fixes, YAML/JSON validation

#### Custom Hooks

- **Project Metadata Consistency**: Ensures `pyproject.toml` and `package.json` have matching project name, version, and author information
- **Commit Message Formatting**: Automatically capitalizes the first letter of commit messages

```bash
# Run all pre-commit hooks manually on all files
poetry run pre-commit run --all-files

# Run pre-commit hooks on specific files
poetry run pre-commit run --files "path/to/file.py"

# Skip hooks for a specific commit (use sparingly)
git commit --no-verify -m "commit message"
```

## Tooling Project Structure

```text
blry/
├── .pre-commit-config.yaml # Pre-commit hook configuration
├── pyproject.toml         # Python tooling config and dependencies
├── package.json           # JavaScript tooling dependencies and scripts
├── eslint.config.js       # ESLint configuration
├── .prettierrc            # Prettier formatting rules
├── .flake8               # Flake8 linting rules
├── .prettierignore        # Files to exclude from Prettier
├── scripts/               # Custom tooling scripts
│   └── check_project_consistency.py  # Validates metadata consistency
├── frontend/              # React application (see frontend-setup.md)
└── backend/               # Django application (see backend-setup.md)
```

## Troubleshooting

### Poetry Issues

```bash
# Reset Poetry environment if dependencies are corrupted
poetry env remove python
poetry install
```

### Pre-commit Issues

```bash
# Clean and reinstall pre-commit hooks
poetry run pre-commit clean
poetry run pre-commit install

# Update pre-commit hook versions
poetry run pre-commit autoupdate
```

### Tool Configuration Issues

```bash
# Check if tools are working correctly
poetry run black --check .
poetry run flake8 .
npm run lint
npm run format:check

# Run all tools manually to debug issues
poetry run pre-commit run --all-files
```
