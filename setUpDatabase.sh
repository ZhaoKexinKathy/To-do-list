#!/bin/bash

# Install PostgreSQL on Mac
brew install postgresql

# Start the PostgreSQL server
pg_ctl -D /usr/local/var/postgres start

# Create a role named "todoadmin" with the password "administration"
createuser -P todoadmin

# Alter the role to allow it to create databases
psql -c "ALTER ROLE todoadmin CREATEDB;"


# Connect to the "postgres" database as the "todoadmin" role
psql -U todoadmin -d postgres

# Create a new database named "todolist"
createdb todolist

# Connect to the "todolist" database
psql -U todoadmin -d todolist

# Create tables
psql -U todoadmin -d todolist -c "CREATE TABLE users (id serial PRIMARY KEY, name text, email text);"
psql -U todoadmin -d todolist -c "CREATE TABLE tasks (id serial PRIMARY KEY, user_id integer, task text);"
psql -U todoadmin -d todolist -c "CREATE TABLE usage (id serial PRIMARY KEY, user_id integer, action text);"
psql -U todoadmin -d todolist -c "CREATE TABLE history (id serial PRIMARY KEY, task_id integer, status text);"
psql -U todoadmin -d todolist -c "CREATE TABLE translate (id serial PRIMARY KEY, text text, language text);"
