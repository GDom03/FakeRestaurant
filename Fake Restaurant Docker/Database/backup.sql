--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Debian 15.13-1.pgdg120+1)
-- Dumped by pg_dump version 15.13 (Debian 15.13-1.pgdg120+1)

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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: admin
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO admin;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: admin
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Images; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Images" (
    id integer NOT NULL,
    image character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "RestaurantId" integer
);


ALTER TABLE public."Images" OWNER TO admin;

--
-- Name: Images_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Images_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Images_id_seq" OWNER TO admin;

--
-- Name: Images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Images_id_seq" OWNED BY public."Images".id;


--
-- Name: Restaurants; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Restaurants" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserEmail" character varying(255)
);


ALTER TABLE public."Restaurants" OWNER TO admin;

--
-- Name: Restaurants_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Restaurants_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Restaurants_id_seq" OWNER TO admin;

--
-- Name: Restaurants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Restaurants_id_seq" OWNED BY public."Restaurants".id;


--
-- Name: Reviews; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Reviews" (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    content character varying(255) NOT NULL,
    "overallRating" double precision NOT NULL,
    "serviceRating" double precision NOT NULL,
    "qualityPriceRating" double precision NOT NULL,
    "foodRating" double precision NOT NULL,
    "atmosphereRating" double precision NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserEmail" character varying(255),
    "RestaurantId" integer
);


ALTER TABLE public."Reviews" OWNER TO admin;

--
-- Name: Reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Reviews_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Reviews_id_seq" OWNER TO admin;

