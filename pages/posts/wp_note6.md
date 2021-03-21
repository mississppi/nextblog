---
title: "wprestapiの性能を確認してみた"
published: 2020-11-27
category: wordpress
---

今日は wpcli を使って、記事を作成してみたいと思います。

1. post を作成

```
wp post create \
  --allow-root \
  --post_content="<h2>test</h2>" \
  --post_title="test" \
  --post_status="Publish" \
  --post_type="Post" \
  --post_date="2019-6-16 00:00:00" \
  --post_modified="2019-6-16 00:00:00"
```
