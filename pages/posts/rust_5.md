---
title: "tauriを使ってフロントとバックでやりとりしてみた"
published: 2022-11-10
category: rust
---

tauriで新規作成したプロジェクトで、フロントとバックでやりとりをしてみた。  
選択したのは、react(ts)で作成  

## tauriの起動
```
npm run tauri dev
```

## rust側実装
rust側のmainメソッドにcallというメソッドを用意した。  
これをinvoke_handlerで追記しておく。これでrust側は準備完了
```
#[tauri::command]
fn call() {
  println!("call_from_front");
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      call,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
```

## フロント側実装
疎通の確認のためだけにボタンを作成しておく
```
const List = () => {
    return (
        <div className="list">
            <button>ボタン</button>
        </div>
    )
}
export default List
```

フロント側はとりあえずテスト用としてコンポーネントを作成して起動  
![テスト用](/tauri01.png)

次に押下時にrustに送信するクリックメソッドを作成  
invoke('rust側で設定したメソッド')とすればコール可能となる  
*invokeをimportする必要がある  
```
import {invoke} from '@tauri-apps/api/tauri';

const List = () => {
    function click() {
        invoke('call');
    }
    return (
        <div className="list">
            <button onClick={click}>ボタン</button>
        </div>
    )
}
```

これでボタンをクリックすることで、rust側のコンソールにメッセージが表示されるようになった  

## フロントからidとタイトルと本文をrust側へ渡す
```
const List = () => {
    function click() {
        invoke('call', {id:10, title:"タイトル", content:"コンテント"});
    }
    return (
        <div className="list">
            <button onClick={click}>ボタン</button>
        </div>
    )
}
```

rust側も受け取るように修正する
```
#[tauri::command]
fn call(id: u64, title: String, content: String) {
  println!("{}", id);
  println!("{}", title);
  println!("{}", content);
}
```

## rust側からフロントへデータを送信する

```
#[tauri::command]
fn article() -> String{
  "from rust".into()
}
```

フロント側はthenで繋げて取り出す
```
function get_article() {
    invoke('article').then((message) => console.log(message))
}
```