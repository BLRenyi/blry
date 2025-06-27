#!/usr/bin/env python3
"""
Ensures consistency between Python and JavaScript project metadata files.
"""
import json
import sys

import tomlkit


def check_project_consistency():
    # Read pyproject.toml
    with open("pyproject.toml", "r") as f:
        pyproject = tomlkit.parse(f.read())

    # Read package.json
    with open("package.json", "r") as f:
        package_json = json.load(f)

    # Fields to check
    inconsistencies = []

    # Check name
    py_name = pyproject["project"]["name"]
    js_name = package_json["name"]
    if py_name != js_name:
        inconsistencies.append(
            f"Name mismatch: '{py_name}' in pyproject.toml vs "
            f"'{js_name}' in package.json"
        )

    # Check version
    py_version = pyproject["project"]["version"]
    js_version = package_json["version"]
    if py_version != js_version:
        inconsistencies.append(
            f"Version mismatch: '{py_version}' in pyproject.toml vs "
            f"'{js_version}' in package.json"
        )

    # Check authors
    py_author = pyproject["project"]["authors"][0]["name"]
    js_author = package_json.get("author", "")
    if py_author != js_author:
        inconsistencies.append(
            f"Author mismatch: '{py_author}' in pyproject.toml vs "
            f"'{js_author}' in package.json"
        )

    # Report inconsistencies
    if inconsistencies:
        print("Project metadata inconsistencies found:")
        for issue in inconsistencies:
            print(f"  - {issue}")
        print("\nPlease update the files to ensure consistency.")
        return False

    return True


if __name__ == "__main__":
    success = check_project_consistency()
    sys.exit(0 if success else 1)
