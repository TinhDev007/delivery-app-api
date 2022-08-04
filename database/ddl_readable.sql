-- Create a database for our demo.
-- CREATE DATABASE webstore;

-- Setup the database schema.
-- CREATE EXTENSION pgcrypto;
CREATE TABLE usr (

    id BIGSERIAL,
    email TEXT,
    role TEXT,
    PRIMARY KEY (id),
    CONSTRAINT usr_email_unique UNIQUE (email)
);

CREATE TABLE admin (

    id BIGSERIAL,
    email TEXT,
    PRIMARY KEY (id),
    CONSTRAINT admin_email_unique UNIQUE (email)
);

CREATE TABLE client (

    id BIGSERIAL,
    email TEXT,
    PRIMARY KEY (id),
    CONSTRAINT client_email_unique UNIQUE (email)

);

CREATE TABLE merchant (

    id BIGSERIAL,
    name TEXT,
    description TEXT,
    category BIGINT,
    address TEXT,
    phone TEXT,
    email TEXT,
    logo bytea,
    logotype text,
    image bytea,
    imagetype text,
    PRIMARY KEY (id),
    CONSTRAINT merchant_email_unique UNIQUE (email)
);

CREATE TABLE product (

    id BIGSERIAL,
    name TEXT,
    description TEXT,
    prod_group BIGINT,
    price INTEGER,
    publish boolean,
    quantity INTEGER,
    logo bytea,
    logotype text,
    image bytea,
    imagetype text,
    merchantid BIGINT,
    PRIMARY KEY (id)
);

CREATE TABLE category (

    id BIGSERIAL,
    name TEXT,
    imagetype TEXT,
    image bytea,
    PRIMARY KEY (id)
);

CREATE TABLE product_group (

    id BIGSERIAL,
    name TEXT,
    merchantid BIGINT,
    PRIMARY KEY (id)
);

-- FK CONSTRAINT

ALTER TABLE IF EXISTS public.merchant
    ADD FOREIGN KEY (category)
    REFERENCES public.category (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.product_group
    ADD FOREIGN KEY (merchantid)
    REFERENCES public.merchant (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.product
    ADD FOREIGN KEY (merchantid)
    REFERENCES public.merchant (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.product
    ADD FOREIGN KEY (prod_group)
    REFERENCES public.product_group (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

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

-- TRIGGER DELETE TO MERCHANT
CREATE OR REPLACE FUNCTION delete_merchant_trigger_function() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
    DELETE FROM public.usr WHERE id = OLD.id;
    RETURN OLD;
END;
$$;

CREATE OR REPLACE TRIGGER delete_merchant_trigger 
    BEFORE DELETE ON public.merchant 
    FOR EACH ROW
    EXECUTE PROCEDURE delete_merchant_trigger_function();

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

-- TRIGGER DELETE TO USER
CREATE OR REPLACE FUNCTION delete_user_trigger_function() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
   DELETE FROM public.usr WHERE id = OLD.id;
    RETURN OLD;
END;
$$;

CREATE OR REPLACE TRIGGER delete_user_trigger 
    BEFORE DELETE ON public.client 
    FOR EACH ROW
    EXECUTE PROCEDURE delete_user_trigger_function();

