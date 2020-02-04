FROM ubuntu:18.04

WORKDIR /app/sc2

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get install wget gnupg2 tar -y

# Postgresql
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg main" > /etc/apt/sources.list.d/pgdg.list
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN apt-get update
RUN apt-get install postgresql-11 -y

# Install NodeJs
RUN wget -O - https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install -y nodejs

ADD ./docker/pg/init.sql .
ADD ./dist .

# Init db
USER postgres
RUN service postgresql start && \
  psql -f /app/sc2/init.sql

# Install package
USER root
RUN npm install --production

# Install flyway
RUN wget -qO- https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/6.2.1/flyway-commandline-6.2.1-linux-x64.tar.gz | tar xvz && ln -s `pwd`/flyway-6.2.1/flyway /usr/local/bin 

# Migrate
RUN service postgresql start && \
  flyway -url=jdbc:postgresql://localhost/sctest -user=sctest -password=sctest -connectRetries=60 -locations=filesystem:/app/sc2/migrations migrate

# Accept remote connect
RUN echo "host all  all    0.0.0.0/0  md5" >> /etc/postgresql/11/main/pg_hba.conf
RUN echo "listen_addresses='*'" >> /etc/postgresql/11/main/postgresql.conf

EXPOSE 3000 5432

VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]

CMD ["sh","-c","service postgresql start && npm start"]