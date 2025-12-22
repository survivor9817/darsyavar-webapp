export function convertToEnglishDigits(input: string | number): string {
  return input
    .toString()
    .trim()
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
}
