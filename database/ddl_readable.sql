-- Create a database for our demo.
-- CREATE DATABASE webstore;

-- Setup the database schema.
-- CREATE EXTENSION pgcrypto;

CREATE TABLE admin (

    id BIGSERIAL,
    email TEXT,

    CONSTRAINT admin_email_unique UNIQUE (email)
);

INSERT INTO public.admin(
	email)
	VALUES ('admin@user123.com');


CREATE TABLE client (

    id BIGSERIAL,
    email TEXT,

    CONSTRAINT client_email_unique UNIQUE (email)

);

CREATE TABLE merchant (

    id BIGSERIAL,
    name TEXT,
    password TEXT,
    description TEXT,
    category TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    logo bytea,
    logotype text,
    image bytea,
    imagetype text,

    CONSTRAINT merchant_email_unique UNIQUE (email)
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

