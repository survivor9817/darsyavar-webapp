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
  const { currentPage, setCurrentPage } = useContext(BookContext);
  const [isActive, setActive] = useState(false);
  const [hasActiveChild, setHasActiveChild] = useState(false);

  function findRefTitlePageNumber(pageNumber: number): number {
    if (fehrestArr.includes(pageNumber)) return pageNumber;
    return Math.max(...fehrestArr.filter((page) => page < pageNumber));
  }

  // تابع بازگشتی برای چک کردن فعال بودن فرزندان
  function checkIfChildIsActive(section: FehrestSectionType, currentRefPage: number): boolean {
    if (section.page === currentRefPage) return true;

    if (section.sections && section.sections.length > 0) {
      return section.sections.some((child) => checkIfChildIsActive(child, currentRefPage));
    }

    return false;
  }

  useEffect(() => {
    const currentRefPage = findRefTitlePageNumber(currentPage);
    setActive(currentRefPage === listItem.page);

    // چک کردن اینکه آیا یکی از فرزندان فعال هست
    if (listItem.sections && listItem.sections.length > 0) {
      const childActive = listItem.sections.some((child) =>
        checkIfChildIsActive(child, currentRefPage)
      );
      setHasActiveChild(childActive);
    } else {
      setHasActiveChild(false);
    }
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
          className={`section-list-item ${isActive || hasActiveChild ? "active" : ""}`}
          data-ref-page={listItem.page}
          onClick={handleClick}
        >
          {listItem.title} {listItem.page}
        </div>
        {listItem.sections && listItem.sections.length > 0 && (
          <ol className={`subsections ${isActive || hasActiveChild ? "expanded" : ""}`}>
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
