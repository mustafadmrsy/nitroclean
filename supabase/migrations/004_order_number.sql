CREATE SEQUENCE IF NOT EXISTS public.order_number_seq;

CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  seq_val bigint;
  year_val text;
BEGIN
  year_val := to_char(now(), 'YYYY');
  seq_val := nextval('public.order_number_seq');

  RETURN 'NC-' || year_val || '-' || lpad(seq_val::text, 5, '0');
END;
$$;

ALTER TABLE orders
  ALTER COLUMN order_number SET DEFAULT public.generate_order_number();
