---
title: "rustでcliを作ってみた"
published: 2022-10-11
category: rust
---

とりあえず今日はrustでcliアプリとして文字入力を受けとって色々する。までをやってみました。  
ただ初めて触るので最低限のことも書いてみた

```
//実行方法
rustc hello.rs 
./hello
```

とりあえずhelloworld
```
fn main(){
  println!("{}", "hello world");
}
```

変数つかう
```
//変数で表示
let hello = String::from("hello world");
println!("{}", hello);
```
  
関数化して呼んでみる
```
fn main(){
  getId();
}

fn getId(){
    println!("{}", "call!!");
}

```
  
引数込みだとこんな感じ
```
fn main(){
  getId(10);
}

fn getId(id: i32){
    println!("{}", id);
}
```

戻り値を変数に格納する  
参照だけなら&strでOKみたい  
```
fn main(){
    let slug = String::from("sample");
    let id = search_id(&slug);
    println!("{}", id);
}

fn search_id(slug: &str) -> i32{
    return 10;
}
```

よくある構造をやってみたい
[article] => [["id" => 1, "content" => "hello"], ["id" => 2, "content" => "hoge"]]
```
//これをつければprintlnできる
#[derive(Debug)]
struct Article {
    id: u64,
    title: String,
    content: String,
}

fn main(){
    let mut article = Article {
        id :1 ,
        title : String::from("タイトル"),
        content : String::from("本文"),
    };
    //{:?}で出力できる
    println!("{:?}", article);
}
```