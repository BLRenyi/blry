# Development Setup

This guide covers the development environment setup for the BLRY project.

## Prerequisites

- **Python 3.11+**
- **Node.js 16+**
- **Poetry** (Python package manager)
- **Yarn** (JavaScript package manager)

## Quick Start

### 1. Clone and Setup

```bash
git clone <repository-url>
cd blry
```

### 2. Install Dependencies

```bash
# Install Python dependencies
poetry install

# Install JavaScript dependencies
yarn install
```

### 3. Install Pre-commit Hooks

```bash
# Install pre-commit hooks for code quality
poetry run pre-commit install
```

## Development Commands

### Python/Django Commands

```bash
# Run Django development server
poetry run python manage.py runserver

# Run Python linting and formatting
poetry run black .              # Format code
poetry run flake8 .             # Check code quality
poetry run isort .              # Sort imports

# Run all Python checks
poetry run pre-commit run --files "*.py"
```

### JavaScript Commands

```bash
# Run JavaScript linting and formatting
yarn lint                       # Check code quality
yarn lint:fix                   # Fix auto-fixable issues
yarn format                     # Format code
yarn format:check               # Check formatting

# Run all JavaScript checks
yarn lint && yarn format:check
```

### Pre-commit Hooks

Pre-commit hooks run automatically on every commit and include:

- **Python**: Black (formatting), Flake8 (linting), isort (import sorting)
- **JavaScript**: ESLint (linting), Prettier (formatting)
- **General**: Trailing whitespace, end-of-file fixes, YAML/JSON validation

```bash
# Run all pre-commit hooks manually
poetry run pre-commit run --all-files

# Skip hooks for a specific commit (use sparingly)
git commit --no-verify -m "commit message"
```

## Project Structure

```
blry/
├── docs/                   # Documentation
├── pyproject.toml         # Python dependencies and config
├── package.json           # JavaScript dependencies and scripts
├── .pre-commit-config.yaml # Pre-commit hook configuration
├── eslint.config.js       # ESLint configuration
├── .prettierrc            # Prettier configuration
└── .flake8               # Flake8 configuration
```

## Troubleshooting

### Poetry Issues

```bash
# Reset Poetry environment
poetry env remove python
poetry install
```

### Pre-commit Issues

```bash
# Clean and reinstall pre-commit
poetry run pre-commit clean
poetry run pre-commit install
```

### Package Installation Issues

If you encounter PyPI access issues, the project is configured to use public PyPI as the primary source.

## IDE Setup

### VS Code

Recommended extensions:

- Python (Microsoft)
- ESLint (Microsoft)
- Prettier (Prettier)
- Black Formatter (Microsoft)

### PyCharm/WebStorm

- Enable Poetry as Python interpreter
- Configure ESLint and Prettier for JavaScript files
- Enable Black as code formatter
