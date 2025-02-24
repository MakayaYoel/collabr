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
      <head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </head>
      <body className={satoshiFont.className}>
        {children}
      </body>
    </html>
  );
}
