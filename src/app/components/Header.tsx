"use client";
import Image from "next/image";
import Logo from "../../assets/logo-color.png";
import { LogOut } from "lucide-react";

export function Header() {
  function handleSignOut() {
    document.cookie = "auth=; path=/; max-age=0";
    window.location.href = "/sign-in";
  }

  return (
    <>
      <div className="lg:bg-primary w-full mt-0 lg:pt-2 pb-2 print:hidden">
        <header className="bg-white min-w-[350px] w-full lg:max-w-5xl xl:max-w-7xl 2xl:max-w-7xl mx-auto shadow-xl py-4 px-6 lg:rounded-2xl flex justify-between items-center">
          <div className="logo w-36 lg:w-40">
            <Image src={Logo} alt="logo da empresa Constallation" className="w-full" />
          </div>
          <div className="flex gap-2 text-xs md:text-base items-center">
            <span className="gap-1 items-center flex cursor-pointer" onClick={handleSignOut}>
              Sair
              <LogOut size={16} />
            </span>
          </div>
        </header>
      </div>
    </>
  );
}
