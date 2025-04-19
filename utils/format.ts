/**
 * Utilitários para formatação de valores
 */

/**
 * Formata um valor para moeda brasileira (BRL)
 * @param value Valor a ser formatado
 * @returns String formatada (ex: R$ 1.234,56)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Formata um CNPJ para o padrão XX.XXX.XXX/XXXX-XX
 * @param value String ou número a ser formatado
 * @returns CNPJ formatado
 */
export function formatCNPJ(value: string | number | undefined | null): string {
  if (!value) return "";
  // Converte para string e remove caracteres não numéricos
  const cnpjDigits = String(value).replace(/\D/g, "");
  
  // Limita a 14 dígitos
  const cnpjLimited = cnpjDigits.slice(0, 14);
  
  // Aplica a máscara XX.XXX.XXX/XXXX-XX
  return cnpjLimited
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

/**
 * Remove formatação do CNPJ, mantendo apenas números
 * @param formattedValue CNPJ formatado
 * @returns Apenas os números do CNPJ
 */
export function removeCNPJFormat(formattedValue: string | undefined | null): string {
  if (!formattedValue) return "";
  return formattedValue.replace(/\D/g, "");
}

/**
 * Formata um número de telefone para os padrões (XX) XXXX-XXXX ou (XX) XXXXX-XXXX
 * @param value String ou número a ser formatado
 * @returns Telefone formatado
 */
export function formatPhone(value: string | number | undefined | null): string {
  if (!value) return "";
  // Converte para string e remove caracteres não numéricos
  const phoneDigits = String(value).replace(/\D/g, "");
  
  // Limita a 11 dígitos
  const phoneLimited = phoneDigits.slice(0, 11);
  
  // Aplica a máscara
  if (phoneLimited.length <= 2) {
    return `(${phoneLimited}`;
  } else if (phoneLimited.length <= 6) {
    return `(${phoneLimited.slice(0, 2)}) ${phoneLimited.slice(2)}`;
  } else if (phoneLimited.length <= 10) {
    return `(${phoneLimited.slice(0, 2)}) ${phoneLimited.slice(2, 6)}-${phoneLimited.slice(6)}`;
  } else {
    return `(${phoneLimited.slice(0, 2)}) ${phoneLimited.slice(2, 7)}-${phoneLimited.slice(7)}`;
  }
}

/**
 * Remove formatação do telefone, mantendo apenas números
 * @param formattedValue Telefone formatado
 * @returns Apenas os números do telefone
 */
export function removePhoneFormat(formattedValue: string | undefined | null): string {
  if (!formattedValue) return "";
  return formattedValue.replace(/\D/g, "");
}
