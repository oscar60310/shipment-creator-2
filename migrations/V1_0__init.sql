CREATE TABLE public.user (
  id UUID NOT NULL PRIMARY KEY,
  username VARCHAR NOt NULL,
  password VARCHAR(64) NOT NULL,
  role VARCHAR NULL,
  create_at TIMESTAMPTZ(3) NULL DEFAULT NOW(),
  enable BOOLEAN NOT NULL
);

CREATE INDEX public_user_login ON public.user(username, password, enable);

-- Test user
INSERT INTO public.user VALUES (
  'b6ddbc79-8709-49c6-a8a7-fc62a3869a25',
  'admin', 
  'af9300fe0c1e534e2406f9b2511d33e19103f5bd8ec60f6b06a05e1279505848',
  'ADMIN', 
  NOW(),
  true
);

CREATE TABLE public.customer (
  id UUID NOT NULL PRIMARY KEY,
  name VARCHAR NOT NULL,
  address VARCHAR NULL,
  phone VARCHAR NULL,
  create_at TIMESTAMPTZ(3) NULL DEFAULT NOW(),
  modify_at TIMESTAMPTZ(3) NULL DEFAULT NOW(),
  modify_by UUID NOT NULL REFERENCES public.user(id),
  remark VARCHAR NULL,
  enable BOOLEAN NOT NULL
);