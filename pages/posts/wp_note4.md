---
title: "WordPressのRESTAPIで検索条件を設定"
published: 2020-09-18
category: wordpress
---

今回は WordPress で RESTAPI の検索条件を設定した方法を紹介します。  
WordPress がデフォルトで用意している検索クエリもありますが、  
独自で追加する方法もあります。  
サンプルとしてタイトルで検索する処理を作って見たいと思います。

またあらかじめ [こちら](/posts/wp_note2) の記事で、返却されるキーを削除しています。

## 記事タイトルで検索する条件を追加したい

ファイル: class-wp-rest-posts-controller.php  
メソッド: get*items  
利用するフック: "rest*{\$this->post_type}\_query"

```
add_filter( 'rest_magazine_query', [$this, 'searchMagazineQuery', 10, 2 );

pubilc function searchMagazineQuery( $args, $request ) {
    if ( isset( $request['posttitle'] ) ) {
        $args['title'] = esc_attr( $request['posttitle'] );
    }
    return $args;
}
```

### 実際に検索してみた

```
curl http://localhost/wp-json/wp/v2/magazine?posttitle=test

[
    {
        "post_id":412,"date":"2020\u5e7409\u670820\u65e5","title":"test","slug":"test"
    }
]

```

## 一覧の並び順を変更する

WordPress の REST API はプラグインでも並び順が制御できないことがありました。
(プラグインによりけりですが)

プラグインのキーとなる「order_num」を聞かせるように処理して行きます。

```
add_filter( 'rest_magazine_query', [$this, 'searchMagazineQuery', 10, 2 );

pubilc function searchMagazineQuery( $args, $request ) {
    if(isset($request['customorder'])){
        $args['orderby']             = 'order_num';
        $args['order']               = 'asc';
    }
    return $args;
}
```

今日は田辺の経験上ですが、検索条件をカスタマイズしてみました。
次回は、WordPress の検索クエリをソースで見て行きたいと思います。
