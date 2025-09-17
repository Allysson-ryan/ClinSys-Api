export const formatCurrencyBRL = (value) => {
  if (typeof value !== "number") {
    throw new Error("formatCurrencyBRL espera um número");
  }

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
};
