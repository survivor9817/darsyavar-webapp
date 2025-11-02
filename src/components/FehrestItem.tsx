// import { useState } from "react";

import { useContext } from "react";
import { BookContext } from "./Layout";

type FehrestSectionType = {
  id: number;
  page: number;
  title: string;
  sections?: FehrestSectionType[];
};

type Props = {
  listItem: FehrestSectionType;
};

const FehrestItem = ({ listItem }: Props) => {
  // const [isActive, setActive] = useState(false);

  // function findRefTitlePageNumber(pageNumber: number) {
  //   if (fehrestPages.includes(pageNumber)) return pageNumber;
  //   return Math.max(...fehrestPages.filter((page) => page < pageNumber));
  // }

  const { currentPage, setCurrentPage } = useContext(BookContext);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    const refPageNumber = event.currentTarget.dataset.refPage;
    if (!refPageNumber) return;
    setCurrentPage(refPageNumber); // deghat kon in mitone dar hozoore observer nabaashe
    const relatedPage = document.querySelector(`#page${refPageNumber}`);
    relatedPage?.scrollIntoView();
  }

  return (
    <>
      <li key={listItem.title}>
        <div className="section-list-item" data-ref-page={listItem.page} onClick={handleClick}>
          {listItem.title}
        </div>
        {listItem.sections && listItem.sections.length > 0 && (
          <ol className="subsections">
            {listItem.sections.map((section) => (
              <FehrestItem key={section.title} listItem={section} />
            ))}
          </ol>
        )}
      </li>
    </>
  );
};

export default FehrestItem;