--
-- Name: Reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Reviews_id_seq" OWNED BY public."Reviews".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Users" (
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO admin;

--
-- Name: Votes; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Votes" (
    "isUpVote" boolean NOT NULL,
    "ReviewId" integer NOT NULL,
    "UserEmail" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Votes" OWNER TO admin;

--
-- Name: Images id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Images" ALTER COLUMN id SET DEFAULT nextval('public."Images_id_seq"'::regclass);


--
-- Name: Restaurants id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Restaurants" ALTER COLUMN id SET DEFAULT nextval('public."Restaurants_id_seq"'::regclass);


--
-- Name: Reviews id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Reviews" ALTER COLUMN id SET DEFAULT nextval('public."Reviews_id_seq"'::regclass);


--
-- Data for Name: Images; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Images" (id, image, "createdAt", "updatedAt", "RestaurantId") FROM stdin;
4	images/1750576932418_2-1.jpg	2025-06-22 07:22:12.78+00	2025-06-22 07:22:12.78+00	1
9	images/1750576932472_3-3.jpg	2025-06-22 07:22:12.833+00	2025-06-22 07:22:12.833+00	2
27	images/1750576932682_9-3.jpg	2025-06-22 07:22:12.871+00	2025-06-22 07:22:12.871+00	9
5	images/1750576932837_2-2.jpg	2025-06-22 07:22:13.053+00	2025-06-22 07:22:13.053+00	1
7	images/1750576932895_3-1.jpg	2025-06-22 07:22:13.089+00	2025-06-22 07:22:13.089+00	2
8	images/1750576932942_3-2.jpg	2025-06-22 07:22:13.126+00	2025-06-22 07:22:13.126+00	2
12	images/1750576932995_4-3.jpg	2025-06-22 07:22:13.206+00	2025-06-22 07:22:13.206+00	3
10	images/1750576933020_4-1.jpg	2025-06-22 07:22:13.218+00	2025-06-22 07:22:13.218+00	3
11	images/1750576933059_4-2.jpg	2025-06-22 07:22:13.243+00	2025-06-22 07:22:13.243+00	3
15	images/1750576933130_5-3.jpg	2025-06-22 07:22:13.279+00	2025-06-22 07:22:13.279+00	4
14	images/1750576933180_5-2.jpg	2025-06-22 07:22:13.304+00	2025-06-22 07:22:13.304+00	4
13	images/1750576933160_5-1.jpg	2025-06-22 07:22:13.307+00	2025-06-22 07:22:13.307+00	4
21	images/1750576933309_7-3.jpg	2025-06-22 07:22:13.418+00	2025-06-22 07:22:13.418+00	5
19	images/1750576933364_7-1.jpg	2025-06-22 07:22:13.441+00	2025-06-22 07:22:13.441+00	5
20	images/1750576933384_7-2.jpg	2025-06-22 07:22:13.493+00	2025-06-22 07:22:13.493+00	5
24	images/1750576933387_8-3.jpg	2025-06-22 07:22:13.497+00	2025-06-22 07:22:13.497+00	6
6	images/1750576933398_2-3.jpg	2025-06-22 07:22:13.516+00	2025-06-22 07:22:13.516+00	1
22	images/1750576933459_8-1.jpg	2025-06-22 07:22:13.575+00	2025-06-22 07:22:13.575+00	6
23	images/1750576933478_8-2.jpg	2025-06-22 07:22:13.605+00	2025-06-22 07:22:13.605+00	6
25	images/1750576933519_9-1.jpg	2025-06-22 07:22:13.673+00	2025-06-22 07:22:13.673+00	9
30	images/1750576933557_10-3.jpg	2025-06-22 07:22:13.702+00	2025-06-22 07:22:13.702+00	7
26	images/1750576933554_9-2.jpg	2025-06-22 07:22:13.706+00	2025-06-22 07:22:13.706+00	9
28	images/1750576933577_10-1.jpg	2025-06-22 07:22:13.709+00	2025-06-22 07:22:13.709+00	7
29	images/1750576933620_10-2.jpg	2025-06-22 07:22:13.721+00	2025-06-22 07:22:13.721+00	7
1	images/1750576932794_1-1.jpg	2025-06-22 07:22:12.933+00	2025-06-22 07:22:13.738+00	10
2	images/1750576933648_1-2.jpg	2025-06-22 07:22:13.738+00	2025-06-22 07:22:12.82+00	10
3	images/1750576932306_1-3.jpg	2025-06-22 07:22:12.82+00	2025-06-22 07:22:13.933+00	10
16	images/1750576933267_6-1.jpg	2025-06-22 07:22:13.368+00	2025-06-22 07:22:13.268+00	8
17	images/1750576933332_6-2.jpg	2025-06-22 07:22:13.475+00	2025-06-22 07:22:13.375+00	8
18	images/1750576933247_6-3.jpg	2025-06-22 07:22:13.327+00	2025-06-22 07:22:13.127+00	8
\.


--
-- Data for Name: Restaurants; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Restaurants" (id, name, description, type, latitude, longitude, "createdAt", "updatedAt", "UserEmail") FROM stdin;
7	Bistrot API Gateway	Access to all flavors through a single endpoint	Unified Cuisine	40.82745	14.19876	2025-06-21 07:54:04.473+00	2025-06-21 07:54:04.473+00	domgag@gmail.com
8	Frontend Fatale	Stylish dishes, but scroll carefully	UI Dining Experience	40.82654	14.20101	2025-06-21 07:54:23.034+00	2025-06-21 07:54:23.034+00	domgag@gmail.com
9	Pizzeria Stack Overflow	If your order loops, it&#x27;s not a feature	Debug Dining	40.829201	14.202435	2025-06-21 07:54:34.695+00	2025-06-21 07:54:34.695+00	domgag@gmail.com
10	Trattoria Tecnologie Web	Waiters can sometimes stand still	Tech cuisine	40.827891	14.201837	2025-06-21 07:54:43.17+00	2025-06-21 07:54:43.17+00	domgag@gmail.com
5	SQLosteria Injection	Your input is our menu	Cyber Comfort Food	40.827321	14.204444	2025-06-21 07:53:29.828+00	2025-06-21 07:53:29.828+00	annagag@gmail.com
6	Paninoteca DevOps	Continuous delivery... except on Sundays	Automation Grill	40.825901	14.202777	2025-06-21 07:53:47.401+00	2025-06-21 07:53:47.401+00	annagag@gmail.com
1	Osteria Cloud Native	Scalable portions, billed by byte	Microservice Meals	40.8281	14.200002	2025-06-21 07:51:41.254+00	2025-06-21 07:51:41.254+00	debuggingchef@example.com
2	La Taverna dei Sapori	Once you╬ô├ç├ûve tasted it, it╬ô├ç├ûs instantly available... maybe	Caching Cuisine	40.826001	14.203145	2025-06-21 07:51:55.811+00	2025-06-21 07:51:55.811+00	codegourmet@example.com
3	Locale Lazy Loading	Appetizers arrive only when you&#x27;re hungry enough	Async Eatery	40.829999	14.2001	2025-06-21 07:52:07.345+00	2025-06-21 07:52:07.345+00	asynceater@example.com
4	Ristorante Bug Tracker	We serve issues on every plate	Beta Bistrot	40.828756	14.199876	2025-06-21 07:52:21.299+00	2025-06-21 07:52:21.299+00	frontendfan@example.com
\.


--
-- Data for Name: Reviews; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Reviews" (id, title, content, "overallRating", "serviceRating", "qualityPriceRating", "foodRating", "atmosphereRating", "createdAt", "updatedAt", "UserEmail", "RestaurantId") FROM stdin;
4	Bug in the carbonara	Everything was perfect until the first bite: bacon instead of guanciale. A critical bug in the recipe&#x27;s source code. Otherwise, excellent UX: comfy chairs and solid Wi-Fi.	3.5	4	3	3	4	2025-06-21 08:09:43.025+00	2025-06-21 08:09:43.025+00	domgag@gmail.com	10
1	Courtesy infinite loop	The food? Great. But the waiter, apparently waiting for the right callback, stood next to my table the entire meal. I started to think he was running on a while true with no sleep. At one point I checked if he had a status LED somewhere.	4.5	3	4	5	4	2025-06-21 08:09:14.068+00	2025-06-21 08:09:14.068+00	annagag@gmail.com	9
2	Gastronomic timeout	After ordering, I assumed the kitchen was running an SQL query with multiple JOINs and no indexes. The dish arrived so late I thought the restaurant had gone into offline mode.	3	2	3	4	4	2025-06-21 08:09:24.238+00	2025-06-21 08:09:24.238+00	debuggingchef@example.com	8
3	Sushi and semantics	Excellent sushi, but the menu was written in some unknown DSL (Domain-Specific Language). I had to manually parse it. In the end, I just went with &#96;random.choice(dishes)&#96;, and it worked out.	4	4	4	5	3	2025-06-21 08:09:33.757+00	2025-06-21 08:09:33.757+00	codegourmet@example.com	8
12	AI-generated recipes?	The dish tasted like it was invented by an LLM trained only on Wikipedia and leftovers. I respect the ambition, but my taste buds triggered an exception.	3	4	3	2	5	2025-06-21 08:11:04.991+00	2025-06-21 08:11:04.991+00	codegourmet@example.com	5
9	404: Waiter not found	Tried to flag someone down for 15 minutes. At this point I felt like I was making HTTP requests with no response. Eventually timed out and left. Still hungry, slightly bitter.	1.5	1	2	2	2	2025-06-21 08:10:37.816+00	2025-06-21 08:10:37.816+00	domgag@gmail.com	10
20	Strange waiters	While I was eating, the waiter stood there the whole time looking at me near the table. I thought they had switched to single-threaded event loop management	4.5	3	4	5	4	2025-06-21 08:13:08.463+00	2025-06-21 08:13:08.463+00	domgag@gmail.com	10
10	Race condition at the buffet	The buffet was a chaotic shared resource. People fighting over the last meatball like it was a mutex lock. I went for salad╬ô├ç├╢less contention. Good strategy, decent crunch.	3.5	3	4	4	3	2025-06-21 08:10:45.162+00	2025-06-21 08:10:45.162+00	annagag@gmail.com	9
5	Fast food, slow thread	Went in for a quick burger, but it felt like the process was scheduled with &#96;low_priority&#96;. Five customers, 40 minutes. Installing Arch Linux was faster.	2.5	2	3	3	2	2025-06-21 08:09:52.661+00	2025-06-21 08:09:52.661+00	asynceater@example.com	7
6	Pizzeria with buffer overflow	I ordered a margherita, but got three appetizers, two beers, and a dessert. I suspect a stack management issue in the waiter╬ô├ç├ûs code. Ended up eating everything because, honestly, it was good.	4	3	5	4	4	2025-06-21 08:10:03.213+00	2025-06-21 08:10:03.213+00	frontendfan@example.com	7
7	Hipster full-stack restaurant	Recycled wood tables, menus on tablets, programmable LED lights. A full-stack restaurant experience. Too bad the food was just frontend: pretty to look at, but no substance on the backend.	3.5	4	3	3	5	2025-06-21 08:10:12.625+00	2025-06-21 08:10:12.625+00	devopsdiner@example.com	6
8	Too many cooks in the thread pool	Kitchen was so loud I thought they&#x27;d spun up a thread for each ingredient. My ears hit 100% CPU usage. The pasta was great though, even if my brain needed a restart after.	4	4	4	5	2	2025-06-21 08:10:30.246+00	2025-06-21 08:10:30.246+00	cachemaster@example.com	6
11	Microservice kitchen disaster	Each course came from a different chef with zero coordination. Soup cold, main hot, dessert still compiling. Monoliths may be outdated, but at least they deliver consistently.	2.5	2	3	3	4	2025-06-21 08:10:54.087+00	2025-06-21 08:10:54.087+00	debuggingchef@example.com	5
13	Legacy restaurant experience	Felt like walking into a PHP 5.2 app. Outdated decor, slow responses, but somehow... reliable. The lasagna had serious &#96;classical.cooking::flavor()&#96; inheritance.	4	4	4	4	4	2025-06-21 08:11:12.947+00	2025-06-21 08:11:12.947+00	asynceater@example.com	4
14	The UI was better than the UX	Nice plating, good lighting, clean menus. But everything took ages. It was like browsing a beautiful website with 4MB images and no lazy loading. I was visually impressed and physically starving.	3	2	3	3	5	2025-06-21 08:11:24.702+00	2025-06-21 08:11:24.702+00	frontendfan@example.com	4
15	API rate limit exceeded	We tried ordering extra fries. Server said, &#x27;You&#x27;ve already ordered once.&#x27; Looks like they implemented some kind of RESTful rate limiter. Honestly, I respect the commitment to protocols.	3.5	3	4	4	3	2025-06-21 08:11:44.974+00	2025-06-21 08:11:44.974+00	devopsdiner@example.com	3
16	Dependency hell on toast	The sandwich had so many ingredients it clearly required a package manager. Unfortunately, half of them conflicted. Would not compile again.	2.5	3	2	2	4	2025-06-21 08:11:53.678+00	2025-06-21 08:11:53.678+00	cachemaster@example.com	3
17	Cloud dining: ephemeral but expensive	Trendy, stylish, overpriced. I felt like I was paying for compute credits in a kitchen-as-a-service model. Good taste, but disappears as soon as you╬ô├ç├ûre done chewing. Definitely stateless.	3.5	5	2	4	5	2025-06-21 08:12:02.333+00	2025-06-21 08:12:02.333+00	debuggingchef@example.com	2
18	Command-line cuisine	No pictures on the menu. Just raw text. You order like it╬ô├ç├ûs a terminal command and hope for the best. Fortunately, the default flags were tasty.	4	4	4	4	4	2025-06-21 08:12:09.648+00	2025-06-21 08:12:09.648+00	codegourmet@example.com	2
19	NoSQL kitchen: flexible but weird	They serve whatever they feel like, loosely based on what you asked for. Not wrong, just... schema-less. My &#x27;burger&#x27; came with tofu, avocado, and existential doubt.	3	3	3	3	5	2025-06-21 08:12:16.456+00	2025-06-21 08:12:16.456+00	asynceater@example.com	1
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Users" (email, password, name, surname, "createdAt", "updatedAt") FROM stdin;
domgag@gmail.com	acc8bc4befa697b5b7b98dbe4490af3a013b27156f94a4962fb354c16064f8d0	Domenico	Gagliotti	2025-06-21 07:33:38.472+00	2025-06-21 07:33:38.472+00
annagag@gmail.com	b64638ba51886b207b0b482cc16ec278af0fd7c8675c34bfbf82450f99c8bd40	Annalisa	Gagliotti	2025-06-21 07:34:11.393+00	2025-06-21 07:34:11.393+00
debuggingchef@example.com	f44f1b9b2adfc17897a2051f134672d334cb1a2b15b7fe107105b9547e4dbf16	Marco	Rossi	2025-06-21 07:34:20.283+00	2025-06-21 07:34:20.283+00
codegourmet@example.com	2b56d533c88660fb5f68d34178036973c6205fd17b912fe86315fc9afbde455c	Luca	Bianchi	2025-06-21 07:34:27.835+00	2025-06-21 07:34:27.835+00
asynceater@example.com	cbcc734633f07fa9d565cb5836c681b3f6ede35ba24e9a33ab81350d09b32ace	Giulia	Verdi	2025-06-21 07:34:33.566+00	2025-06-21 07:34:33.566+00
frontendfan@example.com	6fe37ccda941507a5c3960daabe53d65da4e0b6931f3b18a2f59842d1d73235e	Anna	Neri	2025-06-21 07:34:38.728+00	2025-06-21 07:34:38.728+00
devopsdiner@example.com	de7c825c8541af4c5d30a71a74b904e00cd9538600dd82f4de9fb50f07bd809a	Federico	Ferrari	2025-06-21 07:34:49.152+00	2025-06-21 07:34:49.152+00
cachemaster@example.com	0ff085b0f82da7ccc9a54b897336b36736f33474d5cde47eb87acbd94f096ec9	Elena	Galli	2025-06-21 07:34:55.873+00	2025-06-21 07:34:55.873+00
\.


--
-- Data for Name: Votes; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Votes" ("isUpVote", "ReviewId", "UserEmail", "createdAt", "updatedAt") FROM stdin;
t	9	domgag@gmail.com	2025-06-21 08:20:59.426+00	2025-06-21 08:20:59.426+00
\.


--
-- Name: Images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Images_id_seq"', 30, false);


--
-- Name: Restaurants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Restaurants_id_seq"', 10, false);


--
-- Name: Reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Reviews_id_seq"', 20, true);


--
-- Name: Images Images_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Images"
    ADD CONSTRAINT "Images_pkey" PRIMARY KEY (id);


--
-- Name: Restaurants Restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Restaurants"
    ADD CONSTRAINT "Restaurants_pkey" PRIMARY KEY (id);


--
-- Name: Reviews Reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "Reviews_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (email);


--
-- Name: Votes Votes_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Votes"
    ADD CONSTRAINT "Votes_pkey" PRIMARY KEY ("ReviewId", "UserEmail");


--
-- Name: Images Images_RestaurantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Images"
    ADD CONSTRAINT "Images_RestaurantId_fkey" FOREIGN KEY ("RestaurantId") REFERENCES public."Restaurants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Restaurants Restaurants_UserEmail_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Restaurants"
    ADD CONSTRAINT "Restaurants_UserEmail_fkey" FOREIGN KEY ("UserEmail") REFERENCES public."Users"(email) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Reviews Reviews_RestaurantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "Reviews_RestaurantId_fkey" FOREIGN KEY ("RestaurantId") REFERENCES public."Restaurants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Reviews Reviews_UserEmail_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "Reviews_UserEmail_fkey" FOREIGN KEY ("UserEmail") REFERENCES public."Users"(email) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Votes Votes_ReviewId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Votes"
    ADD CONSTRAINT "Votes_ReviewId_fkey" FOREIGN KEY ("ReviewId") REFERENCES public."Reviews"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Votes Votes_UserEmail_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Votes"
    ADD CONSTRAINT "Votes_UserEmail_fkey" FOREIGN KEY ("UserEmail") REFERENCES public."Users"(email) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: admin
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

