---
title: "rustの検証環境作ってみた"
published: 2020-10-10
category: rust
---

rustになれるためにdocker-composeを用意してみた

```
version: '3'
services:
  rust:
    build: .
    tty: true
    volumes:
      - .:/app
```

```
FROM rust:latest
WORKDIR /app
```