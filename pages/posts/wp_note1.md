---
title: "WordPressのプラグイン作成してみた"
published: 2020-09-20
category: wordpress
---

今回は Wordpress でプラグインを作成しく上で、
基本的な定義方法、ディレクトリ構成をどう考えていけばいいかを、
私なりにですがまとめていきたいと思います。

サンプルとして、「SamplePlugin」という何も動作しないプラグインを有効にするまでを書いていきます。

## プラグインの定義方法

まずは 以下のディレクトリに好きな名前のディレクトリを作成します

```
wp-content/plugins/SamplePlugin
```

次に SamplePlugin 配下に以下のファイルを作成します

```
CustomInit.php
```

さて、WordPress にどのようにプラグインとして認識させるか。  
これは、起点となるファイルを作成して以下の情報を記載します。

```
/*
Plugin Name: SamplePlugin
Plugin URI: http://www.example.com/plugin
Description: なにもしないプラグイン
Author: my name
Version: 0.1
Author URI: http://www.example.com
*/
```

そうすることで以下のようにプラグインとして認識されるようになります。
(プラグインの管理を確認してみてください)

![プラグイン画面](/wp_note_1.png)

## プラグインを作成する上で、ディレクトリをどう構成するか

次にディレクトリをどう構成するか、ですがあくまで自分流で書いてますが、  
いつも以下の感じで作成しています

```
SamplePlugin
 - CustomInit.php(ここですべてincludeしていく)
 - hogehoge.php
 - fugafuga.php
```

今回はあくまで最初の最初ですが、プラグインの定義方法周りを記載しました。  
プラグイン作成したてのエンジニアに参考になればと。
