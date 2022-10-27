---
title: "OptionとResult調べてみた"
published: 2022-10-26
category: rust
---

rustをいじっていて避けて通れないっぽいのが、OptionとかResultの考え方。
これを自分なりに整理してみた。

# Option型について
どうやら値がない場合も考慮する時は、Optionを利用するとのこと。  
仮にkeyを使ってニュースを検索する処理を想定してやってみた。  
Articleはすでに定義済みとする。  

```

fn handler(){
    //matchがすごいわかりやすい
    match find_by_key(100) {
        Some(article) => println!("{:?}", article),
        None => println!("failure")
    }
}

fn find_by_key(id: u64) -> Option<Article>{
    if id == 100 {
        Some( Article {
            id: id,
            title: String::from("仮のタイトル"),
            content: String::from("仮の本文"),
        })
    } else {
        None
    }
}
```

#Result型について
今度はエラーが発生するかもしれない場合を扱うResultでやってみます。  
同様にmatchで取り出してみます。  

```
fn handler(){
    match result("900") {
        Ok(r) => println!("{}", r),
        Err(e) => println!("{}", e),
    }
}

fn result(num: &str) -> Result<i32, ParseIntError>{
    return match num.parse::<i32>(){
        Ok(n) => return Ok(n),

        //invalid digit found in stringが表示される
        Err(e) => Err(e),
    };
}

```