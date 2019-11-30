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

-- Test user
INSERT INTO public.users VALUES (
  'b6ddbc79-8709-49c6-a8a7-fc62a3869a25',
  'admin', 
  'af9300fe0c1e534e2406f9b2511d33e19103f5bd8ec60f6b06a05e1279505848',
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