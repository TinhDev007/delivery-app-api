exports.up = (knex) => {
    return Promise.all([
        knex.schema.raw(`
        CREATE SEQUENCE IF NOT EXISTS public.category_ord_seq
        INCREMENT 1
        START 1`),
        knex.schema.raw(`
        CREATE SEQUENCE IF NOT EXISTS public.merchant_ord_seq
        INCREMENT 1
        START 1`),
        knex.schema.raw(`
        CREATE SEQUENCE IF NOT EXISTS public.product_group_ord_seq
        INCREMENT 1
        START 1`),
        knex.schema.raw(`
        CREATE SEQUENCE IF NOT EXISTS public.product_ord_seq
        INCREMENT 1
        START 1`),

        knex.schema.raw(`
        ALTER TABLE IF EXISTS public.category
        ADD COLUMN ord bigint DEFAULT nextval('category_ord_seq')`),
        knex.schema.raw(`
        ALTER TABLE IF EXISTS public.merchant
        ADD COLUMN ord bigint DEFAULT nextval('merchant_ord_seq')`),
        knex.schema.raw(`
        ALTER TABLE IF EXISTS public."product_group"
        ADD COLUMN ord bigint DEFAULT nextval('product_group_ord_seq')`),
        knex.schema.raw(`
        ALTER TABLE IF EXISTS public.product
        ADD COLUMN ord bigint DEFAULT nextval('product_ord_seq')`),

        knex.schema.raw(`
        CREATE OR REPLACE PROCEDURE public.category_change_ord(
            IN original bigint,
            IN destination bigint)
        LANGUAGE 'plpgsql'
        AS $BODY$
            
            DECLARE 
                i record;
                prev_id bigint;
                original_id bigint;
            BEGIN
                select id into prev_id 
                        from public."category"
                        where ord = destination;
                        
                select id into original_id 
                        from public."category"
                        where ord = original;
                        raise notice '%', original_id;
                        
                IF original > destination THEN
                    
                    for i in
                        select id, ord from public."category" 
                        where ord <= original and ord > destination
                        order by ord ASC
                    loop
                        raise notice '% - %', prev_id, i.ord;
                        update public."category"
                        set ord = i.ord 
                        where id = prev_id;
                        prev_id := i.id;
                    end loop;
                    
               ELSIF original < destination THEN
                    
                    for i in
                        select id, ord from public."category" 
                        where ord >= original and ord < destination
                        order by ord DESC
                    loop
                        raise notice '% - %', prev_id, i.ord;
                        update public."category"
                        set ord = i.ord 
                        where id = prev_id;
                        prev_id := i.id;
                    end loop; 
                 
                END IF;
                update public."category"
                    set  ord =  destination
                    where id = original_id;
            END;
        
        $BODY$;`),
        knex.schema.raw(`
        CREATE OR REPLACE PROCEDURE public.merchant_change_ord(
            IN original bigint,
            IN destination bigint)
        LANGUAGE 'plpgsql'
        AS $BODY$
            
            DECLARE 
                i record;
                prev_id bigint;
                original_id bigint;
            BEGIN
                select id into prev_id 
                        from public."merchant"
                        where ord = destination;
                        
                select id into original_id 
                        from public."merchant"
                        where ord = original;
                        raise notice '%', original_id;
                        
                IF original > destination THEN
                    
                    for i in
                        select id, ord from public."merchant" 
                        where ord <= original and ord > destination
                        order by ord ASC
                    loop
                        raise notice '% - %', prev_id, i.ord;
                        update public."merchant"
                        set ord = i.ord 
                        where id = prev_id;
                        prev_id := i.id;
                    end loop;
                    
               ELSIF original < destination THEN
                    
                    for i in
                        select id, ord from public."merchant" 
                        where ord >= original and ord < destination
                        order by ord DESC
                    loop
                        raise notice '% - %', prev_id, i.ord;
                        update public."merchant"
                        set ord = i.ord 
                        where id = prev_id;
                        prev_id := i.id;
                    end loop; 
                 
                END IF;
                update public."merchant"
                    set  ord =  destination
                    where id = original_id;
            END;
        
        $BODY$;`),
        knex.schema.raw(`
        CREATE OR REPLACE PROCEDURE public.product_group_change_ord(
            IN original bigint,
            IN destination bigint)
        LANGUAGE 'plpgsql'
        AS $BODY$
            
            DECLARE 
                i record;
                prev_id bigint;
                original_id bigint;
            BEGIN
                select id into prev_id 
                        from public."product_group"
                        where ord = destination;
                        
                select id into original_id 
                        from public."product_group"
                        where ord = original;
                        raise notice '%', original_id;
                        
                IF original > destination THEN
                    
                    for i in
                        select id, ord from public."product_group" 
                        where ord <= original and ord > destination
                        order by ord ASC
                    loop
                        raise notice '% - %', prev_id, i.ord;
                        update public."product_group"
                        set ord = i.ord 
                        where id = prev_id;
                        prev_id := i.id;
                    end loop;
                    
               ELSIF original < destination THEN
                    
                    for i in
                        select id, ord from public."product_group" 
                        where ord >= original and ord < destination
                        order by ord DESC
                    loop
                        raise notice '% - %', prev_id, i.ord;
                        update public."product_group"
                        set ord = i.ord 
                        where id = prev_id;
                        prev_id := i.id;
                    end loop; 
                 
                END IF;
                update public."product_group"
                    set  ord =  destination
                    where id = original_id;
            END;
        
        $BODY$;`),
        knex.schema.raw(`
        CREATE OR REPLACE PROCEDURE public.product_change_ord(
            IN original bigint,
            IN destination bigint)
        LANGUAGE 'plpgsql'
        AS $BODY$
            
            DECLARE 
                i record;
                prev_id bigint;
                original_id bigint;
            BEGIN
                select id into prev_id 
                        from public."product"
                        where ord = destination;
                        
                select id into original_id 
                        from public."product"
                        where ord = original;
                        raise notice '%', original_id;
                        
                IF original > destination THEN
                    
                    for i in
                        select id, ord from public."product" 
                        where ord <= original and ord > destination
                        order by ord ASC
                    loop
                        raise notice '% - %', prev_id, i.ord;
                        update public."product"
                        set ord = i.ord 
                        where id = prev_id;
                        prev_id := i.id;
                    end loop;
                    
               ELSIF original < destination THEN
                    
                    for i in
                        select id, ord from public."product" 
                        where ord >= original and ord < destination
                        order by ord DESC
                    loop
                        raise notice '% - %', prev_id, i.ord;
                        update public."product"
                        set ord = i.ord 
                        where id = prev_id;
                        prev_id := i.id;
                    end loop; 
                 
                END IF;
                update public."product"
                    set  ord =  destination
                    where id = original_id;
            END;
        
        $BODY$;`)
    ])
}

