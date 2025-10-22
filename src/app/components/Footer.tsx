import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <div className="relative w-screen  mt-2 bg-primary text-footer-text">
      <footer>
        <div className="block w-full h-2 bg-secondary"></div>
        <div className="py-1">
          <div className="bg-primaryVariant h-4 w-screen block absolute left-0 -top-4"></div>
        </div>
        {/* <ul className="flex justify-center items-center gap-4 py-1 flex-wrap">
          <li className="group">
            <Link href="#" className="text-[var(--text-footer)] " target="new_blank">
              <Facebook size={24} className="group-hover:animate-slide-in-top" />
            </Link>
          </li>
          <li className="group">
            <Link href="#" className="text-[var(--text-footer)] " target="new_blank">
              <Instagram size={24} className="group-hover:animate-slide-in-top" />
            </Link>
          </li>
          <li className="group">
            <Link href="#" className="text-[var(--text-footer)] " target="new_blank">
              <Linkedin size={24} className="group-hover:animate-slide-in-top" />
            </Link>
          </li>
          <li className="group">
            <Link href="#" className="text-[var(--text-footer)]" target="new_blank">
              <Youtube size={24} className="group-hover:animate-slide-in-top" />
            </Link>
          </li>
        </ul>
        <ul className="flex items-center justify-center text-[var(--text-footer)] opacity-80 gap-4 flex-col sm:flex-row text-sm lg:text-lg">
          <li>
            <Link href="/">Politica de Cookies</Link>
          </li>
          <li>
            <Link href="/">Politica de privacidade</Link>
          </li>
          <li>
            <Link href="/">Termos de uso</Link>
          </li>
          <li>
            <Link href="/">Fale Conosco</Link>
          </li>
        </ul> */}
        <p className="text-[var(--text-footer)] mt-2.5 text-center pb-2 text-sm">
          © 2025 - Unity Brindes | Todos Direitos Reservados
        </p>
      </footer>
    </div>
  );
}
