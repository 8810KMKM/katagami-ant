FROM ruby:2.6.5-slim

# db, js関係の環境をインストール
RUN apt-get update -qq && apt-get install -y mariadb-client libmariadb-dev-compat build-essential apt-transport-https curl imagemagick && \
  curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
  apt-get install -y nodejs && \
  curl -sS http://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get install -y yarn

# Rails (bundle install)
RUN mkdir /katagami-ant
WORKDIR /katagami-ant
COPY Gemfile /katagami-ant/Gemfile
COPY Gemfile.lock /katagami-ant/Gemfile.lock
RUN bundle install
COPY . /katagami-ant
