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
```
//引数込みだとこんな感じ
fn main(){
  getId(10);
}

fn getId(id: i32){
    println!("{}", id);
}
```

まず文字列受け取って表示
```
fn main(){
    let input = input();
    println!("{}", input);
}

fn input() -> String{
    let mut word = String::new();
    std::io::stdin().read_line(&mut word).ok();
    return word.trim().to_string();
}
```

```
```

```
```



```
```

```
```

```
```

```
```

```
```