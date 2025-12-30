import { useContext, useEffect, useMemo, useRef } from "react";
import { booksData, createLoremArr } from "../data/booksData.ts";
import { toFaNums } from "../utils/toFaNums";
import { getLocalData } from "../hooks/getLocalData.ts";
import { convertToEnglishDigits } from "../utils/convertToEnglishDigits.ts";
import { BookContext } from "./Layout.tsx";

const Book = () => {
  const { currentBook, currentPage, setCurrentPage } = useContext(BookContext);

  function goToPage(pageNumber: number) {
    if (!pageNumber || isNaN(pageNumber) || pageNumber > lastPage) return;
    setCurrentPage(pageNumber);
    // you can useRef instead
    const pageElement = document.getElementById(`page${pageNumber}`);
    pageElement && pageElement.scrollIntoView();
  }

  useEffect(() => {
    goToPage(getLocalData(currentBook, 1));
  }, [currentBook]);

  function goToPrevPage() {
    const newPage = Math.max(1, +currentPage - 1);
    goToPage(newPage);
  }

  function goToNextPage() {
    const newPage = Math.min(+lastPage, +currentPage + 1);
    goToPage(newPage);
  }

  function onInputRange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputPage = +e.target.value;
    goToPage(inputPage);
  }

  // turn english page number to farsi digits
  const inputPageNumberRefEl = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputPageNumberRefEl.current) {
      inputPageNumberRefEl.current.value = toFaNums(currentPage as number);
    }
  }, [currentPage]);

  function onInputNumber(e: React.ChangeEvent<HTMLInputElement>) {
    const inputEl = e.target;
    const inputValue: string = inputEl.value.trim();
    if (inputValue === "") return;
    const max: number = lastPage;
    const value: string = convertToEnglishDigits(inputValue);
    const hasNonNumericDigits: boolean = /[^0-9۰-۹]/.test(value);
    if (hasNonNumericDigits || value === "0" || +value > max) {
      const previousValue = toFaNums(parseInt(value.slice(0, -1), 10));
      inputEl.value = previousValue;
      inputEl.style.backgroundColor = "rgb(255, 124, 124)";
      setTimeout(() => (inputEl.style.backgroundColor = "white"), 300);
    } else {
      if (inputPageNumberRefEl.current) {
        inputPageNumberRefEl.current.value = toFaNums(+value);
      }
    }
  }

  const onFocusPageNumber = useRef(currentPage);
  function handleOnFocus(e: React.FocusEvent<HTMLInputElement>) {
    onFocusPageNumber.current = currentPage;
    e.target.select();
  }

  function handleOnBlur(e: React.FocusEvent<HTMLInputElement>) {
    const value = convertToEnglishDigits(e.target.value.trim());
    value === "" ? goToPage(+onFocusPageNumber.current) : goToPage(+value);
    if (inputPageNumberRefEl.current) {
      inputPageNumberRefEl.current.value = toFaNums(currentPage as number);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const inputPage = convertToEnglishDigits(e.currentTarget.value);
      onFocusPageNumber.current = +inputPage;
      goToPage(+inputPage);
    }
  }

  // fetching page data
  const lastPage = booksData[currentBook as keyof typeof booksData].lastPage;
  const renderedPages = useMemo(() => {
    const pagesContentArr = createLoremArr(lastPage);
    return pagesContentArr.map(({ id, content }) => {
      const pageNumber = toFaNums(id);
      return (
        <section key={id} id={`page${id}`} className="page">
          <div>{`صفحه ${pageNumber}`}</div>
          <div>
            <p>{content}</p>
            <img src="./s.img" alt="" width={"700px"} height={"600px"} />
          </div>
        </section>
      );
    });
  }, []);

  return (
    <>
      <div id="BookTabContainer" className="tab-container">
        <div id="bookPagination" className="book-pagination">
          <div id="PageNavigator" className="page-navigator">
            <button id="PrevPageBtn" className="btn--prev-page" onClick={goToPrevPage}>
              <i className="msr icon-btn"> arrow_circle_right </i>
            </button>

            <button id="NextPageBtn" className="btn--next-page" onClick={goToNextPage}>
              <i className="msr icon-btn"> arrow_circle_left </i>
            </button>

            <input
              id="PageInputRange"
              type="range"
              min="1"
              max={lastPage}
              step="1"
              value={
                currentPage === "" || currentPage === 0
                  ? onFocusPageNumber.current // can be 1 maybe
                  : currentPage
              }
              onChange={onInputRange}
            />

            <input
              id="PageInputNumber"
              type="text"
              inputMode="numeric"
              onChange={onInputNumber}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              onKeyDown={handleKeyDown}
              ref={inputPageNumberRefEl}
            />
          </div>
        </div>

        <div id="BookSection" className="book-section">
          {renderedPages}
        </div>
      </div>
    </>
  );
};

export default Book;
