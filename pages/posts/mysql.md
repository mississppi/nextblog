---
title: "docker-composeでmysql構築してみた"
published: 2022-05-23
category: mysql
---

# mysqlだけのdocker-composeを作成してみた
検証用にmysqlだけのdocker-compose.yml作ってみました。 

```
version: "3"
services:
  mysql:
    build: ./mysql/
    platform: linux/x86_64
    image: mysql
    container_name: mysql
    volumes:
      - ./mysql/seed:/docker-entrypoint-initdb.d # 初回データ実行
      - ./mysql/data:/var/lib/mysql # データ永続化
    environment:
      - MYSQL_ROOT_PASSWORD=password # パスワード設定
```

## ポイントでもないが、Dockerfileでmy.cnfをコピーして使う

```
FROM mysql:8.0
EXPOSE 3306
COPY ./config/my.cnf /etc/mysql/conf.d/my.cnf
CMD ["mysqld"]
```

## 初期値も入れたかった

docker-entrypoint-initdb.dへsqlファイルを用意すると自動実行される

```
volumes:
      - ./mysql/seed:/docker-entrypoint-initdb.d
```

```
DROP DATABASE IF EXISTS test_db;
CREATE DATABASE test_db;
USE test_db;

CREATE TABLE IF NOT EXISTS posts
(
  `id`         int(11) NOT NULL AUTO_INCREMENT,
  `title`     text,
  PRIMARY KEY (`id`)
)
```