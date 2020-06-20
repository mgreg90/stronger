# This Dockerfile does not build the client application. You must do that
# manually before building this docker container.

FROM ruby:2.7.1-alpine
MAINTAINER mgregory8219@gmail.com

ARG ssh_username
ARG ssh_password

# run rails in production
ENV RAILS_ENV production
ENV RAILS_LOG_TO_STDOUT true

RUN \
  apk update && \
  apk add --no-cache \
    build-base \
    openssh \
    postgresql-dev \
    tzdata && \
  echo "$ssh_username:$ssh_password" | chpasswd

COPY sshd_config /etc/ssh/

# application will be in /app on server
WORKDIR /app

# copy dependencies
COPY server/Gemfile server/Gemfile.lock ./

# install dependencies
RUN bundle config set deployment 'true' && bundle config set without 'development test'
RUN bundle install --jobs 15

# expose port 80 for web server and 2222 for ssh
EXPOSE 80 2222

# run server
COPY init.sh ./
CMD sh init.sh

# copy app
COPY ./server .

# TODO we probably shouldn't be running migrations this way. Investigate
# run db migrations and seed data
RUN rake db:migrate data:seed
