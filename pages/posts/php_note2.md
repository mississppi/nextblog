---
title: "よく使う判定処理"
published: 2020-09-18
category: php
---

今回は、PHP でよく使っている判定処理をまとめていきたいと思います。

## 配列に特定の値があるか調べたい in_array

true でデータ型も比較できる

```
$array = [1,2,3];

if(in_array(1, $array, true)){
    echo "あり";
    exit;
}else{
    echo "なし";
    exit;
}
```

#### in_array で true になるケース

```
<?php

//整数での5
$id = "5";

//これもtrueになる
$boo = in_array($id, [0,1,2,3,4,5]);
```

#### 追記

```
<?php

//少数での "5.0"
$id = "5.0";

//これもtrueになる
$boo = in_array($id, [0,1,2,3,4,5]);
```

#### 以下のケースでも true になる。。。

第三引数に true を入れよう === になる

```
<?php

//文字列での "apple"
$id = "apple";

//これもtrueになる...
$boo = in_array($id, [0,1,2,3,4,5]);
```

## 変数に値が入ってるか、null 以外がはいってるか。isset()

#### とりあえず初期化されたものかどうか、という判定なので、 "" とか array() とかでも true として返る

未定義と、null 以外は　 true が返ると覚える?

```
<?php
//true
$var = "";
//true
$var = [];
```

```
<?php

//yes
$var = "a";
//yes
$var = "";
//yes
$var = null;

if(isset($var)){
    echo "yes";
    exit;
} else {
    echo 'no';
    exit;
}
```

!!! note
返り値は、true か false

## 変数の存在から確認したい empty

変数が存在しない！ 値が空か null がセットされてる場合のみ true
isset とは対照的な関数

```
<?php

$i = "";
$u = array();
$o = [];
$k = null;

```

#### ここらへんを省きたい場合は、!(empty)をよく使う
