---
title: "javascriptのデータ型、関数、クラス、関数型プログラミングなど整理"
published: 2023-01-18
category: ts/js
---

雰囲気だったので改めて自分用に整理した。

## 基本的な型(プリミティブ型)

Boolean ・・・ true/false
Number ・・・ 整数も小数も。
BigInt ・・・ ES2020から追加。Numberとは互換性なし
String ・・・ 文字列
Symbol ・・・ ES2015から追加。
Null ・・・ Nullリテラル
Undefined ・・・ 宣言のみの変数、存在しないプロパティ。nulltとは区別される。

基本的にこの型はインスタンスメソッドは持ってない。  
ラッパーオブジェクトがこれらのオブジェクトとなり、valueOfなどのメソッドが使える
nullとundefine以外は、ラッパーオブジェクトに自動変換される  

## オブジェクト型について

配列　・・・ []で表現
オブジェクト ・・・ keyとvalueで構成。内容物をプロパティと呼ぶ
関数 ・・・ ブロック{}に記載する

プリミティブ以外はオブジェクト型となる

変数名.__proto__で遡ってみると、Objectベースになってる。  
結局関数もObjectである


## 関数の定義方法など

式の場合は最後にセミコロンをつける
```
const fn = function (n) {
    //
};
```

### 第一級オブジェクト
関数もオブジェクトのFunctionインスタンスであること。第一級関数とも呼ばれる。
実際はFunctionオブジェクトの生成するリテラルである

```
nodeでやればすぐデバッグできる
> function fn() {};
> fn.__proto__.constructor.name
'Function'
> fn.__proto__.__proto__.constructor.name
'Object'
```

### アロー関数式

```
const add = (n) => {
    return n + 1;
}

引数一つだけはかっこが省略できる。
本文returnだけの場合はreturnごと省略できる
const add = i => i + 1;
```

### レストパラメータ
引数全部持ってこられる  
```
const all_args = (...args) => {

}
```

## クラスとプロトタイプベースを整理

```
class Cat{

    //コンストラクタはアロー使えない
    constructor(name){
        this.name = name;
    }

    //メンバメソッドはアローでかける
    cry = () {
        console.log();
    }

}
```

### ショートサーキットを整理

```
//?? はnullかundefinedで右側評価。0とから''はそのまま評価
const user = null ?? '名無し';

//? オプショナルチェーン。プロパティがない場合も処理を継続できる
const town = user?.address?.town ?? '住所不定';

```

### モジュールの読み込み

```
//デフォルトエクスポート
const t = (n,m) => n * m;
export default t;

//複数もできる
export {a,b,c};
```

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
