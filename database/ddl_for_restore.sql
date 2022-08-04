PGDMP     ,    2                z            webstore    14.4    14.4 =    6           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            7           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            8           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            9           1262    16847    webstore    DATABASE     l   CREATE DATABASE webstore WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE webstore;
                postgres    false            �            1255    16945 "   delete_merchant_trigger_function()    FUNCTION     �   CREATE FUNCTION public.delete_merchant_trigger_function() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    DELETE FROM public.usr WHERE email = OLD.email;
    RETURN OLD;
END;
$$;
 9   DROP FUNCTION public.delete_merchant_trigger_function();
       public          postgres    false            �            1255    16951    delete_user_trigger_function()    FUNCTION     �   CREATE FUNCTION public.delete_user_trigger_function() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   DELETE FROM public.usr WHERE email = OLD.email;
    RETURN OLD;
END;
$$;
 5   DROP FUNCTION public.delete_user_trigger_function();
       public          postgres    false            �            1255    16939    insert_admin_trigger_function()    FUNCTION     �   CREATE FUNCTION public.insert_admin_trigger_function() RETURNS trigger
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
       public          postgres    false            �            1255    16941 "   insert_merchant_trigger_function()    FUNCTION     �   CREATE FUNCTION public.insert_merchant_trigger_function() RETURNS trigger
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
       public          postgres    false            �            1255    16947    insert_user_trigger_function()    FUNCTION     �   CREATE FUNCTION public.insert_user_trigger_function() RETURNS trigger
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
       public          postgres    false            �            1255    16943 "   update_merchant_trigger_function()    FUNCTION       CREATE FUNCTION public.update_merchant_trigger_function() RETURNS trigger
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
       public          postgres    false            �            1255    16949    update_user_trigger_function()    FUNCTION       CREATE FUNCTION public.update_user_trigger_function() RETURNS trigger
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
       public          postgres    false            �            1259    16860    admin    TABLE     F   CREATE TABLE public.admin (
    id bigint NOT NULL,
    email text
);
    DROP TABLE public.admin;
       public         heap    postgres    false            �            1259    16859    admin_id_seq    SEQUENCE     u   CREATE SEQUENCE public.admin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.admin_id_seq;
       public          postgres    false    212            :           0    0    admin_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;
          public          postgres    false    211            �            1259    16902    category    TABLE     m   CREATE TABLE public.category (
    id bigint NOT NULL,
    name text,
    imagetype text,
    image bytea
);
    DROP TABLE public.category;
       public         heap    postgres    false            �            1259    16901    category_id_seq    SEQUENCE     x   CREATE SEQUENCE public.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.category_id_seq;
       public          postgres    false    220            ;           0    0    category_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;
          public          postgres    false    219            �            1259    16871    client    TABLE     G   CREATE TABLE public.client (
    id bigint NOT NULL,
    email text
);
    DROP TABLE public.client;
       public         heap    postgres    false            �            1259    16870    client_id_seq    SEQUENCE     v   CREATE SEQUENCE public.client_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.client_id_seq;
       public          postgres    false    214            <           0    0    client_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.client_id_seq OWNED BY public.client.id;
          public          postgres    false    213            �            1259    16882    merchant    TABLE     �   CREATE TABLE public.merchant (
    id bigint NOT NULL,
    name text,
    description text,
    category bigint,
    address text,
    phone text,
    email text,
    logo bytea,
    logotype text,
    image bytea,
    imagetype text
);
    DROP TABLE public.merchant;
       public         heap    postgres    false            �            1259    16881    merchant_id_seq    SEQUENCE     x   CREATE SEQUENCE public.merchant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.merchant_id_seq;
       public          postgres    false    216            =           0    0    merchant_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.merchant_id_seq OWNED BY public.merchant.id;
          public          postgres    false    215            �            1259    16893    product    TABLE       CREATE TABLE public.product (
    id bigint NOT NULL,
    name text,
    description text,
    prod_group bigint,
    price integer,
    published boolean,
    quantity integer,
    logo bytea,
    logotype text,
    image bytea,
    imagetype text,
    merchantid bigint
);
    DROP TABLE public.product;
       public         heap    postgres    false            �            1259    16911    product_group    TABLE     d   CREATE TABLE public.product_group (
    id bigint NOT NULL,
    name text,
    merchantid bigint
);
 !   DROP TABLE public.product_group;
       public         heap    postgres    false            �            1259    16910    product_group_id_seq    SEQUENCE     }   CREATE SEQUENCE public.product_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.product_group_id_seq;
       public          postgres    false    222            >           0    0    product_group_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.product_group_id_seq OWNED BY public.product_group.id;
          public          postgres    false    221            �            1259    16892    product_id_seq    SEQUENCE     w   CREATE SEQUENCE public.product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.product_id_seq;
       public          postgres    false    218            ?           0    0    product_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;
          public          postgres    false    217            �            1259    16849    usr    TABLE     S   CREATE TABLE public.usr (
    id bigint NOT NULL,
    email text,
    role text
);
    DROP TABLE public.usr;
       public         heap    postgres    false            �            1259    16848 
   usr_id_seq    SEQUENCE     s   CREATE SEQUENCE public.usr_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.usr_id_seq;
       public          postgres    false    210            @           0    0 
   usr_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.usr_id_seq OWNED BY public.usr.id;
          public          postgres    false    209            �           2604    16863    admin id    DEFAULT     d   ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);
 7   ALTER TABLE public.admin ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            �           2604    16905    category id    DEFAULT     j   ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);
 :   ALTER TABLE public.category ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            �           2604    16874 	   client id    DEFAULT     f   ALTER TABLE ONLY public.client ALTER COLUMN id SET DEFAULT nextval('public.client_id_seq'::regclass);
 8   ALTER TABLE public.client ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            �           2604    16885    merchant id    DEFAULT     j   ALTER TABLE ONLY public.merchant ALTER COLUMN id SET DEFAULT nextval('public.merchant_id_seq'::regclass);
 :   ALTER TABLE public.merchant ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    16896 
   product id    DEFAULT     h   ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);
 9   ALTER TABLE public.product ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    16914    product_group id    DEFAULT     t   ALTER TABLE ONLY public.product_group ALTER COLUMN id SET DEFAULT nextval('public.product_group_id_seq'::regclass);
 ?   ALTER TABLE public.product_group ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    16852    usr id    DEFAULT     `   ALTER TABLE ONLY public.usr ALTER COLUMN id SET DEFAULT nextval('public.usr_id_seq'::regclass);
 5   ALTER TABLE public.usr ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            �           2606    16869    admin admin_email_unique 
   CONSTRAINT     T   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_email_unique UNIQUE (email);
 B   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_email_unique;
       public            postgres    false    212            �           2606    16867    admin admin_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_pkey;
       public            postgres    false    212            �           2606    16909    category category_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.category DROP CONSTRAINT category_pkey;
       public            postgres    false    220            �           2606    16880    client client_email_unique 
   CONSTRAINT     V   ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_email_unique UNIQUE (email);
 D   ALTER TABLE ONLY public.client DROP CONSTRAINT client_email_unique;
       public            postgres    false    214            �           2606    16878    client client_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.client DROP CONSTRAINT client_pkey;
       public            postgres    false    214            �           2606    16891    merchant merchant_email_unique 
   CONSTRAINT     Z   ALTER TABLE ONLY public.merchant
    ADD CONSTRAINT merchant_email_unique UNIQUE (email);
 H   ALTER TABLE ONLY public.merchant DROP CONSTRAINT merchant_email_unique;
       public            postgres    false    216            �           2606    16889    merchant merchant_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.merchant
    ADD CONSTRAINT merchant_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.merchant DROP CONSTRAINT merchant_pkey;
       public            postgres    false    216            �           2606    16918     product_group product_group_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.product_group
    ADD CONSTRAINT product_group_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.product_group DROP CONSTRAINT product_group_pkey;
       public            postgres    false    222            �           2606    16900    product product_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.product DROP CONSTRAINT product_pkey;
       public            postgres    false    218            �           2606    16858    usr usr_email_unique 
   CONSTRAINT     P   ALTER TABLE ONLY public.usr
    ADD CONSTRAINT usr_email_unique UNIQUE (email);
 >   ALTER TABLE ONLY public.usr DROP CONSTRAINT usr_email_unique;
       public            postgres    false    210            �           2606    16856    usr usr_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY public.usr
    ADD CONSTRAINT usr_pkey PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.usr DROP CONSTRAINT usr_pkey;
       public            postgres    false    210            �           2620    16946     merchant delete_merchant_trigger    TRIGGER     �   CREATE TRIGGER delete_merchant_trigger BEFORE DELETE ON public.merchant FOR EACH ROW EXECUTE FUNCTION public.delete_merchant_trigger_function();
 9   DROP TRIGGER delete_merchant_trigger ON public.merchant;
       public          postgres    false    216    226            �           2620    16952    client delete_user_trigger    TRIGGER     �   CREATE TRIGGER delete_user_trigger BEFORE DELETE ON public.client FOR EACH ROW EXECUTE FUNCTION public.delete_user_trigger_function();
 3   DROP TRIGGER delete_user_trigger ON public.client;
       public          postgres    false    214    229            �           2620    16940    admin insert_admin_trigger    TRIGGER     �   CREATE TRIGGER insert_admin_trigger BEFORE INSERT ON public.admin FOR EACH ROW EXECUTE FUNCTION public.insert_admin_trigger_function();
 3   DROP TRIGGER insert_admin_trigger ON public.admin;
       public          postgres    false    212    223            �           2620    16942     merchant insert_merchant_trigger    TRIGGER     �   CREATE TRIGGER insert_merchant_trigger BEFORE INSERT ON public.merchant FOR EACH ROW EXECUTE FUNCTION public.insert_merchant_trigger_function();
 9   DROP TRIGGER insert_merchant_trigger ON public.merchant;
       public          postgres    false    216    224            �           2620    16948    client insert_user_trigger    TRIGGER     �   CREATE TRIGGER insert_user_trigger BEFORE INSERT ON public.client FOR EACH ROW EXECUTE FUNCTION public.insert_user_trigger_function();
 3   DROP TRIGGER insert_user_trigger ON public.client;
       public          postgres    false    227    214            �           2620    16944     merchant update_merchant_trigger    TRIGGER     �   CREATE TRIGGER update_merchant_trigger BEFORE UPDATE ON public.merchant FOR EACH ROW EXECUTE FUNCTION public.update_merchant_trigger_function();
 9   DROP TRIGGER update_merchant_trigger ON public.merchant;
       public          postgres    false    225    216            �           2620    16950    client update_user_trigger    TRIGGER     �   CREATE TRIGGER update_user_trigger BEFORE UPDATE ON public.client FOR EACH ROW EXECUTE FUNCTION public.update_user_trigger_function();
 3   DROP TRIGGER update_user_trigger ON public.client;
       public          postgres    false    214    228            �           2606    16919    merchant merchant_category_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.merchant
    ADD CONSTRAINT merchant_category_fkey FOREIGN KEY (category) REFERENCES public.category(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 I   ALTER TABLE ONLY public.merchant DROP CONSTRAINT merchant_category_fkey;
       public          postgres    false    220    3227    216            �           2606    16924 +   product_group product_group_merchantid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_group
    ADD CONSTRAINT product_group_merchantid_fkey FOREIGN KEY (merchantid) REFERENCES public.merchant(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 U   ALTER TABLE ONLY public.product_group DROP CONSTRAINT product_group_merchantid_fkey;
       public          postgres    false    216    3223    222            �           2606    16929    product product_merchantid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_merchantid_fkey FOREIGN KEY (merchantid) REFERENCES public.merchant(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 I   ALTER TABLE ONLY public.product DROP CONSTRAINT product_merchantid_fkey;
       public          postgres    false    216    3223    218            �           2606    16934    product product_prod_group_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_prod_group_fkey FOREIGN KEY (prod_group) REFERENCES public.product_group(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 I   ALTER TABLE ONLY public.product DROP CONSTRAINT product_prod_group_fkey;
       public          postgres    false    222    218    3229           