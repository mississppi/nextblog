---
title: "よくつかうdockerの環境整理してみた"
published: 2020-09-03
category: php
---

## よく使うdockerを整理してみた

毎回調べるのでいい加減docker環境を整理しました。

ディレクトリ構成

docker-compose.yml
```
version: "3"
services:
    nginx:
        build: ./nginx
        ports:
            - 80:80
        volumes:
            - ./content:/var/www/html
            - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    php:
        image: php:8-fpm
        volumes:
            - ./content:/var/www/html
```

Dockerfile
```
FROM nginx:1.23
```

default.conf
```
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    # location / {
    #     root   /var/www/html;
    #     index  index.html index.htm index.php;
    # }
    root   /var/www/html;
    index  index.html index.htm index.php;

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /var/www/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    location ~ \.php$ {
       root           /var/www/html;
       fastcgi_pass   php:9000;
       fastcgi_index  index.php;
       fastcgi_param  SCRIPT_FILENAME $document_root$fastcgi_script_name;
       include        fastcgi_params;
    }

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

##