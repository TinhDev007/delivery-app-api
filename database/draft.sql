Create or replace procedure merchant_change_ord(
    IN original bigint,
    IN destination bigint
)
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

$BODY$;