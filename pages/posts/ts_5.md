---
title: "ESlintとpritier"
published: 2023-02-17
category: ts/js
---

## インストール

```
yarn add -D eslint

//typescript-eslint-parserとeslint-plugin-typescriptは非推奨
``` 

## 初期設定

```
//解答形式で初期設定
yarn eslint --init

//これで.eslintrc.jsonが生成される。プラグインはpluginsとextendsにも追加する
{
    "env": {
        "browser": true,
        "es2022": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-exlint/recommended",
        "plugin:@typescript-exlint/recommended-requiring-type-checking",
        "plugin:react/recommended",
        "standard-with-typescript",
        "plugin:jsx-a11y/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "tsconfigRootDir": ".",
        "project": ["./tsconfig.json"],
        "sourceType": "module"
    },
    //とりあえずこの辺り入れておく
    "plugins": [
        "@typescript-eslint",
        "jsx-a11y",
        "react",
        "react-hooks"
    ],
    "rules": {
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}

//依存関係
yarn info eslint-config-standard-with-typescript peerDependencies   
```

## vscode側設定

typescriptのバージョンをワークスペース(PC)に設定する。
tsxのふぁいるを開いているときに、⌘ + shift + p から、
Typescript: Select typeScript Version を実行して、ワークスペースを選択する