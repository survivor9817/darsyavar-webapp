// data/books.ts

export type Grade = "هفتم" | "هشتم" | "نهم" | "دهم" | "یازدهم" | "دوازدهم";

export type Major = "تجربی" | "ریاضی" | "انسانی" | null;

export interface Book {
  id: number;
  title: string;
  grade: Grade;
  major: Major;
  cover: string;
}

export const books: Book[] = [
  // هفتم
  { id: 1, title: "علوم تجربی", grade: "هفتم", major: null, cover: "/covers/oloom-7.png" },
  { id: 2, title: "ریاضی", grade: "هفتم", major: null, cover: "/covers/math-7.png" },
  { id: 3, title: "فارسی", grade: "هفتم", major: null, cover: "/covers/farsi-7.png" },

  // هشتم
  { id: 4, title: "علوم تجربی", grade: "هشتم", major: null, cover: "/covers/oloom-8.png" },
  { id: 5, title: "ریاضی", grade: "هشتم", major: null, cover: "/covers/math-8.png" },
  { id: 6, title: "انگلیسی", grade: "هشتم", major: null, cover: "/covers/english-8.png" },

  // نهم
  { id: 7, title: "علوم تجربی", grade: "نهم", major: null, cover: "/covers/oloom-9.png" },
  { id: 8, title: "ریاضی", grade: "نهم", major: null, cover: "/covers/math-9.png" },
  { id: 9, title: "مطالعات اجتماعی", grade: "نهم", major: null, cover: "/covers/ejtemaee-9.png" },

  // دهم
  { id: 10, title: "زیست‌شناسی ۱", grade: "دهم", major: "تجربی", cover: "/covers/zist-10.png" },
  { id: 11, title: "فیزیک ۱", grade: "دهم", major: "ریاضی", cover: "/covers/physics-10.png" },
  { id: 12, title: "اقتصاد", grade: "دهم", major: "انسانی", cover: "/covers/eghtesad-10.png" },

  // یازدهم
  { id: 13, title: "زیست‌شناسی ۲", grade: "یازدهم", major: "تجربی", cover: "/covers/zist-11.png" },
  { id: 14, title: "حسابان", grade: "یازدهم", major: "ریاضی", cover: "/covers/hesaban-11.png" },
  { id: 15, title: "جامعه‌شناسی", grade: "یازدهم", major: "انسانی", cover: "/covers/jame-11.png" },

  // دوازدهم
  { id: 16, title: "زیست‌شناسی ۳", grade: "دوازدهم", major: "تجربی", cover: "/covers/zist-12.png" },
  { id: 17, title: "حسابان ۲", grade: "دوازدهم", major: "ریاضی", cover: "/covers/hesaban-12.png" },
  { id: 18, title: "فلسفه", grade: "دوازدهم", major: "انسانی", cover: "/covers/falsafe-12.png" },
];
