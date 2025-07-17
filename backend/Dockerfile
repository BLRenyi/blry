# Base image: A minimal version of Python 3.11 (Debian-based).
# `-slim` keeps it small and fast, ideal for production.
FROM python:3.11-slim

# Prevents `.pyc` files from being written to disk. Clean, faster rebuilds.
ENV PYTHONDONTWRITEBYTECODE=1
# Forces stdout/stderr to be unbuffered, making log output immediately visible
# in real-time.
ENV PYTHONUNBUFFERED=1

# Updates package list and installs dependencies:
## - `build-essential`: Required to compile any native C extensions
##                      (common in Python packages).
##
## - `curl`:            Used to fetch `Poetry` installer in the next step.
RUN apt-get update && apt-get install -y build-essential curl

# Install `Poetry`
## Downloads and installs `Poetry` using the official installation script.
## Adds `Poetry` to the system `PATH`, so `poetry` command is available in
## later steps.
RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH="/root/.local/bin:$PATH"

# Sets the working directory inside the container to /app.
## All following `COPY`, `RUN`, `CMD`, etc., happen inside this folder.
WORKDIR /app

# Copies dependency metadata files first:
## `pyproject.toml`: The backend dependencies and project config.
## `poetry.lock*``:  Locked versions of your dependencies
##                   (optional `*` handles if it doesn't exist yet).
##
## Copy these first. So Docker can cache the install layer — avoiding
## re-installation if only your app code changes.
COPY pyproject.toml poetry.lock* /app/

# Runs `poetry install`:
## --no-interaction: Avoids prompts (essential for automation).
## --no-ansi: No colored output (cleaner Docker logs).
RUN poetry install --no-interaction --no-ansi

# Copies the rest of your project files (source code, manage.py, etc.) into
# the /app/ directory of the container.
# This happens after installing dependencies to leverage Docker layer caching.
COPY . /app/
