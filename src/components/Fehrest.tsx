import CloseBtn from "./CloseBtn";
import FehrestItem from "./FehrestItem.tsx";
import { bookNames } from "../data/booksData.ts";
import { booksData } from "../data/booksData.ts";
import { useContext, useEffect, useRef } from "react";
import { BookContext } from "./Layout.tsx";
import { getRefPagesArr } from "../utils/getRefPagesArr.ts";

type Props = {
  onClose: () => void;
  style: React.CSSProperties;
};

const Fehrest = ({ onClose, style }: Props) => {
  const { currentBook, setCurrentBook, setCurrentPage } = useContext(BookContext);

  // Observer
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    const observerOptions = {
      root: document.querySelector(".book-section"),
      rootMargin: "-49% 0% -49% 0%",
      threshold: 0,
    };

    function observerCallback(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const observedPage: number = +entry.target.id.replace("page", "");
        setCurrentPage(observedPage);
      });
    }

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);

    const pagesToWatch = document.querySelectorAll(".book-section .page");
    pagesToWatch.forEach((page) => {
      if (observerRef.current) {
        observerRef.current.observe(page);
      }
    });

    return () => {
      if (observerRef.current) {
        pagesToWatch.forEach((page) => {
          observerRef.current?.unobserve(page);
        });
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [currentBook]);

  // fetching bookNames data and render
  const bookItems = bookNames.map((bookName) => (
    <option key={bookName} value={bookName}>
      {bookName}
    </option>
  ));

  // fetching fehrest data and render
  const bookData = booksData[currentBook as keyof typeof booksData];
  const fehrestData = bookData.sections;
  const fehrestArr = getRefPagesArr(fehrestData);
  const fehrestItems = fehrestData.map((section) => {
    return <FehrestItem key={section.title} listItem={section} fehrestArr={fehrestArr} />;
  });

  function handleChangeBook(event: React.ChangeEvent<HTMLSelectElement>) {
    const newBookName = event.target.value;
    setCurrentBook(newBookName);
  }

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
              onChange={handleChangeBook}
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
