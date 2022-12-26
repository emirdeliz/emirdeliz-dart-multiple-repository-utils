# emirdeliz-dart-multiple-repository-utils

[![Build](https://github.com/emirdeliz/emirdeliz-dart-multiple-repository-utils/actions/workflows/build.yml/badge.svg)](https://github.com/emirdeliz/emirdeliz-dart-multiple-repository-utils/actions/workflows/build.yml)
[![Lint](https://github.com/emirdeliz/emirdeliz-dart-multiple-repository-utils/actions/workflows/lint.yml/badge.svg)](https://github.com/emirdeliz/emirdeliz-dart-multiple-repository-utils/actions/workflows/lint.yml)
[![Test](https://github.com/emirdeliz/emirdeliz-dart-multiple-repository-utils/actions/workflows/test.yml/badge.svg)](https://github.com/emirdeliz/emirdeliz-dart-multiple-repository-utils/actions/workflows/test.yml)

This extension makes your life easier to use dart if you work with a multi-repo approach. You can run clear, pub get, and clear & pub get (with one click) to all projects inside the workspace with a simple action on the menu.

## Demo

<img src="https://raw.githubusercontent.com/emirdeliz/emirdeliz-dart-multiple-repository-utils/master/assets/demo.gif" width="700" height="auto" alt="Emirdeliz Dart Multiple Repository Utils - example"/>

## Settings

##### About the settings _(vscode settings.json)_. All settings should be inside the key _emirdeliz-dart-multiple-repository-utils_:

| **Prop**           | **Type**      | **Description**                              |
| ------------------ | ------------- | -------------------------------------------- |
| **ignore-folders** | Array<string> | Define the folders to be ignored to the git. |

##### Example settings

```json
{
  "emirdeliz-dart-multiple-repository-utils": {
    "ignore-folders": ["folder-1, folder-2, folder-3"]
  }
}
```
