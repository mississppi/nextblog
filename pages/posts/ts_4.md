---
title: "typescriptの用語を整理"
published: 2023-02-04
category: ts/js
---

## 型について
基本的なプリミティブ型はjsと全く同じ7種類

## interfaceでの型定義

```
interface User {
    id: number;
    name: string;
    //?でreadonly
    alias?: string;
}

const user1: User = {id: 1, name: 'ss'};
```

## インデックスシグネチャ
```
//キーも縛ることができる、これがインデックスシグネチャ
interface Status {
    [param: string] = number;
}
```

## リテラル型

# 関数の定義

```
const add = (n: number, m:number): number => n + m;

//何も返さない場合はvoid
const hello = (): void => {
    console.log('hello');
}
console.log(add(1,1));
hello();
```

```
//引数と戻り値の方を別々に定義できる
interface Op{
    (n:number, m:number): number;
}

const add: Op = (n,m) => n+m;
```

## ジェネリクス定義

```
function toArray<T>(arg1: T, arg2: T) {
    return [arg1, arg2];
}

toArray<number>(11,111);
``` 

## クラス定義

```
interface Post{
    id: number;
    title: string;
}
``` 