exports.down = (knex) => {
    return Promise.all([
        knex.schema.raw(`
        DROP PROCEDURE IF EXISTS public.category_change_ord`),
        knex.schema.raw(`
        DROP PROCEDURE IF EXISTS public.merchant_change_ord`),
        knex.schema.raw(`
        DROP PROCEDURE IF EXISTS public.product_group_change_ord`),
        knex.schema.raw(`
        DROP PROCEDURE IF EXISTS public.product_change_ord`),

        knex.schema.raw(`
        ALTER TABLE public.category
        DROP COLUMN ord`),
        knex.schema.raw(`
        ALTER TABLE public.merchant
        DROP COLUMN ord`),
        knex.schema.raw(`
        ALTER TABLE public."product_group"
        DROP COLUMN ord`),
        knex.schema.raw(`
        ALTER TABLE public.product
        DROP COLUMN ord`),

        knex.schema.raw(`
        DROP SEQUENCE IF EXISTS public.category_ord_seq`),
        knex.schema.raw(`
        DROP SEQUENCE IF EXISTS public.merchant_ord_seq`),
        knex.schema.raw(`
        DROP SEQUENCE IF EXISTS public.product_group_ord_seq`),
        knex.schema.raw(`
        DROP SEQUENCE IF EXISTS public.product_ord_seq`)
    ])
}