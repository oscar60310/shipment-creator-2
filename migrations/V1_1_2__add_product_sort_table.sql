CREATE TABLE IF NOT EXISTS public.product_sort (
  id UUID NOT NULL PRIMARY KEY,
	"customerId" UUID NOT NULL REFERENCES public.customers ON DELETE CASCADE,
	"productId" UUID NOT NULL REFERENCES public.products ON DELETE CASCADE,
	sort INTEGER NOT NULL,
	"createdAt" TIMESTAMPTZ(3) NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ(3) NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS product_sort_unique ON public.product_sort ("customerId", "productId", "sort");