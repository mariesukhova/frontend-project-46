### Hexlet tests and linter status:
[![Actions Status](https://github.com/mariesukhova/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/mariesukhova/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/78a9ea8adb0dfd5e75d8/maintainability)](https://codeclimate.com/github/mariesukhova/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/78a9ea8adb0dfd5e75d8/test_coverage)](https://codeclimate.com/github/mariesukhova/frontend-project-46/test_coverage)
[![Project test & build](https://github.com/mariesukhova/frontend-project-46/actions/workflows/main.yml/badge.svg)](https://github.com/mariesukhova/frontend-project-46/actions/workflows/main.yml)

Description:
This is utility that determines the difference between two data structures. A similiar approach is used when outputting tests or when automatically tracking changes in configuration files.

Utility features:

Support for different input formats: yaml, json. 
Generation a report in the form of plain text, stylish, json

How to use:
Enter gendiff -h for help. Enter gendiff path/to/file.yml another/path/file.json for default stylish format report. Enter gendiff --format plain/json path/to/file.yml another/path/file.json for plain or json format report.

**Asciinema of gendiff for json files with default (stylish), plain and json format**
[![asciicast](https://asciinema.org/a/dq06zUUG9Fs7JXXgFdbaPvoD7)](https://asciinema.org/a/dq06zUUG9Fs7JXXgFdbaPvoD7)

**Asciinema of gendiff for yaml files with default (stylish), plain and json format**
[![asciicast](https://asciinema.org/a/HEIjjO4jXzSSaqndRY2aLSLdB)](https://asciinema.org/a/HEIjjO4jXzSSaqndRY2aLSLdB)
