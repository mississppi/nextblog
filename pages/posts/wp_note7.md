---
title: "wp-cliでWordpressの初期設定するシェルを作ってみた"
published: 2020-10-29
category: wordpress
---

今日は wpcli を使って、WordPress の初期設定で最低限必要そうな処理をするシェルを作ってみました。

## 処理内容

1. 日本語化
2. タイムゾーン設定
3. 日付、時刻のフォーマット設定
4. デフォルト記事削除
5. 最低限のプラグイン導入

## ソース

```
#!/bin/sh

sudo -u apache /usr/local/bin/wp core language install ja --activate
sudo -u apache /usr/local/bin/wp option update timezone_string 'Asia/Tokyo'
sudo -u apache /usr/local/bin/wp option update date_format 'Y-m-d'
sudo -u apache /usr/local/bin/wp option update time_format 'H:i'

sudo -u apache /usr/local/bin/wp post delete 1 2 3 --force
sudo -u apache /usr/local/bin/wp plugin install wp-multibyte-patch --activate
```
