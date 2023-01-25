---
title: "javascriptのデータ型、関数、thisなど調べたみた"
published: 2023-01-18
category: typescript
---

reactやるにあたって雰囲気でやってたjsをちゃんと調べた。
その中でわからなかった用語が色々あったのでこれ機にまとめました。

# javascriptのデータ型を整理

まずはプリミティブとオブジェクトに大別される

### プリミティブ型について

インスタンスメソッドは持ってない。  
nullとundefine以外は、ラッパーオブジェクトに自動変換されるという仕様  

種類としては7つあり、この型で値を定義するときにリテラルが使われる。
|  型名  |  説明  |  リテラル  |
| ---- | ---- | ---- |
|  Boolean  |  真偽値  |  true/false  |
|  Number  |  小数も  |  10とか  |
|  BigInt  |  大きな数値  |  100n  |
|  String  |  文字列  |  'と"。`で式にできる  |
|  Symbol  |  識別子  |  ないっぽい  |
|  Null  |  存在しない  |  Nullリテラル  |
|  Undefined  |  nullと区別される  |  リテラルない。プリミティブ値 |

### オブジェクト型について

|  型名  |  リテラル  |
| ---- | ---- |
|  配列 |  []の形式。Arrayオブジェクト  |
|  オブジェクト  | {key:value} 文字列かシンボル。obj[key]かobj.key  |

変数名.__proto__で遡ってみると、Objectベースになってる。  
結局関数もObjectってことになっている  



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

## ここから関数

アロー関数式の特賞として、引数一つだけはかっこが省略できる。
本文returnだけの場合はreturnごと省略できる
```
const add = i => i + 1;
```

## レストパラメータ
引数全部持ってこられる  
```
const all_args = (...args) => {

}
```

# クラスとプロトタイプベースを整理
説明のみ。そもそもプロトタイプは実体のあるオブジェクトで__proto__共通プロパティにある。

```
String.prototype.replace('', 'blank');
```
これはオブジェクトの継承元が保持しているプロトタイプメソッドとも呼ばれる。
