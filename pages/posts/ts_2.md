---
title: "asdfでNode.jsをインストールとViteで新規プロジェクト作成"
published: 2023-01-16
category: typescript
---

## インストールからパスを通すまで

```
brew install asdf
echo -e "\n. $(brew --prefix asdf)/asdf.sh" >> ~/.zshrc
source ~/.zshrc 
```

これでasdfコマンドでコマンド一覧がでてくればOK

## コマンド一覧

```
asdf plugin list インストール済み
asdf plugin update <プラグイン>　アップデート
```

ホームに.default-npm-packagesに作成しておくとべんり

```
yarn
typescript
ts-node
```

## viteでセットアップする

```
yarn create vite app-project --template=react-ts

cd app-project
yarn
yarn dev
```

### yarn installでやってること
package.jsonに記載されたパッケージを、node_modules配下にインストールして、
yarn.lockファイルに情報を出力してる

## package.jsonのメモ
devDependencies・・・開発用。yarn add -D(--dev)で追加