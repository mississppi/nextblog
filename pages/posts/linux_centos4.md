---
title: "さくらVPSのスタートアップスクリプトで、初期設定してみた"
published: 2020-10-20
category: linux
---

今日は、さくら VPS のスタートアップスクリプトを使って Centos7 を初期設定をしてみて、色々はまったことがあったのでまとめていきます

## 初期設定でやること

1. ログイン用ユーザ作成、グループ追加
2. sudo 権限を利用できるユーザを限定させる
3. 公開鍵認証をつかう。ログイン用ユーザで.ssh ディレクトリ作成
4. ポート変更
5. root でのログイン制限
6. パスワード認証無効

### 公開鍵を登録しておき、インストール時に使う

最近はこんな感じで公開鍵を登録しておけば利用できます。
![公開鍵](/vps2.png)

## 実際のコード

```
#! /bin/bash

# ユーザ作成、公開鍵格納
USER=@@@user_name@@@
PW=@@@user_pass@@@

# disable SELinux temporarily
setenforce 0

useradd $USER
echo $PW | passwd --stdin $USER
gpasswd -a $USER wheel

# allow only members of the wheel group to use 'su'
cp /etc/pam.d/su /etc/pam.d/su.bak
## uncomment 'auth required pam_wheel.so use_uid'
tac /etc/pam.d/su > /etc/pam.d/su.tmp
cat << EOS >> /etc/pam.d/su.tmp 2>&1
auth required pam_wheel.so use_uid
EOS
tac /etc/pam.d/su.tmp > /etc/pam.d/su
rm -rf /etc/pam.d/su.tmp

## restrict the use of 'su' command
cp /etc/login.defs /etc/login.defs.bak
cat << EOS >> /etc/login.defs
SU_WHEEL_ONLY yes
EOS

## 'sudo' command without password
cp /etc/sudoers /etc/sudoers.bak
cat << EOS >> /etc/sudoers 2>&1
%wheel ALL=(ALL) NOPASSWD: ALL
EOS

#SSH周り
mkdir /home/$USER/.ssh/
chown -R $USER:$USER /home/$USER/.ssh
chmod 700 /home/$USER/.ssh
mv /root/.ssh/authorized_keys /home/$USER/.ssh/authorized_keys
chown -R $USER:$USER /home/$USER/.ssh/authorized_keys

## mod sshd_config
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak

sed -i 's/#PermitRootLogin yes/PermitRootLogin no/g' /etc/ssh/sshd_config
sed -i 's/^PasswordAuthentication yes/PasswordAuthentication no/g' /etc/ssh/sshd_config
sed -i 's/^#PubkeyAuthentication yes/PubkeyAuthentication yes/g' /etc/ssh/sshd_config
sed -i 's/^#Port 22/Port ここは自由に設定/g' /etc/ssh/sshd_config

systemctl restart sshd
```

## ハマったこと

最初は登録しておいた公開鍵を使っていたのですが、どうも認証がうまくできませんでした。
(パスワード認証にしかならない)。
これを調べていたのですが、私が公開鍵をさくらのコンパネからする際に、
vim コマンドでの表示をしてコピーペーストしていたことが原因でした。。。
cat で表示させてからコピーすればなんなくうまくいきました。。
