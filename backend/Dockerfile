# 使用したいRubyのimageを指定
FROM ruby:3.1.3

ARG RUBYGEMS_VERSION=3.3.20

# 必要なパッケージをインストール
RUN apt-get update -qq && \
  apt-get install -y \
  postgresql-client \
  curl \
  apt-transport-https \
  wget \
  gnupg2 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# yarnパッケージ管理ツールをインストール
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && \
  apt-get install -y yarn && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# Node.jsをインストール
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
  apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 1655A0AB68576280 && \
  apt-get update && \
  apt-get install -y nodejs && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

RUN mkdir /backend
WORKDIR /backend

# Gemをインストール
COPY Gemfile Gemfile.lock ./
RUN gem install bundler && \
  gem update --system ${RUBYGEMS_VERSION} && \
  bundle install

COPY . .

# Rails固有のエントリーポイント対応
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Railsサーバーの起動
EXPOSE 3010

CMD ["rails", "server", "-b", "0.0.0.0", "-p", "3010"]
