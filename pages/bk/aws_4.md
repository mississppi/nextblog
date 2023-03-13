---
title: "タスク定義してみた"
published: 2020-11-02
category: aws
---

とりあえず ECS でタスクを作る際に、用語を自分なりに整理しました

## タスク定義とは

とにかく複数コンテナをグループにしたもの。
前回の記事で ECR にイメージを push しておく

## 方法

今回は 2 つのコンテナを 1 つのインスタンスで動作させるための、json で定義してみます

## json ファイル

## タスク定義を ECS 上に登録します

```
aws ecs register-task-definition --cli-input-json file://hogehoge.json
```

## やっぱ編集したい場合
