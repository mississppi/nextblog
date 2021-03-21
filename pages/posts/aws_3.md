---
title: "ECRにプッシュしてみた"
published: 2020-11-02
category: aws
---

とりあえず ECR へのプッシュをしてみたのですが、その際に入力するコマンドを整理してみたいと思います。

## 流れ

・AWS コンソールで ECR から先にリポジトリを作成しておく
・コマンドを入力して、プッシュして完了

## コマンドの流れ

1. トークン取得、Docker クライアントの認証する

```
aws ecr get-login --no-include-email --region ap-northeast-1

```

これでトークン取得されるので、login する

```
docker login -u AWS -p hogehogehogheoge== https://hogehoge.dkr.ecr.ap-northeast-1.amazonaws.com
```

2. docker のビルド

```
docker build -t hogehoge
```

3. とにかくタグをつける

```
docker tag amazon-ecs-sample:latest hogehoge.dkr.ecr.ap-northeast-1.amazonaws.com/amazon-ecs-sample:latest
```

4. ECR にプッシュ！！

```
docker push hogehoge.dkr.ecr.ap-northeast-1.amazonaws.com/amazon-ecs-sample:latest

```

### denied: Your authorization token has expired. Reauthenticate and try again.

docker のトークン取得をしただけで、ログインできてない

### 完了後

このように ECR にプッシュがかんりょうします

![ecr](/ecr_1.png)
