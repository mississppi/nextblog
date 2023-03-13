---
title: "よく使う文字列処理"
published: 2020-09-03
category: php
---

今回は文字列の処理で、よく使うものをまとめました。

## 文字列を分割したい。Explode

規則的な文字列があり、配列に分割したい場合は、Explode を利用します。

```
$arr = "blog, web, art";
$exArr = explode("," , $arr);
```

## 配列を文字列で連結する implode

例えば、取得した配列を元に SQL を生成したい場合、
implode を使うと便利です。

```
// 第一引数を起点に配列を文字列にして連結

$imArr = implode(",", $exArr);

// "blog, web, art"

$sql = 'delete from table_name where genre IN (ここに$imArr)'
```

## パターンにマッチさせたい(●● という文字列のパターンとか) preg_match

```
$return = preg_match(/ここにパターン/, 対象の文字列);
```

```
<?php

if(preg_match("/PHP/", "RUBYって最高")){
    echo "match";
} else {
    echo "no matach";
}

```

## img タグから src 部分のみ取り出してみる

```
$imgSrc =' <img src="img/logo_nav.png" class="img-responsive"> ';

if(preg_match_all('/<img.*src\s*=\s*[\"|\'](.*?)[\"|\'].*>/i', $imgSrc, $match)){
    var_dump($match);
} else {
    echo "no match";
}

```

## そもそもメタ表現復習

| 正規表現 | 概要                   |
| -------- | ---------------------- |
| .        | ひともじ！改行文字以外 |
| \*       | 繰り返し！！0 回以上   |
| \s       | スペース               |
| \"       | ダブクオ               |
| \'       | シングルクオ           |
| "        | "                      | OR 条件だよ！ |
| ?        | 0 回か 1 回！          |

## この処理のポイント

1. img タグと src の間には、スペースとか alt とか class とか色々入ってる。 なので
   「任意の一文字の 0 回以上の繰り返し」という考え方

2. 「=」の前後はスペースを許す、前後に \s\* とする

3. 画像パスってシングルクオ、ダブクオどっちもあるよね。なので、| を使う。
   [\"|\']ってする

4. 重要なパスの部分は、.\*?とするこれは、
   「任意文字の 0 回以上繰り返し、で、0 回または 1 回のみの出現」という意味。
   つまり、マッチした以降も全部取得されてしまうことを防ぐ

```
<img src="./imgs/img_1.jpg" width="5" height="5" alt="画像1">
```

.\* だと。。。こうなっちゃう

```
$img_path_list[1] = "./imgs/img_1.jpg" width="5" height="5" alt="画像1"
```
