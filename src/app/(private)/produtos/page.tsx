"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from "../../components/Container";
import { Logos } from "./dados";

type FormValues = {
  logo: string; // nome/slug da estampa selecionada
  size: string; // PP | P | M | G | GG | XG
};

const sizes = ["PP", "P", "M", "G", "GG", "XG"] as const;

const schema = yup.object({
  logo: yup.string().required("Selecione uma estampa."),
  size: yup.string().required("Selecione um tamanho."),
});

export default function Home() {
  const router = useRouter();
  const [selectedLogo, setSelectedLogo] = useState<(typeof Logos)[number] | null>(null);
  const [size, setSize] = useState<string>("");

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { logo: "", size: "" },
    mode: "onSubmit",
  });

  const logoValue = watch("logo");
  const sizeValue = watch("size");
  const canContinue = Boolean(logoValue && sizeValue);

  // imagem principal mantém o mesmo comportamento visual
  const imagemPrincipal = (selectedLogo ?? Logos[0])?.produto;

  function onPickLogo(logo: (typeof Logos)[number]) {
    setSelectedLogo(logo);
    setValue("logo", logo.nome, { shouldValidate: true, shouldDirty: true });
    // opcional: valida só o campo atual
    trigger("logo");
  }

  function onPickSize(s: string) {
    setSize(s);
    setValue("size", s, { shouldValidate: true, shouldDirty: true });
    trigger("size");
  }

  const onSubmit = (data: FormValues) => {
    // salva para a próxima etapa, se quiser
    const produtoSelecionado = {
      productName: "Camiseta Constellation",
      logo: data.logo,
      size: data.size,
      images: [(selectedLogo ?? Logos[0]).produto],
    };
    localStorage.setItem("produtoSelecionado", JSON.stringify(produtoSelecionado));
    router.push("/entrega");
  };

  return (
    <div className="mt-2">
      <Container>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* inputs reais (invisíveis) controlados pelo react-hook-form */}
          <input type="hidden" {...register("logo")} value={logoValue} readOnly />
          <input type="hidden" {...register("size")} value={sizeValue} readOnly />

          <div className="flex h-fit w-full overflow-auto lg:px-12">
            <div className="w-full flex flex-col gap-2 items-center justify-start bg-white">
              <h1 className="text-left lg:text-center md:text-xl lg:text-3xl font-bold text-tertiary">
                Monte a Camiseta Perfeita para Você!
              </h1>

              <p className="text-xs md:text-sm text-primary text-center lg:px-24 my-6">
                Escolha a cor que combina com você, a logomarca preferida e o tamanho perfeito para o seu estilo.
                Camisetas confortáveis, com design moderno e qualidade premium.
              </p>

              <div className="h-full w-full flex flex-col md:flex-row items-start gap-2">
                {/* Imagem Principal */}
                <div className="h-full flex justify-center items-center gap-4 w-full">
                  <div className="w-56 h-56 md:w-full md:h-full flex justify-center items-center shadow-xl border-4 rounded-xl border-tertiary bg-white mx-auto">
                    <Image
                      src={imagemPrincipal}
                      alt="Camiseta de Algodão com a logo Constellation"
                      className="object-contain rounded-xl"
                      priority
                    />
                  </div>
                </div>

                {/* Lado direito */}
                <div className="w-full h-full flex flex-col justify-center items-center px-4">
                  {/* Seleção de Logo */}
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">1° Selecione a Estampa</h2>

                    <div className="grid grid-cols-3 flex-wrap justify-center gap-8">
                      {Logos.map((logo, index) => {
                        const isActive = selectedLogo?.nome === logo.nome;
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => onPickLogo(logo)}
                            aria-pressed={isActive}
                            className={`relative min-w-16 w-16 h-16 shadow-md rounded-xl cursor-pointer transition-[transform,border-color] duration-200 border-2
                            ${logo.cor}
                            ${isActive ? "border-blue-600 scale-110" : "border-transparent hover:scale-110"}`}
                            title={`Selecionar ${logo.nome}`}
                          >
                            <Image
                              src={logo.imagem}
                              alt={`Logo ${index + 1}`}
                              className="object-contain rounded-xl"
                              fill
                              sizes="64px"
                            />
                          </button>
                        );
                      })}
                    </div>

                    {errors.logo && <span className="text-red-600 text-sm mt-1">{errors.logo.message}</span>}
                  </div>

                  <hr className="border-2 border-gray-300 my-4 w-full" />

                  {/* Seleção de Tamanho */}
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">2° Selecione o Tamanho</h2>

                    <div className="grid grid-cols-3 flex-wrap justify-center gap-6">
                      {sizes.map((s) => {
                        const active = s === size;
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => onPickSize(s)}
                            aria-pressed={active}
                            className={`py-2 w-16 rounded-lg font-medium text-white transition-[transform,background-color] duration-200
                            ${active ? "bg-blue-600 scale-110 shadow-md" : "bg-blue-400 hover:bg-blue-500"}`}
                            title={`Selecionar tamanho ${s}`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>

                    {errors.size && <span className="text-red-600 text-sm mt-1">{errors.size.message}</span>}
                  </div>

                  <hr className="border-2 border-gray-300 my-4 w-full" />

                  <div className="flex items-center gap-3 w-full">
                    <button
                      type="submit"
                      disabled={!canContinue}
                      className={`py-3 px-6 text-xl mt-2 rounded-lg flex justify-center items-center w-full text-white transition-colors duration-200
                      ${
                        canContinue
                          ? "bg-green-500 hover:bg-green-400 cursor-pointer"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Continuar
                    </button>
                  </div>

                  {(!logoValue || !sizeValue) && (
                    <p className="text-zinc-500 text-sm mt-2">Selecione a estampa e o tamanho para continuar.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}
