#!/bin/bash

# フロントエンドのビルド
cd frontend
npm install
npm run build

# バックエンドの依存関係のインストール
cd ../backend
bundle install

# データベースのマイグレーション
bundle exec rails db:migrate
