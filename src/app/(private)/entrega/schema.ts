import { removeHtmlTags, validateCPFOrCNPJ } from "../../services/utils";
import * as yup from "yup";
import type { Asserts } from "yup";

export const DadosEntregaSchema = yup.object({
  cep: yup
    .string()
    .required("CEP é obrigatório")
    .matches(/^\d{5}-\d{3}$/, "CEP inválido. O formato deve ser 00000-000"),

  logradouro: yup
    .string()
    .min(2, "Endereço deve ter no mínimo 2 caracteres")
    .required("Logradouro é obrigatório")
    .transform(removeHtmlTags),

  numero: yup
    .string()
    .min(1, "Número deve ter no mínimo 1 caractere")
    .required("Número é obrigatório")
    .transform(removeHtmlTags),

  complemento: yup
    .string()
    .max(50, "Complemento não deve ter mais do que 50 caracteres")
    .nullable()
    .default(null)
    .transform((value) => (value ? removeHtmlTags(value) : undefined)),

  bairro: yup
    .string()
    .min(3, "Bairro deve ter no mínimo 3 caracteres")
    .required("Bairro é obrigatório")
    .transform(removeHtmlTags),

  municipio: yup
    .string()
    .min(3, "Município deve ter no mínimo 3 caracteres")
    .required("Município é obrigatório")
    .transform(removeHtmlTags),

  uf: yup
    .string()
    .length(2, "UF deve ter exatamente 2 caracteres")
    .required("UF é obrigatória")
    .transform(removeHtmlTags),

  contato_entrega: yup
    .string()
    .min(2, "Nome do contato deve ter no mínimo 2 caracteres")
    .required("Contato para entrega é obrigatório")
    .transform(removeHtmlTags),

  ddd: yup
    .string()
    .length(2, "DDD deve ter exatamente 2 caracteres")
    .required("DDD é obrigatório")
    .transform(removeHtmlTags),

  telefone: yup
    .string()
    .min(8, "Telefone deve ter no mínimo 8 caracteres")
    .max(15, "Telefone não deve ter mais do que 15 caracteres")
    .required("Telefone é obrigatório"),

  informacoes_complementares: yup
    .string()
    .max(50, "Limite de 50 caracteres")
    .nullable()
    .default(null)
    .transform((value) => (value ? removeHtmlTags(value) : undefined)),
});

export type DadosEntregaFormData = Asserts<typeof DadosEntregaSchema>;
