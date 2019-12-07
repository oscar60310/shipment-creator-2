CREATE DATABASE sctest;
CREATE USER sctest with encrypted password 'sctest';
GRANT all privileges on DATABASE sctest to sctest;