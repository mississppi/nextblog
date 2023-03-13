---
title: "LOADコマンドでcsvインポートしてみた"
published: 2022-05-30
category: mysql
---

# LOADコマンドでcsvインポートしてみた
LOADコマンドが最速と聞いたので試したみた

## pythonでcsv生成
100万件でためす

```
import csv

counter = 1000000
f = open("./mysql.csv", "w", encoding="utf-8")
writer = csv.writer(f)
for c in range(counter):
    if c == 0:
        continue
    result = ['title', 'content']
    writer.writerow(result)
f.close()
print(counter)
```

## LOADコマンド

```
mysql> LOAD DATA LOCAL INFILE 'mysql.csv' INTO TABLE posts FIELDS TERMINATED BY ',';
```

### ERROR 3948 (42000): Loading local data is disabled; this must be enabled on both the client and server sides

## クライアントとサーバ側で許可する

```
クライアント側
mysql -uroot -p --enable-local-infile

鯖側
mysql> set global local_infile=on;
```

```
mysql> select @@local_infile;
+----------------+
| @@local_infile |
+----------------+
|              1 |

```

## 実際に入れてみた
確かに早い45秒だった

```
Query OK, 999990 rows affected, 9 warnings (44.56 sec)
```
