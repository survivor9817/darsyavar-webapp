export function toFaNums(englishNumber: number) {
  const persianNumberFormat = new Intl.NumberFormat("fa-IR");
  return persianNumberFormat.format(englishNumber);
}
