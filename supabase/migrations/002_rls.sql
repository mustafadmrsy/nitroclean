CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_zones ENABLE ROW LEVEL SECURITY;

-- PRODUCTS
DROP POLICY IF EXISTS "products_select_public" ON products;
CREATE POLICY "products_select_public" ON products
FOR SELECT
USING (is_active = true);

DROP POLICY IF EXISTS "products_admin_all" ON products;
CREATE POLICY "products_admin_all" ON products
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- CUSTOMERS
DROP POLICY IF EXISTS "customers_self_select" ON customers;
CREATE POLICY "customers_self_select" ON customers
FOR SELECT
USING (auth.uid() = id);

DROP POLICY IF EXISTS "customers_self_upsert" ON customers;
CREATE POLICY "customers_self_upsert" ON customers
FOR INSERT
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "customers_self_update" ON customers;
CREATE POLICY "customers_self_update" ON customers
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "customers_admin_all" ON customers;
CREATE POLICY "customers_admin_all" ON customers
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ADDRESSES
DROP POLICY IF EXISTS "addresses_self_select" ON addresses;
CREATE POLICY "addresses_self_select" ON addresses
FOR SELECT
USING (customer_id = auth.uid());

DROP POLICY IF EXISTS "addresses_self_insert" ON addresses;
CREATE POLICY "addresses_self_insert" ON addresses
FOR INSERT
WITH CHECK (customer_id = auth.uid());

DROP POLICY IF EXISTS "addresses_self_update" ON addresses;
CREATE POLICY "addresses_self_update" ON addresses
FOR UPDATE
USING (customer_id = auth.uid())
WITH CHECK (customer_id = auth.uid());

DROP POLICY IF EXISTS "addresses_self_delete" ON addresses;
CREATE POLICY "addresses_self_delete" ON addresses
FOR DELETE
USING (customer_id = auth.uid());

DROP POLICY IF EXISTS "addresses_admin_all" ON addresses;
CREATE POLICY "addresses_admin_all" ON addresses
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ORDERS
DROP POLICY IF EXISTS "orders_self_select" ON orders;
CREATE POLICY "orders_self_select" ON orders
FOR SELECT
USING (customer_id = auth.uid());

-- For now, allow customers to insert their own order rows.
-- Payment state changes must be performed by service role / admin only (via API).
DROP POLICY IF EXISTS "orders_self_insert" ON orders;
CREATE POLICY "orders_self_insert" ON orders
FOR INSERT
WITH CHECK (customer_id = auth.uid());

DROP POLICY IF EXISTS "orders_admin_all" ON orders;
CREATE POLICY "orders_admin_all" ON orders
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ORDER ITEMS
DROP POLICY IF EXISTS "order_items_self_select" ON order_items;
CREATE POLICY "order_items_self_select" ON order_items
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.id = order_items.order_id
      AND o.customer_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "order_items_self_insert" ON order_items;
CREATE POLICY "order_items_self_insert" ON order_items
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.id = order_items.order_id
      AND o.customer_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "order_items_admin_all" ON order_items;
CREATE POLICY "order_items_admin_all" ON order_items
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- SHIPPING ZONES
DROP POLICY IF EXISTS "shipping_zones_select_public" ON shipping_zones;
CREATE POLICY "shipping_zones_select_public" ON shipping_zones
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "shipping_zones_admin_all" ON shipping_zones;
CREATE POLICY "shipping_zones_admin_all" ON shipping_zones
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());
