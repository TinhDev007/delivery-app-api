-- Create a database for our demo.
-- CREATE DATABASE webstore;

-- Setup the database schema.
-- CREATE EXTENSION pgcrypto;
CREATE TABLE usr (

    id BIGSERIAL,
    email TEXT,
    role TEXT,
    CONSTRAINT usr_email_unique UNIQUE (email)
);

CREATE TABLE admin (

    id BIGSERIAL,
    email TEXT,

    CONSTRAINT admin_email_unique UNIQUE (email)
);

CREATE TABLE client (

    id BIGSERIAL,
    email TEXT,

    CONSTRAINT client_email_unique UNIQUE (email)

);

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

-- TRIGGER INSERT TO ADMIN
CREATE OR REPLACE FUNCTION insert_admin_trigger_function() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
   INSERT INTO public.usr(
	email, role)
	VALUES (NEW.email, 'admin'); 
    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER insert_admin_trigger 
    BEFORE INSERT ON public.admin 
    FOR EACH ROW
    EXECUTE PROCEDURE insert_admin_trigger_function();

-- TRIGGER INSERT TO MERCHANT
CREATE OR REPLACE FUNCTION insert_merchant_trigger_function() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
   INSERT INTO public.usr(
	email, role)
	VALUES (NEW.email, 'merchant'); 
    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER insert_merchant_trigger 
    BEFORE INSERT ON public.merchant 
    FOR EACH ROW
    EXECUTE PROCEDURE insert_merchant_trigger_function();

-- TRIGGER UPDATE TO MERCHANT
CREATE OR REPLACE FUNCTION update_merchant_trigger_function() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
    IF NEW.email <> OLD.email THEN
        UPDATE public.usr
        SET email=NEW.email
        WHERE email=OLD.email;
    END IF;
    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER update_merchant_trigger 
    BEFORE UPDATE ON public.merchant 
    FOR EACH ROW
    EXECUTE PROCEDURE update_merchant_trigger_function();

-- TRIGGER INSERT TO USER
CREATE OR REPLACE FUNCTION insert_user_trigger_function() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
   INSERT INTO public.usr(
	email, role)
	VALUES (NEW.email, 'user'); 
    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER insert_user_trigger 
    BEFORE INSERT ON public.client 
    FOR EACH ROW
    EXECUTE PROCEDURE insert_user_trigger_function();

--TRIGGER UPDATE TO USER
CREATE OR REPLACE FUNCTION update_user_trigger_function() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
    IF NEW.email <> OLD.email THEN
        UPDATE public.usr
        SET email=NEW.email
        WHERE email=OLD.email;
    END IF;
    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER update_user_trigger 
    BEFORE UPDATE ON public.client 
    FOR EACH ROW
    EXECUTE PROCEDURE update_user_trigger_function();



