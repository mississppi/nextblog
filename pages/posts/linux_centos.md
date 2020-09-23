---
title: "VPSの初期設定をやってみた"
published: 2020-09-22
category: linux
---

今日はすごい久しぶりに VPS サーバを触ろうと思ったので、
初期設定とかを改めてまとめます(結構忘れてた...)

## CentOS 7 をインストール

さくらの VPS コンソールへログインして、OS をインストール。  
なんてことはないけど、パケットフィルタ機能で SSH のポートを追加しておく

![パケットフィルタ](/vps1.png)

## ユーザを追加

```
useradd hogehoge
passwd hogehoge
(pw設定)

```

## 公開鍵登録

あらかじめ秘密鍵、公開鍵を登録しておく

```
//大人しくscpコマンドでコピーします
scp id_rsa_hogehoge.pub user@xxx.xx.xx.xxx:/home/user/
```

```
$ cd                                    # 確実にホームディレクトリに移動
$ mkdir .ssh                            # ディレクトリ作成
$ chmod 700 .ssh/                       # 自分以外のアクセスを禁止
$ mv id_rsa.pub .ssh/authorized_keys    # 公開鍵リスト作成
$ chmod 600 .ssh/authorized_keys        # 自分以外の読み書きを禁止
```

この状態ですでにファイル指定で秘密鍵でログインできるようになる

```
ssh -i id_rsa_hogehoge user@xxx.xx.xx.xxx

//こんなメッセージでるね
Enter passphrase for key 'id_rsa_hogehoge':
```

## 作ったユーザで sudo を使えるようにする

一般ユーザでも root と同じ権限で操作可能な状態にします。
(本当に権限が必要な場面でしか root 権限を使わないようにできます。)

```
# su
Password:

# usermod -G wheel hogehoge
```

## root でログインできないようにする

sudo vi/etc/ssh/sshd_config

```
PermitRootLogin no
```

## パスワード認証をできないようにする

sudo vi/etc/ssh/sshd_config

```
PasswordAuthentication no
```

## packet_write_wait: Connection to ＜ IP address ＞ port 22: Broken pipe がでないようにする

sudo vi/etc/ssh/sshd_config

```
ClientAliveInterval 30
ClientAliveCountMax 5
```

クライアント側も設定しておきましょう

.ssh/config

```
ServerAliveInterval 15
ServerAliveCountMax 10
```

## firewall 周り設定する

まずは起動しておきましょう

```
sudo systemctl start firewalld
```

そして状態を確認します

```
sudo systemctl status firewalld.service
```

## ポートを変更する

sshd_config でポート番号をしていたのち、ファイアウォールを設定しましょう

sudo vi/etc/ssh/sshd_config

```
Port 10022
```

sudo vi /usr/lib/firewalld/services/ssh.xml

```
「port=”22″」の部分を「port=”10022″」など、任意のポート番号に変更します。

```

sudo firewall-cmd --reload
