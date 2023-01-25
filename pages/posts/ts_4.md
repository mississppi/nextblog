---
title: "関数型プログラミングとか配列のとかを整理"
published: 2023-01-19
category: typescript
---

よく関数型プログラミングとか手続き型とかがでてくるが、全然理解してなかったので整理した


# 関数型プログラミング
入力、出力が同じ出力が保証されている参照透過な関数を組み合わせるスタイルのこと

## Arrayのプロトタイプメソッドを整理

```
map() ・・・要素をひとつずつ加工して配列を返す
posts.map((val) => {console.log(val)});

find() ・・・条件にあった最初の要素を返す。ない場合はundefind
const found = posts.find((val) => {return val.id == target_id});
```

filter() ・・・・・・条件あったもののみを配列を返す
findIndex() ・・・条件に合った最初のインデックスを返す。-1を返すない場合
every()　・・・すべて条件にあうか真偽値で返す
some() ・・・ひとつでも満たすか真偽値で返す
const exist = posts.some((val) => val.id === 20);

reduce() ・・・第二引数に要素が入り、第一引数には前回処理された結果が入ってくる。最後に実行されたものを返す
includes() ・・・指定した値がひとつでも含まれるかを真偽値

## オブジェクトについて
forは使わない方がいいらしい

```
const article = {
    id: 10,
    title: 'タイトル',
    content: '本文',
};

Object.keys(article);
[ 'id', 'title', 'content' ]

Object.values(article);
[ 1, 'タイトル', '本文' ]

Object.entries(article);
[ [ 'id', 1 ], [ 'title', 'タイトル' ], [ 'content', '本文' ] ]
```

反復処理はこれで行えばできるぽい

```
Object.entries(posts).map(([k,v]) => {console.log(k, v)});
id 1
title 'タイトル'
content '本文'
```

### 高階関数
引数に関数を取ったり、戻り値として関数を返す関数のこと
map()とかfilter()も高階関数


### カリー化
複数の引数を引き取る関数をより少なくできる仕組み

