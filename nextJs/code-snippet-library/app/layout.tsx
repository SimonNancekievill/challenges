import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetBrains = JetBrains_Mono({
  weight: "400",
  variable: "--font-jetBrains-mono",
  subsets: ["latin"],
});

const inter = Inter({
  weight: "400",
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jetBrains.variable} ${inter.variable}`}>
      <head>
        <style>{`pre, code {font-family: var(--font-jetBrains-mono);}
        body {font-family: var(--font-inter)}`}</style>
      </head>
      <body>
        <header>
          <h1>code snippet library</h1>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
