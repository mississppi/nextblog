---
title: "WordPressでAPIサーバ立ててみた"
published: 2020-09-18
category: wordpress
---

今回は WordPress を API サーバとして使って見ました。
あくまでレスポンスとして返却されるまでを作って見ました

## カスタム投稿タイプを取得してみる

[前回の記事](/posts/wp_note2)定義していれば、すぐに確認することができます。

```
curl http://(ここをサイト名)/wp-json/wp/v2/magazine

[
    {
        "id":411,
        "date":"2020-09-20T14:06:56",
        "date_gmt":"2020-09-20T05:06:56",
        "guid":{"rendered":"http:\/\/localhost\/?post_type=magazine&#038;p=411"},
        "modified":"2020-09-20T14:06:56",
        "modified_gmt":"2020-09-20T05:06:56",
        "slug":"music-magazine",
        "status":"publish",
        "type":"magazine",
        "link":"http:\/\/localhost\/blog\/magazine\/music-magazine\/",
        "title":{"rendered":"Music Magazine"},
        "content":{"rendered":"<p>\u30b3\u30f3\u30c6\u30f3\u30c4<\/p>\n","protected":false},
        "author":1,
        "template":"",
        "_links":{"self":[{"href":"http:\/\/localhost\/wp-json\/wp\/v2\/magazine\/411"}],
        "collection":[{"href":"http:\/\/localhost\/wp-json\/wp\/v2\/magazine"}],
        "about":[{"href":"http:\/\/localhost\/wp-json\/wp\/v2\/types\/magazine"}],
        "author":[{"embeddable":true,"href":"http:\/\/localhost\/wp-json\/wp\/v2\/users\/1"}],
        "wp:attachment":[{"href":"http:\/\/localhost\/wp-json\/wp\/v2\/media?parent=411"}],
        "curies":[{"name":"wp","href":"https:\/\/api.w.org\/{rel}","templated":true}]}
    },

    {
        "id":410,"date":"2020-09-20T14:06:42",
        "date_gmt":"2020-09-20T05:06:42","guid":{"rendered":"http:\/\/localhost\/?post_type=magazine&#038;p=410"},
        "modified":"2020-09-20T14:06:42",
        "modified_gmt":"2020-09-20T05:06:42","slug":"%e3%82%b5%e3%83%83%e3%82%ab%e3%83%bc%e3%83%9e%e3%82%ac%e3%82%b8%e3%83%b3",
        "status":"publish",
        "type":"magazine",
        "link":"http:\/\/localhost\/blog\/magazine\/%e3%82%b5%e3%83%83%e3%82%ab%e3%83%bc%e3%83%9e%e3%82%ac%e3%82%b8%e3%83%b3\/",
        "title":{"rendered":"\u30b5\u30c3\u30ab\u30fc\u30de\u30ac\u30b8\u30f3"},
        "content":{"rendered":"<p>\u30b3\u30f3\u30c6\u30f3\u30c4\u90e8\u5206<\/p>\n",
        "protected":false},
        "author":1,
        "template":"",
        "_links":{"self":[{"href":"http:\/\/localhost\/wp-json\/wp\/v2\/magazine\/410"}],
        "collection":[{"href":"http:\/\/localhost\/wp-json\/wp\/v2\/magazine"}],
        "about":[{"href":"http:\/\/localhost\/wp-json\/wp\/v2\/types\/magazine"}],
        "author":[{"embeddable":true,"href":"http:\/\/localhost\/wp-json\/wp\/v2\/users\/1"}],
        "wp:attachment":[{"href":"http:\/\/localhost\/wp-json\/wp\/v2\/media?parent=410"}],
        "curies":[{"name":"wp","href":"https:\/\/api.w.org\/{rel}","templated":true}]}
    }
]
```

## カスタムタクソノミーの値を取得する

カスタムタクソノミーも同様です

```
curl http://(ここをサイト名)/wp-json/wp/v2/magazine_cateogry

[
    {
        "id":30,"count":1,
        "description":"",
        "link":"http:\/\/localhost\/blog\/magazine_category\/music\/",
        "name":"music",
        "slug":"music",
        "taxonomy":"magazine_category",
        "parent":0,"meta":[],
        "_links":{"self":[{"href":"http:\/\/localhost\/wp-json\/wp\/v2\/magazine_category\/30"}],
        "collection":[{"href":"http:\/\/localhost\/wp-json\/wp\/v2\/magazine_category"}],
        "about":[{"href":"http:\/\/localhost\/wp-json\/wp\/v2\/taxonomies\/magazine_category"}],
        "wp:post_type":[{"href":"http:\/\/localhost\/wp-json\/wp\/v2\/magazine?magazine_category=30"}],
        "curies":[{"name":"wp","href":"https:\/\/api.w.org\/{rel}","templated":true}]}
    }
]
```

## レスポンス値を修正する

これで json データをフロントエンドで利用することができますが、  
利用しない項目も多いのでシンプルな形式に変更します

```
"post_id":"記事ID",
"date":"公開日",
"title":"タイトル",
"slug":"スラッグ"
```

### フックを利用して返却値を編集する

レスポンス値を修正するには、フックを利用します。

ファイル: class-wp-rest-posts-controller.php  
メソッド: prepare*item_for_response  
利用するフック: rest_prepare*{\$this->post_type}

```

add_filter( 'rest_prepare_magazine', [$this, 'commonApiFormat'], 10, 3 );

public function commonApiFormat( $response, $post, $request ) {

    // 記事ID取得
    $id = $response->data['id'];

    // 日時を変更
    $date = $response->data['date'];
    $ts = strtotime($date);
    $date = date('Y年m月d日',$ts);

    // タイトル（24文字以降は...）
    $title = wp_trim_words( $response->data['title']['rendered'], 24, '...' );

    // slugを取得
    $slug = $response->data['slug'];

    // 加工したいフォーマットに整形
    $data_formatted = [
      'post_id' => $id,
      'date' => $date,
      'title' => $title,
      'slug' => $slug,
    ];

    return $data_formatted;
}

```

これで返却値を変更することができました

```
[
    {
        "post_id":411,
        "date":"2020\u5e7409\u670820\u65e5",
        "title":"Music Magazine",
        "slug":"music-magazine"
    },
    {
        "post_id":410,
        "date":"2020\u5e7409\u670820\u65e5",
        "title":"\u30b5\u30c3\u30ab\u30fc\u30de\u30ac\u30b8\u30f3",
        "slug":"%e3%82%b5%e3%83%83%e3%82%ab%e3%83%bc%e3%83%9e%e3%82%ac%e3%82%b8%e3%83%b3"
    }
]
```

次回以降は、フックを使って色々遊んでいきたいと思います。
