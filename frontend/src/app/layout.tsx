import type { Metadata } from "next";
import "./globals.css";
import satoshiFont from "./lib/font";

export const metadata: Metadata = {
  title: "collabr",
  description: "yet another real-time coding collaboration application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <body className={satoshiFont.className}>
        {children}
      </body>
    </html>
  );
}
