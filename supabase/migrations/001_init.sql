CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name_tr text NOT NULL,
  name_en text,
  description_tr text,
  price numeric(10,2) NOT NULL,
  compare_price numeric(10,2),
  stock integer DEFAULT 0,
  sku text UNIQUE,
  weight_g integer,
  volume_ml integer,
  images jsonb DEFAULT '[]',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  phone text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id),
  full_name text NOT NULL,
  phone text NOT NULL,
  address_line text NOT NULL,
  city text NOT NULL,
  district text NOT NULL,
  postal_code text,
  is_default boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_id uuid REFERENCES customers(id),
  status text DEFAULT 'pending',
  subtotal numeric(10,2) NOT NULL,
  shipping_fee numeric(10,2) DEFAULT 0,
  total numeric(10,2) NOT NULL,
  shipping_address jsonb NOT NULL,
  billing_address jsonb,
  paytr_merchant_oid text,
  paytr_status text,
  cargo_company text,
  cargo_tracking text,
  invoice_number text,
  invoice_url text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id),
  product_id uuid REFERENCES products(id),
  product_name text NOT NULL,
  product_sku text,
  quantity integer NOT NULL,
  unit_price numeric(10,2) NOT NULL,
  total_price numeric(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS shipping_zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  free_threshold numeric(10,2) DEFAULT 500,
  base_fee numeric(10,2) DEFAULT 49.90
);

INSERT INTO products (slug, name_tr, name_en, description_tr, price, compare_price, stock, sku, weight_g, volume_ml)
VALUES
(
  'fren-balata-temizleme-spreyi',
  'Fren Balata Temizleme Spreyi',
  'Brake Cleaner Spray',
  'Yüksek etkili fren ve metal temizleyicisidir. Frenlerdeki tozu, sızdıran sıvıları ve yağları temizler. Profesyonel güç, 500ml. Hezgan, klorlu solventler, propanol, CO2 içerir.',
  189.90, 219.90, 100, 'NC-FBS-500', 450, 500
),
(
  'susuz-motor-yikama-spreyi',
  'Susuz Motor Yıkama ve Temizleme Spreyi',
  'Waterless Engine Cleaning & Degreasing Spray',
  'Elektronik aksamlı araçların motor bloklarının su ile temasını engelleyen, susuz motor temizleme spreyi. Her yüzeyde kullanılabilir, pratik ve anti-statik. 500ml.',
  199.90, 239.90, 100, 'NC-SMS-500', 450, 500
)
ON CONFLICT (slug) DO NOTHING;
