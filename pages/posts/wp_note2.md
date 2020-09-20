---
title: "WordPressで投稿タイプ、タクソノミーを定義してみた"
published: 2020-09-20
category: wordpress
---

今回は Wodrpress のプラグインを使って、カスタム投稿タイプ、カスタムタクソノミーを定義してみたので、  
手順などをまとめて見ます。プラグイン作成に参考にしてみてください。

## 準備作業

今回は以下の構成で進めます。

```
SamplePlugin
 - CustomInit.php(ここが起点となるファイル。同改装のファイルをincludeしていく)
 - CreateType.php(今回こちらを作成していく)
```

## カスタム投稿タイプの定義方法

大きな流れとして、以下で考えて進めます。

1. 起点となるフックを、init とする(これはかなり早い段階でのフック)
2. register_post_type メソッドで投稿タイプを定義

```
public function __construct(){
    add_action('init', array($this, 'create_post_type'));
}

publi function create_post_type{
    register_post_type('magazine',array(
        'labels' => array(
            'name' => 'マガジン',
            'singular_name' => 'magazinemanage',
            'add_new' => '新規投稿',
            'add_new_item' => '一覧画面',
            'all_items' => '一覧画面',
            'edit_item' => 'magazine edit',
            'new_item' => 'magazine new',
            'view_item' => 'magazine view',
        ),
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'query_var' => true,
        'rewrite' => true,
        'capability_type' => 'post',
        'hierarchical' => false,
        'menu_position' => false,
        'show_in_rest' => true,
        'supports' => array('title','editor','author')
    ));
}

```

これで管理画面に表示されるようになります。

![投稿タイプ定義](/note2.png)

## カスタムタクソノミーの定義方法

続いてタクソノミーを定義します。  
こちらも考え方としては、

1. register_taxonomy メソッドを使って定義する

```
さきほどのcreate_post_typeの続きに記載します

register_taxonomy(
    'マガジンカテゴリ',
    'magazine',
    array(
        'hierarchical' => true,
        'label' => 'カテゴリ新規',
        'query_var' => true,
        'rewrite' => true,
        'singular_label' => 'magazine category'
    )
);
```

![タクソノミー定義](/note3.png)

これで投稿タイプ、タクソノミーを作成することができました。
自分の好きな種類の記事を管理することができますね。

![新規作成画面](/note4.png)
