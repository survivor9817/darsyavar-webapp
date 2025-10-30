import CloseBtn from "./CloseBtn";
import FehrestItem from "./FehrestItem.tsx";
import { bookNames } from "../data/booksData.ts";
import { booksData } from "../data/booksData.ts";

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
