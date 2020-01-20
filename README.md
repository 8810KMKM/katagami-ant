# README

## Katagami-ant

九州工業大学 情報工学部 坂本研究室 2019 年度 B4 大隈隼 の卒業研究の制作物.

## 概要

画像認識のためのアノテーションツール.  
アプリ名の'Katagami' は, 同研究室が取り組んで来る共同研究のテーマである  
「型紙画像の自動ラベリング」が由来している.

<br />

## アプリ構成

- バックエンド : Rails on Docker
  - MySQL
  - Redis
- フロントエンド : React

<br />

## 開発構築

アプリケーションサーバー起動

```
$ docker-compose build
$ docker-compose run web rails db:migrate
$ docker-compose up -d
```

Web サーバ起動

```
$ cd front && yarn
$ yarn start
```

DB にアクセス

```
$ docker exec -it katagmai-ant_db_1 /bin/bash
$ mysql -u root -p
```

キャッシュストアにアクセス

```
$ docker exec -it katagmai-ant_redis_1 /bin/bash
$ redis-cli
```
