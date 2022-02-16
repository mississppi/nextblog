---
title: "nginxのコマンド類、設定まとめてみた"
published: 2022-02-15
category: linux
---

## 基本的なコマンドなどまとめました

```
構文チェック
nginx -t

nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful

待たずに終了
nginx -s stop

処理されてから終了
nginx -s quit

終了せずに設定再反映
nginx -s reload

再起動
sudo service nginx restart

設定再読み込み
sudo service nginx reload 

バイナリ停止せずに設定差し替える
sudo service nginx upgrade
```

## ログについて

### ローテートの設定ファイル。日ごとでローテートしたい場合は、

```
/etc/logrotate.d/nginx

daily,weekly,monthlyで切り替えられる

/var/log/nginx/*.log {
	daily
	missingok
	rotate 14
	compress
	delaycompress
	notifempty
	create 0640 www-data adm
	sharedscripts
	prerotate
		if [ -d /etc/logrotate.d/httpd-prerotate ]; then \
			run-parts /etc/logrotate.d/httpd-prerotate; \
		fi \
	endscript
	postrotate
		invoke-rc.d nginx rotate >/dev/null 2>&1
	endscript
}
```

### とりあえずaccess.logをipでカウントしたい
sudo awk '{print $1}'/var/log/nginx/access.log | sort | uniq -c | sort -nr

### 特定のipを拒否する
```
```

### 特定のページでエラー


### 特定のページでリダイレクトさせる
