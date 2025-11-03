import { useContext, useEffect, useState } from "react";
import { BookContext } from "./Layout";

export type FehrestSectionType = {
  id: number;
  page: number;
  title: string;
  sections?: FehrestSectionType[];
};

type Props = {
  listItem: FehrestSectionType;
  fehrestArr: number[];
};

const FehrestItem = ({ listItem, fehrestArr }: Props) => {
  const [isActive, setActive] = useState(false);
  const { currentPage, setCurrentPage } = useContext(BookContext);

  function findRefTitlePageNumber(pageNumber: number) {
    if (fehrestArr.includes(pageNumber)) return pageNumber;
    return Math.max(...fehrestArr.filter((page) => page < pageNumber));
  }

  useEffect(() => {
    const currentRefPage = findRefTitlePageNumber(currentPage);
    setActive(currentRefPage === listItem.page);
  }, [currentPage, listItem.page, fehrestArr]);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    const refPageNumber = event.currentTarget.dataset.refPage;
    if (!refPageNumber) return;
    setCurrentPage(+refPageNumber); // deghat kon in mitone dar hozoore observer nabaashe
    const relatedPage = document.querySelector(`#page${refPageNumber}`);
    relatedPage?.scrollIntoView();
  }

  return (
    <>
      <li>
        <div
          className={`section-list-item ${isActive ? "active" : ""}`}
          data-ref-page={listItem.page}
          onClick={handleClick}
        >
          {listItem.title} {listItem.page}
        </div>
        {listItem.sections && listItem.sections.length > 0 && (
          <ol className="subsections">
            {listItem.sections.map((section) => (
              <FehrestItem key={section.title} listItem={section} fehrestArr={fehrestArr} />
            ))}
          </ol>
        )}
      </li>
    </>
  );
};

export default FehrestItem;
