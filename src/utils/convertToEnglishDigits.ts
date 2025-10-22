export function convertToEnglishDigits(input) {
  return input
    .toString()
    .trim()
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
}
