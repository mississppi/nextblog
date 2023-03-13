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

### errorログ以降だけを出力させたい
```
error_log /var/log/nginx/error.log error;
```

### ローテートの設定ファイル。日ごとでローテートしたい場合は、dateextいれておく

```
/etc/logrotate.d/nginx

daily,weekly,monthlyで切り替えられる

/var/log/nginx/*.log {
    dateext
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

### basic認証かけたい

```
いれとく
sudo apt-get install -y apache2-utils

.htpasswd作成する
sudo htpasswd -c /etc/nginx/.htpasswd msp(user名)
New password: パスワードを入力
Re-type new password: パスワードを入力

設定ファイルに追記
server {
    auth_basic "Basic Authentication";
    auth_basic_user_file /etc/nginx/.htpasswd;
}

特定のディレクトリに対して設定したい
server {
    localtion /campaign {
        auth_basic "Basic Authentication";
        auth_basic_user_file /etc/nginx/.htpasswd;
    }
}

```

### リダイレクト

恒久的にリダイレクト
```
location /closed/ {
    return 301 https://hogehoge.com;
}
```
