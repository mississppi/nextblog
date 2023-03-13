---
title: "electronとtypescriptとreactの環境構築してみた"
published: 2021-03-20
category: typescript
---

今回は electron を typescript と react でアプリを作成する際の
環境構築を書いていきたいと思います。

## まずは必要なものをインストール

```
yarn init -y
yarn add electron react react-dom
yarn add --dev typescript @types/react @types/react-dom webpack
yarn add --dev ts-loader
yarn add --dev copy-webpack-plugin

mkdir src
mkdir src/main
mkdir src/renderer
```

## ディレクトリの構成

```
root
    /src
        /main ・・・ここにelectronのmain部分
        /renderer ・・・ここにレンダラー部分
```

## config の設定

```
tsc --init
```

## tsconfig.json の設定

jsx のみ react へ変更しておく。今回はこんだけ

```
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Basic Options */
    // "incremental": true,                         /* Enable incremental compilation */
    "target": "es5",                                /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
    "module": "commonjs",                           /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    // "lib": [],                                   /* Specify library files to be included in the compilation. */
    // "allowJs": true,                             /* Allow javascript files to be compiled. */
    // "checkJs": true,                             /* Report errors in .js files. */
    "jsx": "react",                           /* Specify JSX code generation: 'preserve', 'react-native', 'react', 'react-jsx' or 'react-jsxdev'. */
    ・・・
  }
}
```

## webpack.config.js の設定

これは丸々貼っておく。
main と renderer でそれぞれ分けて定義しておく

```
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require('path');
const isDev = process.env.NODE_ENV !== "production";

const outputPath = path.join(__dirname, "dist");

var main = {
    mode: isDev ? 'development' : "production",
    target: 'electron-main',
    devtool: isDev ? "source-map" : false,
    entry: path.join(__dirname, 'src', 'main', 'index'),
    output: {
        filename: 'index.js',
        path: outputPath,
    },
    node: {
        __dirname: false,
        __filename: false
    },
    module: {
        rules: [{
            test: /.ts?$/,
            include: [
                path.resolve(__dirname, 'src'),
            ],
            exclude: [
                path.resolve(__dirname, 'node_modules'),
            ],
            loader: 'ts-loader',
        }]
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(__dirname, "src", "renderer", "index.html")
                },
            ],
        }),
    ],
};

var renderer = {
    mode: isDev ? 'development' : 'production',
    target: 'electron-renderer',
    entry: path.join(__dirname, 'src', 'renderer', 'index'),
    devtool: isDev ? "inline-source-map" : false,
    output: {
        filename: 'index.js',
        path: path.resolve(outputPath, 'scripts')
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.css', '.ts', '.tsx']
    },
    module: {
        rules: [{
            test: /\.(tsx|ts)$/,
            use: [
                'ts-loader'
            ],
            include: [
                path.resolve(__dirname, 'src'),
                path.resolve(__dirname, 'node_modules'),
            ],
        }]
    },
    plugins: [],
};

module.exports = [
    main, renderer
]
```

## package.json の設定

script の設定をしておく

```
  "scripts": {
    "start": "electron ./dist",
    "watch": "webpack --watch --config ./webpack.config.js --mode development"
  },
```

## main がわに electron のメインメソッドを定義する

index.ts

```
import { BrowserWindow, App, app } from "electron";

class MyApp {
  private window?: BrowserWindow;

  private app: App;

  private mainURL: string = `file://${__dirname}/index.html`;

  constructor(app: App) {
    this.app = app;
    this.app.on("ready", this.onReady);
    this.app.on("activate", this.onActivated);
    this.app.on("window-all-closed", this.onWindowAllClosed);
  }

  private onReady = () => {
    this.window = new BrowserWindow();
    this.window.loadURL(this.mainURL);
    this.window.webContents.openDevTools();
  };

  private onActivated = () => {};

  private onWindowAllClosed = () => {
    this.app.quit();
  };
}

new MyApp(app);

```

## レンダラー側にも設定していく

index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <script src="./scripts/index.js"></script>
</body>
</html>
```

index.tsx

```
import React from "react";
import {render} from "react-dom";
import AppContainer from "./AppContainer/AppContainer"

render(<AppContainer />, document.getElementById("app"));
```

## 実際に起動だけしてみる

```

yarn watch

```

もうひとつのコンソールで

```
yarn start
```
