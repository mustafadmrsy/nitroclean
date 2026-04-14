ALTER TABLE orders
  ALTER COLUMN customer_id DROP NOT NULL;

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS customer_email text,
  ADD COLUMN IF NOT EXISTS customer_phone text,
  ADD COLUMN IF NOT EXISTS public_token uuid DEFAULT gen_random_uuid();

CREATE UNIQUE INDEX IF NOT EXISTS orders_public_token_unique ON orders(public_token);
