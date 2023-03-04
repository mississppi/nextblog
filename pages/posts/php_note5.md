---
title: "redisの検証など"
published: 2023-03-02
category: php
---

## とりあえず環境構築

```
sudo add-apt-repository ppa:redislabs/redis
sudo apt-get update
sudo apt-get install redis
redis-cli -v
```

## コマンド集
```
//確認
info

//key value格納
set 2 "abs"

//取り出し
get 2
"abs"

//削除
del 2

```

## zaddでスコアつけながらSETする

```
127.0.0.1:6379> zadd ranking 1 'user1'
(integer) 1
127.0.0.1:6379> zadd ranking 2 'user2'
(integer) 1
127.0.0.1:6379> zadd ranking 10 'hoge'
(integer) 1
127.0.0.1:6379> zadd ranking 9 'iuser'
(integer) 1

//
127.0.0.1:6379> zrange ranking 0 3
1) "user1"
2) "user2"
3) "iuser"
4) "hoge"
```

## 特定のkeyだけのvalueを計算
```
redis-cli keys *key* | wc -c

```

## ある程度insertしたかったのでbashで作成
```
#!/bin/bash

i=1
while [ $i -le 20 ]
do
    info=$(redis-7.0.9/src/redis-cli set ${i} value)
    i=$(( $i + 1 )) # countup
done
```

