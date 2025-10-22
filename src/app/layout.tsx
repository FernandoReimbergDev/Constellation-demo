import type { Metadata } from "next";
import { Roboto, Poppins, Montserrat, Oxanium } from "next/font/google";
import "./globals.css";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  style: ["normal"],
  variable: "--font-poppins",
});

const oxanium = Oxanium({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--font-oxanium",
});
const montserrat = Montserrat({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Constellation | Unity Brindes",
  description: "Loja Virtual Constellation",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="overflow-x-hidden scrollbar">
      <body className={`${roboto.className} ${poppins.className} ${oxanium.variable} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  );
}
