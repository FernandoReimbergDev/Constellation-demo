"use client";
import Image from "next/image";
import ImagemBG from "./assets/Constallation.png";
import Logo from "../../../assets/logo-color.png";
import "./styles.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

// --- Validação com YUP ---
const schema = yup.object({
  nome: yup
    .string()
    .required("Por favor, informe seu nome completo.")
    .test("nome-completo", "Digite ao menos um sobrenome.", (value) => {
      if (!value) return false;
      const partes = value.trim().split(" ").filter(Boolean);
      return partes.length >= 2;
    }),
});

type FormData = yup.InferType<typeof schema>;

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data: FormData) {
    try {
      setLoading(true);
      setErrorMsg("");

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: data.nome }),
      });

      if (res.ok) {
        router.push("/produtos"); // ✅ redireciona no cliente
      } else {
        setErrorMsg("Falha ao autenticar. Tente novamente.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Não foi possível realizar o login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen grid place-content-center">
      <div className="card">
        <div className="content">
          <Image src={Logo} alt="imagem página de login, logo" width={150} height={150} />
          <h2>Bem-vindo(a)!</h2>
          <h3>Informe seu nome completo para receber seu brinde no endereço desejado.</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <input type="text" placeholder="Digite seu Nome Completo" {...register("nome")} disabled={loading} />
            {errors.nome && <span className="error-msg">{errors.nome.message}</span>}

            <button type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {errorMsg && <p className="error-msg">{errorMsg}</p>}

          <p>
            Não conseguiu acessar? <a href="/">Fale Conosco</a>
          </p>
        </div>

        <Image src={ImagemBG} alt="imagem página de login, fundo" className="hidden md:block" />
      </div>
    </div>
  );
}
