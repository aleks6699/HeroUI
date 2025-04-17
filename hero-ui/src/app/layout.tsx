import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/Header/Header";

export const metadata: Metadata = {
  title: "Hero UI",
  description: "Create your own memes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
