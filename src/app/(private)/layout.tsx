import type { Metadata } from "next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Constellation | Unity Brindes",
  description: "Loja Virtual Constellation",
};

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-fit min-h-screen flex flex-col items-center justify-center">
      <Header />
      <div className="w-[94%] min-w-[350px] lg:max-w-5xl xl:max-w-7xl 2xl:max-w-7xl flex-1 flex flex-col justify-center items-center  overflow-y-auto">
        {children}
      </div>
      <Footer />
    </div>
  );
}
