--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comment; Type: TABLE; Schema: public; Owner: andikha.wisanggeni
--

CREATE TABLE public.comment (
    comment_id bigint NOT NULL,
    user_id bigint NOT NULL,
    recipe_id bigint NOT NULL,
    comment_text text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.comment OWNER TO "andikha.wisanggeni";

--
-- Name: comment_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: andikha.wisanggeni
--

CREATE SEQUENCE public.comment_comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_comment_id_seq OWNER TO "andikha.wisanggeni";

--
-- Name: comment_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: andikha.wisanggeni
--

ALTER SEQUENCE public.comment_comment_id_seq OWNED BY public.comment.comment_id;


--
-- Name: follows; Type: TABLE; Schema: public; Owner: andikha.wisanggeni
--

CREATE TABLE public.follows (
    follower_id integer NOT NULL,
    following_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.follows OWNER TO "andikha.wisanggeni";

--
-- Name: rating; Type: TABLE; Schema: public; Owner: andikha.wisanggeni
--

CREATE TABLE public.rating (
    rating_id bigint NOT NULL,
    user_id bigint NOT NULL,
    recipe_id bigint NOT NULL,
    rating integer NOT NULL
);


ALTER TABLE public.rating OWNER TO "andikha.wisanggeni";

--
-- Name: rating_rating_id_seq; Type: SEQUENCE; Schema: public; Owner: andikha.wisanggeni
--

CREATE SEQUENCE public.rating_rating_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rating_rating_id_seq OWNER TO "andikha.wisanggeni";

--
-- Name: rating_rating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: andikha.wisanggeni
--

ALTER SEQUENCE public.rating_rating_id_seq OWNED BY public.rating.rating_id;


--
-- Name: recipe; Type: TABLE; Schema: public; Owner: andikha.wisanggeni
--

CREATE TABLE public.recipe (
    recipe_id bigint NOT NULL,
    user_id bigint NOT NULL,
    recipe_name text NOT NULL,
    ingredients text[] NOT NULL,
    steps text[] NOT NULL,
    description text NOT NULL,
    image text NOT NULL,
    view_number bigint DEFAULT 1 NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.recipe OWNER TO "andikha.wisanggeni";

--
-- Name: recipe_recipe_id_seq; Type: SEQUENCE; Schema: public; Owner: andikha.wisanggeni
--

CREATE SEQUENCE public.recipe_recipe_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipe_recipe_id_seq OWNER TO "andikha.wisanggeni";

--
-- Name: recipe_recipe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: andikha.wisanggeni
--

ALTER SEQUENCE public.recipe_recipe_id_seq OWNED BY public.recipe.recipe_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: andikha.wisanggeni
--

CREATE TABLE public.users (
    user_id bigint NOT NULL,
    full_name text NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO "andikha.wisanggeni";

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: andikha.wisanggeni
--

CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO "andikha.wisanggeni";

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: andikha.wisanggeni
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: comment comment_id; Type: DEFAULT; Schema: public; Owner: andikha.wisanggeni
--

ALTER TABLE ONLY public.comment ALTER COLUMN comment_id SET DEFAULT nextval('public.comment_comment_id_seq'::regclass);


--
-- Name: rating rating_id; Type: DEFAULT; Schema: public; Owner: andikha.wisanggeni
--

ALTER TABLE ONLY public.rating ALTER COLUMN rating_id SET DEFAULT nextval('public.rating_rating_id_seq'::regclass);


--
-- Name: recipe recipe_id; Type: DEFAULT; Schema: public; Owner: andikha.wisanggeni
--

ALTER TABLE ONLY public.recipe ALTER COLUMN recipe_id SET DEFAULT nextval('public.recipe_recipe_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: andikha.wisanggeni
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: andikha.wisanggeni
--

COPY public.comment (comment_id, user_id, recipe_id, comment_text, created_at) FROM stdin;
\.


--
-- Data for Name: follows; Type: TABLE DATA; Schema: public; Owner: andikha.wisanggeni
--

COPY public.follows (follower_id, following_id, created_at) FROM stdin;
\.


--
-- Data for Name: rating; Type: TABLE DATA; Schema: public; Owner: andikha.wisanggeni
--

COPY public.rating (rating_id, user_id, recipe_id, rating) FROM stdin;
\.


--
-- Data for Name: recipe; Type: TABLE DATA; Schema: public; Owner: andikha.wisanggeni
--

COPY public.recipe (recipe_id, user_id, recipe_name, ingredients, steps, description, image, view_number, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: andikha.wisanggeni
--

COPY public.users (user_id, full_name, username, email, password) FROM stdin;
1	andikha	dikha	andikha.wisanggeni@gmail.com	$2b$10$jxWu89NQRedj64y.8YCdEuzqc2WSlkmHr0K995G8KUhNIJX9XMqz6
2	andikha wisanggeni	wisang	wisang@gmail.com	$2b$10$7bHjH2EHj/tjMCaXfSuY1.kQGy8rmG/GcsfUzjxTtxj1fqKoF0PNe
3	wisanggeni	geni	geni@gmail.com	$2b$10$eVNYpTnEC6yLwCfkkNH2JOWw9zVCOC7goRTdiojrb4WYgfe6jeHnm
4	lalala	lululu	lululu@gmail.com	$2b$10$gpLaYQxDTWxrT/94cVeHDew2tQ8XJAAbUSI/hjS1cAryUstAfwQFa
5	hoho	hihi	hihi@gmail.com	$2b$10$3ejkLKXEeElOX3NrtDAmWeqtYE96VXHQ.d7MDwqxmM14wPpYHbW3C
6	alip	alip	alip@gmail.com	$2b$10$ZjZLOCYPDUIbJpncT/udXunHGS9nPd6vU5SnbvwHuSsUDF7ELf4N2
8	alif	alif	alif@gmail.com	$2b$10$qo7yb8dCErXQQIYcw.dZbOfjM54QG1vOlhOkmq6204ICQTH9JYW9S
9	rizky	rizky	rizky@gmail.com	$2b$10$Uzzcm.SWD8q8WT6qgyDjGevSSLdDwYUzAIyo3yZKgjda2QvA2yoN2
10	M Rizky Utomo	muhammadrizky18	muhrizkyutomo@outlook.com	$2b$10$vPtlaih9J4NoTdFUFCsUoewMJFXaDzCxiji6pRKfHa0HksE5NSUaq
13	andikha	lalala	andikha@gmail.com	$2b$10$yb.Ae2kVqVQ3YiQ7HsHIhez0/1N.YMx7wbGdNs5bATg30tyaxWS/a
14	dik	dika	dikha@gmail.com	$2b$10$LPmsLBXEl7yV6Xf14GqqcetI62ce/5lxARTIoTq1JQPZJsG3iOPVa
16		paijo	paijo@gmail.com	$2b$10$gIOAnRlGrtqNomXf4bKWDOKt360xVw/X7jz3uf1Io2Ywxsz2fmWvq
\.


--
-- Name: comment_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: andikha.wisanggeni
--

SELECT pg_catalog.setval('public.comment_comment_id_seq', 14, true);


--
-- Name: rating_rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: andikha.wisanggeni
--

SELECT pg_catalog.setval('public.rating_rating_id_seq', 14, true);


--
-- Name: recipe_recipe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: andikha.wisanggeni
--

SELECT pg_catalog.setval('public.recipe_recipe_id_seq', 14, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: andikha.wisanggeni
--

SELECT pg_catalog.setval('public.users_user_id_seq', 16, true);


--
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: andikha.wisanggeni
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (comment_id);


--
-- Name: follows follows_pkey; Type: CONSTRAINT; Schema: public; Owner: andikha.wisanggeni
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_pkey PRIMARY KEY (follower_id, following_id);


--
-- Name: rating rating_pkey; Type: CONSTRAINT; Schema: public; Owner: andikha.wisanggeni
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_pkey PRIMARY KEY (rating_id);


--
-- Name: recipe recipe_pkey; Type: CONSTRAINT; Schema: public; Owner: andikha.wisanggeni
--

ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT recipe_pkey PRIMARY KEY (recipe_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: andikha.wisanggeni
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: andikha.wisanggeni
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: andikha.wisanggeni
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: comment comment_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andikha.wisanggeni
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipe(recipe_id);


--
-- Name: comment comment_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andikha.wisanggeni
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: follows follows_follower_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andikha.wisanggeni
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES public.users(user_id);


--
-- Name: follows follows_following_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andikha.wisanggeni
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_following_id_fkey FOREIGN KEY (following_id) REFERENCES public.users(user_id);


--
-- Name: rating rating_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andikha.wisanggeni
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipe(recipe_id);


--
-- Name: rating rating_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andikha.wisanggeni
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: recipe recipe_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andikha.wisanggeni
--

ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT recipe_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

