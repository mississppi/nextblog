---
title: "mysqlの初期設定するシェルを作ってみた"
published: 2020-10-10
category: linux
---

今日は WordPress をインストールするにあたり、mysql を初期設定するのですが、せっかくなので一撃シェルっぽくしてみました。

## 処理内容について

mariadb の削除
mysql のインストール
mysql の初期パスワード変更
パスワードを /etc/mysql.cnf に記載する
文字コードを utf-8 に指定
wordpress 用の DB と、ユーザを作成

## 実際に書いたソースについて

```
#!/bin/bash

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
  echo "always installed"
fi

systemctl restart mysqld
```
