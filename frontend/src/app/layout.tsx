import type { Metadata } from "next";
import "./globals.css";
import satoshiFont from "./lib/font";
import ContextProvider from "./context/ContextProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className={satoshiFont.className}>
        <ContextProvider>
          {children}

          <ToastContainer
            pauseOnFocusLoss={false} 
          />
        </ContextProvider>
      </body>
    </html>
  );
}
