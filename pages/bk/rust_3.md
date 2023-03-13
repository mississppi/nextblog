---
title: "rusqliteでTODOを作成した"
published: 2022-10-17
category: rust
---

ひととおり触ったのでrusqliteの導入までをやってみました

```

```

まずはhello worldやってみる
```
fn main(){
  println!("{}", "hello world");
}
```

変数にStringを格納する
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
  
引数こみだとこんな感じ
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

よくある構造をやってみた
[article] => [["id" => 1, "content" => "hello"], ["id" => 2, "content" => "hoge"]]
```
//deriveをつければprintlnできる
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

よくあるインプットを受け取る処理
```
fn main(){
  let mut word = input();
}
fn input() -> String{
  let mut word = String::new();
  std::io::stdin().read_line(&mut word).ok();
  return word.trim().to_string();
}
```

ここからが本題。rusqliteを導入する。
Cargo.tomlに追記をして、cargo runする

```
[dependencies]
rusqlite = { version = "0.28.0", features = ["bundled"] }
```

rusqliteでdbファイル読み込んでみる。
存在しなければ作成するのか試す。作成された。
今回は直下に作るとする

```
fn init_db() -> Result<()>{
    let path = "./sample_db.db3";
    let con = Connection::open(&path)?;
    con.execute(
        "create table if not exists posts (
             id integer primary key,
             title text,
             content text
         )",
        NO_PARAMS,
    )?;
    println!("{}", "create!!");
    Ok(())
}
```

dbへのコネクションも定義
```
fn create_connect() ->Result<Connection, rusqlite::Error> {
    let path = "./sample_db.db3";
    let con = Connection::open(&path)?;
    println!("{}", con.is_autocommit());
    Ok(con)
}
```


