CREATE TABLE IF NOT EXISTS deliveries (
        id SERIAL PRIMARY KEY
        pickup TEXT NOT NULL
        destination TEXT NOT NULL
        status TEXT NOT NULL
        createdAT TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO deliveries (pickup, destination, status) VALUES
    ('Bakery', 'Clock Tower', 'active'),
    ('Harbour', 'Hillside Cafe', 'accepted'),
    ('Bookshop', 'Lighthouse', 'denied'),
    ('Market Square', 'Train Station', 'fulfilled');