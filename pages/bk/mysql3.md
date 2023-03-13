---
title: "indexを貼ってみた"
published: 2022-06-11
category: mysql
---

# インデックス貼ってみた
テストデータとしては、100万件のデータを試す。
カーディナリティは一応10%以下として作成しました。

## コマンド

```
ALTER TABLE posts ADD INDEX `type_index` (`type`(255));
```

## 確認コマンド

```
show index from posts\G


*************************** 2. row ***************************
        Table: posts
   Non_unique: 1
     Key_name: type_index
 Seq_in_index: 1
  Column_name: type
    Collation: A
  Cardinality: 6
     Sub_part: 255
       Packed: NULL
         Null: YES
   Index_type: BTREE
      Comment: 
Index_comment: 
      Visible: YES
   Expression: NULL
2 rows in set (0.05 sec)
```