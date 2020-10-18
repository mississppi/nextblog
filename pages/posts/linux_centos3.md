---
title: "WordPress用の mysqlの初期設定するシェルを作ってみた"
published: 2020-10-10
category: linux
---

今日は WordPress をインストールするにあたり、mysql を初期設定するのですが、
せっかくなので一撃シェルっぽくしてみました。

## 処理内容について

mysql のインストール
mysql の初期パスワード変更
設定ファイルの生成、参照させる
DB を作成

## 実際に書いたソースについて
