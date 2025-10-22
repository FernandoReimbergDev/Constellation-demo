"use client";

import { fetchAddressFromCep, handleCEPMask, handlePhoneMask } from "../../services/utils";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { DadosEntregaFormData, DadosEntregaSchema } from "./schema";
import { useRouter } from "next/navigation";
import { UsuarioResponse } from "@/app/types/responseTypes";

export function FormDadosEntrega() {
  const router = useRouter();
  const [clientData, _setClientData] = useState<UsuarioResponse>({
    success: false,
    message: "",
    result: [],
  });
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<DadosEntregaFormData>({
    resolver: yupResolver(DadosEntregaSchema),
    mode: "onChange",
  });
  const cep = watch("cep");
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    if (!clientData) return;

    const { result } = clientData;
    if (!Array.isArray(result) || result.length === 0) return;

    const { phones, addresses } = result[0];

    if (Array.isArray(phones) && phones.length > 0) {
      phones.map((tel) => {
        if (tel?.number) {
          handlePhoneMask(tel.number, setValue, trigger, setError, clearErrors);
        }
        return null;
      });
    }

    // Endereço principal (addresses[0])
    if (Array.isArray(addresses) && addresses.length > 0) {
      const endereco = addresses[0];

      handleCEPMask(endereco.zipcode ?? "", setValue, trigger, setError, clearErrors);
      setValue("logradouro", endereco.street ?? "");
      setValue("numero", endereco.number ?? "");
      setValue("complemento", endereco.complement ?? "");
      setValue("bairro", endereco.neighborhood ?? "");
      setValue("municipio", endereco.city ?? "");
      setValue("uf", endereco.id ?? "");
    }
  }, [clientData, setValue, trigger, setError, clearErrors]);

  useEffect(() => {
    if (cep?.length === 9) {
      fetchAddressFromCep(cep, setValue, trigger, setError, clearErrors);
      setShowForm(true);
    }
  }, [cep, setValue, trigger, setError, clearErrors]);

  const onSubmit: SubmitHandler<DadosEntregaFormData> = async (data) => {
    try {
      setSubmitting(true);
      localStorage.setItem("dadosEntrega", JSON.stringify(data));
      router.push("/pedido");
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao concluir o pedido. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-fit w-full px-2 relative z-40">
      <header className="p-2">
        <div className="w-full max-w-[95%] md:max-w-[92%] h-fit mx-auto flex flex-col justify-start items-center gap-1 z-50 relative">
          <h1 className="text-sm sm:text-base md:text-xl 2xl:text-2xl font-bold font-poppins text-primary text-center mb-6">
            INFORME O ENDEREÇO PARA ENTREGA
          </h1>
        </div>
      </header>
      <div>
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="px-2 mb-6">Informe seu CEP para continuar:</h2>
          <div className="px-2 mb-2 mt-2">
            <label className="block text-xs 2xl:text-sm font-medium text-gray-700">CEP</label>
            <input
              type="text"
              id="cep"
              {...register("cep")}
              autoFocus={true}
              placeholder="00000-000"
              onChange={(e) => handleCEPMask(e.target.value, setValue, trigger, setError, clearErrors)}
              className={`w-full mx-auto px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.cep
                  ? "border-red-500 focus:ring-red-500 focus:outline-none focus:ring-2"
                  : "border-gray-300 focus:ring-blue-500 focus:outline-none focus:ring-2"
              }`}
            />
            {errors.cep && <span className="text-red-500 text-xs">{errors.cep.message}</span>}
          </div>
          {showForm && (
            <>
              <section className="grid md:grid-cols-2 gap-2 md:gap-4 bg-white mb-2">
                <div className="flex gap-1">
                  <div className="px-2 grow">
                    <label className="block text-xs 2xl:text-sm font-medium text-gray-700">Endereço*</label>
                    <input
                      type="text"
                      id="logradouro"
                      {...register("logradouro")}
                      className={`w-full mx-auto px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.logradouro
                          ? "border-red-500 focus:ring-red-500 focus:outline-none focus:ring-2"
                          : "border-gray-300 focus:ring-blue-500 focus:outline-none focus:ring-2"
                      }`}
                    />
                    {errors.logradouro && <span className="text-red-500 text-xs">{errors.logradouro.message}</span>}
                    <br />
                    {errors.numero && <span className="text-red-500 text-xs">{errors.numero.message}</span>}
                  </div>
                  <div className="px-2">
                    <label className="block text-xs 2xl:text-sm font-medium text-gray-700">N°</label>
                    <input
                      type="text"
                      id="numero"
                      autoFocus
                      {...register("numero")}
                      className={`w-[66px] flex-none px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.numero
                          ? "border-red-500 focus:ring-red-500 focus:outline-none focus:ring-2"
                          : "border-gray-300 focus:ring-blue-500 focus:outline-none focus:ring-2"
                      }`}
                    />
                  </div>
                </div>
                <div className="px-2">
                  <label className="block text-xs 2xl:text-sm font-medium text-gray-700">Complemento</label>
                  <input
                    type="text"
                    id="complemento"
                    {...register("complemento")}
                    className={`w-full mx-auto px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.complemento
                        ? "border-red-500 focus:ring-red-500 focus:outline-none focus:ring-2"
                        : "border-gray-300 focus:ring-blue-500 focus:outline-none focus:ring-2"
                    }`}
                  />
                  {errors.complemento && <span className="text-red-500 text-xs">{errors.complemento.message}</span>}
                </div>
                <div className="px-2">
                  <label className="block text-xs 2xl:text-sm font-medium text-gray-700">Bairro*</label>
                  <input
                    type="text"
                    id="bairro"
                    {...register("bairro")}
                    className={`w-full mx-auto px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.bairro
                        ? "border-red-500 focus:ring-red-500 focus:outline-none focus:ring-2"
                        : "border-gray-300 focus:ring-blue-500 focus:outline-none focus:ring-2"
                    }`}
                  />
                  {errors.bairro && <span className="text-red-500 text-xs">{errors.bairro.message}</span>}
                </div>
                <div className="flex gap-1">
                  <div className="px-2 grow">
                    <label className="block text-xs 2xl:text-sm font-medium text-gray-700">Municipio</label>
                    <input
                      type="text"
                      id="municipio"
                      readOnly
                      {...register("municipio")}
                      className={`w-full mx-auto px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.municipio
                          ? "border-red-500 focus:ring-red-500 focus:outline-none focus:ring-2"
                          : "border-gray-300 focus:ring-blue-500 focus:outline-none focus:ring-2"
                      }`}
                    />
                    {errors.municipio && <span className="text-red-500 text-xs">{errors.municipio.message}</span>}
                    {errors.uf && <span className="text-red-500 text-xs">{errors.uf.message}</span>}
                  </div>
                  <div className="px-2">
                    <label className="block text-xs 2xl:text-sm font-medium text-gray-700">UF</label>
                    <input
                      type="text"
                      id="uf"
                      readOnly
                      {...register("uf")}
                      className={`w-[66px] flex-none px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.uf
                          ? "border-red-500 focus:ring-red-500 focus:outline-none focus:ring-2"
                          : "border-gray-300 focus:ring-blue-500 focus:outline-none focus:ring-2"
                      }`}
                    />
                  </div>
                </div>
                <div className="px-2">
                  <label className="block text-xs 2xl:text-sm font-medium text-gray-700">Contato para Entrega</label>
                  <input
                    type="text"
                    id="contato_entrega"
                    {...register("contato_entrega")}
                    className={`w-full mx-auto px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize ${
                      errors.contato_entrega
                        ? "border-red-500 focus:ring-red-500 focus:outline-none focus:ring-2"
                        : "border-gray-300 focus:ring-blue-500 focus:outline-none focus:ring-2"
                    }`}
                  />
                  {errors.contato_entrega && (
                    <span className="text-red-500 text-xs">{errors.contato_entrega.message}</span>
                  )}
                </div>

                <div className="flex flex-col mx-auto w-full">
                  <div>
                    <div className="w-full flex gap-4 justify-between items-center">
                      <div className="w-[78px] px-2">
                        <label className="block text-xs 2xl:text-sm font-medium text-gray-700">DDD</label>
                        <input
                          type="text"
                          id="ddd"
                          {...register("ddd")}
                          className={`w-[66px] flex-none px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.ddd
                              ? "border-red-500 focus:ring-red-500 focus:outline-none focus:ring-2"
                              : "border-gray-300 focus:ring-blue-500 focus:outline-none focus:ring-2"
                          }`}
                        />
                      </div>
                      <div className="px-2 w-full grow">
                        <label className="block text-xs 2xl:text-sm font-medium text-gray-700 ">Telefone</label>
                        <input
                          type="text"
                          id="telefone"
                          {...register("telefone")}
                          placeholder="0000-0000"
                          onChange={(e) => handlePhoneMask(e.target.value, setValue, trigger, setError, clearErrors)}
                          className={`w-full mx-auto px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.telefone
                              ? "border-red-500 focus:ring-red-500 focus:outline-none focus:ring-2"
                              : "border-gray-300 focus:ring-blue-500 focus:outline-none focus:ring-2"
                          }`}
                        />
                      </div>
                    </div>
                    {errors.ddd && <span className="text-red-500 text-xs">{errors.ddd.message}</span>}
                    <br />
                    {errors.telefone && <span className="text-red-500 text-xs">{errors.telefone.message}</span>}
                  </div>
                </div>
              </section>
              <section className="grid md:grid-cols-1 gap-2 2xl:gap-8 py-2 bg-white ">
                <div className="flex flex-col mx-auto w-full px-2">
                  <label className="block text-xs 2xl:text-sm font-medium text-gray-700">
                    Informações Complementares
                  </label>
                  <textarea
                    id="informacoes_complementares"
                    {...register("informacoes_complementares")}
                    className="w-full mx-auto px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="px-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`py-2 px-4 mt-4 max-w-3xs rounded-lg flex justify-between items-center w-full  hover:bg-green-400 
                      text-white cursor-pointer
                      transition-colors duration-200 ${submitting ? "bg-gray-400" : "bg-green-500"}`}
                  >
                    {submitting ? `'ENVIANDO...'` : "CONCLUIR PEDIDO"}
                  </button>
                </div>
              </section>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
