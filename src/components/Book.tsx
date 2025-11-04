import { useContext, useEffect, useMemo, useRef } from "react";
import { booksData, createLoremArr } from "../data/booksData.ts";
import { toFaNums } from "../utils/toFaNums";
import { getLocalData } from "../hooks/getLocalData.ts";
import { convertToEnglishDigits } from "../utils/convertToEnglishDigits.ts";
import { BookContext } from "./Layout.tsx";

const Book = () => {
  const { currentBook, currentPage, setCurrentPage } = useContext(BookContext);

  function goToPage(pageNumber: number) {
    if (!pageNumber || isNaN(pageNumber)) return;
    setCurrentPage(pageNumber); // in taabe setCurrentPage mitoone nabaashe age observer fa aal baashe
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

  function onInputNumber(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const inputValue = input.value;
    if (inputValue === "") {
      setCurrentPage("");
      return;
    }

    const value = convertToEnglishDigits(inputValue);
    const max = lastPage;
    if (value === "0" || isNaN(value) || +value > max) {
      const previousValue = currentPage === "" ? "" : toFaNums(+currentPage);
      input.value = previousValue;
      input.style.backgroundColor = "rgb(255, 124, 124)";
      setTimeout(() => {
        input.style.backgroundColor = "white";
      }, 300);
    } else {
      goToPage(value);
    }
  }

  const onFocusPageNumber = useRef(currentPage);
  function onFocus(e: React.FocusEvent<HTMLInputElement>) {
    onFocusPageNumber.current = currentPage;
    e.target.select();
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    value === "" && goToPage(+onFocusPageNumber.current);
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
              onFocus={onFocus}
              onBlur={onBlur}
              value={currentPage === "" || currentPage === 0 ? "" : toFaNums(+currentPage)}
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
