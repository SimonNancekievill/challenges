import "./globals.css";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Cherry_Bomb_One } from "next/font/google";
import { ModeToggle } from "@/components/ModeToggle";

const cherryBomb = Cherry_Bomb_One({
  weight: "400",
  variable: "--font-cherry-bomb",
  subsets: ["latin"],
});

const areal = localFont({
  src: "../public/font/ABCArealVariable.woff2",
  variable: "--font-areal",
});

const arealMono = localFont({
  src: "../public/font/ABCArealMonoVariable.woff2",
  variable: "--font-areal-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        areal.variable,
        "font-areal-mono tracking-tight",
        arealMono.variable,
        cherryBomb.variable,
      )}
      suppressHydrationWarning
    >
      <body className="flex-col min-w-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="flex justify-between mx-6 mt-2 mb-8">
            <h1 className="text-3xl font-cherry-bomb">
              Kiki's Delivery Service
            </h1>
            <ModeToggle />
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
