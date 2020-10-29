---
title: "wp-cliでLAMP環境、wordpress構築するシェルスクリプトを作ってみた"
published: 2020-10-29
category: linux
---

いくつかシェルスクリプトを作成していく中で、LAMP 環境、wp-cli、wordpress 環境構築までを作ってみたのでメモかわりで書いていきます。

## CentOS7 のセットアップについて

さくら VPS であれば、[こちらの記事](/posts/linux_centos4)で、スタートアップスクリプトで済ませてある状態とします。

## 処理内容

1. apache インストール
2. PHP7 のインストール
3. mysql のインストール、初期 DB 構築
4. wordpress-cli のインストール
5. wordrpess インストール

## 前提条件

・PHP は 7.2 を導入する
・設定の為に expect を導入する
・mysql の設定情報は、etc/.mysql.cnf に記載しておく
・wordpress 用に DB を作成しておく
・wp-cli から wp-config.php ファイルを生成

## 実際のコード

```
#!/bin/bash

# update
yum -y update

# expect導入
yum -y install expect

# apacheのインストール
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


# mysqlのバージョン確認
mysqld --version &> /dev/null
if [ $? -ne 0 ] ; then

  #mariadbの削除
  yum remove -y mariadb-libs
  rm -rf /var/lib/mysql

  #リポジトリ導入、インストール
  rpm -Uvh http://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
  yum -y install mysql-community-server
  yum install -y mysql-community-server

  systemctl start mysqld
  systemctl enable mysqld

  # 初期パスワードを取得
  Int_Passwd=$(grep "A temporary password is generated for root@localhost:" /var/log/mysqld.log | awk '{ print $11}')

  # rootパスワード自動作成
  MysqlRootPasswd="$(mkpasswd -l 16 | tee -a ~/.mysql.secrets)"

  touch memo.txt
  echo ${MysqlRootPasswd} >> memo.txt

  # 初期設定
  expect -c '
      set timeout 10;
      spawn mysql_secure_installation;
      expect "Enter password for user root:";
      send "'"${Int_Passwd}"'\n";
      expect "New password:";
      send "'"${MysqlRootPasswd}"'\n";
      expect "Re-enter new password:";
      send "'"${MysqlRootPasswd}"'\n";
      expect "Change the password for root ?";
      send "n\n";
      expect "Remove anonymous users?";
      send "y\n";
      expect "Disallow root login remotely?";
      send "y\n";
      expect "Remove test database and access to it?";
      send "y\n";
      expect "Reload privilege tables now?";
      send "y\n";
      interact;'

  #文字コード設定
  cat << EOF >> /etc/my.cnf
character-set-server=utf8
[client]
default-character-set=utf8
EOF

  # ユーザ作成
  MYSQLUSER="wpadmin"
  MYSQLPASS="$(mkpasswd -l 16 | tee -a ~/.mysql.secrets)"

  mysql -u root -p"${MysqlRootPasswd}" <<EOT
create user "${MYSQLUSER}"@localhost identified by "${MYSQLPASS}";
grant all on wordpress.* to "${MYSQLUSER}"@localhost;
flush privileges;
EOT

  # アカウント情報記載
  touch /etc/.mysql.cnf
  cat << EOS >> /etc/.mysql.cnf
[root]
user = root
password = ${MysqlRootPasswd}
host = localhost

[wpadmin]
user = wpadmin
password = ${MYSQLPASS}
EOS

else
  echo "aleady installed"
fi

# mysqldの再起動
systemctl restart mysqld

# wp-cliのダウンロード
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar

# 権限付与と実行ファイルの移動
chmod +x wp-cli.phar
sudo mv wp-cli.phar /usr/local/bin/wp

# wordpressのダウンロード
sudo -u apache /usr/local/bin/wp core download --locale=ja --path=/var/www/html

# wp-config.phpの作成
sudo -u apache /usr/local/bin/wp core config --dbname=wordpress --dbuser=wpadmin --dbpass=${MYSQLPASS} --dbhost=localhost --path=/var/www/html

# wordpressのインストール
sudo -u apache /usr/local/bin/wp core install --title=automatic --admin_user=wp_admin --admin_password=xxxxx --admin_email=xxxxx@gmail.com --url=xxxxxxxxxxxxxx --path=/var/www/html

```
