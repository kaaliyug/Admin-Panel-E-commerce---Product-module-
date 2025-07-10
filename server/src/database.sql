
CREATE TABLE products (
    id SERIAL PRIMARY KEY, 
    sku VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    -- images TEXT[] -- Array of image URLs/paths
    images JSONB
);

CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL
);
