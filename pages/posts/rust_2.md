---
title: "rust触ってみた"
published: 2020-10-10
category: rust
---

とりあえず今日はrustでcliアプリとして文字入力を受けとって色々する、までをやってみました

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