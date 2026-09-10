import "./globals.css";
import { Cherry_Bomb_One, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

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
    <html
      lang="en"
      className={cn(cherryBomb.variable, "font-mono", jetbrainsMono.variable)}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header>
            <h1 style={{ fontFamily: "var(--font-cherry-bomb)" }}>
              Kiki's Delivery Service
            </h1>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
