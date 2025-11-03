import type { FehrestSectionType } from "../components/FehrestItem";

export function getRefPagesArr(fehrestData: FehrestSectionType[]): number[] {
  const refPages: number[] = [];

  function extractPages(sections: any[]) {
    sections.forEach((section) => {
      refPages.push(section.page);

      // اگر زیربخش داشت، به صورت بازگشتی اونها رو هم پردازش کن
      if (section.sections && Array.isArray(section.sections)) {
        extractPages(section.sections);
      }
    });
  }

  extractPages(fehrestData);

  return refPages;
}
