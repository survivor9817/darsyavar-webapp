import CloseBtn from "./CloseBtn";
import FehrestItem from "./FehrestItem.tsx";
import { bookNames } from "../data/booksData.ts";
import { booksData } from "../data/booksData.ts";
// import { useCallback, useMemo, useRef } from "react";

type Props = {
  onClose: () => void;
  style: React.CSSProperties;
  currentBook: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Fehrest = ({ onClose, style, currentBook, onChange }: Props) => {
  // fetching bookNames data
  const bookItems = bookNames.map((bookName) => (
    <option key={bookName} value={bookName}>
      {bookName}
    </option>
  ));

  // fetching fehrest data
  const fehrestItems = booksData[currentBook as keyof typeof booksData].sections.map((section) => {
    return <FehrestItem key={section.title} listItem={section} />;
  });

  // Observer
  // const observerRef = useRef(null);
  // const lastRefPageRef = useRef(null);
  // const lastActivesRef = useRef([]);
  // const lastExpandedsRef = useRef([]);

  // // تابع کمکی برای toggle کلاس
  // const toggleClass = useCallback((el, className) => {
  //   el?.classList.toggle(className);
  // }, []);

  // // پیدا کردن شماره صفحه مرجع
  // const fehrestPages = useMemo(() => fehrest.map((item) => item.refPage), [fehrest]);
  // const findRefTitlePageNumber = useCallback(
  //   (pageNumber) => {
  //     if (fehrestPages.includes(pageNumber)) return pageNumber;
  //     return Math.max(...fehrestPages.filter((page) => page < pageNumber));
  //   },
  //   [fehrestPages]
  // );

  // // آپدیت UI فهرست
  // const updateFehrestUI = useCallback(
  //   (observingPageNumber) => {
  //     const refPage = findRefTitlePageNumber(observingPageNumber);
  //     if (refPage === lastRefPageRef.current) return;
  //     lastRefPageRef.current = refPage;

  //     // حذف کلاس‌های قبلی
  //     lastActivesRef.current.forEach((el) => toggleClass(el, "active"));
  //     lastExpandedsRef.current.forEach((el) => toggleClass(el, "expanded"));

  //     // پیدا کردن عناصر جدید
  //     const fehrestList = document.querySelector("#fehrestList"); // use ref
  //     if (!fehrestList) return;
  //     const LI = fehrestList.querySelector(`div[data-ref-page="${refPage}"]`);
  //     const siblingOL = LI?.nextElementSibling;
  //     const parentOL = LI?.closest("ol.articles");
  //     const higherLI = parentOL?.previousElementSibling;

  //     // ذخیره عناصر جدید
  //     lastActivesRef.current = [LI, higherLI].filter(Boolean);
  //     lastExpandedsRef.current = [parentOL, siblingOL].filter(Boolean);

  //     // اعمال کلاس‌های جدید
  //     toggleClass(LI, "active");
  //     if (siblingOL) {
  //       toggleClass(siblingOL, "expanded");
  //     } else {
  //       toggleClass(parentOL, "expanded");
  //       toggleClass(higherLI, "active");
  //     }
  //   },
  //   [findRefTitlePageNumber, toggleClass]
  // );

  // // callback برای observer
  // const observerCallback = useCallback(
  //   (entries) => {
  //     entries.forEach((entry) => {
  //       if (!entry.isIntersecting) return;
  //       const observedPageNumber = +entry.target.id.replace("page", "");
  //       setCurrentPageNumber(observedPageNumber);
  //       updateFehrestUI(observedPageNumber);
  //     });
  //   },
  //   [updateFehrestUI]
  // );

  // // راه‌اندازی Observer
  // useEffect(() => {
  //   const observerOptions = {
  //     root: document.querySelector(".book-section"),
  //     rootMargin: "-49% 0% -49% 0%",
  //     threshold: 0,
  //   };

  //   // ساخت observer
  //   observerRef.current = new IntersectionObserver(observerCallback, observerOptions);

  //   // observe کردن صفحات
  //   const pagesToWatch = document.querySelectorAll(".book-section .page");
  //   pagesToWatch.forEach((page) => observerRef.current.observe(page));

  //   // cleanup
  //   return () => {
  //     if (observerRef.current) {
  //       pagesToWatch.forEach((page) => observerRef.current.unobserve(page));
  //       observerRef.current.disconnect();
  //     }
  //   };
  // }, [fehrest, observerCallback]);

  return (
    <>
      <div className="sidebar sidebar-right" style={style}>
        <CloseBtn onClick={onClose} />

        <div className="fehrest-section">
          <header className="fehrest-header">
            <label htmlFor="BookSelector" className="book-selector-label">
              فهرست کتاب
            </label>
            <select
              id="BookSelector"
              name="BookSelector"
              className="book-selector"
              value={currentBook}
              onChange={onChange}
            >
              {bookItems}
            </select>
          </header>
          <ol id="fehrestList" className="fehrest-list">
            {fehrestItems}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Fehrest;
