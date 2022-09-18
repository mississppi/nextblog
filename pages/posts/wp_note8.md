---
title: "docker-composeでwordpressを構築"
published: 2022-09-13
category: wordpress
---

よく使うテンプレート

## 今回の構成
docker-compose.yml  
Dockerfile・・・wp-cliをインストールする  
install.sh・・・wpのインストール用  
wordpress・・・プラグイン開発用  

## 今回やること
Dockerfileでwp-cliとcomposerのインストール  
install.shでwordpressのインストール完了まで(docker起動時には実行しない)

docker-compose.yml
```
version: '3'

services:
   db:
     platform: linux/x86_64
     image: mysql:5.7
     volumes:
       - db_data:/var/lib/mysql
     restart: always
     environment:
       MYSQL_ROOT_PASSWORD: somewordpress
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD: wordpress

   wordpress:
     depends_on:
       - db
     build: .
     image: wordpress:latest
     ports:
       - "80:80"
     restart: always
     environment:
       WORDPRESS_DB_HOST: db:3306
       WORDPRESS_DB_USER: wordpress
       WORDPRESS_DB_PASSWORD: wordpress
     volumes:
       - ./wordpress/wp-content:/var/www/html/wp-content
       - ./install.sh:/var/www/html/install.sh
volumes:
    db_data:
```

Dockrefile
```
FROM wordpress:latest

RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
  && chmod +x wp-cli.phar \
  && mv wp-cli.phar /usr/local/bin/wp \
  && wp --info \
  && php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
  && php -r "if (hash_file('sha384', 'composer-setup.php') === '55ce33d7678c5a611085589f1f3ddf8b3c52d662cd01d4ba75c0ee0459970c2200a51f492d557530c71c15d8dba01eae') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
  && php composer-setup.php \
  && php -r "unlink('composer-setup.php');" \
  && mv composer.phar /usr/local/bin/composer
```

install.sh
```
#!/bin/bash

# WordPressのインストール
#=======================
wp core install \
--url="http://localhost" \
--title="mspstudio" \
--admin_user='admin' \
--admin_password='test' \
--admin_email='info@example.com' \
--allow-root

# 日本語
wp language core install --allow-root --activate ja

# パーマリンク API用
wp option update permalink_structure --allow-root /archives/%post_id%

# 初期テーマ削除
wp theme delete --allow-root twentysixteen
wp theme delete --allow-root twentyseventeen
wp theme delete --allow-root twentynineteen
wp theme delete --allow-root twentytwenty

# プラグイン削除
wp plugin delete --allow-root hello.php
wp plugin delete --allow-root akismet
```