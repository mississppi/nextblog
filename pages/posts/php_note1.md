---
title: "配列操作でよく使う処理"
published: 2020-09-17
category: php
---

今回は配列を操作するときに「あれ？あれどうだったっけ」ということがあったので、  
よく使う処理をまとめました。

## 今回使うサンプルの配列

```

array(5) {
  ["category"]=>
  string(9) "blog"
  ["genre"]=>
  string(6) "cook"
  ["author"]=>
  string(12) "tanabe campesinos"
  ["date"]=>
  string(10) "2018-11-01"
  ["media"]=>
  array(2) {
    ["web"]=>
    string(5) "wired"
    ["tv"]=>
    string(4) "news"
  }
}

```

### キーだけを配列にしたい。array_keys

```
<?php

print_r(array_keys($array));
```

```
Array
(
    [0] => category
    [1] => genre
    [2] => author
    [3] => date
    [4] => media
)
```

### 値のみを配列で取得したい array_values

```
<?php
$values_data = array_values($array);
```

```
Array
(
    [0] => blog
    [1] => cook
    [2] => tanabe campesinos
    [3] => 2018-11-01
    [4] => Array
        (
            [web] => wired
            [tv] => news
        )

)
```

### 配列を値で検索して、一致したキーを取得したい。 array_search

```
$key = array_search('blog', $article_data);
```

```
category
```

### 配列を分割したい。array_chunk

```
<?php
//2個イチで分割したい
print_r(array_chunk($array,2));
```

```
Array
(
    [0] => Array
        (
            [0] => blog
            [1] => cook
        )

    [1] => Array
        (
            [0] => tanabe campesinos
            [1] => 2018-11-01
        )

    [2] => Array
        (
            [0] => Array
                (
                    [web] => wired
                    [tv] => news
                )

        )

)
```

### 前の配列のお尻に、配列を追加。array_merge

同じ[キー]があった場合は、上書きしてしまうよ!

```
$array2 = [
    'modify' => '2018-11-03',
    'gender' => '男',
];
$results = array_merge($array, $array2);
```

### 配列の最後に追加したい array_push

```
array_push($array, 'country');
```

```
Array
(
    [category] => blog
    [genre] => cook
    [author] => tanabe camppesinos
    [date] => 2018-11-01
    [media] => Array
        (
            [web] => wired
            [tv] => news
        )

    [0] => country
)
```

!!! note
\$array[] = hogehoge したほうがいい。

### 指定したキーが配列に存在するか判定 array_key_exists

```
<?php

if(array_key_exists('genre', $array)){
    echo "存在してる"
} else {
    echo "存在していません"
}

```

!!! note
深い配列になるとキーを探せない。今回の場合は、'web'と'tv'

---

### 複数のデータが入った配列から、単一のカラムを返す。array_column

###今回のサンプルデータ

```
$article_data = [
    [
        'category' => 'ブログ',
        'genre' => '料理',
        'date' => '2018-11-01',
    ],
    [
        'category' => 'WEB',
        'genre' => 'スポーツ',
        'date' => '2018-11-03',
    ],
    [
        'category' => 'YOUTUBE',
        'genre' => 'ゲーム',
        'date' => '2018-11-03',
    ],
];
```

```
<?php

$results = array_column($article_data, 'category');
```

```
Array
(
    [0] => ブログ
    [1] => WEB
    [2] => YOUTUBE
)
```

### 複数の配列があって、同じキーの値をまとめたい。マージしたい。上書きしたくない。array_merge_recursive

```
<?php

$a = [
    'category' => 'ブログ',
    'genre' => '料理',
    'date' => '2018-11-01',
    'gender' => 'men',
];

$b = [
    'category' => 'WEB',
    'genre' => 'スポーツ',
    'date' => '2018-11-03',
    'arc' => 'javascript',
];

$results = array_merge_recursive($a, $b);

```

```
Array
(
    [category] => Array
        (
            [0] => ブログ
            [1] => WEB
        )

    [genre] => Array
        (
            [0] => 料理
            [1] => スポーツ
        )

    [date] => Array
        (
            [0] => 2018-11-01
            [1] => 2018-11-03
        )

    [gender] => men
    [arc] => javascript
)
```

### 1 つの配列をキーに、１つの配列を値に。array_combine

###今回仕様した配列

```
$a = ['green','red','yellow'];
$b = ['avocado', 'apple', 'banana'];
$c = array_combine($a, $b);
```

```
Array
(
    [green] => avocado
    [red] => apple
    [yellow] => banana
)
```

### 配列を値でカウントしたい。array_count_values

```
<?php

$article_data = ['category', 'category', 1, 24, 24, 'blog'];
print_r(array_count_values($article_data));
```

```
Array
(
    [category] => 2
    [1] => 1
    [24] => 2
    [blog] => 1
)
```

### 配列の一部をスライスしたい。とある場所からって感じで。array_slice

ここいろいろやってみた

```
<?php

$array = [1,20,300,4,5,6,7,80,909,1000];
$output = array_slice($array, 4);
```

```
array(6) {
  [0]=>
  int(5)
  [1]=>
  int(6)
  [2]=>
  int(7)
  [3]=>
  int(80)
  [4]=>
  int(909)
  [5]=>
  int(1000)
}
```

