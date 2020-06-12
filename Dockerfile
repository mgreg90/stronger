# This Dockerfile does not build the client application. You must do that
# manually before building this docker container.

FROM ruby:2.7.1
MAINTAINER mgregory8219@gmail.com

# run rails in production
ENV RAILS_ENV production
ENV RAILS_LOG_TO_STDOUT true

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
CMD bundle exec rails s --port 80 && /usr/sbin/sshd

# copy app
COPY ./server .

# TODO we probably shouldn't be running migrations this way. Investigate
# run db migrations and seed data
RUN rake db:migrate data:seed
