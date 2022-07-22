-- Create a database for our demo.
-- CREATE DATABASE webstore;

-- Setup the database schema.

CREATE TABLE merchant (

    id BIGSERIAL,
    name TEXT,
    description TEXT,
    category TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    logo bytea,
    logotype text,
    image bytea,
    imagetype text

);

CREATE TABLE product (

    id BIGSERIAL,
    name TEXT,
    description TEXT,
    prod_group TEXT,
    price INTEGER,
    quantity INTEGER,
    logo bytea,
    logotype text,
    image bytea,
    imagetype text,
    merchantid INTEGER

);

CREATE TABLE category (

    id BIGSERIAL,
    name TEXT,
    imagetype TEXT,
    image bytea

);

CREATE TABLE product_group (

    id BIGSERIAL,
    name TEXT,
    merchantid INTEGER

);

