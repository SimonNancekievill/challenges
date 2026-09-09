import { Cherry_Bomb_One } from "next/font/google";

const cherryBomb = Cherry_Bomb_One({
  weight: "400",
  variable: "--font-cherry-bomb",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cherryBomb.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.pumpkin.min.css"
        />
      </head>
      <body>
        <header>
          <h1 style={{ fontFamily: "var(--font-cherry-bomb)" }}>
            Kiki's Delivery Service
          </h1>
        </header>
        {children}
      </body>
    </html>
  );
}
