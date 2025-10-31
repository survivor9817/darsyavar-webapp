import { useMemo } from "react";
import { booksData, createLoremArr } from "../data/booksData.ts";
import { toFaNums } from "../utils/toFaNums";

type Props = {
  currentBook: string;
};

const Book = ({ currentBook }: Props) => {
  // fetching page data
  const totalPages = booksData[currentBook as keyof typeof booksData].totalPages;
  const pagesArr = createLoremArr(totalPages);
  const renderedPages = useMemo(() => {
    return pagesArr.map(({ id, content }) => {
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
  }, [pagesArr]);

  return (
    <>
      <div id="BookTabContainer" className="tab-container">
        {/* <div id="bookPagination" className="book-pagination">
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
              max={content.length}
              step="1"
              value={
                currentPageNumber === "" || currentPageNumber === 0
                  ? onFocusPageNumber.current // can be 1 maybe
                  : currentPageNumber
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
              value={
                currentPageNumber === "" || currentPageNumber === 0
                  ? ""
                  : toFaNums(currentPageNumber)
              }
            />
          </div>
        </div> */}

        <div id="BookSection" className="book-section">
          {renderedPages}
        </div>
      </div>
    </>
  );
};

export default Book;
