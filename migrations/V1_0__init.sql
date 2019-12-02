CREATE TABLE public.users (
  id UUID NOT NULL PRIMARY KEY,
  username VARCHAR NOt NULL,
  password VARCHAR(64) NOT NULL,
  role VARCHAR NULL,
  "createdAt" TIMESTAMPTZ(3) NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ(3) NULL DEFAULT NOW(),
  enable BOOLEAN NOT NULL
);

CREATE INDEX public_user_login ON public.users(username, password, enable);
CREATE UNIQUE INDEX public_user_name ON public.users(username);

-- Test user
INSERT INTO public.users VALUES (
  'b6ddbc79-8709-49c6-a8a7-fc62a3869a25',
  'admin', 
  '69f64b10d21b5ec6e5d8bc3ff6c274317a48577253f76ee128f2c5b5abda5cf9',
  'ADMIN', 
  NOW(),
  NOW(),
  true
);

CREATE TABLE public.customers (
  id UUID NOT NULL PRIMARY KEY,
  name VARCHAR NOT NULL,
  address VARCHAR NULL,
  phone VARCHAR NULL,
  "createdAt" TIMESTAMPTZ(3) NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ(3) NULL DEFAULT NOW(),
  "modifyBy" UUID NOT NULL REFERENCES public.users(id),
  remark VARCHAR NULL,
  enable BOOLEAN NOT NULL
);
CREATE UNIQUE INDEX public_customer_name ON public.customers(name);

CREATE TABLE public.products (
  id UUID NOT NULL PRIMARY KEY,
  "displayId" SERIAL,
  name VARCHAR NOT NULL,
  unit VARCHAR NOT NULL,
  price INT4 NOT NULL,
  "createdAt" TIMESTAMPTZ(3) NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ(3) NULL DEFAULT NOW(),
  "modifyBy" UUID NOT NULL REFERENCES public.users(id),
  remark VARCHAR NULL,
  enable BOOLEAN NOT NULL
);
CREATE UNIQUE INDEX public_product_name ON public.products(name);

CREATE TABLE public.orders (
  id UUID NOT NULL PRIMARY KEY,
  "displayId" SERIAL,
  "customerId" UUID NOT NULL REFERENCES public.customers (id),
  "orderTime" TIMESTAMPTZ(3) NOT NULL,
  status VARCHAR NOT NULL,
  "createdAt" TIMESTAMPTZ(3) NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ(3) NULL DEFAULT NOW(),
  "modifyBy" UUID NOT NULL REFERENCES public.users(id),
  remark VARCHAR NULL,
  enable BOOLEAN NOT NULL 
);