```
$output = array_slice($article_data, 1);
```

```
Array
(
    [genre] => 料理
    [date] => 2018-11-01
)
```

```
$article_data = [
    [
        'category' => 'ブログ',
        'genre' => '料理',
        'date' => '2018-11-01',
    ],
    [
        'category' => 'WEB',
        'genre' => 'スポーツ',
        'date' => '2018-11-03',
    ],
    [
        'category' => 'YOUTUBE',
        'genre' => 'ゲーム',
        'date' => '2018-11-03',
    ],
];

$output = array_slice($article_data, 1);

```

```
Array
(
    [0] => Array
        (
            [category] => WEB
            [genre] => スポーツ
            [date] => 2018-11-03
        )

    [1] => Array
        (
            [category] => YOUTUBE
            [genre] => ゲーム
            [date] => 2018-11-03
        )

)
```

### 配列に対してコールバック関数で、色々処理したい。array_map

```
function cube($n){
    return ($n * $n);
}

$array = [ 1,2,3,4,5 ];

$results = array_map("cube" , $array);

```

```
Array
(
    [0] => 1
    [1] => 4
    [2] => 9
    [3] => 16
    [4] => 25
)
```

####　例えば、配列にひとつ追加したい。そんな時はこんな感じ

```
$article_data = [
    [
        'category' => 'ブログ',
        'genre' => '料理',
        'date' => '2018-11-01',
    ],
    [
        'category' => 'WEB',
        'genre' => 'スポーツ',
        'date' => '2018-11-03',
    ],
    [
        'category' => 'YOUTUBE',
        'genre' => 'ゲーム',
        'date' => '2018-11-03',
    ],
];
```

```
function addValue($n){
    $n['tag'] = 2018;
    return $n;
}

$results = array_map("addValue" , $article_data);
```

```
Array
(
    [0] => Array
        (
            [category] => ブログ
            [genre] => 料理
            [date] => 2018-11-01
            [tag] => 2018
        )

    [1] => Array
        (
            [category] => WEB
            [genre] => スポーツ
            [date] => 2018-11-03
            [tag] => 2018
        )

    [2] => Array
        (
            [category] => YOUTUBE
            [genre] => ゲーム
            [date] => 2018-11-03
            [tag] => 2018
        )

)
```

### 配列の置換したい。(したい配列、したい文字列の配列) array_replace

```
$base = ["PHP"];
$replacements = ["WordPress"];

$basket = array_replace($base, $replacements);
```

```
Array
(
    [0] => WordPress
)
```

### この配列から取得したい。取得対象はもう一方の配列にあるもので判定したい。array_intersect_key

```
$baseArray = [
    'php' => 'beginner',
    'wordpress' => 'Intermediate',
    'AWS' => 'beginner',
    'Linux' => 'Intermediate',
    'HTML' => 'beginner',
    'SQL' => 'expart'
];

$needleArray = [
    'php' => 'back',
    'AWS' => 'server',
    'SQL' => 'DB'
];

$results = array_intersect_key($baseArray, $needleArray);
```

```
Array
(
    [php] => beginner
    [AWS] => beginner
    [SQL] => expart
)
```

---

### 配列のキーと値を反転したい。array_flip

例えば CSV のインポート処理で、1 行目のキーを反転させることで、
キーで指定できたりして便利

```
$needleArray = [
    'php' => 'back',
    'AWS' => 'server',
    'SQL' => 'DB'
];

$results = array_flip($needleArray);
```

```
Array
(
    [back] => php
    [server] => AWS
    [DB] => SQL
)
```

!!! danger
もちろんキーが重複すると衝突してしまう(どんどん上書き)

### この配列と他の配列を比べて、ないものだけを取得したい array_diff

```
$baseArray = [
    'php', 'wordpress', 'AWS', 'LINUX'
];

$needleArray = [
    'wordpress', 'LINUX'
];
$results = array_diff($baseArray, $needleArray);
```

```
Array
(
    [0] => php
    [2] => AWS
)
```

### この配列と、他の配列をキーだけで比べる。ないものだけを、この配列から取得する array_diff_key

```
$baseArray = [
    'php' => 'beginner',
    'wordpress' => 'Intermediate',
    'AWS' => 'beginner',
    'Linux' => 'Intermediate',
    'HTML' => 'beginner',
    'SQL' => 'expart'
];

$needleArray = [
    'HTML' => 'beginner',
    'php' => 'back',
    'AWS' => 'server',
    'SQL' => 'DB'
];

$results = array_diff_key($baseArray, $needleArray);
```

```
Array
(
    [wordpress] => Intermediate
    [Linux] => Intermediate
)
```

### この配列と、他の配列をキーと値セットで比べる。ないものだけを、この配列から取得する array_diff_assoc

```
$results = array_diff_assoc($baseArray, $needleArray);
```

```
//キーと値をセットで見て、ないもののみ抽出してくれる　

Array
(
    [php] => beginner
    [wordpress] => Intermediate
    [AWS] => beginner
    [Linux] => Intermediate
    [SQL] => expart
)
```
