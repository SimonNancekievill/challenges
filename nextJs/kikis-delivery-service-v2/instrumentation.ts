import sql from "./lib/db";

export async function register() {
  await sql`
    CREATE TABLE IF NOT EXISTS deliveries (
      id SERIAL PRIMARY KEY,
      pickup TEXT NOT NULL,
      destination TEXT NOT NULL,
      status TEXT NOT NULL
    )
  `;
  await sql`
    INSERT INTO deliveries (pickup, destination, status)
    SELECT *
    FROM (
      VALUES
        ('Hamburg', 'Berlin', 'active'),
        ('Kiel', 'Hamburg', 'active'),
        ('Lübeck', 'Bremen', 'active')
    ) AS mock_data(pickup, destination, status)
    WHERE NOT EXISTS (
      SELECT 1 FROM deliveries
    )
  `;
}
