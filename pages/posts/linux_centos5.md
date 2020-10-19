---
title: "Apache + PHP 7をインストールするシェルスクリプトを作ってみた"
published: 2020-10-20
category: linux
---

特に説明は不要ですが Apache + PHP 7 のインストールをするシェルを作ります。

## CentOS7 のセットアップについて

さくら VPS であれば、[こちらの記事](/posts/linux_centos4)で、すぐ初期設定をすることができます。

## 作成したコード

```
yum -y update

# apache
yum -y install httpd

# リポジトリの追加
yum -y install epel-release
rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-7.rpm

# PHP色々
yum -y install --enablerepo=epel,remi,remi-php72 php php-devel php-common php-cli php-pdo php-mcrypt php-mbstring php-gd php-mysqlnd php-pear php-soap php-xml php-xmlrpc php-pecl-apc

# timezone設定
echo "date.timezone = Asia/Tokyo" >> /etc/php.ini

# Apacheの起動
systemctl restart httpd

```
