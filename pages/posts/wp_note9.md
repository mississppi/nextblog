---
title: "プラグインのテスト環境構築してみた"
published: 2022-09-23
category: wordpress
---

重い腰をあげてプラグインのテスト環境構築してみた。

## 環境
wordpress: 6.0.2
php: 7.4.30
phpunit: 7.5.9

## 今回やること
必要なツールをインストール  
wordpress側で用意しているコマンドを実行 
最近よくあるエラーの対応方法 
composerはすでに導入済み

## ツールのインストール

```
apt install -y sudo git default-mysql-client subversion
```

## コマンドの実行
作成済みのプラグインに対してコマンドを実行する

```
wp scaffold plugin mississippi --allow-root
```

これでtestディレクトリが作成される

## テスト用dbの作成

```
cd プラグイン直下まで
bash bin/install-wp-tests.sh wordpress_test wordpress 'wordpress' db latest
```

また、/tmp配下にwordpressがインストールされる

```
cd /tmp
ls 
wordpress  wordpress-tests-lib  wordpress.tar.gz  wp-latest.json
```

これでテスト環境構築完了

## テスト実行ができる

```
phpunit
```

## エラーが表示される
このエラーが出た時は、ライブラリが必要になっている

```
Error: The PHPUnit Polyfills library is a requirement for running the WP test suite.
If you are trying to run plugin/theme integration tests, make sure the PHPUnit Polyfills library (https://github.com/Yoast/PHPUnit-Polyfills) is available and either load the autoload file of this library in your own test bootstrap before calling the WP Core test bootstrap file; or set the absolute path to the PHPUnit Polyfills library in a "WP_TESTS_PHPUNIT_POLYFILLS_PATH" constant to allow the WP Core bootstrap to load the Polyfills.

If you are trying to run the WP Core tests, make sure to set the "WP_RUN_CORE_TESTS" constant to 1 and run `composer update -W` before running the tests.
Once the dependencies are installed, you can run the tests using the Composer-installed version of PHPUnit or using a PHPUnit phar file, but the dependencies do need to be installed whichever way the tests are run.
```

プラグイン直下にcomposer.jsonを作成し、install
```
{
	"require-dev": {
		"yoast/phpunit-polyfills": "^1.0"
	}
}
```

また、bootstrap.phpにこのライブラリを読み込むよう追記する

```
require dirname( dirname( __FILE__ ) ) . '/vendor/yoast/phpunit-polyfills/phpunitpolyfills-autoload.php';s
```

## プラグインを読み込む

bootstrap.phpに読み込みを指定する箇所があるので好きに変える

```
/**
 * Manually load the plugin being tested.
 */
function _manually_load_plugin() {
	require dirname( dirname( __FILE__ ) ) . '/mississippi.php';
}
```

## どのテストが実行されるか

phpunit.xml.distに記載されている

```
	<testsuites>
		<testsuite>
			<directory prefix="test-" suffix=".php">./tests/</directory>
			<exclude>./tests/test-sample.php</exclude>
		</testsuite>
	</testsuites>
```