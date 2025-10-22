"use client";
import Image from "next/image";
import ImagemBG from "./assets/constellation.png";
import Logo from "../../../assets/logo-color.png";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import Link from "next/link";

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
        localStorage.setItem("nomeUsuario", data.nome);
        router.push("/produtos");
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
    <div className={`${styles.container} w-screen h-screen grid place-content-center`}>
      <div className={styles.card}>
        <div className={styles.content}>
          <Image src={Logo} alt="Logo Unity Brindes" width={150} height={150} priority />

          <h2 className={styles.title}>Bem-vindo(a)!</h2>
          <h3 className={styles.subtitle}>Informe seu nome completo para acessar.</h3>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <input
              type="text"
              placeholder="Digite seu Nome Completo"
              {...register("nome")}
              disabled={loading}
              className={`${styles.inputSignIn} capitalize`}
              aria-invalid={!!errors.nome}
              aria-describedby={errors.nome ? "erro-nome" : undefined}
            />
            {errors.nome && (
              <span id="erro-nome" className={styles.errorMsg} role="alert">
                {errors.nome.message}
              </span>
            )}

            <button type="submit" disabled={loading} className={styles.btnContinuar}>
              {loading ? "Acessando..." : "Continuar"}
            </button>
          </form>

          {errorMsg && (
            <p className={styles.errorMsg} role="alert" aria-live="polite">
              {errorMsg}
            </p>
          )}

          <p className={styles.helper}>
            Não conseguiu acessar?{" "}
            <Link href="#" className={styles.link}>
              Fale Conosco
            </Link>
          </p>
        </div>

        <Image src={ImagemBG} alt="Constelação ao fundo" className={styles.bgImage} priority />
      </div>
    </div>
  );
}
