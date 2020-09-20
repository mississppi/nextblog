---
title: "WP REST APIのコアファイルを解析してみた"
published: 2020-09-18
category: wordpress
---

今日は WP REST API の記事取得のコアとなる部分を読んでみる機会があったので、
こちらにメモがわりに処理内容を書きたいと思います。

## class-wp-rest-posts-controller.php の処理内容について

記事を取得するにあたり、クエリ改造したり、取得したレスポンスいじるとか色々できる。  
フックが用意されている箇所をまとめる

#### class-wp-rest-posts-controller.php の格納場所

wordpress/wp-includes/rest-api/endpoints/class-wp-rest-posts-controller.php

## get_items について

以下のフックで、 \$args をカスタマイズすることで、  
検索条件を作成することができます。

```
261行目 $args = apply_filters( "rest_{$this->post_type}_query", $args, $request );
```

### rest_post_query の使い道

例えば \$args[post_name__in] に配列を入れることで、slug 検索できるようにする。  
検索パラメータで slug が別の key でマッピング定義されている時に、  
このクエリを使って slug を導き出してから、\$args に格納する。など。

```
306行目 $data = $this->prepare_item_for_response( $post, $request );
```

### prepare_item_for_response について

DB から値を取得済みの状態でのフック。  
このデータを返却できるようにオブジェクトに格納しなおしてる(命名も)

```
1613行目 return apply_filters( "rest_prepare_{$this->post_type}", $response, $post, $request );
```

DB の生データをオブジェクトにしてる、この途中で加工することができる。
例えばタイトル 20 文字以上は...にするとか。

```
add_filter('rest_prepare_news', [$this, 'myQuery'], 10, 3);
```

最終的に、WP_Query クラスを初期化して、query_args を引数にして、
検索を実行している

```
$posts_query  = new WP_Query();
$query_result = $posts_query->query( $query_args );
```

ざっくりですが、このあたりの処理を見てきました。
