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
export function formatCNPJ(value: string | number): string {
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
export function removeCNPJFormat(formattedValue: string): string {
  return formattedValue.replace(/\D/g, "");
}
