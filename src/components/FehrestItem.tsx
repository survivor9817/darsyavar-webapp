type FehrestSectionType = {
  id: number;
  title: string;
  sections?: FehrestSectionType[];
};

type Props = {
  listItem: FehrestSectionType;
};

const FehrestItem = ({ listItem }: Props) => {
  return (
    <>
      <li key={listItem.title}>
        <div className="section-list-item">{listItem.title}</div>
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
