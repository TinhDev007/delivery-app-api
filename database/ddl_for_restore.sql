PGDMP         1                z            webstore    14.4    14.4 K    D           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            E           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            F           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            G           1262    17455    webstore    DATABASE     l   CREATE DATABASE webstore WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE webstore;
                postgres    false            �            1255    17553 "   delete_merchant_trigger_function()    FUNCTION     �   CREATE FUNCTION public.delete_merchant_trigger_function() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    DELETE FROM public.usr WHERE email = OLD.email;
    RETURN OLD;
END;
$$;
 9   DROP FUNCTION public.delete_merchant_trigger_function();
       public          postgres    false            �            1255    17559    delete_user_trigger_function()    FUNCTION     �   CREATE FUNCTION public.delete_user_trigger_function() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   DELETE FROM public.usr WHERE email = OLD.email;
    RETURN OLD;
END;
$$;
 5   DROP FUNCTION public.delete_user_trigger_function();
       public          postgres    false            �            1255    17547    insert_admin_trigger_function()    FUNCTION     �   CREATE FUNCTION public.insert_admin_trigger_function() RETURNS trigger
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
       public          postgres    false            �            1255    17549 "   insert_merchant_trigger_function()    FUNCTION     �   CREATE FUNCTION public.insert_merchant_trigger_function() RETURNS trigger
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
       public          postgres    false            �            1255    17555    insert_user_trigger_function()    FUNCTION     �   CREATE FUNCTION public.insert_user_trigger_function() RETURNS trigger
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
       public          postgres    false            �            1255    17551 "   update_merchant_trigger_function()    FUNCTION       CREATE FUNCTION public.update_merchant_trigger_function() RETURNS trigger
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
       public          postgres    false            �            1255    17557    update_user_trigger_function()    FUNCTION       CREATE FUNCTION public.update_user_trigger_function() RETURNS trigger
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
       public          postgres    false            �            1259    17468    admin    TABLE     F   CREATE TABLE public.admin (
    id bigint NOT NULL,
    email text
);
    DROP TABLE public.admin;
       public         heap    postgres    false            �            1259    17467    admin_id_seq    SEQUENCE     u   CREATE SEQUENCE public.admin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.admin_id_seq;
       public          postgres    false    212            H           0    0    admin_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;
          public          postgres    false    211            �            1259    17510    category    TABLE     m   CREATE TABLE public.category (
    id bigint NOT NULL,
    name text,
    imagetype text,
    image bytea
);
    DROP TABLE public.category;
       public         heap    postgres    false            �            1259    17509    category_id_seq    SEQUENCE     x   CREATE SEQUENCE public.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.category_id_seq;
       public          postgres    false    220            I           0    0    category_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;
          public          postgres    false    219            �            1259    17479    client    TABLE     G   CREATE TABLE public.client (
    id bigint NOT NULL,
    email text
);
    DROP TABLE public.client;
       public         heap    postgres    false            �            1259    17478    client_id_seq    SEQUENCE     v   CREATE SEQUENCE public.client_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.client_id_seq;
       public          postgres    false    214            J           0    0    client_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.client_id_seq OWNED BY public.client.id;
          public          postgres    false    213            �            1259    17490    merchant    TABLE     �   CREATE TABLE public.merchant (
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
       public         heap    postgres    false            �            1259    17489    merchant_id_seq    SEQUENCE     x   CREATE SEQUENCE public.merchant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.merchant_id_seq;
       public          postgres    false    216            K           0    0    merchant_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.merchant_id_seq OWNED BY public.merchant.id;
          public          postgres    false    215            �            1259    17501    product    TABLE     )  CREATE TABLE public.product (
    id bigint NOT NULL,
    name text,
    description text,
    prod_group bigint,
    price integer,
    published boolean,
    featured boolean,
    quantity integer,
    logo bytea,
    logotype text,
    image bytea,
    imagetype text,
    merchantid bigint
);
    DROP TABLE public.product;
       public         heap    postgres    false            �            1259    17519    product_group    TABLE     d   CREATE TABLE public.product_group (
    id bigint NOT NULL,
    name text,
    merchantid bigint
);
 !   DROP TABLE public.product_group;
       public         heap    postgres    false            �            1259    17518    product_group_id_seq    SEQUENCE     }   CREATE SEQUENCE public.product_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.product_group_id_seq;
       public          postgres    false    222            L           0    0    product_group_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.product_group_id_seq OWNED BY public.product_group.id;
          public          postgres    false    221            �            1259    17500    product_id_seq    SEQUENCE     w   CREATE SEQUENCE public.product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.product_id_seq;
       public          postgres    false    218            M           0    0    product_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;
          public          postgres    false    217            �            1259    17457    usr    TABLE     S   CREATE TABLE public.usr (
    id bigint NOT NULL,
    email text,
    role text
);
    DROP TABLE public.usr;
       public         heap    postgres    false            �            1259    17456 
   usr_id_seq    SEQUENCE     s   CREATE SEQUENCE public.usr_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.usr_id_seq;
       public          postgres    false    210            N           0    0 
   usr_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.usr_id_seq OWNED BY public.usr.id;
          public          postgres    false    209            �           2604    17471    admin id    DEFAULT     d   ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);
 7   ALTER TABLE public.admin ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            �           2604    17513    category id    DEFAULT     j   ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);
 :   ALTER TABLE public.category ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            �           2604    17482 	   client id    DEFAULT     f   ALTER TABLE ONLY public.client ALTER COLUMN id SET DEFAULT nextval('public.client_id_seq'::regclass);
 8   ALTER TABLE public.client ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            �           2604    17493    merchant id    DEFAULT     j   ALTER TABLE ONLY public.merchant ALTER COLUMN id SET DEFAULT nextval('public.merchant_id_seq'::regclass);
 :   ALTER TABLE public.merchant ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    17504 
   product id    DEFAULT     h   ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);
 9   ALTER TABLE public.product ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    17522    product_group id    DEFAULT     t   ALTER TABLE ONLY public.product_group ALTER COLUMN id SET DEFAULT nextval('public.product_group_id_seq'::regclass);
 ?   ALTER TABLE public.product_group ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    17460    usr id    DEFAULT     `   ALTER TABLE ONLY public.usr ALTER COLUMN id SET DEFAULT nextval('public.usr_id_seq'::regclass);
 5   ALTER TABLE public.usr ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            7          0    17468    admin 
   TABLE DATA           *   COPY public.admin (id, email) FROM stdin;
    public          postgres    false    212   gW       ?          0    17510    category 
   TABLE DATA           >   COPY public.category (id, name, imagetype, image) FROM stdin;
    public          postgres    false    220   �W       9          0    17479    client 
   TABLE DATA           +   COPY public.client (id, email) FROM stdin;
    public          postgres    false    214   �W       ;          0    17490    merchant 
   TABLE DATA           |   COPY public.merchant (id, name, description, category, address, phone, email, logo, logotype, image, imagetype) FROM stdin;
    public          postgres    false    216   �W       =          0    17501    product 
   TABLE DATA           �   COPY public.product (id, name, description, prod_group, price, published, featured, quantity, logo, logotype, image, imagetype, merchantid) FROM stdin;
    public          postgres    false    218   �W       A          0    17519    product_group 
   TABLE DATA           =   COPY public.product_group (id, name, merchantid) FROM stdin;
    public          postgres    false    222   X       5          0    17457    usr 
   TABLE DATA           .   COPY public.usr (id, email, role) FROM stdin;
    public          postgres    false    210   )X       O           0    0    admin_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.admin_id_seq', 1, true);
          public          postgres    false    211            P           0    0    category_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.category_id_seq', 1, false);
          public          postgres    false    219            Q           0    0    client_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.client_id_seq', 1, false);
          public          postgres    false    213            R           0    0    merchant_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.merchant_id_seq', 1, false);
          public          postgres    false    215            S           0    0    product_group_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.product_group_id_seq', 1, false);
          public          postgres    false    221            T           0    0    product_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.product_id_seq', 1, false);
          public          postgres    false    217            U           0    0 
   usr_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('public.usr_id_seq', 1, true);
          public          postgres    false    209            �           2606    17477    admin admin_email_unique 
   CONSTRAINT     T   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_email_unique UNIQUE (email);
 B   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_email_unique;
       public            postgres    false    212            �           2606    17475    admin admin_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_pkey;
       public            postgres    false    212            �           2606    17517    category category_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.category DROP CONSTRAINT category_pkey;
       public            postgres    false    220            �           2606    17488    client client_email_unique 
   CONSTRAINT     V   ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_email_unique UNIQUE (email);
 D   ALTER TABLE ONLY public.client DROP CONSTRAINT client_email_unique;
       public            postgres    false    214            �           2606    17486    client client_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.client DROP CONSTRAINT client_pkey;
       public            postgres    false    214            �           2606    17499    merchant merchant_email_unique 
   CONSTRAINT     Z   ALTER TABLE ONLY public.merchant
    ADD CONSTRAINT merchant_email_unique UNIQUE (email);
 H   ALTER TABLE ONLY public.merchant DROP CONSTRAINT merchant_email_unique;
       public            postgres    false    216            �           2606    17497    merchant merchant_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.merchant
    ADD CONSTRAINT merchant_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.merchant DROP CONSTRAINT merchant_pkey;
       public            postgres    false    216            �           2606    17526     product_group product_group_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.product_group
    ADD CONSTRAINT product_group_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.product_group DROP CONSTRAINT product_group_pkey;
       public            postgres    false    222            �           2606    17508    product product_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.product DROP CONSTRAINT product_pkey;
       public            postgres    false    218            �           2606    17466    usr usr_email_unique 
   CONSTRAINT     P   ALTER TABLE ONLY public.usr
    ADD CONSTRAINT usr_email_unique UNIQUE (email);
 >   ALTER TABLE ONLY public.usr DROP CONSTRAINT usr_email_unique;
       public            postgres    false    210            �           2606    17464    usr usr_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY public.usr
    ADD CONSTRAINT usr_pkey PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.usr DROP CONSTRAINT usr_pkey;
       public            postgres    false    210            �           2620    17554     merchant delete_merchant_trigger    TRIGGER     �   CREATE TRIGGER delete_merchant_trigger BEFORE DELETE ON public.merchant FOR EACH ROW EXECUTE FUNCTION public.delete_merchant_trigger_function();
 9   DROP TRIGGER delete_merchant_trigger ON public.merchant;
       public          postgres    false    216    226            �           2620    17560    client delete_user_trigger    TRIGGER     �   CREATE TRIGGER delete_user_trigger BEFORE DELETE ON public.client FOR EACH ROW EXECUTE FUNCTION public.delete_user_trigger_function();
 3   DROP TRIGGER delete_user_trigger ON public.client;
       public          postgres    false    214    229            �           2620    17548    admin insert_admin_trigger    TRIGGER     �   CREATE TRIGGER insert_admin_trigger BEFORE INSERT ON public.admin FOR EACH ROW EXECUTE FUNCTION public.insert_admin_trigger_function();
 3   DROP TRIGGER insert_admin_trigger ON public.admin;
       public          postgres    false    212    223            �           2620    17550     merchant insert_merchant_trigger    TRIGGER     �   CREATE TRIGGER insert_merchant_trigger BEFORE INSERT ON public.merchant FOR EACH ROW EXECUTE FUNCTION public.insert_merchant_trigger_function();
 9   DROP TRIGGER insert_merchant_trigger ON public.merchant;
       public          postgres    false    216    224            �           2620    17556    client insert_user_trigger    TRIGGER     �   CREATE TRIGGER insert_user_trigger BEFORE INSERT ON public.client FOR EACH ROW EXECUTE FUNCTION public.insert_user_trigger_function();
 3   DROP TRIGGER insert_user_trigger ON public.client;
       public          postgres    false    227    214            �           2620    17552     merchant update_merchant_trigger    TRIGGER     �   CREATE TRIGGER update_merchant_trigger BEFORE UPDATE ON public.merchant FOR EACH ROW EXECUTE FUNCTION public.update_merchant_trigger_function();
 9   DROP TRIGGER update_merchant_trigger ON public.merchant;
       public          postgres    false    225    216            �           2620    17558    client update_user_trigger    TRIGGER     �   CREATE TRIGGER update_user_trigger BEFORE UPDATE ON public.client FOR EACH ROW EXECUTE FUNCTION public.update_user_trigger_function();
 3   DROP TRIGGER update_user_trigger ON public.client;
       public          postgres    false    214    228            �           2606    17527    merchant merchant_category_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.merchant
    ADD CONSTRAINT merchant_category_fkey FOREIGN KEY (category) REFERENCES public.category(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 I   ALTER TABLE ONLY public.merchant DROP CONSTRAINT merchant_category_fkey;
       public          postgres    false    220    3227    216            �           2606    17532 +   product_group product_group_merchantid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_group
    ADD CONSTRAINT product_group_merchantid_fkey FOREIGN KEY (merchantid) REFERENCES public.merchant(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 U   ALTER TABLE ONLY public.product_group DROP CONSTRAINT product_group_merchantid_fkey;
       public          postgres    false    216    3223    222            �           2606    17537    product product_merchantid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_merchantid_fkey FOREIGN KEY (merchantid) REFERENCES public.merchant(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 I   ALTER TABLE ONLY public.product DROP CONSTRAINT product_merchantid_fkey;
       public          postgres    false    216    3223    218            �           2606    17542    product product_prod_group_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_prod_group_fkey FOREIGN KEY (prod_group) REFERENCES public.product_group(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 I   ALTER TABLE ONLY public.product DROP CONSTRAINT product_prod_group_fkey;
       public          postgres    false    222    218    3229            7   !   x�3�LL���s(-N-242�K������� e��      ?      x������ � �      9      x������ � �      ;      x������ � �      =      x������ � �      A      x������ � �      5   #   x�3�LL���s(-N-242�K�υ�p��qqq ��	
     