PGDMP                         z            webstore    14.4    14.4 .                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            !           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            "           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            #           1262    16405    webstore    DATABASE     l   CREATE DATABASE webstore WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE webstore;
                postgres    false            �            1255    16707    insert_admin_trigger_function()    FUNCTION     �   CREATE FUNCTION public.insert_admin_trigger_function() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   INSERT INTO public.usr(
	email, role)
	VALUES (NEW.email, 'admin'); 
    RETURN NEW;
END;
$$;
 6   DROP FUNCTION public.insert_admin_trigger_function();
       public          postgres    false            �            1255    16718 "   insert_merchant_trigger_function()    FUNCTION     �   CREATE FUNCTION public.insert_merchant_trigger_function() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   INSERT INTO public.usr(
	email, role)
	VALUES (NEW.email, 'merchant'); 
    RETURN NEW;
END;
$$;
 9   DROP FUNCTION public.insert_merchant_trigger_function();
       public          postgres    false            �            1255    16720    insert_user_trigger_function()    FUNCTION     �   CREATE FUNCTION public.insert_user_trigger_function() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   INSERT INTO public.usr(
	email, role)
	VALUES (NEW.email, 'user'); 
    RETURN NEW;
END;
$$;
 5   DROP FUNCTION public.insert_user_trigger_function();
       public          postgres    false            �            1255    16722 "   update_merchant_trigger_function()    FUNCTION       CREATE FUNCTION public.update_merchant_trigger_function() RETURNS trigger
    LANGUAGE plpgsql
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
 9   DROP FUNCTION public.update_merchant_trigger_function();
       public          postgres    false            �            1255    16724    update_user_trigger_function()    FUNCTION       CREATE FUNCTION public.update_user_trigger_function() RETURNS trigger
    LANGUAGE plpgsql
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
 5   DROP FUNCTION public.update_user_trigger_function();
       public          postgres    false            �            1259    16695    admin    TABLE     F   CREATE TABLE public.admin (
    id bigint NOT NULL,
    email text
);
    DROP TABLE public.admin;
       public         heap    postgres    false            �            1259    16694    admin_id_seq    SEQUENCE     u   CREATE SEQUENCE public.admin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.admin_id_seq;
       public          postgres    false    220            $           0    0    admin_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;
          public          postgres    false    219            �            1259    16562    category    TABLE     m   CREATE TABLE public.category (
    id bigint NOT NULL,
    name text,
    imagetype text,
    image bytea
);
    DROP TABLE public.category;
       public         heap    postgres    false            �            1259    16561    category_id_seq    SEQUENCE     x   CREATE SEQUENCE public.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.category_id_seq;
       public          postgres    false    210            %           0    0    category_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;
          public          postgres    false    209            �            1259    16676    client    TABLE     G   CREATE TABLE public.client (
    id bigint NOT NULL,
    email text
);
    DROP TABLE public.client;
       public         heap    postgres    false            �            1259    16675    client_id_seq    SEQUENCE     v   CREATE SEQUENCE public.client_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.client_id_seq;
       public          postgres    false    216            &           0    0    client_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.client_id_seq OWNED BY public.client.id;
          public          postgres    false    215            �            1259    16686    merchant    TABLE     �   CREATE TABLE public.merchant (
    id bigint NOT NULL,
    name text,
    password text,
    description text,
    category text,
    address text,
    phone text,
    email text,
    logo bytea,
    logotype text,
    image bytea,
    imagetype text
);
    DROP TABLE public.merchant;
       public         heap    postgres    false            �            1259    16685    merchant_id_seq    SEQUENCE     x   CREATE SEQUENCE public.merchant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.merchant_id_seq;
       public          postgres    false    218            '           0    0    merchant_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.merchant_id_seq OWNED BY public.merchant.id;
          public          postgres    false    217            �            1259    16590    product    TABLE     �   CREATE TABLE public.product (
    id bigint NOT NULL,
    name text,
    description text,
    prod_group text,
    price integer,
    quantity integer,
    logo bytea,
    logotype text,
    image bytea,
    imagetype text,
    merchantid integer
);
    DROP TABLE public.product;
       public         heap    postgres    false            �            1259    16605    product_group    TABLE     e   CREATE TABLE public.product_group (
    id bigint NOT NULL,
    name text,
    merchantid integer
);
 !   DROP TABLE public.product_group;
       public         heap    postgres    false            �            1259    16604    product_group_id_seq    SEQUENCE     }   CREATE SEQUENCE public.product_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.product_group_id_seq;
       public          postgres    false    214            (           0    0    product_group_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.product_group_id_seq OWNED BY public.product_group.id;
          public          postgres    false    213            �            1259    16589    product_id_seq    SEQUENCE     w   CREATE SEQUENCE public.product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.product_id_seq;
       public          postgres    false    212            )           0    0    product_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;
          public          postgres    false    211            �            1259    16710    usr    TABLE     S   CREATE TABLE public.usr (
    id bigint NOT NULL,
    email text,
    role text
);
    DROP TABLE public.usr;
       public         heap    postgres    false            �            1259    16709 
   usr_id_seq    SEQUENCE     s   CREATE SEQUENCE public.usr_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.usr_id_seq;
       public          postgres    false    222            *           0    0 
   usr_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.usr_id_seq OWNED BY public.usr.id;
          public          postgres    false    221            �           2604    16698    admin id    DEFAULT     d   ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);
 7   ALTER TABLE public.admin ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220                       2604    16565    category id    DEFAULT     j   ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);
 :   ALTER TABLE public.category ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    210    210            �           2604    16679 	   client id    DEFAULT     f   ALTER TABLE ONLY public.client ALTER COLUMN id SET DEFAULT nextval('public.client_id_seq'::regclass);
 8   ALTER TABLE public.client ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �           2604    16689    merchant id    DEFAULT     j   ALTER TABLE ONLY public.merchant ALTER COLUMN id SET DEFAULT nextval('public.merchant_id_seq'::regclass);
 :   ALTER TABLE public.merchant ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    16593 
   product id    DEFAULT     h   ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);
 9   ALTER TABLE public.product ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211    212            �           2604    16608    product_group id    DEFAULT     t   ALTER TABLE ONLY public.product_group ALTER COLUMN id SET DEFAULT nextval('public.product_group_id_seq'::regclass);
 ?   ALTER TABLE public.product_group ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    214    214            �           2604    16713    usr id    DEFAULT     `   ALTER TABLE ONLY public.usr ALTER COLUMN id SET DEFAULT nextval('public.usr_id_seq'::regclass);
 5   ALTER TABLE public.usr ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2606    16702    admin admin_email_unique 
   CONSTRAINT     T   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_email_unique UNIQUE (email);
 B   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_email_unique;
       public            postgres    false    220            �           2606    16693    merchant merchant_email_unique 
   CONSTRAINT     Z   ALTER TABLE ONLY public.merchant
    ADD CONSTRAINT merchant_email_unique UNIQUE (email);
 H   ALTER TABLE ONLY public.merchant DROP CONSTRAINT merchant_email_unique;
       public            postgres    false    218            �           2606    16683    client user_email_unique 
   CONSTRAINT     T   ALTER TABLE ONLY public.client
    ADD CONSTRAINT user_email_unique UNIQUE (email);
 B   ALTER TABLE ONLY public.client DROP CONSTRAINT user_email_unique;
       public            postgres    false    216            �           2606    16717    usr usr_email_unique 
   CONSTRAINT     P   ALTER TABLE ONLY public.usr
    ADD CONSTRAINT usr_email_unique UNIQUE (email);
 >   ALTER TABLE ONLY public.usr DROP CONSTRAINT usr_email_unique;
       public            postgres    false    222            �           2620    16708    admin insert_admin_trigger    TRIGGER     �   CREATE TRIGGER insert_admin_trigger BEFORE INSERT ON public.admin FOR EACH ROW EXECUTE FUNCTION public.insert_admin_trigger_function();
 3   DROP TRIGGER insert_admin_trigger ON public.admin;
       public          postgres    false    220    224            �           2620    16719     merchant insert_merchant_trigger    TRIGGER     �   CREATE TRIGGER insert_merchant_trigger BEFORE INSERT ON public.merchant FOR EACH ROW EXECUTE FUNCTION public.insert_merchant_trigger_function();
 9   DROP TRIGGER insert_merchant_trigger ON public.merchant;
       public          postgres    false    223    218            �           2620    16721    client insert_user_trigger    TRIGGER     �   CREATE TRIGGER insert_user_trigger BEFORE INSERT ON public.client FOR EACH ROW EXECUTE FUNCTION public.insert_user_trigger_function();
 3   DROP TRIGGER insert_user_trigger ON public.client;
       public          postgres    false    225    216            �           2620    16723     merchant update_merchant_trigger    TRIGGER     �   CREATE TRIGGER update_merchant_trigger BEFORE UPDATE ON public.merchant FOR EACH ROW EXECUTE FUNCTION public.update_merchant_trigger_function();
 9   DROP TRIGGER update_merchant_trigger ON public.merchant;
       public          postgres    false    226    218            �           2620    16725    client update_user_trigger    TRIGGER     �   CREATE TRIGGER update_user_trigger BEFORE UPDATE ON public.client FOR EACH ROW EXECUTE FUNCTION public.update_user_trigger_function();
 3   DROP TRIGGER update_user_trigger ON public.client;
       public          postgres    false    227    216           