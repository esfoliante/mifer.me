import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/custom/TopBar";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Miguel Ferreira",
  description: "Hi, I'm Miguel Ferreira! This website is under construction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased bg-neutral-950 text-white`}
      >
        <Topbar />
        {children}
      </body>
    </html>
  );
}
