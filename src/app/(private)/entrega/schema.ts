import { removeHtmlTags } from "../../services/utils";
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
    .transform((v) => removeHtmlTags(v)),

  numero: yup
    .string()
    .min(1, "Número deve ter no mínimo 1 caractere")
    .required("Número é obrigatório")
    .transform((v) => removeHtmlTags(v)),

  complemento: yup
    .string()
    .max(50, "Complemento não deve ter mais do que 50 caracteres")
    .nullable()
    .default(null)
    .transform((v) => (v != null && v !== "" ? removeHtmlTags(v) : null)),

  bairro: yup
    .string()
    .min(3, "Bairro deve ter no mínimo 3 caracteres")
    .required("Bairro é obrigatório")
    .transform((v) => removeHtmlTags(v)),

  municipio: yup
    .string()
    .min(3, "Município deve ter no mínimo 3 caracteres")
    .required("Município é obrigatório")
    .transform((v) => removeHtmlTags(v)),

  uf: yup
    .string()
    .length(2, "UF deve ter exatamente 2 caracteres")
    .required("UF é obrigatória")
    .transform((v) => removeHtmlTags(v)),

  contato_entrega: yup
    .string()
    .min(2, "Nome do contato deve ter no mínimo 2 caracteres")
    .required("Contato para entrega é obrigatório")
    .transform((v) => removeHtmlTags(v)),

  // DDD é opcional, mas obrigatório (2 dígitos) se telefone vier preenchido
  ddd: yup
    .string()
    .optional()
    .transform((v) => (v ? removeHtmlTags(v) : undefined))
    .test("ddd-condicional", "Informe um DDD válido (2 dígitos) quando o telefone for preenchido", function (value) {
      const tel = this.parent.telefone as string | undefined;
      if (!tel) return true; // sem telefone, DDD opcional
      const digits = (value ?? "").replace(/\D/g, "");
      return /^\d{2}$/.test(digits);
    }),

  // Telefone é opcional; se preenchido, deve ter 8–15 dígitos (ignorando máscara)
  telefone: yup
    .string()
    .optional()
    .transform((v) => (v ? removeHtmlTags(v) : undefined))
    .test("telefone-length", "Telefone deve ter entre 8 e 15 dígitos", (value) => {
      if (!value) return true;
      const digits = value.replace(/\D/g, "");
      return digits.length >= 8 && digits.length <= 15;
    }),

  informacoes_complementares: yup
    .string()
    .max(50, "Limite de 50 caracteres")
    .nullable()
    .default(null)
    .transform((v) => (v != null && v !== "" ? removeHtmlTags(v) : null)),
});

export type DadosEntregaFormData = Asserts<typeof DadosEntregaSchema>;
