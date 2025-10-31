import { useCallback } from "react";

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
  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const refPageNumber = event.currentTarget.dataset.refPage;
    if (!refPageNumber) return;

    const relatedPage = document.querySelector(`#page${refPageNumber}`);
    relatedPage?.scrollIntoView();
  }, []);

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
